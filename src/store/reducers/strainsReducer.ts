import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./userReducer";

export interface IStrains {
  _id: string;
  strainname: string;
  description?: string;
  avatar?: string;
  ratio: number;
  thc?: number;
  cbd?: number;
  breeder?: string;
  genetics?: string;
  type?: string;
  avg_height?: number;
  yield_per_plant?: number;
  growth_germination?: number;
  growth_cutting?: number;
  growth_vegetative?: number;
  growth_flowering?: number;
  growth_curing?: number;
  effect?: string;
  terpene?: string;
  area?: string;
  note?: string;
  rating: number;
  strainID: string;
  diary?: {
    user: IUser;
    content: string;
    date: string;
  }[];
}

interface InitialStateType {
  strains: IStrains[];
}

const initialState: InitialStateType = {
  strains: [],
};

const strainsSlice = createSlice({
  name: "strain",
  initialState,
  reducers: {
    setStrains: (state, action) => {
      state.strains = action.payload.strains;
    },
  },
});

export const strainsReducer = strainsSlice.reducer;
export const strainsActions = strainsSlice.actions;
