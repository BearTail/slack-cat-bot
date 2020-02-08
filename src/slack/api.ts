import * as rp from 'request-promise';
import { ResponseBody } from './types';

export async function postImage(imageUrl: string, text?: string): Promise<ResponseBody> {
  try {
    const options = optionsWithAttachment(imageUrl, text);
    const res = await rp(options);

    console.log(`Slack api result: ${res}`);

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

function optionsWithAttachment(imageUrl: string, text: string = ''): rp.OptionsWithUrl {
  const body = {
    text,
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
    body: JSON.stringify(body),
  };
}
