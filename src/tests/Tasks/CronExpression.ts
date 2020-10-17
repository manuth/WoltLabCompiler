import CronParser = require("cron-parser");

/**
 * Represents a cron-expression.
 */
export type CronExpression = ReturnType<typeof CronParser.parseExpression>;
