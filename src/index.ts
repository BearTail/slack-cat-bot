import * as requestPromise from 'request-promise';
import { APIGatewayEvent } from 'aws-lambda';

const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';

interface VerificationResponseBody {
  statusCode: number;
  headers: any;
  body: string;
}

export function handler(event: APIGatewayEvent, context, callback): VerificationResponseBody | void {
  const eventBody = JSON.parse(event.body);
  console.log(eventBody);

  // slack の Event API を利用するために必要な認証
  if (eventBody.type === 'url_verification') {
    return callback(null, verifySlackEventApi(eventBody.challenge));
  }

  if (!isCatCalled(eventBody.event.text)) {
    return;
  }

  requestPromise(CAT_API_URL)
    .then(res => {
      const response = JSON.parse(res);
      const catUrl = response[0].url;

      postCatImageToSlack(catUrl);
      return;
    })
    .catch(error => {
      // TODO: エラーハンドリングを追加する
      return;
    });
}

// @see https://api.slack.com/events/url_verification
function verifySlackEventApi(challenge: string): VerificationResponseBody {
  return {
    statusCode: 200,
    headers: {
      'Content-type': 'text/plain',
    },
    body: challenge,
  };
}

function isCatCalled(message: string | null): boolean {
  return (message ?? '').includes('にゃんこ');
}

function postCatImageToSlack(imageUrl: string): void {
  const requestBody = {
    text: "にゃーん",
    attachments: [{
      image_url: imageUrl,
    }],
  };

  const options = {
    method: 'POST',
    url: 'https://hooks.slack.com/services/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',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  };

  requestPromise(options)
    .then(res => {
      console.log('Succeeded to post a cat image to slack!');
    })
    .catch(error => {
      console.log('Failed to post a cat image to slack...');
    });
}
