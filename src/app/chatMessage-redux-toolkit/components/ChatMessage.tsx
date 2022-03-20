import React from "react";
import { Provider } from "react-redux";
import { useStyles } from "../../../hooks/useStyles";
import { IMessage, IUser } from "../../data";
import {
  handlerClick,
  handlerSendMessage,
  setTextMessage,
  handlerAddNewUser,
  getUsers,
  getUserSelected,
  getUserMessages,
  getTextMessage,
  getEditMode,
} from "../ChatMessageSlice";
import store, { useAppDispatch, useAppSelector } from "../store";

const logOn = false;

interface IUserPropd {
  user: IUser;
}
const User: React.FC<IUserPropd> = ({ user }) => {
  if (logOn) console.log("User");
  const dispatch = useAppDispatch();
  const classes = useStyles({ userActive: user?.active });

  return (
    <div
      key={user.id}
      onClick={() => dispatch(handlerClick(user))}
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
  const users = useAppSelector(getUsers);
  const dispatch = useAppDispatch();

  return (
    <div className={classes.usersContainer}>
      <section>
        {users?.map((user) => {
          return <User key={user.id} user={user} />;
        })}
      </section>
      <section>
        <button onClick={() => dispatch(handlerAddNewUser())}>New user</button>
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
  const userSelected = useAppSelector(getUserSelected);
  if (logOn) console.log("UserContainer");

  return (
    <section>
      <label>Chat Message - Redux toolkit</label>
      {userSelected && (
        <>
          <p>
            <strong>{`${userSelected?.name}`}</strong>
          </p>
          <p>{`${userSelected?.email}`}</p>
        </>
      )}
    </section>
  );
};

const UserMessages: React.FC = () => {
  const classes = useStyles({});
  const messages = useAppSelector(getUserMessages);
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
  const editMode = useAppSelector(getEditMode);
  const textMessage = useAppSelector(getTextMessage);
  const dispatch = useAppDispatch();
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
          dispatch(handlerSendMessage());
          evt.preventDefault();
        }
      }}
    >
      <textarea
        value={textMessage}
        onChange={(event) => dispatch(setTextMessage(event.target.value))}
      />
      <div style={{ border: 0 }} className={classes.buttonArea}>
        <button onClick={() => dispatch(setTextMessage(""))}>Clear</button>
        <button onClick={() => dispatch(handlerSendMessage())}>Send</button>
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
    <Provider store={store}>
      <div className={classes.root}>
        <UserList />
        <ChatContainer />
      </div>
    </Provider>
  );
};

export default ChatMessage;
