import * as lambda from 'aws-lambda';
import * as aws from 'aws-sdk';

import { animalSearchableText, animalRequested } from './Animal';
import { AnimalEnglish } from './Types';

const awsLambda = new aws.Lambda();

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

  if (animalRequested(slackText)) {
    const animal = animalSearchableText(slackText) as AnimalEnglish | null;
    if (animal) {
      randomAnimal(animal);

      console.log('Lambda function "randomAnimal" invoked!');
      return responseBody(200, 'Lambda function "randomAnimal" invoked!');
    }
  }

  if (slackText === 'おみくじ') {
    drawAnimalOmikuji();

    console.log('Lambda function "drawAnimalOmikuji" invoked!');
    return responseBody(200, 'Lambda function "drawAnimalOmikuji" invoked!');
  }

  return responseBody(200, 'Did nothing.');
}

function randomAnimal(animal: AnimalEnglish): void {
  const params = {
    FunctionName: 'randomAnimal',
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify({
      animalEnglish: animal,
    }),
  };

  awsLambda.invoke(params);
}

function drawAnimalOmikuji(): void {
  const params = {
    FunctionName: 'drawAnimalOmikuji',
    InvocationType: 'RequestResponse',
  };

  awsLambda.invoke(params);
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
