import {createClient} from "redis"
const redisClient = createClient({ url: 'redis://redis:6379' });
redisClient.on("error", (err) => {
    console.error("Error connecting with redis: ", err);
});
redisClient.on("connect", () => {
    console.log("Redis successfully connected");
});

//bloom filter init
export const initBloomFilter = async () => {
    try{
        await redisClient.bf.reserve('shortids', 0.01, 1000000);
        console.log('Bloom filter initiated successfully');
    }
    catch(err : any){
        if(err.message.includes('ERR item exists')){
            console.log('Bloom filter ready');
        }
        else{
            console.error('Bloom filter init failed ', err);
        }
    }
}

//defining a function that will connect to redis when called
export const connectRedis = async () => {
    await redisClient.connect();
}
export default redisClient;