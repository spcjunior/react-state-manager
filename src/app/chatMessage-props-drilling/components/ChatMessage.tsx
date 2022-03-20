import React, { useState } from "react";
import { useStyles } from "../../../hooks/useStyles";
import {
  IMessage,
  IUser,
  getNewUser,
  getNewMessage,
  sortUsersByName,
  startBot,
} from "../../data";

const logOn = false;

interface IUserPropd {
  user: IUser;
  handlerClick: (user: IUser) => void;
}
const User: React.FC<IUserPropd> = ({ user, handlerClick }) => {
  if (logOn) console.log("User");
  const classes = useStyles({ userActive: user?.active });
  return (
    <div onClick={() => handlerClick(user)} className={classes.cardUser}>
      <strong>{user.name}</strong>
      <p>{user.email}</p>
    </div>
  );
};

interface UserListProps {
  users: IUser[];
  handlerClick: (user: IUser) => void;
  handlerAddNewUser: () => void;
}
const UserList: React.FC<UserListProps> = ({
  users,
  handlerClick,
  handlerAddNewUser,
}) => {
  if (logOn) console.log("UserList");
  const classes = useStyles({});
  return (
    <div className={classes.usersContainer}>
      <section>
        {users.map((user) => {
          return <User key={user.id} user={user} handlerClick={handlerClick} />;
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
  if (logOn) console.log("Message");
  const classes = useStyles({ botMessage: message.bot });
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

interface IUserContainer {
  userSelected: IUser | undefined;
}
const UserContainer: React.FC<IUserContainer> = ({ userSelected }) => {
  if (logOn) console.log("UserContainer");
  return (
    <section>
      <label>Chat Message - Props drilling</label>
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

const UserMessages: React.FC<IUserContainer> = ({ userSelected }) => {
  const classes = useStyles({});
  if (logOn) console.log("UserMessages");
  return (
    <section>
      <div className={classes.chatMessage} style={{ border: 0 }}>
        {userSelected?.messages?.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </div>
    </section>
  );
};

interface IChatHistoryProps {
  userSelected: IUser | undefined;
}
const ChatHistory: React.FC<IChatHistoryProps> = ({ userSelected }) => {
  if (logOn) console.log("ChatHistory");
  const classes = useStyles({});
  return (
    <div className={classes.chatHistory}>
      <UserContainer userSelected={userSelected} />
      <UserMessages userSelected={userSelected} />
    </div>
  );
};

interface IChatEditorProps {
  textMessage: string | undefined;
  setTextMessage: (textMessage: string) => void;
  handlerSendMessage: () => void;
  editMode?: boolean;
}
const ChatEditor: React.FC<IChatEditorProps> = ({
  textMessage,
  setTextMessage,
  handlerSendMessage,
  editMode,
}) => {
  if (logOn) console.log("ChatEditor");
  const classes = useStyles({});

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

interface IChatContainerProps {
  userSelected: IUser | undefined;
  textMessage: string | undefined;
  setTextMessage: (messate: string) => void;
  handlerSendMessage: () => void;
}
const ChatContainer: React.FC<IChatContainerProps> = ({
  userSelected,
  textMessage,
  setTextMessage,
  handlerSendMessage,
}) => {
  if (logOn) console.log("ChatContainer");
  const classes = useStyles({});
  return (
    <div className={classes.charContainer} style={{ border: 0 }}>
      <ChatHistory userSelected={userSelected} />
      <ChatEditor
        editMode={!!userSelected}
        textMessage={textMessage}
        setTextMessage={setTextMessage}
        handlerSendMessage={handlerSendMessage}
      />
    </div>
  );
};

const ChatMessage: React.FC = () => {
  if (logOn) console.log("ChatMessage");
  const classes = useStyles({});
  const [users, setUsers] = useState<IUser[]>([]);
  const [userSelected, setUserSelected] = useState<IUser>();
  const [textMessage, setTextMessage] = useState<string>();

  const handlerAddNewUser = () => {
    setUsers([...users, getNewUser()]);
  };

  const handlerClick = (user: IUser) => {
    setUserSelected(user);
  };

  const handlerSendMessage = () => {
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

  return (
    <div className={classes.root}>
      <UserList
        users={users}
        handlerClick={handlerClick}
        handlerAddNewUser={handlerAddNewUser}
      />
      <ChatContainer
        userSelected={userSelected}
        textMessage={textMessage}
        setTextMessage={setTextMessage}
        handlerSendMessage={handlerSendMessage}
      />
    </div>
  );
};

export default ChatMessage;
