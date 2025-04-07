const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();
const port = 3000;

const uri = "mongodb+srv://jaemin:sjk%40931207@cluster0.3lo3bxi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

app.use(cors({
    origin: "http://127.0.0.1:5500"
}));

app.post("/data", async (req, res) => {
    await client.connect();
    const db = client.db("mydb");
    const data = db.collection("user").find().toArray();
    console.log("받은 데이터 : " + req.body);
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})