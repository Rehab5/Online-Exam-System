require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose"); //.set("debug", true);
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const userRouter = require("./routes/usersRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const examRoutes = require("./routes/examRoutes");
const questionRouter = require("./routes/questionRoutes");
const resultRoutes = require("./routes/resultRoutes");
const authRouter = require("./routes/authRoutes");
// routers

// consts
const app = express();
const mongoDBURL = process.env.mongoDBURL;
const port = process.env.PORT || 3000;
const swaggerOptions = require("./swagger.json");
const isAuth = require("./middlewares/auth/isAuth");
const swaggerSpec = swaggerJSDoc(swaggerOptions);
console.log(port);
// ****middlewares****
// Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) =>
  res.json({ message: "Server is running" }).status(200)
);

// General err handler
app.use((error, request, response, next) => {
  response.status(500).json({ data: `Error MW ${error}` });
});
// swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Non auth routes
app.use("", authRouter);

//locked routers
app.use(isAuth);
app.use("/users", userRouter);
app.use("/subject", subjectRoutes);
app.use("/exams", examRoutes);
app.use("/questions", questionRouter);
app.use("/results", resultRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((err) => console.log("Cant connect to server: " + err));
