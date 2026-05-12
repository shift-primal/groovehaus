import { Badge } from '#/components/shadcn/badge';
import { Button } from '#/components/shadcn/button';
import type { Product } from '#/db/schema';
import { useCart } from '#/features/cart/hooks/useCart';
import { Reviews, VinylImage, Price, SpotifyAlbum } from '#/features/products/components/details';
import { BackButton } from '#/features/products/components/details/BackButton';
import { GearImage } from '#/features/products/components/details/GearImage';
import { CircleCheck, ShoppingCart } from 'lucide-react';

export const ProductDetails = ({
    productData,
    userId
}: {
    productData: Product;
    userId: string | undefined;
}) => {
    const {
        artistName,
        spotifyAlbumId,
        imageUrl,
        manufacturer,
        name,
        price,
        rating,
        id: productId
    } = productData;

    const { addItem } = useCart(userId ?? '');

    return (
        <div className="container">
            <BackButton />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div id="product-image" className="flex justify-center items-center h-full">
                    {artistName ? (
                        <VinylImage coverUrl={imageUrl!} />
                    ) : (
                        <GearImage gearUrl={imageUrl!} />
                    )}
                </div>
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="flex-1">
                                <h2 className="text-muted-foreground text-lg mb-1">
                                    {artistName ?? manufacturer}
                                </h2>
                                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                                    {name}
                                </h1>
                                <div className="mt-3 flex flex-wrap items-center gap-4">
                                    <Reviews
                                        rating={rating!.rating}
                                        reviewers={rating!.reviewers}
                                    />
                                    <Badge variant="secondary">
                                        <CircleCheck />
                                        In Stock
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <Price regular={price} />
                    </div>
                    <SpotifyAlbum albumId={spotifyAlbumId ?? undefined} />
                    <Button size="lg" className="w-full" onClick={() => addItem.mutate(productId)}>
                        <ShoppingCart />
                        Legg til i handlekurven
                    </Button>
                </div>
            </div>
        </div>
    );
};
