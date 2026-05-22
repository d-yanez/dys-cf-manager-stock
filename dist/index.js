"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderProcessing = void 0;
const express_1 = __importDefault(require("express"));
const OrderController_1 = require("./interfaces/http/OrderController");
//import { config } from '../config';
const app = (0, express_1.default)();
const port = process.env.PORT || 8081;
app.use(express_1.default.json());
const orderController = new OrderController_1.OrderController();
app.post('/', (req, res) => {
    orderController.handle(req, res);
});
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
// Exportar la función para Google Cloud Functions
exports.orderProcessing = app;
