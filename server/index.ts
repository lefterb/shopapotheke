import express, { Express, Request, Response } from "express"

import compression from "compression"
import cors from "cors"
import path from "path"
import webpack from "webpack"
import webpackDevMiddleware from "webpack-dev-middleware"
import fallbackHistory from "connect-history-api-fallback"

import webpackConfig from "../webpack.dev.js"

import {
  getLatestRepositories
} from "./api/github"

import dotenv from "dotenv"

dotenv.config()

const app: Express = express()
const port = 5000

// use compression to improve peformance of node and reduce payload size
app.use(compression())

// request body parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post("/get-respositories", cors(), getLatestRepositories)

if (process.env.NODE_ENV !== "production") {
  const compiler = webpack(webpackConfig as webpack.Configuration)
  app.use(fallbackHistory())
  app.use(webpackDevMiddleware(compiler, {}))
} else {
  app.use(express.static(path.join(__dirname, "..", "./dist")))
}

// handles any requests that don't match the ones above
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "dist/index.html"))
})

app.listen(port)
