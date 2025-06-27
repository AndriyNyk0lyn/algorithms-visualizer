import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <Header />
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
