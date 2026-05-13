import { Link } from '@tanstack/react-router';
import { ShoppingCart } from 'lucide-react';

export interface ShoppingCartIconProps {
    url: string;
    quantity?: number;
}

export const ShoppingCartIcon = ({ url, quantity = 0 }: ShoppingCartIconProps) => {
    return (
        <Link to={url} className="relative">
            <ShoppingCart className="size-5" />
            {quantity > 0 && (
                <span
                    className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full 
  bg-primary text-[10px] font-bold text-primary-foreground"
                >
                    {quantity}
                </span>
            )}
        </Link>
    );
};
