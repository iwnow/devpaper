import type { APIGatewayProxyEvent, APIGatewayProxyCallback, APIGatewayProxyResult, APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler = async function (
  event: APIGatewayProxyEvent,
  context: any,
  callback: APIGatewayProxyCallback
): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'This is from typescript' })
  };
};
