import { AspectRatio } from '#/components/shadcn/aspect-ratio';

export const CartImage = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <div className="w-20 shrink-0">
            <AspectRatio ratio={1} className="overflow-hidden rounded-md">
                <img src={imageUrl} className="size-full object-cover" />
            </AspectRatio>
        </div>
    );
};
