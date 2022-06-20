import axios from 'axios';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountButton from '../../components/AccountButton';
import BlueButton from '../../components/BlueButton';
import Input from '../../components/Input';
import useUser from '../../hook/useUser';
import { User } from '../../interfaces/user';
import './search.css'

const Search: FC = () => {
  const [results, setResults] = useState<User[]>([]);
  const [value, setValue] = useState<string>('');
  const [emptyMessage, setEmptyMessage] = useState<string>('Почніть пошук користувача')
  const { loginedUser } = useUser();

  async function handleFind() {
    if (!value) {
      setEmptyMessage('Введіть текст')
      return;
    }

    const response = await axios({
      method: 'get',
      url: `http://localhost:5000/user-by-username/${value}`,
    });
    const data = await response.data

    if(!data.toString()) {
      setEmptyMessage('Нічого не знайдено')
    }

    setResults(data);
  }

  return (
    <div className="search">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="search__input-block"
      >
        <Input placeholder='Логін користувача' value={value} setValue={setValue} />

        <BlueButton btnType='button' cb={handleFind} className='search__button'>Знайти</BlueButton>
      </form>

      {results.toString() ? <div className="search__results">
        
        {results.map((item) => {
          return (
            <Link
              key={item._id}
              className='search__results-item'
              to={
                item._id === loginedUser?._id
                  ? '/profile'
                  : `/profile/${item._id}`
              }
            >
              <AccountButton hasContextMenu={false} user={item} />
              <p className='search__results-name'>{item.name}</p>
            </Link>
          );
        })}
        
      </div>
      : <div className='search__empty-message'>{emptyMessage}</div>}
    </div>
  );
};

export default Search;
