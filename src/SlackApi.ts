import * as rp from 'request-promise';
import { SlackResponseBody } from './Types';

/*
 * @see https://api.slack.com/messaging/webhooks
 * @see https://beartail.slack.com/services/BSMC6AJ9E
 */
export async function postImageToSlack(imageUrl: string, text?: string): Promise<SlackResponseBody> {
  try {
    const options = postRequestOptions(imageUrl, text);
    const res = await rp(options);

    return {
      statusCode: 200,
      message: res,
    };
  } catch (e) {
    console.log(`Error occurred in slack api: ${e}`);

    return {
      statusCode: e.statusCode,
      message: e.statusMessage,
    };
  }
}

function postRequestOptions(imageUrl: string, text?: string): rp.OptionsWithUrl {
  const requestBody = {
    text: text ? text : '',
    attachments: [{
      image_url: imageUrl,
    }],
  };

  return {
    method: 'POST',
    url: process.env.SKACK_INCOMING_WEBHOOK_URL ?? '',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  };
}
