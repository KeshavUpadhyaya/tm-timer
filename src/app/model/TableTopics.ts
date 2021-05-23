import Speech from './Speech';

export default class TableTopics implements Speech {
  greenTime: number = 1 * 60;
  yellowTime: number = 1 * 60 + 30;
  redTime: number = 2 * 60;
}
