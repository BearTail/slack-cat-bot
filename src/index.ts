import * as rp from 'request-promise';
import * as Bluebird from 'bluebird';
import * as lambda from 'aws-lambda';

const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';

interface ResponseBody {
  statusCode: number;
  headers: any;
  body: string;
}

export async function handler(event: lambda.APIGatewayProxyEvent): Promise<ResponseBody> {
  const eventBody = JSON.parse(event.body || '');

  /*
   * slack の Event API を利用するために必要な認証
   * @see https://api.slack.com/events/url_verification
   */
  if (eventBody.type === 'url_verification') {
    return formatResponseBody(200, eventBody.challenge);
  }

  if (!isCatCalled(eventBody.event.text)) {
    return formatResponseBody(200, 'Cat is not called');
  }

  try {
    const res = await rp(CAT_API_URL);

    const response = JSON.parse(res);
    const catUrl = response[0].url;

    return postCatImageToSlack(catUrl);
  } catch(e) {
    return formatResponseBody(e.statusCode, e.statusMessage);
  }
}

function isCatCalled(message: string | null): boolean {
  return message === 'にゃんこ';
}

async function postCatImageToSlack(imageUrl: string): Promise<ResponseBody> {
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
      'Content-Type': 'application/jsn',
    },
    body: JSON.stringify(requestBody),
  };

  try {
    const res = await rp(options);
    return formatResponseBody(200, res);
  } catch (e) {
    return formatResponseBody(e.statusCode, e.statusMessage);
  }
}

function formatResponseBody(statusCode: number, message: string): ResponseBody {
  return {
    statusCode,
    headers: {
      'Content-type': 'text/plain',
    },
    body: message,
  };
}
