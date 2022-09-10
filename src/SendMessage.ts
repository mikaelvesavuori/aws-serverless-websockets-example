import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { createNewDynamoDbRepository } from './infrastructure/repositories/DynamoDbRepository';
import { createNewMessageEmitter } from './application/service/MessageEmitter';

/**
 * @description Send message over WebSockets connection.
 */
export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const db = createNewDynamoDbRepository();
    const emitter = createNewMessageEmitter();

    await emitter.sendMessageToAllConnected(db, event);

    return {
      statusCode: 200,
      body: JSON.stringify('')
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      body: JSON.stringify(error.message)
    };
  }
}
