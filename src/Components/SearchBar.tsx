import { useState } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void; // Função que será chamada quando o usuário buscar uma cidade
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(city); // Passa o nome da cidade para a função onSearch do Home.tsx
    setCity(""); // Limpa o campo de pesquisa após o envio
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center gap-2 pb-4">
        <input
          type="text"
          placeholder="Digite a cidade..."
          className="p-2 border border-purple-600 rounded outline-0 w-50 md:w-75 lg:w-100"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-800 transition text-white p-2 rounded border-none cursor-pointer"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};
