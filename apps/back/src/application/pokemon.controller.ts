import { Controller, Get, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

export type QueryParams = {
  limit: number,
  offset: number
}

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getAllPokemonWithSprites(@Query() query: QueryParams) {
    return this.pokemonService.getAllPokemonWithSprites(query);
  }
}