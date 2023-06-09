import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Pokemon } from '../domain/pokemon/pokemon.entity';
import { QueryParams } from './pokemon.controller';
import qs from 'node:querystring';

@Injectable()
export class PokemonService {
  async getAllPokemonWithSprites({ limit, offset }: QueryParams ): Promise<Pokemon[]> {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
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
      sprites: data.sprites.front_default,
    };

    return pokemon;
  }
}