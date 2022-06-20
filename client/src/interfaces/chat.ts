export default interface IChat {
  title: string;
  lastMessage: string | null;
  _id: string;
  members: string[];
  messages: string[];
}