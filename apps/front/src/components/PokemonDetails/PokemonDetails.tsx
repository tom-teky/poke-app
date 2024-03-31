import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Sprite = {
  officialArt: string;
  backDefault: string;
  backShiny: string;
  frontDefault: string;
  frontShiny: string;
};

type Stat = {
  health: string;
  attack: string;
  defense: string;
  attackSpe: string;
  defenseSpe: string;
  speed: string;
};

type QueryParams = {
  altTitle: string;
  name: string;
  zone: string;
  stats: Stat;
  types: string;
  sprites: Sprite;
};

export const PokemonDetails = () => {
  const [pokemonDetails, setPokemonDetails] = useState<
    QueryParams | undefined
  >();

  const { pokemonName } = useParams();

  const handlePokemonDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/pokemon/${pokemonName}`
      );
      console.log(res.data);
      setPokemonDetails(res.data);
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
    }
  };

  useEffect(() => {
    handlePokemonDetails();
  }, []);

  if (pokemonDetails) {
    return (
      <>
        <img
          className=""
          src={pokemonDetails.sprites.officialArt}
          alt={`${pokemonDetails?.name} image`}
        />
        <h2>{pokemonDetails.name}</h2>
        <div className="spritesContainer">
          <img src={pokemonDetails.sprites.frontDefault} className="spritesContainer_image" alt="front_default" />
          <img src={pokemonDetails.sprites.backDefault} className="spritesContainer_image" alt="back_default" />
          <img src={pokemonDetails.sprites.frontShiny} className="spritesContainer_image" alt="front_shiny" />
          <img src={pokemonDetails.sprites.backShiny} className="spritesContainer_image" alt="front_default" />
        </div>
        <p>{pokemonDetails.types}</p>


        <ul>
          <li>Health: {pokemonDetails?.stats.health}</li>
          <li>Attack: {pokemonDetails?.stats.attack}</li>
          <li>Defense: {pokemonDetails?.stats.defense}</li>
          <li>Attack Spe: {pokemonDetails?.stats.attackSpe}</li>
          <li>Defense Spe: {pokemonDetails?.stats.defenseSpe}</li>
          <li>Speed: {pokemonDetails?.stats.speed}</li>
        </ul>
      </>
    );
  }
  return <div>Loading...</div>;
};
