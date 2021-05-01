import { Color } from './Color';
import { SpeechType } from './SpeechType';

export default interface SpeechMetadata {
  type: SpeechType;
  greenTime: number;
  yellowTime: number;
  redTime: number;
  color: Color;
}
