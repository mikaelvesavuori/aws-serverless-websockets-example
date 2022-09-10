import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand
} from '@aws-sdk/client-apigatewaymanagementapi';
import { MissingGatewayValuesError } from '../errors/MissingGatewayValuesError';

/**
 * @description Factory function to output a new `MessageEmitter` instance.
 */
export function createNewMessageEmitter() {
  return new MessageEmitter();
}

/**
 * @description The `MessageEmitter` encapsulates anything to
 * do with handling messages that go to our WebSockets connection.
 */
class MessageEmitter {
  /**
   * @description Send message to all connected parties.
   */
  public async sendMessageToAllConnected(db: any, event: any) {
    const connections = await db.getAllConnections();
    const items = connections['Items'];

    if (items && items.length > 0) {
      const promises = items.map(async (item: any) => {
        await this.send(event, item['connectionId']['S']);
      });

      await Promise.all(promises);
    } else console.log('No connection items available, skipping sending...');
  }

  /**
   * @description Handle sending an individual message.
   * @private
   */
  private async send(event: any, connectionId: string) {
    const body = JSON.parse(event.body);
    const data = typeof body.data === 'object' ? JSON.stringify(body.data) : body.data;

    const command = new PostToConnectionCommand({
      ConnectionId: connectionId,
      Data: data
    });

    const region = process.env.REGION;
    const domainName = event.requestContext.domainName;
    const stage = event.requestContext.stage;

    if (!region || !domainName || !stage) throw new MissingGatewayValuesError();

    const apiGwClient = new ApiGatewayManagementApiClient({
      region,
      endpoint: `https://${domainName}/${stage}`
    });

    await apiGwClient.send(command);
  }
}
