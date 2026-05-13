import {createClient} from "redis"
const redisClient = createClient();
redisClient.on("error", (err) => {
    console.error("Error connecting with redis: ", err);
});
redisClient.on("connect", () => {
    console.log("Redis successfully connected");
});

//defining a function that will connect to redis when called
export const connectRedis = async () => {
    await redisClient.connect();
}
export default redisClient;