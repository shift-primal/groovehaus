import { CartControls } from '#/features/cart/components/controls/CartControls';
import { CartImage } from '#/features/cart/components/CartImage';
import { fmtPrice } from '#/lib/utils';
import { Link } from '@tanstack/react-router';

export interface CartProductInfo {
    imageUrl: string;
    slug: string;
    name: string;
    artistName?: string;
    manufacturer?: string;
    quantity: number;
    price: number;
}

export interface CartItemCardProps {
    product: CartProductInfo;
    onRemove: () => void;
    onUpdate: (quantity: number) => void;
}

export const CartProduct = ({ product, onRemove, onUpdate }: CartItemCardProps) => {
    const { imageUrl, slug, name, quantity, price, artistName, manufacturer } = product;

    return (
        <div className="flex border p-4 gap-4 rounded-xl bg-accent/20">
            <CartImage imageUrl={imageUrl} slug={slug} />

            <div className="flex flex-col justify-between w-full">
                <Link
                    to="/products/$slug"
                    params={{ slug: slug }}
                    className="flex flex-col gap-y-0.5"
                >
                    <span className="text-sm font-semibold line-clamp-1">{name}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                        {artistName ?? manufacturer}
                    </span>
                </Link>

                <span className="font-semibold text-sm">{fmtPrice(price)}</span>
            </div>
            <CartControls quantity={quantity} onRemove={onRemove} onUpdate={onUpdate} />
        </div>
    );
};
