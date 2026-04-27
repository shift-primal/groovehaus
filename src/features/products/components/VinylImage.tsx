export const VinylImage = ({ coverUrl }: { coverUrl: string }) => {
    const vinylImg = 'https://pngimg.com/uploads/vinyl/vinyl_PNG18.png';

    return (
        <div className="relative">
            <img src={vinylImg} className="absolute" />
            <img src={coverUrl} className="relative w-full z-10 shadow-lg outline-2" />
        </div>
    );
};
