import { MongoClient } from "mongodb";

const uri = "mongodb+srv://jaemin:hansol@cluster0.3lo3bxi.mongodb.net/game?retryWrites=true&w=majority&appName=Cluster0";

let client;
let dbName = "game";

export async function connectMongo() {
    if (db) return db;

    const client = new MongoClient(uri, {
      tls: true,
      tlsAllowInvalidCertificates: true,
      serverSelectionTimeoutMS: 10000,
    });
    await client.connect();
    const db = client.db(dbName);

    return db;
}

export function getDb() {
  if (!db) throw new Error("MongoDB not connected");
  return db;
}