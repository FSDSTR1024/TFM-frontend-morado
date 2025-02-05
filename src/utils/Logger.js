/*********************************************** External Node modules ************************************************/
import moment from "moment";

/********************************************* Internal logger definition *********************************************/
class Logger {
  /* Class instance constructor */
  constructor(filePath) {
    this.fileName = filePath.split('/').pop();
  }

  /* Formatting private methods */
  #getFormattedDateTime() {
    return moment().format("YYYY/MM/DD HH:mm:ss");
  }
  #getFormattedLogStart(level) {
    const formattedDateTime = this.#getFormattedDateTime();
    const maxFileNameLength = 0;  // 18
    const formattedFileName = this.fileName.padStart(maxFileNameLength, " ");
    const maxLevelLength = 0;  // 5
    const formattedLevel = level.toUpperCase().padEnd(maxLevelLength, " ");
    return `[${formattedDateTime}][${formattedFileName}][${formattedLevel}]`;
  }

  /* Logging private method */
  #log(level = "info", message, ...additionalParams) {
    const formattedLogStart = this.#getFormattedLogStart(level);
    const formattedMessage = additionalParams ? `${message}\n` : message;
    switch (level) {
      case "debug":
        console.debug(formattedLogStart, formattedMessage, ...additionalParams);
        break;
      case "info":
        console.info(formattedLogStart, formattedMessage, ...additionalParams);
        break;
      case "warn":
        console.warn(formattedLogStart, formattedMessage, ...additionalParams);
        break;
      case "error":
        console.error(formattedLogStart, formattedMessage, ...additionalParams);
        break;
      default:
        console.error(formattedLogStart, formattedMessage, ...additionalParams);
        break;
    }
  }

  /* Logging public APIs */
  debug(message, ...additionalParams) {
    this.#log("debug", message, ...additionalParams);
  }
  info(message, ...additionalParams) {
    this.#log("info", message, ...additionalParams);
  }
  warn(message, ...additionalParams) {
    this.#log("warn", message, ...additionalParams);
  }
  error(message, ...additionalParams) {
    this.#log("error", message, ...additionalParams);
  }
}

/********************************************** Named export (ES module) **********************************************/
export { Logger };
