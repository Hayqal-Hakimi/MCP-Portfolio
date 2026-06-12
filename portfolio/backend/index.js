const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { randomUUID } = require("crypto");

// Initialize clients
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const snsClient = new SNSClient({});

const TABLE_NAME = process.env.TABLE_NAME || "DevOpsPortfolioContact";
const SNS_TOPIC_ARN = process.env.SNS_TOPIC_ARN;

// Helper to return response with CORS
const createResponse = (statusCode, body, headers = {}) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      ...headers
    },
    body: JSON.stringify(body)
  };
};

exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  // Handle preflight OPTIONS request
  const httpMethod = event.requestContext?.http?.method || event.httpMethod || "";
  if (httpMethod === "OPTIONS") {
    return createResponse(200, { message: "CORS preflight successful" });
  }

  // Expecting POST
  if (httpMethod !== "POST") {
    return createResponse(405, { error: "Method Not Allowed" });
  }

  try {
    let body = event.body;
    
    // Parse body if it's stringified
    if (typeof body === "string") {
      if (event.isBase64Encoded) {
        body = Buffer.from(body, "base64").toString("utf8");
      }
      body = JSON.parse(body);
    }

    if (!body) {
      return createResponse(400, { error: "Missing payload body" });
    }

    const { name, email, topic, message } = body;

    // Validate inputs
    if (!name || !name.trim()) {
      return createResponse(400, { error: "Alias (name) is required" });
    }
    if (!email || !email.trim()) {
      return createResponse(400, { error: "Comm Link (email) is required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return createResponse(400, { error: "Valid return address is required" });
    }
    if (!message || !message.trim()) {
      return createResponse(400, { error: "Payload (message) is required" });
    }

    const uuid = randomUUID();
    const timestamp = new Date().toISOString();

    const item = {
      PK: `CONTACT#${uuid}`,
      SK: timestamp,
      name: name.trim(),
      email: email.trim(),
      topic: topic || "consulting",
      message: message.trim()
    };

    // Save to DynamoDB
    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item
      })
    );

    console.log("Successfully saved item to DynamoDB:", item);

    // Send email notification via SNS
    if (SNS_TOPIC_ARN) {
      try {
        await snsClient.send(new PublishCommand({
          TopicArn: SNS_TOPIC_ARN,
          Subject: `Portfolio Contact: ${name.trim()} — ${topic || 'consulting'}`,
          Message: `New contact form submission:\n\nName: ${name.trim()}\nEmail: ${email.trim()}\nTopic: ${topic || 'consulting'}\nMessage: ${message.trim()}\n\nTime: ${timestamp}\nID: ${uuid}`,
        }));
        console.log("SNS notification sent");
      } catch (snsErr) {
        console.error("SNS notification failed:", snsErr);
      }
    }

    return createResponse(201, { success: true });

  } catch (error) {
    console.error("Error processing contact submission:", error);
    return createResponse(500, { error: "Internal Server Error", details: error.message });
  }
};
