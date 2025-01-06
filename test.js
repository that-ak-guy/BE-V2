import { DynamoDBClient, BatchWriteItemCommand } from "@aws-sdk/client-dynamodb";
import { configDotenv } from "dotenv";
configDotenv()
// Create DynamoDB client
const client = new DynamoDBClient();

async function CreateTable() {
    const tablename = "Users"
    
}

async function batchInsert() {
    const tableName = "Vault";

    // Generate 20 dummy items
    const dummyItems = Array.from({ length: 20 }, (_, i) => ({
        PutRequest: {
            Item: {
                userid: { S: `user${i + 1}` }, // Partition Key
                website: { S: `website${i + 1}.com` }, // Sort Key
                category: { S: `category${(i % 3) + 1}` },
                createdAt: { S: new Date().toISOString() },
                email: { S: `user${i + 1}@example.com` },
                lastAt: { S: new Date().toISOString() },
                phone: { S: `123-456-78${i + 10}` },
                username: { S: `username${i + 1}` },
            },
        },
    }));

    // DynamoDB BatchWrite allows up to 25 items per batch
    const chunks = [];
    while (dummyItems.length) {
        chunks.push(dummyItems.splice(0, 25)); // Split into chunks of 25 items
    }

    try {
        for (const chunk of chunks) {
            const params = {
                RequestItems: {
                    [tableName]: chunk,
                },
            };
            const command = new BatchWriteItemCommand(params);
            const response = await client.send(command);
            console.log("BatchWrite Response:", response);
        }
        console.log("Batch Insert Completed!");
    } catch (error) {
        console.error("Error inserting items:", error);
    }
}

batchInsert();
