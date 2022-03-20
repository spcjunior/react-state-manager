import faker from "@faker-js/faker";
import { v4 as uuid } from "uuid";

export interface IMessage {
  id: string;
  content: string | undefined;
  date: Date | null;
  dateStr: string;
  sender: string;
  bot: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  messages: IMessage[];
  active: boolean;
  emoji: string;
}

export const sortUsersByName = (users: IUser[]) => {
  users.sort((a, b) => {
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });
};

export const getMessages = (): IMessage[] => {
  return [...Array(0).keys()].map((i) => {
    const currentDate = new Date();
    return {
      id: uuid(),
      content: faker.lorem.sentences(),
      date: new Date(),
      dateStr: `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`,
      sender: faker.name.findName(undefined, undefined, 0),
    } as IMessage;
  });
};

export const getUsers = (): IUser[] => {
  const users = [...Array(20).keys()].map((i) => {
    return {
      id: uuid(),
      name: faker.name.findName(undefined, undefined, 0),
      email: faker.internet.email(),
      messages: getMessages(),
      active: false,
    } as IUser;
  });
  sortUsersByName(users);
  return users;
};

export const getNewUser = (): IUser => {
  return {
    id: uuid(),
    name: faker.name.findName(undefined, undefined, 0),
    email: faker.internet.email(),
    messages: getMessages(),
    active: false,
  } as IUser;
};

export const getNewMessage = (
  bot?: boolean,
  textMessage?: string | undefined
): IMessage => {
  const currentDate = new Date();
  const dateStr = `${currentDate.toLocaleDateString()} - ${currentDate.toLocaleTimeString()}`;
  return {
    id: uuid(),
    content: textMessage,
    date: currentDate,
    dateStr: dateStr,
    sender: "Me",
    bot: bot ?? false,
  } as IMessage;
};

let myTimer: number | undefined;
export const startBot = (
  user: IUser | undefined,
  users: IUser[],
  setResultCallBack: (newUser: IUser, newUsers: IUser[]) => void
): void => {
  const time = Math.floor(Math.random() * 4) + 2;
  if (myTimer) clearTimeout(myTimer);
  myTimer = setTimeout(() => {
    console.log("startBot");
    if (user) {
      const userEdited = getUserEdited(user);
      const newUserList = [...users.filter((a) => a.id != user.id), userEdited];
      sortUsersByName(newUserList);
      setResultCallBack(userEdited, newUserList);
    }
  }, time * 1000);
};

export const getUserEdited = (user: IUser) => {
  const messageBot = getNewMessage(true);
  messageBot.content = faker.lorem.lines();
  messageBot.sender = user.name;

  const userEdited = {
    ...user,
    messages: [messageBot, ...user.messages],
  } as IUser;
  return userEdited;
};
