import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ChatReducer, {
  handlerSendMessage,
  handlerBotMessage,
} from "./ChatMessageSlice";

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();
let myTimer: number | undefined;
listenerMiddleware.startListening({
  actionCreator: handlerSendMessage,
  effect: async (action, listenerApi) => {
    if (myTimer) clearTimeout(myTimer);
    const time = Math.floor(Math.random() * 4) + 2;
    myTimer = setTimeout(() => {
      console.log("startBot");
      listenerApi.dispatch(handlerBotMessage());
    }, time * 1000);
  },
});

const store = configureStore({
  reducer: {
    ChatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).prepend(
      listenerMiddleware.middleware
    ),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
