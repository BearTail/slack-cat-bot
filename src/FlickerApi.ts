import * as rp from 'request-promise';
import { AnimalEnglish } from './Types';
import { getRandomInt } from './Util';

const API_KEY = 'aaba8ae7865dc3fdaed68b03528975f9';

/*
 * @see https://www.flickr.com/services/api/flickr.photos.search.html
 */
export async function fetchAnimalImageUrl(animal: AnimalEnglish): Promise<string|null> {
  try {
    const requestUrl = photosSearchUrl(animal);
    const res = await rp(requestUrl);
    const response = JSON.parse(res);

    const photos = response.photos.photo;
    const randomIndex = getRandomInt(photos.length);
    const photo = photos[randomIndex];

    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
  } catch (e) {
    console.log(`Error occurred in flicker api: ${e}`);
    return null;
  }
}

function photosSearchUrl(animal: AnimalEnglish): string {
  const method = 'flickr.photos.search';
  const perPage = 100;
  const maxPage = 100;
  const page = getRandomInt(maxPage);

  return `https://api.flickr.com/services/rest?api_key=${API_KEY}&method=${method}&text=${animal}&per_page=${perPage}&page=${page}&sort=relevance&format=json&nojsoncallback=1&lang=en-US`;
}
