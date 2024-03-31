import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./components/Card/Card";
import "./App.css";

interface Pokemon {
  name: string;
  id: number;
  sprites: string;
}

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<number>(0);

  const handlePokemons = async () => {
    const res = await axios.get(
      `http://localhost:3000/pokemon?limit=9&offset=${nextUrl}`
    );

    setPokemons((p) => [
      ...new Map([...p, ...res.data].map((item) => [item.id, item])).values(),
    ]);
    setNextUrl((offset) => offset + 9);
  };

  useEffect(() => {
    handlePokemons();
  }, []);

  return (
    <>
      <h1>Pokédex App</h1>
      <section className="container">
        {pokemons.map((p) => (
          <Card key={p.id} title={p.name} imgLink={p.sprites} />
        ))}
      </section>
      <button onClick={handlePokemons}>Charger</button>
    </>
  );
}

export default App;
