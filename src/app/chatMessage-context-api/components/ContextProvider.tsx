import React, { useState, createContext, useContext } from "react";
import { IUser, getNewMessage, startBot, getNewUser } from "../../data";

interface IStore {
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

const useStore = (): IStore => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [userSelected, setUserSelected] = useState<IUser | undefined>();
  const [textMessage, setTextMessage] = useState<string | undefined>();

  const handlerClick = (user: IUser): void => {
    setUserSelected(user);
  };

  const handlerSendMessage = (): void => {
    if (userSelected && textMessage) {
      const userEdited = {
        ...userSelected,
        messages: [getNewMessage(false, textMessage), ...userSelected.messages],
      } as IUser;
      setUserSelected(userEdited);
      setTextMessage("");

      (async () =>
        startBot(userEdited, users, (newUser: IUser, newUsers: IUser[]) => {
          if (userSelected?.id === newUser.id) {
            setUserSelected({ ...userSelected, messages: newUser.messages });
          }
        }))();
    }
  };

  const handlerEmoji = (emoji: string): void => {
    if (userSelected && emoji) {
      setUserSelected({ ...userSelected, emoji: emoji });
    }
  };

  const handlerAddNewUser = (): void => {
    setUsers([...users, getNewUser()]);
  };

  return {
    users,
    userSelected,
    textMessage,
    setUsers: (users: IUser[]) => setUsers(users),
    setUserSelected: (user: IUser | undefined) => setUserSelected(user),
    setTextMessage: (message: string) => setTextMessage(message),
    handlerClick,
    handlerSendMessage,
    handlerAddNewUser,
    handlerEmoji,
  };
};

const ChatContext = createContext({} as IStore);

export const ContextProvider: React.FC = ({ children }) => {
  return (
    <ChatContext.Provider value={useStore()}>{children}</ChatContext.Provider>
  );
};

export const useUsers = () => useContext(ChatContext).users;
export const useSetUsers = () => useContext(ChatContext).setUsers;
export const useUserSelected = () => useContext(ChatContext).userSelected;
export const useSetUserSelected = () => useContext(ChatContext).setUserSelected;
export const useTextMessage = () => useContext(ChatContext).textMessage;
export const useSetTextMessage = () => useContext(ChatContext).setTextMessage;
export const useHandlerClick = () => useContext(ChatContext).handlerClick;
export const useHandlerEmoji = () => useContext(ChatContext).handlerEmoji;
export const useHandlerSendMessage = () =>
  useContext(ChatContext).handlerSendMessage;
export const useEditMode = () => !!useContext(ChatContext).userSelected;
export const useUserMessages = () =>
  useContext(ChatContext).userSelected?.messages;
export const useHendlerAddNewUser = () =>
  useContext(ChatContext).handlerAddNewUser;
