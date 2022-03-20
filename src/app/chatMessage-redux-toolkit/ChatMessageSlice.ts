import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IUser,
  getNewMessage,
  getUserEdited,
  IMessage,
  getNewUser,
} from "../data";
import { RootState } from "./store";

interface IStore {
  users: IUser[];
  userSelected: IUser | undefined;
  textMessage: string | undefined;
}

const initialState = {} as IStore;

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    handlerClick(state, action: PayloadAction<IUser>) {
      state.userSelected = action.payload;
    },
    handlerSendMessage(state) {
      const userSelected = state.userSelected;
      const textMessage = state.textMessage;
      if (userSelected && textMessage) {
        const userEdited = {
          ...userSelected,
          messages: [
            getNewMessage(false, textMessage),
            ...userSelected.messages,
          ],
        } as IUser;
        state.userSelected = userEdited;
        state.textMessage = "";
      }
    },
    setTextMessage(state, action: PayloadAction<string>) {
      state.textMessage = action.payload;
    },
    setUserSelected(state, action: PayloadAction<IUser | undefined>) {
      state.userSelected = action.payload;
    },
    handlerAddNewUser(state) {
      state.users = [...(state.users || []), getNewUser()];
    },
    handlerBotMessage(state) {
      state.userSelected = getUserEdited(state.userSelected || ({} as IUser));
    },
  },
});

export const {
  handlerClick,
  handlerSendMessage,
  setTextMessage,
  setUserSelected,
  handlerAddNewUser,
  handlerBotMessage,
} = chatSlice.actions;

export default chatSlice.reducer;

export const getUsers = (state: RootState): IUser[] => state.ChatReducer.users;
export const getUserSelected = (state: RootState): IUser | undefined =>
  state.ChatReducer.userSelected;
export const getUserMessages = (state: RootState): IMessage[] | undefined =>
  state.ChatReducer.userSelected?.messages;
export const getTextMessage = (state: RootState): string | undefined =>
  state.ChatReducer.textMessage;
export const getEditMode = (state: RootState): boolean =>
  !!state.ChatReducer.userSelected;
