import React from "react";
import { useStyles } from "../../../hooks/useStyles";
import { IMessage, IUser } from "../../data";
import {
  useUsers,
  useHandlerClick,
  useHandlerEmoji,
  useUserSelected,
  useTextMessage,
  useSetTextMessage,
  useHandlerSendMessage,
  useHendlerAddNewUser,
  useEditMode,
  useUserMessages,
  ContextProvider,
} from "./ContextProvider";

const logOn = false;

interface IUserPropd {
  user: IUser;
}
const User: React.FC<IUserPropd> = ({ user }) => {
  if (logOn) console.log("User");
  const handlerClick = useHandlerClick();
  const classes = useStyles({ userActive: user?.active });

  return (
    <div
      key={user.id}
      onClick={() => handlerClick(user)}
      className={classes.cardUser}
    >
      <strong>{user.name}</strong>
      <p>{user.email}</p>
    </div>
  );
};

const UserList: React.FC = () => {
  if (logOn) console.log("UserList");
  const classes = useStyles({});
  const users = useUsers();
  const handlerAddNewUser = useHendlerAddNewUser();

  return (
    <div className={classes.usersContainer}>
      <section>
        {users.map((user) => {
          return <User key={user.id} user={user} />;
        })}
      </section>
      <section>
        <button onClick={() => handlerAddNewUser()}>New user</button>
      </section>
    </div>
  );
};

interface IChatMessageProps {
  message: IMessage;
}
const Message: React.FC<IChatMessageProps> = ({ message }) => {
  const classes = useStyles({ botMessage: message.bot });
  if (logOn) console.log("Message");
  return (
    <div key={message.id} className={classes.rowMessage} style={{ border: 0 }}>
      <div className={classes.cardMessage}>
        <strong>
          {message.sender}
          <span>{` - [${message.dateStr}]`}</span>
        </strong>
        <p>{message.content}</p>
      </div>
    </div>
  );
};

const UserContainer: React.FC = () => {
  const userSelected = useUserSelected();
  const handlerEmoji = useHandlerEmoji();

  if (logOn) console.log("UserContainer");
  return (
    <section>
      <label>Chat Message - Context api</label>
      {userSelected && (
        <>
          <p>
            <strong>{`${userSelected?.name}`}</strong>
          </p>
          <p>{`${userSelected?.email}`}</p>
          <select
            value={userSelected.emoji || "-"}
            onChange={(evt) => {
              handlerEmoji(evt.target.value);
            }}
            style={{ fontSize: 20, border: 0 }}
          >
            <option>-</option>
            <option>&#128512;</option>
            <option>&#128513;</option>
            <option>&#128530;</option>
            <option>&#128532;</option>
          </select>
        </>
      )}
    </section>
  );
};

const UserMessages: React.FC = () => {
  const classes = useStyles({});
  const messages = useUserMessages();
  if (logOn) console.log("UserMessages");
  return (
    <section>
      <div className={classes.chatMessage} style={{ border: 0 }}>
        {messages?.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </div>
    </section>
  );
};

const ChatHistory: React.FC = () => {
  const classes = useStyles({});
  if (logOn) console.log("ChatHistory");
  return (
    <div className={classes.chatHistory}>
      <UserContainer />
      <UserMessages />
    </div>
  );
};

const ChatEditor: React.FC = () => {
  const classes = useStyles({});
  const editMode = useEditMode();
  const textMessage = useTextMessage();
  const setTextMessage = useSetTextMessage();
  const handlerSendMessage = useHandlerSendMessage();
  if (logOn) console.log("ChatEditor");
  if (!editMode) {
    return (
      <div className={classes.chatTextMessage}>
        <h5 style={{ textAlign: "center" }}>
          Select a user to texting a message.
        </h5>
      </div>
    );
  }

  return (
    <div
      className={classes.chatTextMessage}
      onKeyDown={(evt) => {
        if (evt.key === "Enter") {
          handlerSendMessage();
          evt.preventDefault();
        }
      }}
    >
      <textarea
        value={textMessage}
        onChange={(event) => setTextMessage(event.target.value)}
      />
      <div style={{ border: 0 }} className={classes.buttonArea}>
        <button onClick={() => setTextMessage("")}>Clear</button>
        <button onClick={handlerSendMessage}>Send</button>
      </div>
    </div>
  );
};

const ChatContainer: React.FC = () => {
  const classes = useStyles({});
  if (logOn) console.log("ChatContainer");
  return (
    <div className={classes.charContainer} style={{ border: 0 }}>
      <ChatHistory />
      <ChatEditor />
    </div>
  );
};

const ChatMessage: React.FC = () => {
  const classes = useStyles({});
  if (logOn) console.log("ChatMessage");

  return (
    <ContextProvider>
      <div className={classes.root}>
        <UserList />
        <ChatContainer />
      </div>
    </ContextProvider>
  );
};

export default ChatMessage;
