import Speech from './Speech';

export default class IceBreaker implements Speech {
  greenTime: number = 4 * 60;
  yellowTime: number = 5 * 60;
  redTime: number = 6 * 60;
}
