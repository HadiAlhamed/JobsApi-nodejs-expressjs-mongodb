require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/connect");
//security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();
app.set("trust proxy", 1);
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, //15 minutes,
  max: 100, //100 requests is allowed from one IP per window
});
app.use(limiter);
app.use(helmet()); // 1. Set security headers
app.use(cors()); // 2. Configure CORS (with options)
app.use(express.json()); // 3. Parse JSON body
app.use(xss()); // 4. Sanitize data (AFTER body parser!)
//connectDB

//routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authMiddleware = require("./middleware/authentication");
// extra packages

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    );
  } catch (error) {
    console.log(error);
  }
};

start();
