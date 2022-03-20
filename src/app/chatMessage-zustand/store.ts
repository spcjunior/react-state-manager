import create from "zustand";
import { IUser, getNewMessage, startBot, getNewUser } from "../data";

export interface IStore {
  users: IUser[];
  userSelected: IUser | undefined;
  textMessage: string | undefined;
  setUsers: (users: IUser[]) => void;
  setUserSelected: (user: IUser | undefined) => void;
  setTextMessage: (message: string) => void;
  handlerClick: (user: IUser) => void;
  handlerSendMessage: () => void;
  handlerAddNewUser: () => void;
  handlerEmoji: (emoji: string) => void;
}

const useStore = create<IStore>(
  (set, get) =>
    ({
      users: new Array<IUser>(),
      userSelected: undefined,
      textMessage: undefined,
      setUsers: (users: IUser[]) =>
        set((state) => ({ ...state, users: users })),
      setUserSelected: (user: IUser | undefined) =>
        set((state) => ({ ...state, userSelected: user })),
      setTextMessage: (message: string) =>
        set((state) => ({ ...state, textMessage: message })),
      handlerClick: (user: IUser): void => {
        set((state) => ({
          ...state,
          userSelected: user,
        }));
      },
      handlerEmoji: (emoji: string): void => {
        if (get().userSelected && emoji) {
          set((state) => ({
            ...state,
            userSelected: { ...get().userSelected, emoji: emoji } as IUser,
          }));
        }
      },
      handlerSendMessage: (): void => {
        if (get().userSelected && get().textMessage) {
          const userEdited = {
            ...get().userSelected,
            messages: [
              getNewMessage(false, get().textMessage),
              ...(get().userSelected?.messages || []),
            ],
          } as IUser;
          set((state) => ({ ...state, userSelected: userEdited }));
          set((state) => ({ ...state, textMessage: "" }));

          (async () =>
            startBot(
              userEdited,
              get().users,
              (newUser: IUser, newUsers: IUser[]) => {
                if (get().userSelected?.id === newUser.id) {
                  set((state) =>
                    state.setUserSelected({
                      ...get().userSelected,
                      messages: newUser.messages,
                    } as IUser)
                  );
                }
              }
            ))();
        }
      },
      handlerAddNewUser: (): void => {
        set((state) => ({ ...state, users: [...get().users, getNewUser()] }));
      },
    } as IStore)
);

export const useUsers = () => useStore((state) => state.users);
export const useSetUsers = () => useStore((state) => state.setUsers);
export const useUserSelected = () => useStore((state) => state.userSelected);
export const useSetUserSelected = () =>
  useStore((state) => state.setUserSelected);
export const useTextMessage = () => useStore((state) => state.textMessage);
export const useSetTextMessage = () =>
  useStore((state) => state.setTextMessage);
export const useHandlerClick = () => useStore((state) => state.handlerClick);
export const useHandlerEmoji = () => useStore((state) => state.handlerEmoji);
export const useHandlerSendMessage = () =>
  useStore((state) => state.handlerSendMessage);
export const useEditMode = () => useStore((state) => !!state.userSelected);
export const useUserMessages = () =>
  useStore((state) => state.userSelected?.messages);
export const useHandlerAddNewUser = () =>
  useStore((state) => state.handlerAddNewUser);
