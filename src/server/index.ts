import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import { MEDIA_ROOT, configuration } from "../utils";
import { handleErrors } from "../middlewares";
import logger from "../shared/logger";
import { default as appointmentRouter } from "../features/appointments/routes";
import { default as treatmentSupportRouter } from "../features/treatment_support/routes";
import { default as ordersRouter } from "../features/orders/routes";
import { default as cargsRouter } from "../features/cargs/routes";
import authenticate from "../middlewares/authenticate";

export const dbConnection = async () => {
  try {
    // Connect to database here
  } catch (error) {
    logger.error("[x]Could not connect to database" + error);
    process.exit(1); // Exit the application on database connection error
  }
};

export const configureExpressApp = async (app: Application) => {
  // --------------------middlewares---------------------------

  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    logger.info(
      `[+]${configuration.name}:${configuration.version} enable morgan`
    );
  }
  app.use(cors());
  app.use(express.json());
  app.use(express.static(MEDIA_ROOT));
  app.use(authenticate);
  // ------------------End middlewares------------------------

  //------------------- routes --------------------------------
  app.use("/hiv-program/appointments", appointmentRouter);
  app.use("/hiv-program/art-treatment-support", treatmentSupportRouter);
  app.use("/hiv-program/orders", ordersRouter);
  app.use("/hiv-program/art-community", cargsRouter);
  //-------------------end routes-----------------------------

  //---------------- error handler -----------------------
  app.use(handleErrors);
  //---------------- end error handler -----------------------
};
