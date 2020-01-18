import * as rp from 'request-promise';
import { SlackResponseBody } from './Types';

const INCOMING_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

/*
 * @see https://api.slack.com/messaging/webhooks
 * @see https://beartail.slack.com/services/BSMC6AJ9E
 */
export async function postImageToSlack(imageUrl: string): Promise<SlackResponseBody> {
  try {
    const options = requestOptions(imageUrl);
    const res = await rp(options);

    return {
      statusCode: 200,
      message: res,
    };
  } catch (e) {
    return {
      statusCode: e.statusCode,
      message: e.statusMessage,
    };
  }
}

function requestOptions(imageUrl: string): rp.OptionsWithUrl {
  const requestBody = {
    text: '',
    attachments: [{
      image_url: imageUrl,
    }],
  };

  return {
    method: 'POST',
    url: INCOMING_WEBHOOK_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  };
}
