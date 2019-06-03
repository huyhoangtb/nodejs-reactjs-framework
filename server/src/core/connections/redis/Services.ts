'use strict';

export default class RedisServices{
    redisClient: object;

  constructor(redisClient: any){
    this.redisClient = redisClient;
  }
}
