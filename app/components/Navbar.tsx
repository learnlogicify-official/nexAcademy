"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  BellIcon,
  MoonIcon,
  SunIcon,
  MagnifyingGlassIcon,
  PersonIcon,
  BookmarkIcon,
  TimerIcon,
  StarIcon,
  PlayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  GearIcon,
  ExitIcon,
  HamburgerMenuIcon,
  Cross1Icon
} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  };
}

export default function Navbar() {
  const { data: session } = useSession() as { data: Session | null };
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <HamburgerMenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => handleNavigation('/dashboard')}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => handleNavigation('/courses')}
                  >
                    Courses
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => handleNavigation('/problems')}
                  >
                    Problems
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => handleNavigation('/contests')}
                  >
                    Contests
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <div className="text-xl font-extrabold text-gray-900 tracking-tight">NexAcademy</div>
          </div>

          {/* Main Navigation - Hidden on Mobile */}
          <div className="hidden md:flex space-x-4">
            <Button 
              variant="ghost" 
              className="text-gray-700 font-medium text-sm"
              onClick={() => router.push('/dashboard')}
            >
              Dashboard
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-700 font-medium text-sm"
              onClick={() => router.push('/courses')}
            >
              Courses
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-700 font-medium text-sm"
              onClick={() => router.push('/problems')}
            >
              Problems
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-700 font-medium text-sm"
              onClick={() => router.push('/contests')}
            >
              Contests
            </Button>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 w-64 font-medium text-sm"
              />
            </div>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <BellIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="hidden md:flex">
              {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                    <AvatarFallback className="font-semibold text-sm">{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-semibold text-sm">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="font-medium text-sm"
                  onClick={() => router.push('/profile')}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="font-medium text-sm"
                  onClick={() => router.push('/settings')}
                >
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="font-medium text-sm"
                  onClick={handleSignOut}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
} 