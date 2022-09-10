import { APIGatewayProxyResult } from 'aws-lambda';

/**
 * @description Default route. Called when a value is unexpected or unknown.
 */
export async function handler(): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 404,
    body: JSON.stringify('No event found')
  };
}
