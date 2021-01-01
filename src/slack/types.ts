export interface ResponseBody {
  statusCode: number;
  message: string;
}

export interface VerificationBody {
  type: 'url_verification';
  challenge: string;
}

/*
 * slack の Event API を利用するために初回のみ必要となる認証かどうかを判定する
 * @see https://api.slack.com/events/url_verification
 */
export function isVerifyingEventApi(eventBody: any): eventBody is VerificationBody {
  return eventBody.type === 'url_verification' &&
    typeof eventBody.challenge === 'string';
}
