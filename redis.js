const redis = require("redis");

// Environment variables for cache
const cacheHostName = "hamisha.redis.cache.windows.net";
const cachePassword = "flIUzq7QbQkhVFfjw4ra85Qb4pfiavBSYAzCaJiajBo=";

if(!cacheHostName) throw Error("AZURE_CACHE_FOR_REDIS_HOST_NAME is empty")
if(!cachePassword) throw Error("AZURE_CACHE_FOR_REDIS_ACCESS_KEY is empty")

async function testCache() {

    // Connection configuration
    const cacheConnection = redis.createClient({
        // redis for TLS
        url: "rediss://:k4tdXAAbu0ImNbI88uYBbq1fWCXTWW9khAzCaDv0lOs=@hamisha2.redis.cache.windows.net:6380/0"
    });

    // Connect to Redis
    await cacheConnection.connect();

    // PING command
    console.log("\nCache command: PING");
    console.log("Cache response : " + await cacheConnection.ping());

    // GET
    console.log("\nCache command: GET Message");
    console.log("Cache response : " + await cacheConnection.get("Message"));

    // SET
    console.log("\nCache command: SET Message");
    console.log("Cache response : " + await cacheConnection.set("Message",
        "Hello! The cache is working from Node.js!"));

    // GET again
    console.log("\nCache command: GET Message");
    console.log("Cache response : " + await cacheConnection.get("Message"));

    // Client list, useful to see if connection list is growing...
    console.log("\nCache command: CLIENT LIST");
    console.log("Cache response : " + await cacheConnection.sendCommand(["CLIENT", "LIST"]));

    // Disconnect
    cacheConnection.disconnect()

    return "Done"
}

testCache().then((result) => console.log(result)).catch(ex => console.log(ex));