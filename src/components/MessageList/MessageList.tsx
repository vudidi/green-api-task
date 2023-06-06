import React, { FC } from 'react';
import Message from '../Message/Message';
import { IMessage } from '../Message/Message';

interface IMessageList {
  messages: IMessage[];
}

const MessageList: FC<IMessageList> = (props) => {
  const { messages } = props;

  return (
    <ul className="messages">
      {messages.map((el) => {
        return (
          <Message
            date={el.date}
            key={el.id}
            text={el.text}
            self={el.self}
            chatId={el.chatId}
          />
        );
      })}
    </ul>
  );
};

export default MessageList;
