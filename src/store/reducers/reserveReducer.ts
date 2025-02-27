import { createSlice } from "@reduxjs/toolkit";
import { IStrains } from "./strainsReducer";

export interface IReservation {
  strainID: string;
  strain: IStrains;
  amount: number;
}

interface InitialStateType {
  reservation: IReservation[];
}

const initialState: InitialStateType = {
  reservation: [],
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setReservation: (state, action) => {
      state.reservation = action.payload.reservation;
    },
    updateReservation: (state, action) => {
      const index = state.reservation.findIndex(
        (item) => item.strainID === action.payload.strainID
      );

      if (index !== -1) {
        if (action.payload.amount === 0) {
          state.reservation.splice(index, 1);
        } else {
          state.reservation[index].amount = action.payload.amount;
        }
      } else if (action.payload.amount > 0) {
        state.reservation.push(action.payload);
      }
    },
  },
});

export const reservationReducer = reservationSlice.reducer;
export const reservationActions = reservationSlice.actions;
