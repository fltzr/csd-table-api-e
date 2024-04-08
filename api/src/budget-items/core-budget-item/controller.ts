import { NextFunction, Request, Response } from "express";

export const getBudgetItems = async (request: Request, response: Response, next: NextFunction) => {
  return response.status(200).json({ message: "getBudgetItems" });
};
export const getBudgetItemById = async (request: Request, response: Response, next: NextFunction) => {
  return response.status(200).json({ message: "getBudgetItemById" });
};
export const createBudgetItem = async (request: Request, response: Response, next: NextFunction) => {
  return response.status(200).json({ message: "createBudgetItem" });
};
export const updateBudgetItem = async (request: Request, response: Response, next: NextFunction) => {
  return response.status(200).json({ message: "updateBudgetItem" });
};
export const deleteBudgetItem = async (request: Request, response: Response, next: NextFunction) => {
  return response.status(200).json({ message: "deleteBudgetItem" });
};