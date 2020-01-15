import * as requestPromise from 'request-promise';
import { APIGatewayEvent } from 'aws-lambda';

const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';

interface VerificationResponseBody {
  statusCode: number;
  headers: any;
  body: {
    challenge: string;
  };
}

export function handler(event: APIGatewayEvent): VerificationResponseBody | void {
  // slack の Event API を利用するために必要な認証
  if (event.body && event.body.type === 'url_verification') {
    return {
      statusCode: 200,
      headers: {
        'Content-type': 'application/json',
      },
      body: {
        challenge: event.body.challenge,
      },
    };
  }

  // TODO: どういう形式でくるかを確認する
  if (!isCatCalled(event.body && event.body.message)) {
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
