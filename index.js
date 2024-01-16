const express = require("express");
const router  = require("./routes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    
}));

app.use("/api",router);
app.use("/", (req, res) => {
    return res.send("Hello World");
})
app.use('/public/uploads', express.static('public/uploads'));



app.listen(5000, () => {
    console.log("Server running on port 3000");
})