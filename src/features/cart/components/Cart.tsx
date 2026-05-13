import { Separator } from '#/components/shadcn/separator';
import { CartEmpty } from '#/features/cart/components/CartEmpty';
import { CartProduct } from '#/features/cart/components/CartProduct';
import { CartSummary } from '#/features/cart/components/CartSummary';
import { useCart } from '#/features/cart/hooks/useCart';
import { calculateTotalCart } from '#/lib/utils';

export const Cart = ({ userId }: { userId: string }) => {
    const { cart, updateItem, removeItem } = useCart(userId);

    const subtotal = calculateTotalCart(cart.data ?? []);

    if (!cart.data || cart.data.length == 0) return <CartEmpty />;

    return (
        <div className="container max-w-2xl">
            <h1 className="mb-8 text-3xl font-semibold">Handlekurv</h1>

            <div>
                <div className="space-y-4">
                    {cart.data?.map((item) => (
                        <CartProduct
                            key={item.cart_items.id}
                            product={{
                                slug: item.products.slug,
                                imageUrl: item.products.imageUrl!,
                                name: item.products.name,
                                artistName: item.products.artistName ?? undefined,
                                manufacturer: item.products.manufacturer ?? undefined,
                                price: item.products.price,
                                quantity: item.cart_items.quantity
                            }}
                            onRemove={() => removeItem.mutate(item.cart_items.id)}
                            onUpdate={(qty: number) =>
                                updateItem.mutate({ cartItemId: item.cart_items.id, qty })
                            }
                        />
                    ))}
                </div>
                <Separator className="my-6" />
                <CartSummary subtotal={subtotal} />
            </div>
        </div>
    );
};
