import React, { FC } from 'react';

export interface IMessage {
  date: number;
  id?: string;
  text: string;
  self: boolean;
  chatId: string;
}

const Message: FC<IMessage> = (props) => {
  const { text, self } = props;

  return (
    <li
      className={`message ${self ? 'message_type_self' : 'message_type_third'}`}
    >
      {text}
    </li>
  );
};

export default Message;
