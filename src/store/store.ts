import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer as user } from "./reducers/userReducer";
import { clubReducer as club } from "./reducers/clubReducer";
import { membersReducer as members } from "./reducers/membersReducer";
import { channelReducer as channel } from "./reducers/channelReducer";
import { chatReducer as chat } from "./reducers/chatReducer";
import { strainsReducer as strains } from "./reducers/strainsReducer";
import { reservationReducer as reservation } from "./reducers/reserveReducer";

export const store = configureStore({
  reducer: combineReducers({
    user,
    club,
    members,
    channel,
    chat,
    strains,
    reservation,
  }),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
