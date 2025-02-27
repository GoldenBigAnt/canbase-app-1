import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./userReducer";

export interface IChat {
  channelID?: string;
  channelname?: string;
  channeldesc?: string;
  channeltype?: string;
  club?: string;
  owner?: IUser;
  chat?: {
    user: {
      _id: string;
      username: string;
      avatar: string;
    };
    chat: string;
    type: number;
    date: string;
  }[];
  user?: string;
}

interface InitialStateType {
  chat: IChat[];
}

const initialState: InitialStateType = {
  chat: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.chat = action.payload.chat;
    },
    updateChat: (state, action) => {
      const { channelID, chat } = action.payload;
      const index = state.chat.findIndex(
        (item) => item.channelID === channelID
      );

      if (index !== -1) {
        state.chat[index] = { ...state.chat[index], ...chat };
      } else {
        state.chat.push(chat);
      }
    },
    removeChat: (state, action) => {
      const { channelID } = action.payload;
      state.chat = state.chat.filter((item) => item.channelID !== channelID);
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const chatActions = chatSlice.actions;
