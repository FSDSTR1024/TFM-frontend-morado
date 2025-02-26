/*********************************************** External Node modules ************************************************/
import moment from "moment";

/***************************************************** Log levels *****************************************************/
// error: Due to a more serious problem, the software has not been able to perform some function.
// warn: An indication that something unexpected happened, or indicative of some problem in the near future (e.g. 'disk space low'). The software is still working as expected.
// info: Confirmation that things are working as expected.
// debug: Detailed information, typically of interest only when diagnosing problems.
const LOG_LEVELS = {
  NONE: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  DEBUG: 4
};
const DEFAULT_LOG_LEVEL = LOG_LEVELS.NONE;

/********************************************* Internal logger definition *********************************************/
class Logger {
  /* Class instance constructor */
  constructor(filePath) {
    this.fileName = filePath.split('/').pop();
    this.LOG_LEVEL = import.meta.env.VITE_LOG_LEVEL ? LOG_LEVELS[import.meta.env.VITE_LOG_LEVEL.toUpperCase()] : DEFAULT_LOG_LEVEL;
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
    if (LOG_LEVELS[level.toUpperCase()] > this.LOG_LEVEL) {
      return;
    }

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
