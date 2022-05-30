export default interface Message {
  text: string;
  title: string;
  type: 'error' | 'succes';
}