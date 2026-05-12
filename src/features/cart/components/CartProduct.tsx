import { Button } from '#/components/shadcn/button';
import { CartImage } from '#/features/cart/components/CartImage';
import { fmtPrice } from '#/lib/utils';
import { Link } from '@tanstack/react-router';
import { X } from 'lucide-react';

export interface CartProductInfo {
    imageUrl: string;
    slug: string;
    name: string;
    quantity: number;
    price: number;
}

export interface CartItemCardProps {
    product: CartProductInfo;
    onRemove: () => void;
    onUpdate: (quantity: number) => void;
}

export const CartProduct = ({ product, onRemove, onUpdate }: CartItemCardProps) => {
    const { imageUrl, slug, name, quantity, price } = product;

    return (
        <div className="flex border p-4 gap-4 rounded-xl bg-accent/20 items-center">
            <CartImage imageUrl={imageUrl!} />

            <div className="flex flex-col gap-0.5 w-full">
                <Link to="/products/$slug" params={{ slug: slug }} className="block w-full h-full">
                    <h3 className="text-sm font-semibold line-clamp-2">{name}</h3>
                </Link>
                <span className="text-xs font-medium text-muted-foreground">Qty: {quantity}</span>
            </div>

            <div className="text-right w-full">
                <span className="font-semibold text-sm">{fmtPrice(price)}</span>
            </div>

            <Button
                variant="ghost"
                size="icon"
                className="shrink-0 border-0 bg-none"
                onClick={onRemove}
            >
                <X className="size-4" />
            </Button>
        </div>
    );
};
