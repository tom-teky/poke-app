import { Sprite } from './Sprite/Sprite';
import { Stat } from './Stat/Stat';

export interface PokemonDetails {
  name: string;
  id: number;
  sprites: Sprite;
  types: string;
  location: string;
  stats: Stat;
}
