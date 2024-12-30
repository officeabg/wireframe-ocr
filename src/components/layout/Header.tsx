import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search, ScanText } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  isAuthenticated?: boolean;
  userImage?: string;
  onLogin?: () => void;
  onLogout?: () => void;
}

const Header = ({
  isAuthenticated = false,
  userImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
  onLogin = () => {},
  onLogout = () => {},
}: HeaderProps) => {
  return (
    <header className="w-full h-16 border-b bg-white px-4">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ScanText className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">OCR App</span>
        </div>

        <div className="flex-1 max-w-xl px-8">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="w-full pl-8"
              placeholder="Search documents..."
              type="search"
            />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <nav className="flex items-center space-x-4">
            <Link to="/documentation" className="text-sm hover:text-primary">
              Documentation
            </Link>
            <Link to="/pricing" className="text-sm hover:text-primary">
              Pricing
            </Link>
            <Link to="/contact" className="text-sm hover:text-primary">
              Contact
            </Link>
          </nav>

          {isAuthenticated ? (
            <img
              src={userImage}
              alt="User"
              className="h-8 w-8 rounded-full cursor-pointer"
              onClick={onLogout}
            />
          ) : (
            <Button onClick={onLogin}>Sign In</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
