import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'h69XWovSWacwdxvQVcJIksHSf-G3f3bHCsw2ijSexCM';

export async function importImageFromUnsplash(query: string) {
    try {
        const response = await axios.get(
            `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`
        );
        const data = response.data;

        if (data.results.length > 0) {
            const imageUrls = data.results.map((image: any) => image.urls.small);
            return imageUrls;
        } else {
            throw new Error('No images found');
        }
    } catch (error) {
        console.error('Error importing image from Unsplash:', error);
        return [];
    }
}