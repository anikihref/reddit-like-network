import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getSecondChatMember from '../helpers/getSecondChatMemeber';
import useUser from '../hook/useUser';
import IChat from '../interfaces/chat';
import BlueButton from './BlueButton';

const ChatItem: React.FC<{ chat: IChat }> = ({ chat }) => {
  const { loginedUser } = useUser();
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    (async () => {
      const secondMember = await getSecondChatMember(chat, loginedUser?._id!);

      if (chat.title) {
        setTitle(chat.title);
      } else if (secondMember) {
        setTitle(secondMember);
      } else {
        setTitle('Назву чату не вказано');
      }
    })();
  }, []);

  return (
    <BlueButton
      btnType="link"
      to={`/chats/${chat._id}`}
      className="chats__item"
    >

        <h3 className="chats__item-title">{chat.title || title}</h3>

    </BlueButton>
  );
};

export default ChatItem;
