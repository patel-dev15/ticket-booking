import dotenv from "dotenv";
import app from "./module/App.js";
dotenv.config();

const PORT = process.env.PORT || 6592;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});