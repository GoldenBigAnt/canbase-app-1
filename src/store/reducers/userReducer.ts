import { createSlice } from "@reduxjs/toolkit";
import { IClub } from "./clubReducer";
import { IMembership } from "./membershipReducer";

export interface IUser {
  _id?: string;
  email?: string;
  username?: string;
  birth?: string;
  registerDate?: string;
  two_fa_status?: string;
  last_login?: Date;
  confirmed?: boolean;
  avatar?: string;
  alias?: string;
  phone?: string;
  street?: string;
  address?: string;
  postcode?: string;
  city?: string;
  country?: string;
  bio?: string;
  club?: IClub;
  role?: string;
  status?: string;
  memberdate?: string;
  verifycontent?: string;
  memberships?: IMembership[];
  academy_media?: string[];
  holder?: string;
  IBAN?: string;
  BIC?: string;
  mandate_refer?: string;
  mandate_sign?: Date;
  question?: {
    questionID: string;
    answer: string[];
  }[];
  clublist?: {
    club: IClub;
    status: string;
    memberdate: Date;
    verifycontent: string;
    holder: string;
    IBAN: string;
    BIC: string;
    question?: {
      questionID: string;
      answer: string[];
    }[];
  }[];
  clubrole?: {
    rolename: string;
    roledesc: string;
    roleID: string;
    rolecolor: string;
  }[];
  functions?: string[];
  memberID?: string;
}

interface InitialStateType {
  user: IUser | null;
}

const initialState: InitialStateType = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
