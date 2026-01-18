export async function loadRoomsFromDb(db) {
    return await db.collection("room").find({}).toArray();
}

export async function saveRoomToDb(db) {
    return await db.collection("room").insertOne(room);
}