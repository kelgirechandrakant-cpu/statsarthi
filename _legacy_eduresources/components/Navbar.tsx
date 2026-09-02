import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {    LogOut, , Menu,  Bot, LayoutDashboard, Brain, GraduationCap, PenTool } from "lucide-react";
import { useFirebaseAuth } from "@/integrations/firebase/auth";
import { toast } from "sonner";
import { useState } from "react";
import logo from "@/assets/logo.jpg";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useFirebaseAuth();
  const isLoggedIn = !!user;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate("/");
    setMobileMenuOpen(false);
  };

  const navLinks = [
    // Learner Journey
    { to: "/dashboard", icon: LayoutDashboard, label: "My Dashboard" },
    { to: "/assessment", icon: Brain, label: "My Diagnostics" },
    { to: "/pathway", icon: GraduationCap, label: "My Pathway" },
    
    // NSSTA Trainer / Admin Journey
    { to: "/quiz", icon: PenTool, label: "AI Content Creator" },
    { to: "/admin", icon: LayoutDashboard, label: "Admin Hub" },
    
    
    /*
    { to: "/resources", icon: , label: "Resources" },
    { to: "/notes", icon:  label: "Notes" },
    { to: "/assignments", icon:  label: "Assignments" },
    { to: "/pyqs", icon:  label: "PYQs" },
    { to: "/practice", icon:  label: "Practice Arena" },
    { to: "/ai-tutor", icon: Bot, label: "AI Tutor" },
    */
  ];
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img alt="EduResources" className="h-8 w-8 rounded-full object-contain" src="/images/a4ffcb23-8afd-41d6-b899-21972e4fc180.png" />
          <span className="font-bold text-xl">EduResources</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => <Link key={link.to} to={link.to} className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>)}
        </div>

        <div className="flex items-center gap-2">
          <a href="https://www.linkedin.com/in/chandrakant-kelgire/" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center justify-center h-8 rounded-full bg-[#0A66C2] text-white hover:bg-[#004182] transition-colors font-thin text-center ml-4 px-[10px] mx-px text-sm">
            My LinkedIn
          </a>
          {!isLoggedIn ? <Link to="/login" className="hidden sm:block">
              <Button variant="default" size="sm">Login</Button>
            </Link> : <Button variant="outline" onClick={handleLogout} className="hidden sm:flex gap-2" size="sm">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>}
          <Link to="/auth" className="hidden sm:block">
            <Button variant="ghost" size="sm">Admin</Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map(link => <Link key={link.to} to={link.to} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-base font-medium hover:text-primary transition-colors py-2">
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>)}
                
                <div className="border-t pt-4 mt-2 flex flex-col gap-3">
                  <a href="https://www.linkedin.com/in/chandrakant-kelgire/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-10 rounded-full bg-[#0A66C2] text-white hover:bg-[#004182] transition-colors font-medium">
                    My LinkedIn
                  </a>
                  {!isLoggedIn ? <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="default" className="w-full">Login</Button>
                    </Link> : <Button variant="outline" onClick={handleLogout} className="w-full gap-2">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>}
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">Admin</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>;
};