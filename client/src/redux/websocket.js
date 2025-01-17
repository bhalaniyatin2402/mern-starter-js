import { authApi } from "./services/auth.services";
import { setWsClientId } from "./slices/auth.slice";

// Singleton WebSocket instance
let socket = null;

// Define mapping of message types to API configurations
const MESSAGE_TO_API_MAPPING = {
    userlist: {
        api: authApi,
        endpoint: "getUsersList"
    }
};

export const setupWebSocket = (dispatch) => {
    // If socket already exists and is open, return existing instance
    if (socket && socket.readyState === WebSocket.OPEN) {
        return socket;
    }

    // Close existing socket if it exists
    if (socket) {
        socket.close();
    }

    socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data)

        if(message.type === "connection_id") {
            dispatch(setWsClientId(message.clientId));
        }

        if (message.type && MESSAGE_TO_API_MAPPING[message.type]) {
            console.log(message.type)
            const { api, endpoint } = MESSAGE_TO_API_MAPPING[message.type];
            dispatch(api.endpoints[endpoint].initiate()).refetch();
        }
    }

    socket.onopen = () => {
        console.log("WebSocket connected")
    }

    socket.onclose = () => {
        console.log("WebSocket disconnected")
        socket = null;  // Reset socket instance when closed
        dispatch(setWsClientId(null));
    }

    return socket;
}

// Function to close WebSocket connection
export const closeWebSocket = () => {
    if (socket) {
        socket.close();
    }
}
