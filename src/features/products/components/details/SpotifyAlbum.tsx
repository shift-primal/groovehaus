export const SpotifyAlbum = ({ albumId }: { albumId: string | undefined }) => {
    if (albumId === undefined) return;

    return (
        <div className="p-2">
            <iframe
                data-testid="embed-iframe"
                style={{ borderRadius: '12px' }}
                src={`https://open.spotify.com/embed/album/${albumId}`}
                width="100%"
                height="352"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            ></iframe>
        </div>
    );
};
