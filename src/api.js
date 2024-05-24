import axios from 'axios';
import { Notify } from 'notiflix';

const spinner = document.querySelector('.spinner');

export const fetchImages = async (name, page, perPage) => {
    const baseURL = 'https://pixabay.com/api/';
    const key = '30790248-497145c5d3b0c6576ca9c953f';
    try {
      spinner.style.display = 'block'; // Показываем спиннер
      const response = await axios.get(
        `${baseURL}?key=${key}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
      );
      const data = response.data.hits;
      console.log(data);
      if (response.data.total > 0) {
        Notify.success(`Found ${response.data.total} images successfully`);
      } else {
        Notify.info('You entered an incorrect name, please enter again.');
      }
      return data;
    } catch (error) {
      Notify.failure('Ooop! Something went wrong 😒! Please try again');
      console.log('ERROR: ' + error);
    } finally {
      spinner.style.display = 'none'; // Скрываем спиннер
    }
  };
