import * as lambda from 'aws-lambda';

import { animalSearchableText, animalRequested } from '../Animal';
import { randomCatRequested } from '../Cat';
import { AnimalEnglish } from '../Types';

import { drawAnimalOmikuji, randomAnimal, randomCat } from '../Actions';

export async function handler(event: lambda.SQSEvent): Promise<undefined> {
  const body = JSON.parse(event.Records[0].body);
  const slackText: string | null = body.event.text;

  if (!slackText) {
    return;
  }

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
