import { MongoClient } from "mongodb";

export type MongoDbConnection = ReturnType<typeof setupMongoClient>;

export async function setupMongoClient() {
    const db_uri = process.env.MONGODB_CONNECTION_STRING;
    if (!db_uri)
        throw new Error(
            "Environment variable: MONGODB_CONNECTION_STRING not set",
        );
    const client = new MongoClient(db_uri);
    let databaseName: "production" | "development" | "demo";
    switch (process.env.NODE_ENV) {
        case "production":
            databaseName = "production";
            break;
        case "development":
            databaseName = "production";
            break;
        case "demo":
            databaseName = "demo";
            break;
        case "productionDev":
            databaseName = "production";
            break;
        default:
            databaseName = "development";
            break;
    }
    const db = client.db(databaseName);
    const users = db.collection("users");
    const events = db.collection("events");

    return {
        client,
        db,
        users,
        events,
    };
}
