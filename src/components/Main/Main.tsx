import React, { FC } from 'react';
import axios from 'axios';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ChatInput from '../ChatInput/ChatInput';
import ChatList from '../ChatList/ChatList';
import ChatContent from '../ChatContent/ChatContent';
import userAvatar from '../../assets/img/user-avatar.svg';
import { IChat } from '../../components/Chat/Chat';

const Main: FC = () => {
  const currentUser = React.useContext(CurrentUserContext);
  const [isChatOpen, setChatOpen] = React.useState(false);
  const [chats, setChats] = React.useState<IChat[]>([]);

  function openChat(chat: IChat) {
    setChatOpen(true);
    chats.forEach((el) => {
      if (el.chatId === chat.chatId) {
        el.current = true;
      } else {
        el.current = false;
      }
    });
    setChats([...chats]);
  }

  function closeChat() {
    setChatOpen(false);
    chats.forEach((el: IChat) => {
      el.current = false;
    });
    setChats([...chats]);
  }

  // Полчуение данных о пользователе и создание чата
  const createChat = (phoneNumber: number) => {
    return axios
      .post(
        `https://api.green-api.com/waInstance${currentUser.waInstance}/getContactInfo/${currentUser.key}`,
        {
          chatId: `${phoneNumber}@c.us`,
        }
      )
      .then((res) => {
        console.log('SUCCESS');
        const newChat = {
          chatId: res.data.chatId,
          name: res.data.name || phoneNumber,
          avatar: res.data.avatar || `${userAvatar}`,
          current: false,
        };
        const chatIds = chats.map((el) => {
          return el.chatId;
        });
        if (!chatIds.includes(res.data.chatId)) {
          setChats([...chats, newChat]);
        }
      })
      .catch((err) => {
        console.log('ERROR', err);
      });
  };

  return (
    <div className="main">
      <div className="main__container">
        <div className="main__sideBar">
          <ChatInput onCreateChat={createChat} />
          <ChatList chats={chats} isOpen={isChatOpen} onOpenChat={openChat} />
        </div>
        <div className="main__content">
          <div
            className={`main__contentImg ${
              isChatOpen && 'main__contentImg_hidden'
            }`}
          ></div>
          <ChatContent
            chats={chats}
            isOpen={isChatOpen}
            onCloseChat={closeChat}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
