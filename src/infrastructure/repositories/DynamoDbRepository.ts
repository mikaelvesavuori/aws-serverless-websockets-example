import {
  DynamoDBClient,
  DeleteItemCommand,
  PutItemCommand,
  ScanCommand
} from '@aws-sdk/client-dynamodb';

import { MissingEnvVarsError } from '../../application/errors/MissingEnvVarsError';

/**
 * @description Factory function to produce a repository instance.
 */
export function createNewDynamoDbRepository() {
  return new DynamoDbRepository();
}

/**
 * @description Takes care of abstracting interactions with a DynamoDB table.
 */
class DynamoDbRepository {
  dbClient: any;
  tableName: string;
  region: string;

  constructor() {
    this.region = process.env.REGION || '';
    this.tableName = process.env.TABLE_NAME || '';

    if (!this.region || !this.tableName)
      throw new MissingEnvVarsError(
        JSON.stringify([
          { key: 'REGION', value: process.env.REGION },
          { key: 'TABLE_NAME', value: process.env.TABLE_NAME }
        ])
      );

    this.dbClient = new DynamoDBClient({ region: this.region });
  }

  /**
   * @description Get all connection IDs from DynamoDB.
   */
  public async getAllConnections() {
    const command = {
      TableName: this.tableName,
      ProjectionExpression: 'connectionId'
    };

    if (process.env.NODE_ENV !== 'test') return await this.dbClient.send(new ScanCommand(command));
  }

  /**
   * @description Add a new connection ID.
   */
  public async addConnection(connectionId: string) {
    const command = {
      TableName: this.tableName,
      Item: {
        connectionId: {
          S: connectionId
        }
      }
    };

    if (process.env.NODE_ENV !== 'test') await this.dbClient.send(new PutItemCommand(command));
  }

  /**
   * @description Delete a connection ID from DynamoDB.
   */
  public async deleteConnection(connectionId: string) {
    const command = {
      TableName: this.tableName,
      Key: {
        connectionId: {
          S: connectionId
        }
      }
    };

    if (process.env.NODE_ENV !== 'test') await this.dbClient.send(new DeleteItemCommand(command));
  }
}
