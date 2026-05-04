import type { Product } from '#/db/schema';
import { Link } from '@tanstack/react-router';
import { AspectRatio } from '#/components/shadcn/aspect-ratio';
import { Badge } from '#/components/shadcn/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '#/components/shadcn/card';
import { fmtPrice } from '#/lib/utils';
import { conditionLabels } from '#/config/products';

export const ProductCard = ({ productData }: { productData: Product }) => {
    const { slug, imageUrl, name, condition, artistName, manufacturer, price } = productData;

    return (
        <Link
            to="/products/$slug"
            params={{ slug: slug }}
            className="block w-full h-full transition-transform duration-300 hover:scale-105"
        >
            <Card className="overflow-hidden py-0 gap-0 h-full">
                <CardHeader className="relative block p-0">
                    <AspectRatio ratio={1} className="overflow-hidden">
                        <img
                            src={imageUrl!}
                            alt={name}
                            className="block size-full object-cover object-center"
                        />
                    </AspectRatio>
                    <Badge className="absolute left-2 top-2 text-[0.65rem] bg-black/60 backdrop-blur-sm text-white border-0">
                        {conditionLabels[condition!]}
                    </Badge>
                </CardHeader>
                <CardContent className="flex h-full flex-col  px-3 pb-2.5 pt-3">
                    <div className="flex flex-col gap-0.5">
                        <CardTitle className="text-sm font-semibold line-clamp-2">{name}</CardTitle>
                        <CardDescription className="text-xs font-medium text-muted-foreground">
                            {artistName ? artistName : manufacturer}
                        </CardDescription>
                    </div>
                    <span className="text-sm font-bold mt-auto pt-1">{fmtPrice(price)}</span>
                </CardContent>
            </Card>
        </Link>
    );
};
