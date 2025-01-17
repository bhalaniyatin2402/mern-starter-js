import server from "./app.js";
import connectToDB from "./config/db.config.js";
import { wss } from "./config/websocket.js";

const port = process.env.PORT || 8000;

server.listen(port, async () => {
    await connectToDB()
    console.log(`Server running on port ${port}`);        
});

wss.attach(server)
