import { Badge } from '#/components/shadcn/badge';
import { Button } from '#/components/shadcn/button';
import type { Product } from '#/db/schema';
import { Price } from '#/features/products/components/Price';
import { Reviews } from '#/features/products/components/Reviews';
import { SpotifyAlbum } from '#/features/products/components/SpotifyAlbum';
import { VinylImage } from '#/features/products/components/VinylImage';
import { CircleCheck } from 'lucide-react';

export const ProductDetails = ({ product }: { product: Product }) => {
    const rate = 3.5;
    const totalReviewers = '5.8k';

    return (
        <section className="py-32">
            <div className="container">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                    <div id="product-image">
                        {product.artistName ? (
                            <VinylImage coverUrl={product.imageUrl!} />
                        ) : (
                            <img src={product.imageUrl!} alt={product.name} />
                        )}
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div className="flex-1">
                                    <h2 className="text-muted-foreground text-lg mb-1">
                                        {product.artistName ?? product.manufacturer}
                                    </h2>
                                    <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                                        {product.name}
                                    </h1>
                                    <div className="mt-3 flex flex-wrap items-center gap-4">
                                        <Reviews rate={rate} totalReviewers={totalReviewers} />
                                        <Badge variant="secondary">
                                            <CircleCheck />
                                            In Stock
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <Price regular={product.price} />
                        </div>
                        <SpotifyAlbum albumId={product.spotifyAlbumId ?? undefined} />
                        <Button size="lg" className="w-full">
                            Buy now!
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
