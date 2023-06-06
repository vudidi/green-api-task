import React, { FC } from 'react';
import axios from 'axios';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MessageList from '../MessageList/MessageList';
import { IconButton } from '@chakra-ui/react';
import { CloseIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { IChat } from '../../components/Chat/Chat';
import { IMessage } from '../Message/Message';
import sortMessageArray from '../../utils/sortMessageArray';

interface IChatContentProps {
  isOpen: boolean;
  onCloseChat: () => void;
  chats: IChat[];
}

const ChatContent: FC<IChatContentProps> = (props) => {
  const { isOpen, onCloseChat, chats } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const [currentMessages, setCurrentMessages] = React.useState<IMessage[]>([]);
  const [messageText, setMessageText] = React.useState<string | ''>('');

  function closeChatHandler() {
    onCloseChat();
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setMessageText(e.target.value);
  };

  // Отправить сообщение пользователю в чате
  const submitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const currentChat: IChat | undefined = chats.find(
      (el) => el.current === true
    );

    axios
      .post(
        `https://api.green-api.com/waInstance${currentUser.waInstance}/sendMessage/${currentUser.key}`,
        {
          chatId: `${currentChat?.chatId}`,
          message: messageText,
        }
      )
      .then((res) => {
        const newMessage = {
          date: Date.now(),
          id: res.data.idMessage,
          text: messageText,
          self: true,
          chatId: `${currentChat?.chatId}`,
        };
        messages.push(newMessage);
        setMessages([...messages]);
        setMessageText('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Удалить полученную нотификацию
  const deleteNotification = (id: number | null) => {
    if (id) {
      axios
        .delete(
          `https://api.green-api.com/waInstance${currentUser.waInstance}/deleteNotification/${currentUser.key}/${id}`
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Получить новое сообщение
  React.useEffect(() => {
    const receiveNotification = () => {
      axios
        .get(
          `https://api.green-api.com/waInstance${currentUser.waInstance}/receiveNotification/${currentUser.key}`
        )
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            if (
              (res.data.body.typeWebhook === 'incomingMessageReceived' ||
                res.data.body.typeWebhook === 'outgoingMessageReceived') &&
              res.data.body.messageData.typeMessage === 'textMessage'
            ) {
              const newMessage = {
                date: Date.now(),
                id: res.data.body.idMessage,
                text: res.data.body.messageData.textMessageData.textMessage,
                self: false,
                chatId: res.data.body.senderData.chatId,
              };

              if (!messages.find((el) => newMessage.id === el.id)) {
                messages.push(newMessage);
                setMessages([...messages]);
              }

              deleteNotification(res.data.receiptId);
            } else {
              deleteNotification(res.data.receiptId);
            }
          } else {
            console.log('Новых сообщений нет');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    let timerId = setInterval(receiveNotification, 5000);

    return () => {
      clearInterval(timerId);
    };
  }, [messages]);

  // Обновить массив сообщений и отрисовать для текущего чата
  React.useEffect(() => {
    const currentChat: IChat | undefined = chats.find(
      (el) => el.current === true
    );

    const relevantMessages: IMessage[] = [];

    messages.forEach((el) => {
      if (el.chatId === currentChat?.chatId) {
        relevantMessages.push(el);
      }
    });

    const sortedArray = relevantMessages.sort(sortMessageArray);
    setCurrentMessages(sortedArray);
  }, [chats, messages]);

  return (
    <div className={`content ${!isOpen && 'content_closed'}`}>
      <IconButton
        onClick={closeChatHandler}
        className="content__closeBtn"
        colorScheme="teal"
        aria-label="Call Segun"
        icon={<CloseIcon />}
      />
      <div className="content__container">
        <MessageList messages={currentMessages} />
        <form onSubmit={submitForm} id="submit-message">
          <InputGroup className="content__input">
            <InputRightElement>
              <IconButton
                className="content__sendBtn"
                colorScheme="gray"
                aria-label="Call Segun"
                icon={<ArrowRightIcon />}
                form="submit-message"
                type="submit"
              />
            </InputRightElement>
            <Input
              type="text"
              placeholder="Введите сообщение"
              onChange={handleChange}
              value={messageText || ''}
              focusBorderColor="teal.500"
              minLength={1}
              maxLength={200}
              isRequired
            />
          </InputGroup>
        </form>
      </div>
    </div>
  );
};

export default ChatContent;
