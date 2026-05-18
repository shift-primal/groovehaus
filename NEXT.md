# Groovehaus — Next Steps

> Living plan for Phases 4 finish through 7. Update as you go.

---

## Phase 4 — Cart (finish up)

**Status: ~95% done**

### Remaining
- [ ] Fix `useProducts` to accept `Partial<GetProductsInput>` and call `getProductsSchema.parse(search)` inside the hook — this lets existing call sites pass only filter fields, and `useNewArrivals` pass only `{ limit: 4, sortDir: 'desc' }`, with Zod filling defaults for the rest
- [ ] Wire `useNewArrivals` into `routes/index.tsx` — render a "New Arrivals" section using `ProductCard` / `ProductsGrid`
- [ ] Smoke test: add item → cart updates → adjust qty → remove → total correct → can't exceed stock

---

## Phase 5 — Checkout + Stripe

### File layout to create
```
src/
  features/
    checkout/
      components/
        CheckoutForm.tsx      # Stripe <PaymentElement /> wrapper
        OrderSummary.tsx      # Read-only list of cart items + total
      hooks/
        useCreatePaymentIntent.ts
      server/
        checkout.schemas.ts
        checkout.server.ts    # createPaymentIntent + createOrder logic
        checkout.api.ts       # createServerFn wrappers
  routes/
    checkout/
      index.tsx               # Main checkout page
      success.tsx             # Post-payment confirmation
    api/
      stripe-webhook.ts       # Webhook handler
```

### Steps

1. **Install Stripe deps** (if not already)
   ```bash
   pnpm add stripe @stripe/stripe-js @stripe/react-stripe-js
   ```
   Add to `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

2. **`checkout.server.ts`** — two server-side functions:
   - `createPaymentIntent(userId)`: fetch cart, calculate total, call `stripe.paymentIntents.create({ amount, currency: 'nok', metadata: { userId } })`, return `clientSecret`
   - `createOrder(paymentIntentId)`: called from the webhook — create `orders` row + `order_items` rows (snapshot name/price), decrement stock on each product, clear cart

3. **`checkout.api.ts`** — one `createServerFn` (POST) for `createPaymentIntentFn`; the webhook is handled differently (see step 6)

4. **`useCreatePaymentIntent` hook** — `useMutation` that calls `createPaymentIntentFn`, returns `{ clientSecret, mutate, isPending }`

5. **`routes/checkout/index.tsx`**:
   - Redirect to `/auth/sign-in` if not logged in (check session in component)
   - Redirect to `/cart` if cart is empty
   - Call `useCreatePaymentIntent` on mount (or on a "Place order" button)
   - Render `<Elements stripe={stripePromise} options={{ clientSecret }}>` wrapping `<CheckoutForm />`
   - `CheckoutForm` renders `<PaymentElement />` + submit button → calls `stripe.confirmPayment({ return_url: '/checkout/success' })`

6. **`routes/api/stripe-webhook.ts`** — TanStack Start API route:
   ```ts
   export const APIRoute = createAPIFileRoute('/api/stripe-webhook')({
       POST: async ({ request }) => {
           const body = await request.text();
           const sig = request.headers.get('stripe-signature')!;
           const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
           if (event.type === 'payment_intent.succeeded') {
               await createOrder(event.data.object.id);
           }
           return new Response(null, { status: 200 });
       }
   });
   ```
   - **Must be idempotent** — check if an order with that `stripePaymentIntentId` already exists before inserting
   - Local testing: `stripe listen --forward-to localhost:3000/api/stripe-webhook`

7. **`routes/checkout/success.tsx`** — reads `?payment_intent=xxx` from the URL, fetches the order by that ID, shows confirmation + link to `/orders`

8. **Verify:** test card `4242 4242 4242 4242` → redirects to success → order appears in DB → stock decremented → cart cleared

---

## Phase 6 — Order History

### File layout to create
```
src/
  features/
    orders/
      components/
        OrderCard.tsx         # Summary row (order id, date, total, status badge)
        OrderItemRow.tsx      # Single line item (image, name, qty, price)
      hooks/
        useOrders.ts
        useOrder.ts
      server/
        orders.schemas.ts
        orders.server.ts      # fetchOrders, fetchOrderById — both check userId ownership
        orders.api.ts
  routes/
    orders/
      index.tsx               # List of all orders
      $orderId.tsx            # Single order detail
```

### Steps

1. **`orders.server.ts`**:
   - `fetchOrders(userId)`: `db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt))`
   - `fetchOrderById(orderId, userId)`: join `order_items`, check `orders.userId === userId` (ownership guard), return order + items

2. **`orders.api.ts`** — `getOrdersFn` (GET) + `getOrderFn` (GET)

3. **`useOrders` / `useOrder` hooks** — standard `useQuery` wrappers, `enabled: !!userId`

4. **`routes/orders/index.tsx`**:
   - Redirect if not signed in
   - Render list of `OrderCard` components (shadcn `Table` or simple card list)
   - Status badge: `pending` → yellow, `paid`/`processing` → blue, `shipped` → purple, `delivered` → green, `cancelled` → red

5. **`routes/orders/$orderId.tsx`**:
   - Itemized receipt: product image, name (snapshot from `order_items.productName`), qty, unit price
   - Shipping info block, total, status

6. **Verify:** completed order shows correct totals; visiting another user's order ID → 404 or redirect

---

## Phase 7 — Admin Panel

### File layout to create
```
src/
  features/
    admin/
      components/
        StatsCard.tsx
        ProductForm.tsx        # Create + edit (same form, different submit)
        ProductTable.tsx       # shadcn DataTable (TanStack Table v8)
        OrderTable.tsx
        StatusDropdown.tsx     # Update order status
      hooks/
        useAdminProducts.ts
        useAdminOrders.ts
        useAdminStats.ts
      server/
        admin.schemas.ts
        admin.server.ts
        admin.api.ts
  routes/
    admin/
      index.tsx                # Stats dashboard
      products/
        index.tsx              # Product list + create button
        new.tsx                # Create product form
        $productId.tsx         # Edit product form
      orders/
        index.tsx              # All orders with status update
```

### Steps

1. **Route guard** — in each `/admin/*` route's `beforeLoad` (or a shared layout route):
   ```ts
   if (context.session?.user.role !== 'admin') throw redirect({ to: '/' });
   ```
   Neon Auth (Better Auth) supports a `role` field via the admin plugin — configure in `auth.ts`, not a manual DB column.

2. **`admin.server.ts`**:
   - `fetchStats()`: three counts — total products, total orders, total revenue (sum of `orders.totalAmount` where status != 'cancelled')
   - `fetchAllProducts()`: full product list, no pagination needed for admin
   - `createProduct(data)` / `updateProduct(id, data)` / `deleteProduct(id)`
   - `fetchAllOrders()`: join users, order by createdAt desc
   - `updateOrderStatus(orderId, status)`

3. **`routes/admin/index.tsx`** — three `StatsCard` components in a grid

4. **Product table** — use TanStack Table v8 (already in the stack via `@tanstack/react-table`):
   - Columns: image thumbnail, name, category, price, stock, condition, active toggle
   - Row actions: Edit (link to `$productId`), Delete (confirm dialog)

5. **Product form** (`new.tsx` / `$productId.tsx`) — controlled form, Zod validation, same component for create and edit. Image URL field (no upload needed for now).

6. **Order management** — table with `StatusDropdown` per row; `updateOrderStatus` mutation with optimistic update

7. **Verify:** admin can CRUD products; stock changes reflect on catalog; regular user accessing `/admin` → redirected

---

## Stretch Goals (post-MVP)

- **Reviews + Ratings** — `reviews` table (`userId`, `productId`, `rating 1–5`, `body`); star display on product pages; limit one review per user per product
- **Wishlist** — `wishlist_items` table; heart button on `ProductCard`; `/wishlist` page
- **Homepage polish** — hero banner, featured products carousel (use `featured` flag from schema)
