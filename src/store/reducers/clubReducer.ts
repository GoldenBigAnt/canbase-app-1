import { createSlice } from "@reduxjs/toolkit";

export interface IClub {
  clubname?: string;
  badge?: string;
  avatar?: string;
  website?: string;
  email?: string;
  phone?: string;
  street?: string;
  address?: string;
  postcode?: string;
  city?: string;
  country?: string;
  lat?: number;
  lng?: number;
  description?: string;
  prevent_info?: string;
  info_members?: string;
  discord?: string;
  tiktok?: string;
  youtube?: string;
  twitch?: string;
  instagram?: string;
  maxUser?: number;
  minAge?: number;
  twitter?: string;
  facebook?: string;
  imprint?: string;
  color?: string;
  document?: {
    doc: string;
    documentname: string;
    description?: string;
    date: string;
    isQuestion: boolean;
    tags?: string[];
    documentID: string;
  }[];
  users?: number;
  allow_request?: boolean;
  auto_accpet?: boolean;
  card?: {
    cardColor: string;
    frontBadge?: string;
    backBadge?: string;
    textColor: string;
    logoColor: string;
    position: string;
    logoShown: boolean;
    clubShown: boolean;
  };
  status?: string;
  clubID?: string;
}

interface InitialStateType {
  club: IClub | null;
}

const initialState: InitialStateType = {
  club: null,
};

const clubSlice = createSlice({
  name: "club",
  initialState,
  reducers: {
    setClub: (state, action) => {
      state.club = action.payload.club;
    },
  },
});

export const clubReducer = clubSlice.reducer;
export const clubActions = clubSlice.actions;
