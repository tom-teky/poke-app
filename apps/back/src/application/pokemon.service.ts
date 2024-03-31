import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { PokemonSprite } from '../domain/pokemon/pokemonSprite.entity';
import { QueryParams } from './pokemon.controller';
import { PokemonDetails } from 'src/domain/pokemon/pokemonDetails.entity';

@Injectable()
export class PokemonService {
  private readonly logger = new Logger(PokemonService.name);
  async getAllPokemonWithSprites({
    limit,
    offset,
  }: QueryParams): Promise<PokemonSprite[]> {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    );
    const data = response.data.results;

    const pokemonList: PokemonSprite[] = [];

    for (const result of data) {
      const pokemonName = result.name;
      const pokemon = await this.getPokemonByName(pokemonName);
      pokemonList.push(pokemon);
    }
    return pokemonList;
  }

  async getPokemonDetails(name: string): Promise<PokemonDetails> {
    this.logger.log(name);
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    );
    const data = response.data;

    const pokemon: PokemonDetails = {
      name: data.name,
      id: data.id,
      sprites: {
        officialArt: data.sprites.other['official-artwork'].front_default,
        backDefault: data.sprites.back_default,
        backShiny: data.sprites.back_shiny,
        frontDefault: data.sprites.front_default,
        frontShiny: data.sprites.front_shiny,
      },
      types: data.types[0].type.name,
      location: data.location_area_encounters,
      stats: {
        health: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        attackSpe: data.stats[3].base_stat,
        defenseSpe: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
      },
    };
    return pokemon;
  }

  private async getPokemonByName(name: string): Promise<PokemonSprite> {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    );
    const data = response.data;

    const pokemon: PokemonSprite = {
      name: data.name,
      id: data.id,
      sprites: data.sprites.front_default,
    };

    return pokemon;
  }
}
