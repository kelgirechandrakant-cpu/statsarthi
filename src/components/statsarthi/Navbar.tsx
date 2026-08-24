import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Menu, X } from "lucide-react";
import { useFirebaseAuth } from "@/integrations/firebase/auth.tsx";
import { useState } from "react";

export function Navbar() {
  const { user, signOut } = useFirebaseAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Mission & About", path: "/about-mission" },
    { title: "Gap Finder", path: "/assessment" },
    { title: "iGOT Pathway", path: "/pathway" },
    { title: "AI Quiz", path: "/quiz" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50 print:hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary-600" />
            <span className="text-xl font-bold text-primary-900 tracking-tight">StatSarthi</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-primary-50 text-primary-700"
                    : "text-surface-600 hover:bg-surface-50 hover:text-primary-900"
                }`}
              >
                {link.title}
              </Link>
            ))}
            
            {user && (
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/dashboard")
                    ? "bg-primary-50 text-primary-700"
                    : "text-surface-600 hover:bg-surface-50 hover:text-primary-900"
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Button variant="outline" onClick={signOut}>Sign Out</Button>
            ) : (
              <Button asChild>
                <Link to="/login">Official Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-surface-500 hover:text-primary-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? "bg-primary-50 text-primary-700"
                    : "text-surface-600 hover:bg-surface-50 hover:text-primary-900"
                }`}
              >
                {link.title}
              </Link>
            ))}
            {user && (
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-surface-600 hover:bg-surface-50 hover:text-primary-900"
              >
                Dashboard
              </Link>
            )}
            <div className="mt-4 px-3">
              {user ? (
                <Button variant="outline" className="w-full" onClick={() => { signOut(); setIsMobileMenuOpen(false); }}>
                  Sign Out
                </Button>
              ) : (
                <Button className="w-full" asChild onClick={() => setIsMobileMenuOpen(false)}>
                  <Link to="/login">Official Login</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
