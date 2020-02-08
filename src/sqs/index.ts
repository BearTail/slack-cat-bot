import * as lambda from 'aws-lambda';

import { randomCat } from '../actions/random-cat';
import { randomAnimal } from '../actions/random-animal';
import { drawAnimalOmikuji } from '../actions/animal-omikuji';

export async function handler(event: lambda.SQSEvent): Promise<void> {
  event.Records.forEach(record => {
    const body = JSON.parse(record.body);
    dealWithEventBody(body);
  });
}

async function dealWithEventBody(body: any): Promise<void> {
  const slackText: string = body.event.text || '';

  await randomCat(slackText);
  await randomAnimal(slackText);
  await drawAnimalOmikuji(slackText);
}
