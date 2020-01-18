import * as lambda from 'aws-lambda';
import { animalSearchableText, animalRequested } from './Animal';
import { fetchAnimalImageUrl } from './FlickerApi';
import { postImageToSlack } from './SlackApi';
import { AnimalEnglish, AnimalKana } from './Types';
import { getOmikujiResult, omikujiRequested } from './AnimalOmikuji';

export async function searchAndPostAnimalImage(event: lambda.APIGatewayProxyEvent): Promise<lambda.APIGatewayProxyResult> {
  if (!event.body) {
    return responseBody(200, 'No event body found!');
  }

  const eventBody = JSON.parse(event.body);

  /*
   * slack の Event API を利用するために初回のみ必要となる認証
   * @see https://api.slack.com/events/url_verification
   */
  if (eventBody.type === 'url_verification') {
    return responseBody(200, eventBody.challenge);
  }

  const slackText = eventBody.event.text;

  if (!slackText) {
    return responseBody(200, 'Did nothing.');
  }

  if (animalRequested(slackText)) {
    return await imageToSlack(slackText);
  }

  if (omikujiRequested(slackText)) {
    return await tryOmikuji();
  }

  return responseBody(200, 'Did nothing.');
}

async function tryOmikuji(): Promise<lambda.APIGatewayProxyResult> {
  try {
    const result = await getOmikujiResult();

    if (result) {
      const res = await postImageToSlack(result.url, result.message);
      return responseBody(res.statusCode, res.message);
    } else {
      return responseBody(404,  'No omikuji result found!');
    }
  } catch (e) {
    return responseBody(e.statusCode, e.statusMessage);
  }
}

async function imageToSlack(slackText: string): Promise<lambda.APIGatewayProxyResult> {
  const animalSearchText = animalSearchableText(slackText);
  const imageUrl = await fetchAnimalImageUrl(animalSearchText);

  if (imageUrl === null) {
    return responseBody(404, 'Image not found!');
  }

  try {
    const res = await postImageToSlack(imageUrl);
    return responseBody(res.statusCode, res.message);
  } catch (e) {
    return responseBody(e.statusCode, e.statusMessage);
  }
}

function responseBody(statusCode: number, message: string): lambda.APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      'Content-type': 'text/plain',
    },
    body: message,
  };
}
