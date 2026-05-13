import { Button } from '#/components/shadcn/button';
import { Minus, Plus } from 'lucide-react';

interface QuantityProps {
    quantity: number;
    onUpdate: (quantity: number) => void;
}

export const Quantity = ({ quantity, onUpdate }: QuantityProps) => {
    return (
        <div className="inline-flex items-center w-fit">
            <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-r-none border-r text-muted-foreground hover:text-foreground"
                onClick={() => onUpdate(quantity - 1)}
            >
                <Minus className="size-3" />
            </Button>

            <span className="w-8 text-center text-xs font-semibold tabular-nums border self-stretch place-content-center">
                {quantity}
            </span>

            <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-l-none border-l text-muted-foreground hover:text-foreground"
                onClick={() => onUpdate(quantity + 1)}
            >
                <Plus className="size-3" />
            </Button>
        </div>
    );
};
