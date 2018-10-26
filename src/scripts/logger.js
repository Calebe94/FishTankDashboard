const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label,printf } = format;

const myFormat = printf(info => {
    return `${info.timestamp} [${info.label} - ${info.action}] ${info.level}: ${info.message}`;
});

const logger = createLogger({
    format: combine(
        label({ label: 'action' }),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.File({ filename: '../../log/debug.log' }),
        new transports.Console()
    ]
});

exports.log = (level, action, message) =>
    logger.log({
        action: action,
        level: level, 
        message: message
    });
    
exports.clear = () => logger.clear()
    