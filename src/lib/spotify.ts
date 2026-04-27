import axios from 'redaxios';

export async function getSpotifyToken(): Promise<string> {
    const res = await axios.post(
        'https://accounts.spotify.com/api/token',
        `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return res.data.access_token;
}

export async function getAlbumData(albumId: string, token: string) {
    const res = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return {
        name: res.data.name as string,
        artist: res.data.artists[0].name as string,
        releaseYear: Number(res.data.release_date.split('-')[0]),
        imageUrl: res.data.images[0].url as string,
        spotifyAlbumId: albumId
    };
}
