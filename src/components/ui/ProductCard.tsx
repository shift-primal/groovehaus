import type { Product } from '#/db/schema';
import { Link } from '@tanstack/react-router';
import { AspectRatio } from '../shadcn/aspect-ratio';
import { Badge } from '../shadcn/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shadcn/card';
import { fmtPrice } from '#/lib/utils';

const conditionTranslations = {
    new: 'Ny!',
    used_mint: 'Nesten ny',
    used_good: 'Pent brukt',
    used_fair: 'Brukt',
    used_bad: 'Tydelig brukt'
};

export const ProductCard = ({ productData }: { productData: Product }) => {
    const { imageUrl, name, condition, artistName, manufacturer, price } = productData;

    return (
        <Link to="/" className="block w-48 transition-transform duration-300 hover:scale-105">
            <Card className="overflow-hidden py-0 gap-0">
                <CardHeader className="relative block p-0">
                    <AspectRatio ratio={1} className="overflow-hidden">
                        <img
                            src={imageUrl!}
                            alt={name}
                            className="block size-full object-cover object-center"
                        />
                    </AspectRatio>
                    <Badge className="absolute left-2 top-2 text-[0.65rem] bg-black/60 backdrop-blur-sm text-white border-0">
                        {conditionTranslations[condition!]}
                    </Badge>
                </CardHeader>
                <CardContent className="flex h-28 flex-col px-3.5 pb-2.5 pt-3.5">
                    <CardTitle className="text-sm font-semibold line-clamp-2">{name}</CardTitle>
                    <CardDescription className="text-xs font-medium text-muted-foreground">
                        {artistName ? artistName : manufacturer}
                    </CardDescription>
                    <span className="text-sm font-bold mt-auto mb-1.5">{fmtPrice(price)}</span>
                </CardContent>
            </Card>
        </Link>
    );
};
