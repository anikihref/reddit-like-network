import axios from 'axios';
import { User } from '../interfaces/user';



export default async function findUser(username: string, password: string): Promise<User | null> {
  const response = await axios({
    method: 'post',
    url: 'http://localhost:5000/user-by-password',
    data: {
      username,
      password
    }
  })

  return response.data;
};


export async function findUsersByIds(userIds: string[]): Promise<User[]> {
  const usersResponse = await axios({
    method: 'post',
    url: `http://localhost:5000/users`,
    data: {
      ids: userIds
    }
  })


  return await usersResponse.data
}