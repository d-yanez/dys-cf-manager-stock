"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
// Definir los formatos de log: timestamp y formato json
const logger = (0, winston_1.createLogger)({
    level: 'info', // Nivel de log (info, warn, error, etc.)
    format: winston_1.format.combine(winston_1.format.timestamp(), // Agrega timestamp a cada log
    winston_1.format.errors({ stack: true }), // Muestra el stacktrace en caso de errores
    winston_1.format.json() // Muestra los logs en formato JSON
    ),
    defaultMeta: { service: 'dys-cf-manager-stock' }, // Meta información por defecto
    transports: [
        // Consola
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize(), // Colorea la salida en la consola
            winston_1.format.simple() // Formato simple para consola
            )
        }),
        // Archivo de logs
        new winston_1.transports.File({ filename: 'logs/error.log', level: 'error' }), // Solo errores en este archivo
        new winston_1.transports.File({ filename: 'logs/combined.log' }) // Todos los logs
    ]
});
// Si estamos en producción, solo mostrar errores en la consola
if (process.env.NODE_ENV === 'production') {
    logger.add(new winston_1.transports.Console({
        level: 'error',
    }));
}
exports.default = logger;
