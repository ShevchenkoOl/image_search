
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './api';

const elements = {
  input: document.querySelector('input'),
  form: document.querySelector('form'),
  list: document.querySelector('.gallery'),
  load: document.querySelector('.load-more'),
  spinner: document.querySelector('.spinner'),
};

let page = 1;
const perPage = 20;


const renderImages = images => {
  return images
    .map(image => {
      return `
    <div class="photo-card">
    <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/></a>
        <div class="info">
         <p class="info-item">
          <b>Likes</b>${image.likes}
        </p>
        <p class="info-item">
          <b>Views</b>${image.views}
        </p>
        <p class="info-item">
          <b>Comments</b>${image.comments}
        </p>
        <p class="info-item">
         <b>Downloads</b>${image.downloads}
        </p>
       </div>
    </div>`;
    })
    .join('');
};

elements.form.addEventListener('submit', async event => {
  event.preventDefault();
  const name = elements.input.value.trim(); // Удаляем начальные и конечные пробелы из значения поля ввода
  if (!name) {
    Notify.warning('Please enter the name of the image');
    return;
  } // Если значение поля ввода пустое, выходим из обработчика
  //const name = elements.input.value;
  page = 1;
  const images = await fetchImages(name, page, perPage);
  //elements.list.innerHTML = '';
  elements.list.innerHTML = renderImages(images);

  new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  elements.input.value = '';
  if (images.length > 0) {
    elements.load.classList.remove('hidden'); // Показываем кнопку если есть результаты
  } else {
    elements.load.classList.add('hidden'); // Скрываем кнопку если результатов нет
  }
});

elements.load.addEventListener('click', async () => {
  const name = elements.input.value;
  page += 1;
  const images = await fetchImages(name, page, perPage);
  elements.list.insertAdjacentHTML('beforeend', renderImages(images));
  if (images.length < perPage) {
    elements.load.classList.add('hidden'); // Скрываем кнопку если больше нет изображений для загрузки
  }
});
