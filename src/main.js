import { getImagesByQuery } from './js/pixabay-api.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { clearGallery, createGallery, hideLoader, showLoader } from './js/render-functions.js';


const form = document.querySelector('.form')

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = event.target.elements['search-text'].value.trim();

    if (!query) {
        iziToast.warning({
            title: 'Warning',
            message: 'Please enter a search term!',
            position: 'topRight',
        });
        return;
    }

    try {
        showLoader();

        const result = await getImagesByQuery(query);

        if (typeof result === 'string') {
            iziToast.error({
                title: 'Error',
                message: result,
                position: 'topRight',
            });
            clearGallery();
        } else {
            clearGallery();
            createGallery(result);

            iziToast.success({
                title: 'Success',
                message: `Found ${result.length} images`,
                position: 'topRight',
            });
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later.',
            position: 'topRight',
        });
        console.error('Error fetching images:', error);
    } finally {
        hideLoader();
    }
});