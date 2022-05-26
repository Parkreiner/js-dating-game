import express, { json, Request, Response } from "express";
import GameController from "./controllers/GameController";

// Config constants
const PORT_NUMBER = 3000;
const ERROR_TEMPLATE = {
  log: "Unknown error encountered with middleware.",
  internalStatus: 500,
  externalStatus: 400,
  message: { err: "Invalid request. Please try again." },
} as const;

// App setup
const app = express();
app.use(json());
app.use("/game", GameController);

// Generic route handler - Always respond with HTTP 400 externally
app.use((req, res) => {
  res.status(ERROR_TEMPLATE.externalStatus).json(ERROR_TEMPLATE.message);
});

// Global error handler
app.use((err: unknown, _: Request, res: Response) => {
  const fullError = err instanceof Error ? { ...ERROR_TEMPLATE, ...err } : ERROR_TEMPLATE;
  console.error(`Error code ${fullError.internalStatus}`);
  console.error(fullError.log);

  res.status(ERROR_TEMPLATE.externalStatus).json(ERROR_TEMPLATE.message);
});

// Launch backend
app.listen(PORT_NUMBER, () => {
  console.log(`Listening on port number http://localhost:${PORT_NUMBER}`);
});
