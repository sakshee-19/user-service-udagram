import express from "express";
import { sequelize } from "./sequalize";
import bodyParser from "body-parser";
import { V0MODELS } from "./controllers/v0/models";
import { IndexRouter } from "./controllers/v0/routes";


(async() => {
  await sequelize.addModels(V0MODELS);
  // await sequelize.sync();

  const app = express();
  const port = 8001;
// parse requests of content-type - application/json
  console.log("running server .ts in port "+port);

  app.use(bodyParser.json());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  })


    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/api/v0", IndexRouter);

    // simple route
    app.get("/", (req, res) => {
      res.send("/api/v0/");
    });


    // set port, listen for requests
    app.listen(port, () => {
      console.log(`Server is running on port ${port}.`);
    });
})();


// var corsOptions = {
//   origin: "http://localhost:8082"
// };

// app.use(cors(corsOptions));

