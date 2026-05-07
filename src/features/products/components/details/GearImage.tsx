export const GearImage = ({ gearUrl }: { gearUrl: string }) => {
    return (
        <div className="bg-white rounded-xl p-2">
            <div className="w-64 sm:w-80 lg:w-104 aspect-square flex">
                <img src={gearUrl} className="self-center" />
            </div>
        </div>
    );
};
