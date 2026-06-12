const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const s3Client = new S3Client({});

const TABLE_NAME = process.env.TABLE_NAME;
const BACKUP_BUCKET = process.env.BACKUP_BUCKET;

exports.handler = async () => {
  console.log(`Starting backup: ${TABLE_NAME} → ${BACKUP_BUCKET}`);

  try {
    // Scan entire table
    let items = [];
    let lastKey;
    do {
      const result = await docClient.send(new ScanCommand({
        TableName: TABLE_NAME,
        ExclusiveStartKey: lastKey,
        Limit: 100,
      }));
      items = items.concat(result.Items || []);
      lastKey = result.LastEvaluatedKey;
    } while (lastKey);

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const key = `dynamodb-backup/${TABLE_NAME}/${timestamp}.json`;

    await s3Client.send(new PutObjectCommand({
      Bucket: BACKUP_BUCKET,
      Key: key,
      Body: JSON.stringify(items, null, 2),
      ContentType: "application/json",
      ServerSideEncryption: "AES256",
    }));

    console.log(`Backup complete: ${items.length} items → s3://${BACKUP_BUCKET}/${key}`);
    return { success: true, itemCount: items.length, key };
  } catch (err) {
    console.error("Backup failed:", err);
    throw err;
  }
};
