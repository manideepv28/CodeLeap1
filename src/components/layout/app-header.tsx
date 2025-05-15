'use client';

import Link from 'next/link';
import { Rocket, Menu, X, Home, LayoutGrid, CalendarCheck, User, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/courses', label: 'Courses', icon: LayoutGrid },
  { href: '/scheduler', label: 'Scheduler', icon: CalendarCheck },
  { href: '/profile', label: 'Profile', icon: User },
];

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <Rocket className="h-7 w-7" />
            <span>CodeLeap</span>
          </Link>
          {/* Placeholder for desktop nav and auth buttons during SSR or before mount */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="h-8 w-20 bg-muted rounded-md animate-pulse"></div>
            <div className="h-8 w-20 bg-muted rounded-md animate-pulse"></div>
            <div className="h-8 w-20 bg-muted rounded-md animate-pulse"></div>
            <div className="h-10 w-24 bg-muted rounded-md animate-pulse"></div>
            <div className="h-10 w-24 bg-muted rounded-md animate-pulse"></div>
          </div>
          <div className="md:hidden">
            <div className="h-10 w-10 bg-muted rounded-md animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/90 transition-colors">
          <Rocket className="h-7 w-7" />
          <span>CodeLeap</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant={pathname === link.href ? "secondary" : "ghost"}
              asChild
              className={cn(
                "text-foreground/80 hover:text-foreground",
                pathname === link.href && "font-semibold text-primary"
              )}
            >
              <Link href={link.href}>
                <link.icon className="mr-2 h-4 w-4" />
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href="/auth/login"><LogIn className="mr-2 h-4 w-4" />Login</Link>
          </Button>
          <Button variant="default" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/auth/register"><UserPlus className="mr-2 h-4 w-4" />Register</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                  <Link href="/" className="flex items-center gap-2 text-lg font-bold text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                    <Rocket className="h-6 w-6" />
                    <span>CodeLeap</span>
                  </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <Button
                      key={link.href}
                      variant={pathname === link.href ? "secondary" : "ghost"}
                      asChild
                      className={cn(
                        "justify-start text-foreground/80 hover:text-foreground",
                        pathname === link.href && "font-semibold text-primary"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link href={link.href}>
                        <link.icon className="mr-3 h-5 w-5" />
                        {link.label}
                      </Link>
                    </Button>
                  ))}
                </nav>
                <div className="flex flex-col space-y-3 pt-4 border-t">
                  <Button variant="outline" asChild onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/auth/login"><LogIn className="mr-2 h-4 w-4" />Login</Link>
                  </Button>
                  <Button variant="default" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/auth/register"><UserPlus className="mr-2 h-4 w-4" />Register</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
