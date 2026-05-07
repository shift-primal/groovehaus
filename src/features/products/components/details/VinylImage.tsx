export const VinylImage = ({ coverUrl }: { coverUrl: string }) => {
    const vinylImg = 'https://pngimg.com/uploads/vinyl/vinyl_PNG18.png';

    return (
        <div className="relative w-56 sm:w-80 lg:w-104">
            <img
                src={vinylImg}
                className="absolute right-0 top-0 w-full translate-x-1/4 dark:invert"
            />
            <img src={coverUrl} className="relative w-full z-10 shadow-lg" />
        </div>
    );
};
