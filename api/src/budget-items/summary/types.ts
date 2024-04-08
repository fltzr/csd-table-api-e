export type BudgetItemSummary = {
  id: string;
  // The UUID of the budget item
  uuid: string;
  // The name of the budget item
  name: string;
  // The amount of the budget item
  amount: number;
  // The name of the finance category
  financeCategoryName: string;
  // The name of the user-defined label
  userDefinedLabelName: string;
};

