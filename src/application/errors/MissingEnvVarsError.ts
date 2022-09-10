/**
 * @description Used when the connection ID is missing.
 */
export class MissingEnvVarsError extends Error {
  constructor(message: string) {
    super();
    this.name = 'MissingEnvVarsError';
    this.message = message;

    console.error(message);
  }
}
