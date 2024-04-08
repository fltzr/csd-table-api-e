import { NextFunction, Request, Response } from "express";

export const getUserDefinedLabel = async (request: Request, response: Response, next: NextFunction) => {
  return response.status(200).json({ message: "getUserDefinedLabel" });
};
export const getUserDefinedLabelById = async (request: Request, response: Response, next: NextFunction) => {
  return response.status(200).json({ message: "getUserDefinedLabelById" });
};
export const createUserDefinedLabel = async (request: Request, response: Response, next: NextFunction) => {
  return response.status(200).json({ message: "createUserDefinedLabel" });
};
export const updateUserDefinedLabel = async (request: Request, response: Response, next: NextFunction) => {
  return response.status(200).json({ message: "updateUserDefinedLabel" });
};
export const deleteUserDefinedLabel = async (request: Request, response: Response, next: NextFunction) => {
  return response.status(200).json({ message: "deleteUserDefinedLabel" });
};