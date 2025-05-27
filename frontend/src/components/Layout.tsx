import { Link, useLocation } from "wouter";
import { ReactNode } from "react";
import { MobileMenuToggle } from "@/components/ui/menu-toggle";
import { TbBrandTelegram } from "react-icons/tb";
import { LuHome, LuLayoutDashboard, LuGithub } from "react-icons/lu";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-white p-4 flex items-center">
        <Link href="/" className="flex items-center">
          <TbBrandTelegram className="text-2xl mr-2" />
          <h1 className="text-lg font-medium">Ethiopia News & Weather Bot</h1>
        </Link>
        <div className="flex-1"></div>
        
        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenuToggle />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link 
            href="/" 
            className={`flex items-center space-x-1 p-2 rounded hover:bg-primary-foreground/10 transition-colors ${
              location === '/' ? 'bg-primary-foreground/20' : ''
            }`}
          >
            <LuHome className="text-lg" />
            <span>Home</span>
          </Link>
          <Link 
            href="/dashboard" 
            className={`flex items-center space-x-1 p-2 rounded hover:bg-primary-foreground/10 transition-colors ${
              location === '/dashboard' ? 'bg-primary-foreground/20' : ''
            }`}
          >
            <LuLayoutDashboard className="text-lg" />
            <span>Dashboard</span>
          </Link>
          <a 
            href="https://github.com/username/ethiopia-news-weather-bot" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-1 p-2 rounded hover:bg-primary-foreground/10 transition-colors"
          >
            <LuGithub className="text-lg" />
            <span>GitHub</span>
          </a>
        </nav>
      </header>
      
      {/* Mobile Navigation Drawer - Shows when menu is toggled */}
      <div id="mobile-nav" className="fixed inset-0 bg-black/50 z-20 hidden">
        <div className="bg-white w-64 h-full p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-primary">Menu</h2>
            <button 
              onClick={() => {
                document.getElementById('mobile-nav')?.classList.add('hidden');
              }}
              className="text-neutral-400"
            >
              ✕
            </button>
          </div>
          
          <nav className="flex flex-col space-y-2">
            <Link 
              href="/" 
              className={`flex items-center space-x-2 p-3 rounded ${
                location === '/' ? 'bg-primary/10 text-primary' : 'text-neutral-700 hover:bg-neutral-100'
              }`}
              onClick={() => {
                document.getElementById('mobile-nav')?.classList.add('hidden');
              }}
            >
              <LuHome className="text-lg" />
              <span>Home</span>
            </Link>
            <Link 
              href="/dashboard" 
              className={`flex items-center space-x-2 p-3 rounded ${
                location === '/dashboard' ? 'bg-primary/10 text-primary' : 'text-neutral-700 hover:bg-neutral-100'
              }`}
              onClick={() => {
                document.getElementById('mobile-nav')?.classList.add('hidden');
              }}
            >
              <LuLayoutDashboard className="text-lg" />
              <span>Dashboard</span>
            </Link>
            <a 
              href="https://github.com/username/ethiopia-news-weather-bot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-3 rounded text-neutral-700 hover:bg-neutral-100"
              onClick={() => {
                document.getElementById('mobile-nav')?.classList.add('hidden');
              }}
            >
              <LuGithub className="text-lg" />
              <span>GitHub</span>
            </a>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white p-4 border-t border-neutral-200 text-center text-sm text-neutral-500">
        <p>Ethiopia News & Weather Telegram Bot • &copy; {new Date().getFullYear()}</p>
        <p className="text-xs mt-1">
          Powered by <a href="https://core.telegram.org/bots/api" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Telegram Bot API</a>
        </p>
      </footer>
    </div>
  );
}
