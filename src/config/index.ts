// src/config/index.ts

import dotenv from 'dotenv';

dotenv.config();

export const config = {
    mercadoLibreToken: process.env.MERCADOLIBRE_TOKEN || '',
    metaToken: process.env.META_TOKEN || '',
    // Agrega otras configuraciones necesarias
};
