const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const crypto = require("crypto");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME || "mcp-portfolio-data";

exports.handler = async (event) => {
  console.log("Event:", JSON.stringify(event));
  
  const method = event.requestContext?.http?.method || event.httpMethod;
  const path = event.requestContext?.http?.path || event.path || "/";

  try {
    if (method === "POST" && path.includes("/contact")) {
      return await handleContactSubmit(event);
    } else if (method === "GET" && path.includes("/contacts")) {
      return await handleListContacts(event);
    }
    return jsonResponse(404, { error: "Not found" });
  } catch (err) {
    console.error("Error:", err);
    return jsonResponse(500, { error: "Internal server error" });
  }
};

async function handleContactSubmit(event) {
  const body = JSON.parse(event.body || "{}");
  const { name, email, topic, message } = body;

  if (!name || !email || !message) {
    return jsonResponse(400, { error: "name, email, and message are required" });
  }

  const item = {
    PK: `CONTACT#${crypto.randomUUID()}`,
    SK: new Date().toISOString(),
    name,
    email,
    topic: topic || "General",
    message,
    createdAt: new Date().toISOString(),
  };

  await docClient.send(new PutCommand({
    TableName: TABLE_NAME,
    Item: item,
  }));

  return jsonResponse(201, { success: true, message: "Contact saved" });
}

async function handleListContacts(event) {
  const result = await docClient.send(new ScanCommand({
    TableName: TABLE_NAME,
    FilterExpression: "begins_with(PK, :prefix)",
    ExpressionAttributeValues: { ":prefix": "CONTACT#" },
    Limit: 50,
  }));

  return jsonResponse(200, { contacts: result.Items });
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify(body),
  };
}
