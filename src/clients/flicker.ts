import * as rp from 'request-promise';
import { randomInt } from '../utils/utils';

/*
 * 動物の画像を検索します
 * 検索結果が見つからなかった場合には null を、見つかった場合には画像URLを返します
 * @see https://www.flickr.com/services/api/flickr.photos.search.html
 */
export async function fetchImageUrl(searchText: string): Promise<string|null> {
  try {
    /** offsetの指定次第で見つからない場合は再試行する */
    for (let i = 0; i < 3; i++) {
      const requestUrl = photosSearchUrl(searchText);
      const res = await rp(requestUrl);
      const response = JSON.parse(res);
      const photos = response.photos.photo;

      if (photos.length === 0) continue;

      const randomIndex = randomInt(photos.length);
      const photo = photos[randomIndex];

      return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
    }

    return null;
  } catch (e) {
    console.log(`Error occurred in flicker api: ${e}`);
    return null;
  }
}

function photosSearchUrl(searchText: string): string {
  const method = 'flickr.photos.search';
  const perPage = 100;
  const maxPage = 100;
  const page = randomInt(maxPage);

  return `https://api.flickr.com/services/rest?api_key=${process.env.FLICKER_API_KEY}&method=${method}&text=${searchText}&per_page=${perPage}&page=${page}&sort=relevance&format=json&nojsoncallback=1&lang=en-US`;
}