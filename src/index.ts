import * as lambda from 'aws-lambda';

import { sendMessage } from './sqs/client';
import { isVerifyingEventApi } from './slack/types';
import { apiGatewayProxyResult } from './slack/api';

export async function handleSlackMessage(
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
