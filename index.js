const { MongoClient, ServerApiVersion } = require('mongodb');

// استبدل <password> بكلمة السر الخاصة بك و<your-database-name> باسم قاعدة البيانات التي تريد استخدامها
const uri = "mongodb+srv://investment:<password>@investment.tbwcmg4.mongodb.net/?retryWrites=true&w=majority&appName=investment";

// إنشاء عميل MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // الاتصال بالخادم
    await client.connect();
    console.log("Connected to MongoDB!");

    // اختيار قاعدة البيانات
    const db = client.db("myDatabase");

    // اختيار أو إنشاء مجموعة (Collection)
    const collection = db.collection("myCollection");

    // إدخال مستند جديد في المجموعة
    const document = { name: "Sample Document", value: 123 };
    const result = await collection.insertOne(document);

    console.log(`Document inserted with _id: ${result.insertedId}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // إغلاق الاتصال
    await client.close();
  }
}

run().catch(console.error);
