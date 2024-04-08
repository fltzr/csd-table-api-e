import { NextFunction, Request, Response } from "express";

import { ReadListResponse } from "../../core/types/responses";
import { BudgetItemSummary } from "./types";


export const getBudgetItemsSummary = async (request: Request, response: Response, next: NextFunction) => {
  const summaryResponse: ReadListResponse<BudgetItemSummary> = {
    items: [
      {
        id: "1",
        uuid: "75559510-770d-4e78-8eae-53529d5075ae",
        name: "Summary 1",
        amount: 100,
        financeCategoryName: "Category 1",
        userDefinedLabelName: "Label 1",
      },
      {
        id: "2",
        uuid: "279bb8bb-1fe2-41d2-80a2-8372721a7d3e",
        name: "Summary 2",
        amount: 200,
        financeCategoryName: "Category 2",
        userDefinedLabelName: "Label 2",
      }
    ],
    totalCount: 0,
  };

  return response.status(200).json(summaryResponse);
};
export const getBudgetItemsSummaryById = async (request: Request, response: Response, next: NextFunction) => {
  return response.status(200).json({ message: "getBudgetItemsSummary" });

};