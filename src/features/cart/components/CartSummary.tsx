import { Button } from '#/components/shadcn/button';
import { fmtPrice } from '#/lib/utils';

export const CartSummary = ({ subtotal }: { subtotal: number }) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{fmtPrice(subtotal)}</span>
            </div>

            <Button size="lg" className="w-full">
                Checkout
            </Button>
        </div>
    );
};
