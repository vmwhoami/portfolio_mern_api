const app = require('./app');
const MongoClient = require('mongodb').MongoClient;
const connectionStr = require('./config/keys').mongoURL;

async function createListing(client, newListing) {
  const result = await client.db("Portfolio").collection("items").insertOne(newListing);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function main() {
  const client = new MongoClient(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    await createListing(client, { name: "Hello world", technologies: ["New Item", "Another new item"] })
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
main()

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${3000}`);
});
