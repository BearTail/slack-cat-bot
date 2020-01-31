import * as lambda from 'aws-lambda';

import { animalSearchableText, animalRequested } from './Animal';
import { randomCatRequested } from './Cat';
import { AnimalEnglish } from './Types';

import { drawAnimalOmikuji, randomAnimal, randomCat } from './Actions';

export async function handler(event: lambda.APIGatewayProxyEvent): Promise<lambda.APIGatewayProxyResult> {
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

  const slackText: string | null = eventBody.event.text;

  if (!slackText) {
    return responseBody(200, 'Did nothing.');
  }

  if (randomCatRequested(slackText)) {
    await randomCat();

    return responseBody(200, 'Random cat posted!');
  }

  if (animalRequested(slackText)) {
    const animal = animalSearchableText(slackText) as AnimalEnglish | null;
    if (animal) {
      await randomAnimal(animal);

      return responseBody(200, 'Random animal posted!');
    }
  }

  if (slackText === 'おみくじ') {
    await drawAnimalOmikuji();

    return responseBody(200, 'Omikuji posted');
  }

  return responseBody(200, 'Did nothing.');
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
