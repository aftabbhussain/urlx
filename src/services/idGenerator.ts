import { encodeBase62 } from "../utils/base62";
import redisClient from "./redis";

class idGenerator{
    private currId : number = 0;
    private maxId : number = 0;
    private readonly BLOCK_SIZE : number = 500;
    private async fetchNewBlock(){
        const newMax = await redisClient.incrBy('global_id_counter', this.BLOCK_SIZE);
        this.maxId = newMax;
        this.currId = newMax - this.BLOCK_SIZE + 1;
        console.log(`IDs fetched from ${this.currId} to ${this.maxId} `);
    }
    public async getNextShortId() : Promise<string>{
        if(this.currId === 0 || this.currId > this.maxId){
            await this.fetchNewBlock();
        }
        const id = this.currId;
        this.currId++;
        return encodeBase62(id);
    }
}

//export a single instance of the object to be shared across the container
export const idService = new idGenerator();