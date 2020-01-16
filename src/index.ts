import * as requestPromise from 'request-promise';
import { APIGatewayEvent } from 'aws-lambda';

const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';

interface VerificationResponseBody {
  statusCode: number;
  headers: any;
  body: string;
}

export function handler(event: APIGatewayEvent, context, callback): void {
  const eventBody = JSON.parse(event.body);

  // slack の Event API を利用するために必要な認証
  if (eventBody.type === 'url_verification') {
    return callback(null, verifySlackEventApi(eventBody.challenge));
  }

  if (!isCatCalled(eventBody.event.text)) {
    return callback(null, {
      statusCode: 200,
      headers: {
        'Content-type': 'text/plain',
      },
      body: 'Cat is not called',
    });
  }

  requestPromise(CAT_API_URL)
    .then(res => {
      console.log(eventBody);

      const response = JSON.parse(res);
      const catUrl = response[0].url;

      postCatImageToSlack(catUrl);

      return callback(null, {
        statusCode: 200,
        headers: {
          'Content-type': 'text/plain',
        },
        body: 'Cat is posted!',
      });
    })
    .catch(error => {
      return callback(null, {
        statusCode: 400,
        headers: {
          'Content-type': 'text/plain',
        },
        body: 'Failed to post cat!',
      });
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
  return message === 'にゃんこ';
}

function postCatImageToSlack(imageUrl: string): void {
  const requestBody = {
    text: '',
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
