import {
    websocketConnected,
    websocketDisconnected,
    websocketMessageReceived,
    websocketError
    } from "./socketSlice";

let socket = null;
const websocketMiddleware = (store) => (next) => (action) => {
    if (action.type === "websocket/connect") {
        // if (socket !== null) {
        //     socket.close();
        // }
        console.log("middle ware printing")
        console.log(action.payload)
        console.log(socket)

        socket = new WebSocket(action.payload);

        socket.onopen = () => {
            console.log("WebSocket connected");
            store.dispatch(websocketConnected());
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            store.dispatch(websocketMessageReceived(message));
        };

        socket.onclose = () => {
            console.log("WebSocket disconnected");
            store.dispatch(websocketDisconnected());
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
            store.dispatch(websocketError(error));
        };
    }
    if (action.type === "websocket/send") {
        if (socket) {
            socket.send(JSON.stringify(action.payload));
        }
    }

    return next(action);
}

export default websocketMiddleware;