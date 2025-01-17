import app from "./app.js";
import connectToDB from "./config/db.config.js";

const port = process.env.PORT || 8000;

app.listen(port, async () => {
    await connectToDB()
    console.log(`Server running on port ${port}`);        
});
