import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Pokemon } from '../../domain/pokemon/pokemon.entity';

@Injectable()
export class PokemonRepository {
  async getAllPokemon(): Promise<Pokemon[]> {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const data = response.data.results;

    const pokemonList: Pokemon[] = [];

    for (const result of data) {
      const pokemonName = result.name;
      const pokemon = await this.getPokemonByName(pokemonName);
      pokemonList.push(pokemon);
    }

    return pokemonList;
  }

  private async getPokemonByName(name: string): Promise<Pokemon> {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = response.data;

    const pokemon: Pokemon = {
      name: data.name,
      id: data.id,
      sprites: data['official-artwork'].front_default,
    };

    return pokemon;
  }
}