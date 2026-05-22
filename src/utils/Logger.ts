import { createLogger, format, transports } from 'winston';

// Definir los formatos de log: timestamp y formato json
const logger = createLogger({
    level: 'info', // Nivel de log (info, warn, error, etc.)
    format: format.combine(
        format.timestamp(), // Agrega timestamp a cada log
        format.errors({ stack: true }), // Muestra el stacktrace en caso de errores
        format.json() // Muestra los logs en formato JSON
    ),
    defaultMeta: { service: 'dys-cf-manager-stock' }, // Meta información por defecto
    transports: [
        // Consola
        new transports.Console({
            format: format.combine(
                format.colorize(), // Colorea la salida en la consola
                format.simple() // Formato simple para consola
            )
        }),
        // Archivo de logs
        new transports.File({ filename: 'logs/error.log', level: 'error' }), // Solo errores en este archivo
        new transports.File({ filename: 'logs/combined.log' }) // Todos los logs
    ]
});

// Si estamos en producción, solo mostrar errores en la consola
if (process.env.NODE_ENV === 'production') {
    logger.add(new transports.Console({
        level: 'error',
    }));
}

export default logger;
