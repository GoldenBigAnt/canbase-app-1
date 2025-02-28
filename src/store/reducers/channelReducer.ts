import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./userReducer";

export interface IChannel {
  channelID?: string;
  channelname?: string;
  channeldesc?: string;
  channeltype?: string;
  owner?: IUser;
  user?: string;
}

interface InitialStateType {
  channel: IChannel[];
}

const initialState: InitialStateType = {
  channel: [],
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setChannel: (state, action) => {
      state.channel = action.payload.channel;
    },
    removeChannel: (state, action) => {
      const { channelID } = action.payload;
      state.channel = state.channel.filter(
        (item) => item.channelID !== channelID
      );
    },
  },
});

export const channelReducer = channelSlice.reducer;
export const channelActions = channelSlice.actions;
