export interface ResponseBody {
  statusCode: number;
  message: string;
}

export interface VerificationBody {
  type: 'url_verification';
  challenge: string;
}
