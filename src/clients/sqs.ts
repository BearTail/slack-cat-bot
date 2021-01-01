import * as lambda from 'aws-lambda';
import { randomCat } from '../actions/random-cat';
import { randomAnimal } from '../actions/random-animal';
import { drawAnimalOmikuji } from '../actions/animal-omikuji';
import { gembaCat } from '../actions/gemba-cat';
import {
  SQSClient,
  SendMessageCommand,
  SendMessageOutput,
  SendMessageInput
} from '@aws-sdk/client-sqs-node';

const REGION = process.env.REGION;
const SQS = new SQSClient({ region: REGION });

export async function sendMessage(
  body: string,
  context: lambda.Context,
  queueName: string,
): Promise<SendMessageOutput | undefined> {
  const accountId = context.invokedFunctionArn.split(':')[4];
  const queueUrl = `https://sqs.${REGION}.amazonaws.com/${accountId}/${queueName}`;
  const params: SendMessageInput = {
    MessageBody: body,
    QueueUrl: queueUrl,
  };
  const sendMessageCommand = new SendMessageCommand(params);

  try {
    const result = await SQS.send(sendMessageCommand);
    console.log(`Sqs result: ${JSON.stringify(result)}`);

    return result;
  } catch (e) {
    console.log(`Sqs error: ${e}`);
  }
}

export async function handler(event: lambda.SQSEvent): Promise<void> {
  await Promise.all(event.Records.map(async record => {
    const body = JSON.parse(record.body);
    const slackText: string = body.event.text || '';

    await randomCat(slackText);
    await randomAnimal(slackText);
    await drawAnimalOmikuji(slackText);
    await gembaCat(slackText);
  }));
}
