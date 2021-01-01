import * as lambda from 'aws-lambda';

import { sendMessage } from './clients/sqs';
import { apiGatewayProxyResult, isVerifyingEventApi } from './clients/slack';

export async function handleSlackMessage(
  event: lambda.APIGatewayProxyEvent,
  context: lambda.Context,
): Promise<lambda.APIGatewayProxyResult> {
  if (!event.body) {
    return apiGatewayProxyResult(400, 'No event body found!');
  }

  const eventBody = JSON.parse(event.body);

  // Event Api の初回のみの認証
  if (isVerifyingEventApi(eventBody)) {
    return apiGatewayProxyResult(200, eventBody.challenge);
  }

  // 3秒以内にレスポンスを返さないとタイムアウトと見なされ再度リクエストが来るためSQSを使う
  const result = await sendMessage(event.body, context, `AnimalSlackBotResponseQueue`);

  if (result) {
    return apiGatewayProxyResult(200, 'Process finished!');
  } else {
    return apiGatewayProxyResult(500, 'Process falied!');
  }
}
