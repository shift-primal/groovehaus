import type { Rating } from '#/db/schema';
import { Star, StarHalf } from 'lucide-react';

const MAX_STARS = 5;

export const Reviews = ({ rating, reviewers }: Rating) => {
    const renderStars = () => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = MAX_STARS - fullStars - (hasHalfStar ? 1 : 0);

        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Star
                    key={`product-detail-1-star-full-${i}`}
                    className="size-4 fill-yellow-500 stroke-yellow-500"
                />
            );
        }

        if (hasHalfStar) {
            stars.push(
                <div key="product-detail-1-half-star" className="relative size-4">
                    <StarHalf className="absolute top-0 right-0 size-full fill-yellow-500 stroke-yellow-500" />
                    <StarHalf className="absolute top-0 left-0 size-full -scale-x-100 fill-black/15 stroke-black/15 dark:invert" />
                </div>
            );
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Star
                    key={`product-detail-1-star-empty-${i}`}
                    className="size-4 fill-black/15 stroke-black/15 dark:invert"
                />
            );
        }

        return stars;
    };

    const reviewersFmtd =
        reviewers >= 1000 ? `${(reviewers / 1000).toFixed(1)}k` : String(reviewers);

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">{renderStars()}</div>
            {reviewers && (
                <p className="text-base leading-none font-medium whitespace-nowrap text-muted-foreground">
                    {reviewersFmtd} reviews
                </p>
            )}
        </div>
    );
};
