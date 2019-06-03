'use strict';
import {ConnectedSocket, MessageBody, OnConnect, OnDisconnect, OnMessage, SocketController} from "socket-controllers";

@SocketController('/fasdfdasfsad')
export class MessageController {

    @OnConnect()
    connection(@ConnectedSocket() socket: any) {
        console.log("client connected");
    }

    @OnDisconnect()
    disconnect(@ConnectedSocket() socket: any) {
        console.log("client disconnected");
    }

    @OnMessage("USER_MESSAGES")
    save(@ConnectedSocket() socket: any, @MessageBody() message: any) {
        console.log("received message:", message);
        console.log("setting id to the message and sending it back to the client");
        message.id = 1;
        socket.emit("USER_MESSAGES", {...message, server: true});
    }

}
