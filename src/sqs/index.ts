import * as lambda from 'aws-lambda';

import { animalSearchableText, animalRequested } from '../Animal';
import { randomCatRequested } from '../Cat';
import { AnimalEnglish } from '../Types';

import { drawAnimalOmikuji, randomAnimal, randomCat } from '../actions';

export async function handler(event: lambda.SQSEvent): Promise<void> {
  event.Records.forEach(record => {
    const body = JSON.parse(record.body);
    dealWithEventBody(body);
  });
}

async function dealWithEventBody(body: any): Promise<void> {
  const slackText: string = body.event.text || '';

  if (randomCatRequested(slackText)) {
    await randomCat();
    return;
  }

  if (animalRequested(slackText)) {
    const animal = animalSearchableText(slackText) as AnimalEnglish | null;
    if (animal) {
      await randomAnimal(animal);
      return;
    }
  }

  if (slackText === 'おみくじ') {
    await drawAnimalOmikuji();
    return;
  }
}
