const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

// the following code is for the frontend tester

app.listen(config.PORT, () => {
  logger.info(`server is running on port ${config.PORT}`);
});
