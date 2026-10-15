import "dotenv/config";
import "./db/database.js";
import { app } from "./app.js";

const PORT = Number(process.env.PORT) || 5001;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});