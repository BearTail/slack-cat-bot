import * as lambda from 'aws-lambda';
import {
  SQSClient,
  SendMessageCommand,
  SendMessageOutput,
  SendMessageInput
} from "@aws-sdk/client-sqs-node";

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
    console.log(`Sqs result: ${result}`);

    return result;
  } catch (e) {
    console.log(`Sqs error: ${e}`);
  }
}
