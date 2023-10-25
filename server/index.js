import express from 'express';
//const express = require("express")
//const bodyParser = require("body-parser")
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
//const mongoose = require('mongose')
import cors from 'cors';
//const cors = require('cors')

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
import dotenv from 'dotenv';

const app = express();
dotenv.config();


app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);


app.get('/', (req, res) => {
    res.send('hello to MEMORIES')
})

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import path from 'path'
//const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
