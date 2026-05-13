import { Button } from '#/components/shadcn/button';
import { X } from 'lucide-react';

interface RemoveItemProps {
    onRemove: () => void;
}

export const RemoveItem = ({ onRemove }: RemoveItemProps) => {
    return (
        <Button variant="ghost" size="sm" className="border-0 h-fit p-1" onClick={onRemove}>
            <X className="size-3" />
        </Button>
    );
};
