import { Quantity } from '#/features/cart/components/controls/Quantity';
import { RemoveItem } from '#/features/cart/components/controls/RemoveItem';

interface CartControlsProps {
    quantity: number;
    onRemove: () => void;
    onUpdate: (quantity: number) => void;
}

export const CartControls = ({ quantity, onRemove, onUpdate }: CartControlsProps) => {
    return (
        <div className="flex flex-col items-end justify-between">
            <RemoveItem onRemove={onRemove} />
            <Quantity quantity={quantity} onUpdate={onUpdate} />
        </div>
    );
};
