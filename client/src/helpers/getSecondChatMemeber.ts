import IChat from "../interfaces/chat"
import { findUsersByIds } from "./findUser"


export default async function getSecondChatMember(chat: IChat, userId: string): Promise<void | string> {
  if (chat?.members?.length > 2) {
    return void 0;
  }

  const secondMember = chat.members.filter(member => member !== userId)[0]

  const user = (await findUsersByIds([secondMember]))[0]
  return user.name 
}