import Speech from './Speech';

export default class PreparedSpeech implements Speech {
  greenTime: number = 5 * 60;
  yellowTime: number = 6 * 60;
  redTime: number = 7 * 60;
}
