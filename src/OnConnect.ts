import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { MissingConnectionIdError } from './application/errors/MissingConnectionIdError';

import { createNewDynamoDbRepository } from './infrastructure/repositories/DynamoDbRepository';

/**
 * @description Runs on the event of connecting to the WebSocket connection.
 */
export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const connectionId = event.requestContext.connectionId;
    if (!connectionId) throw new MissingConnectionIdError();

    const db = createNewDynamoDbRepository();
    await db.addConnection(connectionId);

    return {
      statusCode: 200,
      body: JSON.stringify('Success')
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      body: JSON.stringify(error.message)
    };
  }
}
