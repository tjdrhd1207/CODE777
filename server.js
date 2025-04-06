const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const port = 3000;

const uri = "mongodb+srv://jaemin:sjk@931207@cluster0.3lo3bxi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

app.get("/data", async (req, res) => {
    await client.connect();
    const db = client.db("mydb");
    const data = db.collection("user").find().toArray();
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})