import { AnimalKana } from './Animal';

export interface OmikujiResult {
  message: string;
  animal: AnimalKana;
  url: string;
}
