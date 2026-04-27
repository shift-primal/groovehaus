import { fmtPrice } from '#/lib/utils';

interface PriceProps {
    regular: number;
    sale?: number;
    text?: string;
}

export const Price = ({ regular, sale }: PriceProps) => {
    if (!regular) return;

    return (
        <div className="flex items-center gap-2">
            {sale && (
                <span className="text-right text-2xl font-bold text-primary">{fmtPrice(sale)}</span>
            )}
            <span
                className={`text-right text-2xl font-bold ${
                    sale ? 'text-muted-foreground line-through' : 'text-foreground'
                }`}
            >
                {fmtPrice(regular)}
            </span>
        </div>
    );
};
