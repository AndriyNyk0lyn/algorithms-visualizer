import { ModeToggle } from "@/components/ui/mode-toggle";

export function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b bg-background/80 backdrop-blur sticky top-0 z-50">
      <h1 className="text-2xl font-bold tracking-tight">Algorithms Visualizer</h1>
      <ModeToggle />
    </header>
  );
} 