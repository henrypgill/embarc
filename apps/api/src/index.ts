import { NestFactory, PartialGraphHost } from "@nestjs/core";
import * as fs from "fs";
import { AppModule } from "./app/app.module";
import { setupMongoClient } from "./core/mongoSetup";

async function connectToDatabase() {
    try {
        const db = await setupMongoClient();
        console.log("connecting to database");
        await db.client.connect();
        console.log("successfully connected to database");
        return db;
    } catch (error) {
        console.error("failed to connect to database", error);
        process.exit(1);
    }
}

async function bootstrap() {
    try {
        const port = process.env.PORT || 80;
        console.log("Starting up NestJS server on port: " + port);
        const app = await NestFactory.create(AppModule, {
            // httpsOptions,
            snapshot: true,
            abortOnError: false,
        });
        await app.listen(port);
        console.log("App listening on port: " + port);
    } catch (error) {
        fs.writeFileSync("graph.json", PartialGraphHost.toString() ?? "");
        console.error("failed to start server", error);
        process.exit(1);
    }
}

console.time("Server startup time");
console.log(
    "Starting up server in mode: ",
    process.env.NODE_ENV ?? "no mode selected",
);

export const database = await connectToDatabase();

await bootstrap();
console.log("Server started up successfully.");
console.timeEnd("Server startup time");
