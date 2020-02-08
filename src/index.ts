import * as lambda from 'aws-lambda';
import { sendMessage } from './sqs/client';

import { isVerifyingEventApi } from './slack/types';
import { apiGatewayProxyResult } from './slack/api';

import { animalSearchableText, animalRequested } from './Animal';
import { randomCatRequested } from './Cat';
import { AnimalEnglish } from './Types';

import { drawAnimalOmikuji, randomAnimal, randomCat } from './Actions';

export async function catchSlackMessage(
  event: lambda.APIGatewayProxyEvent,
  context: lambda.Context,
): Promise<lambda.APIGatewayProxyResult> {
  if (!event.body) {
    return apiGatewayProxyResult(400, 'No event body found!');
  }

  const eventBody = JSON.parse(event.body || '');

  if (isVerifyingEventApi(eventBody)) {
    return apiGatewayProxyResult(200, eventBody.challenge);
  }

  const result = await sendMessage(event.body, context, `AnimalSlackBotResponseQueue`);

  if (result) {
    return apiGatewayProxyResult(200, 'Process finished.');
  } else {
    return apiGatewayProxyResult(500, 'Process falied.');
  }
}

export async function handler(event: lambda.SQSEvent): Promise<lambda.APIGatewayProxyResult> {
  const body = JSON.parse(event.Records[0].body);
  const slackText: string | null = body.event.text;

  if (!slackText) {
    return apiGatewayProxyResult(200, 'Did nothing.');
  }

  if (randomCatRequested(slackText)) {
    await randomCat();

    return apiGatewayProxyResult(200, 'Random cat posted!');
  }

  if (animalRequested(slackText)) {
    const animal = animalSearchableText(slackText) as AnimalEnglish | null;
    if (animal) {
      await randomAnimal(animal);

      return apiGatewayProxyResult(200, 'Random animal posted!');
    }
  }

  if (slackText === 'おみくじ') {
    await drawAnimalOmikuji();

    return apiGatewayProxyResult(200, 'Omikuji posted');
  }

  return apiGatewayProxyResult(200, 'Did nothing.');
}
