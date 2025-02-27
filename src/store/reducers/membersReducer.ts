import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./userReducer";

interface InitialStateType {
  members: IUser[];
}

const initialState: InitialStateType = {
  members: [],
};

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload.members;
    },
  },
});

export const membersReducer = membersSlice.reducer;
export const membersActions = membersSlice.actions;
