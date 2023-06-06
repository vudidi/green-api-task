import React, { FC } from 'react';
import axios from 'axios';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import accountAvatar from '../../assets/img/account-avatar.svg';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

interface IChatInput {
  onCreateChat(arg: number | null): void;
}

const ChatInput: FC<IChatInput> = (props) => {
  const { onCreateChat } = props;

  const [searchValue, setSearchValue] = React.useState<number | null>(null);
  const [inputInvalid, setInvalid] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(Number(e.target.value));
    setInvalid(false);
  };

  // Проверка наличия мессенджера у пользователя
  const searchUser: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    axios
      .post(
        `https://api.green-api.com/waInstance${currentUser.waInstance}/checkWhatsapp/${currentUser.key}`,
        {
          phoneNumber: searchValue,
        }
      )
      .then((res) => {
        if (!res.data.existsWhatsapp) {
          setInvalid(true);
        } else {
          onCreateChat(searchValue);
          setSearchValue(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="panel">
      <img src={accountAvatar} alt="аватар" className="panel__avatar" />
      <form onSubmit={searchUser} id="search" className="panel__form">
        <span
          className={`panel__error ${inputInvalid && 'panel__error_visible'}`}
        >
          У пользователя нет WhatsApp
        </span>
        <InputGroup className="panel__input">
          <InputLeftElement pointerEvents="none">
            <PhoneIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Поиск по номеру телефона"
            onChange={handleChange}
            value={searchValue || ''}
            focusBorderColor="teal.500"
            errorBorderColor="crimson"
            color="#FFF"
            isInvalid={inputInvalid}
            pattern="[0-9]+"
            minLength={11}
            maxLength={12}
            type="text"
            isRequired
          />
        </InputGroup>
        <Button type="submit" form="search" colorScheme="teal">
          Создать чат
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
