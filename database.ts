import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

const client = new MongoClient();
client.connectWithUri(
  "mongodb+srv://arnold:Rodaxboy92@arnold-0wgw5.mongodb.net/arnold?retryWrites=true&w=majority",
);
// mongodb://127.0.0.1:27017
const db = client.database("smart-brains");

export default db;
// const users = db.collection("users");

// users.insertOne({ name: "snake" });
