import { NextFunction, Request, Response } from "express";

export const getFinanceCategories = async (request: Request, response: Response, next: NextFunction) => {
  return response.status(200).json({ message: "getFinanceCategories" });
};
export const getFinanceCategoryById = async (request: Request, response: Response, next: NextFunction) => {
  return response.status(200).json({ message: "getFinanceCategoryById" });
};
export const createFinanceCategory = async (request: Request, response: Response, next: NextFunction) => {
  return response.status(200).json({ message: "createFinanceCategory" });
};
export const updateFinanceCategory = async (request: Request, response: Response, next: NextFunction) => {
  return response.status(200).json({ message: "updateFinanceCategory" });
};
export const deleteFinanceCategory = async (request: Request, response: Response, next: NextFunction) => {
  return response.status(200).json({ message: "deleteFinanceCategory" });
};