import { IMessage } from '../components/Message/Message';

const sortMessageArray = (a: IMessage, b: IMessage) => {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
};

export default sortMessageArray;
