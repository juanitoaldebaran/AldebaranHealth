import useAuth from "@/hooks/useAuth"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { LogOut, User, User2Icon } from "lucide-react";

const UserMenu: React.FC = () => {
    const {user, isAuthenticated, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    if (!isAuthenticated) {
        return (
            <Link to={"/signup"} className="font-light p-2 duration-200 text-[14px] bg-blue-500 rounded-lg text-white hover:bg-blue-700 duration-200">
                    Create an account
            </Link>
        )
    }
    return (
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center justify-center cursor-pointer">
          <Avatar className="h-8 w-8 flex items-center gap-2">
            <AvatarFallback>
              {user?.userName?.charAt(0).toUpperCase() ??
                user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
            <User2Icon />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span className="text-blue-600">{user?.userName}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    )
}

export default UserMenu;