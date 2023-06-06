import React, { FC } from 'react';

export interface IChat {
  chatId: string;
  name: string;
  avatar: string;
  current: boolean;
}

interface IChatProps {
  isOpen: boolean;
  onOpenChat(arg: IChat): void;
  chat: IChat;
}

const Chat: FC<IChatProps> = (props) => {
  const { onOpenChat, chat } = props;

  const openChatHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    onOpenChat(chat);
  };

  return (
    <div
      onClick={openChatHandler}
      className={`chat ${chat.current && 'chat_selected'}`}
    >
      <img src={chat.avatar} alt="Аватар собеседника" className="chat__image" />
      <h2 className="chat__title">{`${chat.name} и Вы`}</h2>
    </div>
  );
};

export default Chat;
