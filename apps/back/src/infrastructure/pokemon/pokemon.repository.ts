import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PokemonSprite } from '../../domain/pokemon/pokemonSprite.entity';

@Injectable()
export class PokemonRepository {
  async getAllPokemon(): Promise<PokemonSprite[]> {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const data = response.data.results;

    const pokemonList: PokemonSprite[] = [];

    for (const result of data) {
      const pokemonName = result.name;
      const pokemon = await this.getPokemonByName(pokemonName);
      pokemonList.push(pokemon);
    }

    return pokemonList;
  }

  private async getPokemonByName(name: string): Promise<PokemonSprite> {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    );
    const data = response.data;

    const pokemon: PokemonSprite = {
      name: data.name,
      id: data.id,
      sprites: data['official-artwork'].front_default,
    };

    return pokemon;
  }
}
