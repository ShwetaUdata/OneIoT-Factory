import { Search, Bell, Menu, Sun, Moon, User, LogIn, LogOut, BarChart2, Home, BarChart3, PieChart, Building2, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";

export const DashboardHeader = () => {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        setIsDark(mediaQuery.matches);
        if (mediaQuery.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      {/* Sidebar fixed to left, full height */}
      <div className="fixed top-0 left-0 h-screen w-16 bg-[#101629] flex flex-col items-center justify-between border-r border-slate-700 z-50">
        <div className="flex flex-col items-center space-y-8 mt-4">
          <div className="w-8 h-8 bg-green-500 flex items-center justify-center rounded-md">
            <Factory className="text-white w-5 h-5" />
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-700">
            <BarChart3 className="text-white w-5 h-5"  />
          </button>
        </div>
      </div>

      {/* Header fixed below sidebar header with left offset */}
      <header className="fixed top-0 left-14 right-0 h-16 bg-[#030517] border-b border-slate-700 flex items-center justify-between px-6 z-40">
       <div className="relative w-[350px]">
          <Search className="absolute left-3 top-1/2 h-5 w-5 text-slate-400 -translate-y-1/2 pointer-events-none" />
          <input type="text" placeholder="Search across platform..." className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-900 text-slate-300 border border-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs bg-muted text-muted-foreground rounded select-none">⌘K</kbd>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover:bg-muted">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 ml-2 cursor-pointer select-none">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">OP</AvatarFallback>
                </Avatar>
                <div className="text-sm font-medium">operator_super_onejot</div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogIn className="w-4 h-4 mr-2" /> Sign in
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};
