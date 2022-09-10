/**
 * @description Used when the connection ID is missing.
 */
export class MissingConnectionIdError extends Error {
  constructor() {
    super();
    this.name = 'MissingConnectionIdError';
    const message = `Missing connection ID!`;
    this.message = message;

    console.error(message);
  }
}
