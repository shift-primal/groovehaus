export const VinylImage = ({ coverUrl }: { coverUrl: string }) => {
    const vinylImg = 'https://pngimg.com/uploads/vinyl/vinyl_PNG18.png';

    return (
        <div className="container bg-white w-fit p-16 sm:p-20 lg:p-24 rounded-xl ">
            <div className="relative w-48 sm:w-64 lg:w-80">
                <img src={vinylImg} className="absolute right-0 top-0 w-full translate-x-1/4" />
                <img src={coverUrl} className="relative w-full z-10 shadow-lg" />
            </div>
        </div>
    );
};
