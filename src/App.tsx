import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import AlgorithmConfig from "./components/AlgorithmConfig";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <Header />
      <main className="container mx-auto">
        <AlgorithmConfig />
      </main>
    </ThemeProvider>
  );
}

export default App;
