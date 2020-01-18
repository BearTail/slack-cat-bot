import * as lambda from 'aws-lambda';
import { animalSearchableText } from './Animal';
import { fetchAnimalImageUrl } from './FlickerApi';
import { postImageToSlack } from './SlackApi';

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

  const animalSearchText = animalSearchableText(eventBody.event.text)

  if (!animalSearchText) {
    return responseBody(200, 'Not going to search image!');
  }

  const imageUrl = await fetchAnimalImageUrl(animalSearchText);

  if (imageUrl === null) {
    return responseBody(404, 'Image not found!');
  }

  try {
    const res = await postImageToSlack(imageUrl);
    return responseBody(res.statusCode, res.message);
  } catch(e) {
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
