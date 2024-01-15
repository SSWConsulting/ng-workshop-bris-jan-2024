import { createReducer, on } from "@ngrx/store";
import { Company } from "../../company/company";
import { loadCompaniesSuccess } from "../actions/company.actions";

export const initialState: Company[] = [];

export const companyReducer = createReducer(
  initialState,
  on(loadCompaniesSuccess, (state, action) => action.payload)
);
