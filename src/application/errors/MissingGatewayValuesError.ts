/**
 * @description Used when there are missing values that are needed
 * for the API Gateway client initialization.
 */
export class MissingGatewayValuesError extends Error {
  constructor() {
    super();
    this.name = 'MissingGatewayValuesError';
    const message = `Missing one or more of: "REGION" environment value, "domainName" (part of event "requestContext"), "stage" (part of event "requestContext")!`;
    this.message = message;

    console.error(message);
  }
}
