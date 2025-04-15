
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // TODO: Substituir por sistema de autenticação real
  const user = {
    name: "Carlos Silva",
    role: "Gerente de Produção",
    avatar: "https://avatars.githubusercontent.com/u/124599?v=4"
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(true)}
            className="md:ml-0"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/58b8e536-401c-4bd9-9fad-452ff0b1adea.png" 
              alt="DP PAINELIZAÇÃO Logo" 
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <span className="font-display font-semibold tracking-tight text-sm md:text-base">
              DP <span className="text-primary">PAINELIZAÇÃO</span>
            </span>
          </Link>
        </div>

        {/* Avatar à direita */}
        <Avatar className="cursor-pointer h-8 w-8 md:h-10 md:w-10">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>CS</AvatarFallback>
        </Avatar>
      </div>
      
      <MobileMenu open={isMenuOpen} onOpenChange={setIsMenuOpen} />
    </header>
  );
};

export default Navbar;
