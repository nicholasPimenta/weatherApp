import { WeatherProvider } from "./Context/WeatherContext";
import { Home } from "./Pages/Home";

const App = () => {
  return (
    <WeatherProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="p-4 text-center">
          <h1 className="text-3xl font-bold">Previsão do Tempo</h1>
        </header>
        <main className="p-4">
          <Home />
        </main>
      </div>
    </WeatherProvider>
  );
};

export default App;