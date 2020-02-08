import * as lambda from 'aws-lambda';

import { randomCat } from '../actions/random-cat';
import { randomAnimal } from '../actions/random-animal';
import { drawAnimalOmikuji } from '../actions/animal-omikuji';
import { gembaCat } from '../actions/gemba-cat';

export async function handler(event: lambda.SQSEvent): Promise<void> {
  event.Records.forEach(async record => {
    const body = JSON.parse(record.body);
    const slackText: string = body.event.text || '';

    await randomCat(slackText);
    await randomAnimal(slackText);
    await drawAnimalOmikuji(slackText);
    await gembaCat(slackText);
  });
}
