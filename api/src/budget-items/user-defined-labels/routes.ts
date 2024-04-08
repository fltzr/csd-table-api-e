import { Router } from "express";
import { createUserDefinedLabel, deleteUserDefinedLabel, getUserDefinedLabel, getUserDefinedLabelById, updateUserDefinedLabel } from "./controller";

export const userDefinedLabelsRoutes = Router();

userDefinedLabelsRoutes
  .get('/user-defined-labels/', getUserDefinedLabel)
  .get('/user-defined-labels/:id', getUserDefinedLabelById)
  .post('/user-defined-labels/', createUserDefinedLabel)
  .put('/user-defined-labels/:id', updateUserDefinedLabel)
  .delete('/user-defined-labels/:id', deleteUserDefinedLabel);