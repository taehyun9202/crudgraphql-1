const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/sechma");
const port = 4000;
const app = express();
const mongoose = require("mongoose");

//connect to mlab
mongoose.connect(
  "mongodb+srv://tyler:thnam5079@cluster0.ida5w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
  console.log("connected to db");
});

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(port, () => console.log(`Listening on port ${port}`));
