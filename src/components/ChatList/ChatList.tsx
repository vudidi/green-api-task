import React, { FC } from 'react';
import Chat from '../Chat/Chat';
import { IChat } from '../../components/Chat/Chat';

interface IChatListProps {
  isOpen: boolean;
  onOpenChat(arg: IChat): void;
  chats: IChat[];
}

const ChatList: FC<IChatListProps> = (props) => {
  const { isOpen, onOpenChat, chats } = props;
  const [currentChats, setcCurrentChats] = React.useState<IChat[]>([]);

  React.useEffect(() => {
    setcCurrentChats(chats);
  }, [chats]);

  return (
    <>
      {' '}
      {currentChats.map((el) => {
        return (
          <Chat
            key={el.chatId}
            chat={el}
            isOpen={isOpen}
            onOpenChat={onOpenChat}
          />
        );
      })}
    </>
  );
};

export default ChatList;
