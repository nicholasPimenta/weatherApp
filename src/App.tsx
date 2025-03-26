import { Home } from "./Pages/Home";
import { WeatherProvider } from "./Context/WeatherProvider";

const App = () => {
  return (
    <WeatherProvider>
      <div className="min-h-screen bg-blue-950 text-white">
        <header className="p-4 text-center">
          <h1 className="text-3xl font-bold mt-4">Previsão do Tempo</h1>
          <h3 className="mt-2">
            Descubra o clima e prepare-se para o que vem pela frente!
          </h3>
        </header>
        <main className="p-5">
          <Home />
        </main>
      </div>
    </WeatherProvider>
  );
};

export default App;
