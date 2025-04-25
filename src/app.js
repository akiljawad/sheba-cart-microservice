const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const router = require("./routes");
const mockOrderRoutes = require("./routes/mockOrderRoutes");
const errorHandler = require("./middlewares/error");
const bodyParser = require("body-parser");
const config = require("./config");

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api", router);
app.use('/mock-api', mockOrderRoutes); // For mock api call purpose

app.use(errorHandler);

const PORT = config.port;
if (config.nodeEnv !== "test") {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
module.exports = app;
