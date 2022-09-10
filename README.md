# Example: Serverless WebSockets on AWS

_Solution heavily inspired by the article [Node.js and Websockets on AWS](https://betterprogramming.pub/node-js-websockets-on-aws-2fba33bef9be) by Eric Yang. Thanks for your work!_

This solution uses API Gateway, Lambda, and DynamoDB to enable you to run WebSockets connections.

## Prerequisites

- You need to have an AWS account and have valid credentials in your environment.
- Recent version (16+) of Node and NPM/Yarn should be installed.

## Instructions

- Install dependencies with `npm install` or `yarn install`
- Update `custom.config.awsAccountNumber` in `serverless.yml` to your AWS account value
- Deploy the stack with `npm run deploy` or `yarn deploy`
- Update your `ws` script in `package.json` with the unique endpoint and region for your deployment
- Run `npm run ws` or `yarn ws` to start a connection

When connected, send:

```shell
{ "action": "sendMessage", "data": "Hello World!" }
```

You should get `Hello World!` back as a response.

**Note:** The `action` needs to be the same as your function, so if this changes ensure the above command also gets updated.
