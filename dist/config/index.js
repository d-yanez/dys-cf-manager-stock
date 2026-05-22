"use strict";
// src/config/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    mercadoLibreToken: process.env.MERCADOLIBRE_TOKEN || '',
    metaToken: process.env.META_TOKEN || '',
    // Agrega otras configuraciones necesarias
};
