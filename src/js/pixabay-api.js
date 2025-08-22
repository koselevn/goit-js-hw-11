import axios from 'axios';

const API_KEY = '51915811-ff4e89c2eae9a908c3a29b564'; 
const BASE_URL = 'https://pixabay.com/api/';

export const getImagesByQuery = async (query) => {
    const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    };

    try {
        const response = await axios.get(BASE_URL, { params });

        if (response.data.hits.length === 0) {
            return 'Sorry, there are no images matching your search query. Please try again!';
        }

        return response.data.hits;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
};