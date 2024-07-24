const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


const corsOptions = {
    origin: "https://teammember-3.onrender.com", // 替换为你的前端应用的实际域名
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // 如果需要处理凭证
    optionsSuccessStatus: 204
};
app.use(express.json());
app.use(cors(corsOptions));

// connect MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  sslValidate: false, // 禁用 SSL 证书验证
}).then(() => {
    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
        console.log(`App is Listening on PORT ${PORT}`);
    })
}).catch(err => {
    console.log(err);
});

// route
app.get("/", (req, res) => {
    res.status(201).json({ message: "Connected to Backend!" });
});