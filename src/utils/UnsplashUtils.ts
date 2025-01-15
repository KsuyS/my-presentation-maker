import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'h69XWovSWacwdxvQVcJIksHSf-G3f3bHCsw2ijSexCM';

interface UnsplashImage {
    urls: {
      small: string;
    }
  }
  

export async function importImageFromUnsplash(query: string) {
    try {
        const response = await axios.get(
            `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=18`
        );
        const data = response.data;

        if (data.results.length > 0) {
            const imageUrls = data.results.map((image: UnsplashImage) => image.urls.small);
            return imageUrls;
        } else {
            throw new Error("Изображения не найдены.");
        }
    } catch (error) {
        alert("Ошибка импорта изображения из Unsplash:" + error)
        return [];
    }
}