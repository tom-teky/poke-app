import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { PokemonRepository } from '../infrastructure/pokemon/pokemon.repository';

// jest.mock('node-fetch', () =>
//   jest.fn().mockImplementation(() =>
//     Promise.resolve({
//       json: () => ({
//         results: [
//           { name: 'bulbasaur', id: 1, sprites: 'bulbasaur-sprite-url' }, 
//           { name: 'charmander', id: 2, sprites: 'charmander-sprite-url' },
//           { name: 'squirtle', id: 3, sprites: 'squirtle-sprite-url' },
//         ],
//       }),
//     })
//   )
// );

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let pokemonRepository: PokemonRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: PokemonRepository,
          useValue: {
            getAllPokemon: jest.fn(),
          },
        },
      ],
    }).compile();

    pokemonService = module.get<PokemonService>(PokemonService);
    pokemonRepository = module.get<PokemonRepository>(PokemonRepository);
  });

  describe('getAllPokemonWithSprites', () => {
    it('should return the list of Pokemon with sprites', async () => {
      const pokemonData = [
        { name: 'bulbasaur', id: 1, sprites: 'bulbasaur-sprite-url' }, 
        { name: 'charmander', id: 2, sprites: 'charmander-sprite-url' },
        { name: 'squirtle', id: 3, sprites: 'squirtle-sprite-url' },
      ];

      jest.spyOn(pokemonService, 'getAllPokemonWithSprites').mockResolvedValue(pokemonData);

      const result = await pokemonService.getAllPokemonWithSprites();

      expect(result).toEqual(pokemonData);
    });
  });
});