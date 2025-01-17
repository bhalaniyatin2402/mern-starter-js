import { WebSocketServer } from "ws";
import crypto from 'crypto';

export const clients = new Map();

export const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws, req) => {
  const clientId = crypto.randomUUID(); // Generate a unique ID for each connection
  clients.set(clientId, ws);
  ws.clientId = clientId;
  
  // Send the clientId to the client
  ws.send(JSON.stringify({ 
    type: "connection_id", 
    clientId: clientId 
  }));
  
  console.log("New client connected with ID:", clientId);

  ws.on("close", () => {
    clients.delete(clientId);
    console.log("Client disconnected:", clientId);
  });
});

// Attach WebSocket server to an existing HTTP server
wss.attach = (server) => {
  server.on("upgrade", (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req); // Emit `connection` event on the WebSocket server
    });
  });
}
