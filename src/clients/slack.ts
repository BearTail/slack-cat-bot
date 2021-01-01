import * as rp from 'request-promise';
import * as lambda from 'aws-lambda';
import { ResponseBody, VerificationBody } from '../types/Slack';

/*
 * slack の Event API を利用するために初回のみ必要となる認証かどうかを判定する
 * @see https://api.slack.com/events/url_verification
 */
export function isVerifyingEventApi(eventBody: any): eventBody is VerificationBody {
  return eventBody.type === 'url_verification' &&
    typeof eventBody.challenge === 'string';
}

export async function postImages(imageUrls: string[], text?: string, imageTitle?: string): Promise<ResponseBody> {
  try {
    const options = optionsWithAttachments(text, imageUrls, imageTitle);
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

export function apiGatewayProxyResult(
  statusCode: number,
  message: string,
): lambda.APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      'Content-type': 'text/plain',
      'X-Slack-No-Retry': 1,
    },
    body: message,
  };
}

function optionsWithAttachments(text: string = '', imageUrls: string[], imageTitle: string = ''): rp.OptionsWithUrl {
  const body = {
    text,
    attachments: imageUrls.map((url) => { return { image_url: url }; }),
  };
  // todo ちゃんとハンドリングする
  const url = (imageTitle === '@genbaneko_bot' ? process.env.GEMBA_CAT_SKACK_INCOMING_WEBHOOK_URL : process.env.SKACK_INCOMING_WEBHOOK_URL) ?? '';

  return {
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
}
