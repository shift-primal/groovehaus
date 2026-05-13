import { AspectRatio } from '#/components/shadcn/aspect-ratio';
import { Link } from '@tanstack/react-router';

interface CartImageProps {
    imageUrl: string;
    slug: string;
}

export const CartImage = ({ imageUrl, slug }: CartImageProps) => {
    return (
        <Link to="/products/$slug" params={{ slug: slug }}>
            <div className="w-20 shrink-0">
                <AspectRatio ratio={1} className="overflow-hidden rounded-md">
                    <img src={imageUrl} className="size-full object-cover" />
                </AspectRatio>
            </div>
        </Link>
    );
};
