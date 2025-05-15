import type { ReactNode } from 'react';
import { AppHeader } from './app-header';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-secondary text-secondary-foreground py-6 text-center">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} CodeLeap. All rights reserved.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Empowering the next generation of coders.
          </p>
        </div>
      </footer>
    </div>
  );
}
