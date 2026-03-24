import {
  Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
  Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle,
} from "@heroui/react";
import { Home2, People, VideoPlay, Shop, Moon, Sun1, Setting2 } from "iconsax-reactjs";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Toaster } from "react-hot-toast";
import { useTheme } from "../../Context/ThemeContext";

const navItems = [
  { to: "/",           icon: <Home2   size="28" variant="Outline" />, label: "Feed"        },
  { to: "/friends",    icon: <People  size="28" variant="Outline" />, label: "Friends"     },
  { to: "/videos",     icon: <VideoPlay size="28" variant="Outline" />, label: "Videos"   },
  { to: "/marketplace",icon: <Shop    size="28" variant="Outline" />, label: "Marketplace" },
];

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const id = setInterval(() => setToken(localStorage.getItem("userToken")), 1000);
    return () => clearInterval(id);
  }, []);

  const logout = () => {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  };

  return (
    <>
      <Toaster position="top-right" />
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        className="bg-white dark:bg-[#242526] shadow-sm h-14 transition-colors"
      >
        {/* Brand */}
        <NavbarContent justify="start" className="gap-2">
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
          <NavbarBrand as={Link} to="/" className="flex items-center gap-1">
            <div className="bg-[#1877F2] rounded-full p-1">
              <span className="text-white font-black text-2xl px-1">f</span>
            </div>
          </NavbarBrand>
        </NavbarContent>

        {/* Center nav icons */}
        <NavbarContent className="hidden sm:flex gap-2" justify="center">
          {navItems.map(item => (
            <NavbarItem key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                title={item.label}
                className={({ isActive }) =>
                  `p-2 px-6 transition-colors flex items-center ${
                    isActive
                      ? "text-[#1877F2] border-b-4 border-[#1877F2]"
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  }`
                }
              >
                {item.icon}
              </NavLink>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Right controls */}
        <NavbarContent justify="end" className="gap-1">
          <NavbarItem>
            <Button isIconOnly variant="light" onPress={toggleTheme} className="text-gray-500 dark:text-gray-400">
              {theme === "dark" ? <Sun1 size="22" variant="Bold" /> : <Moon size="22" variant="Bold" />}
            </Button>
          </NavbarItem>

          {token ? (
            <NavbarItem className="flex items-center gap-1">
              <Button isIconOnly variant="light" className="text-gray-500 dark:text-gray-400" onPress={() => navigate("/settings")}>
                <Setting2 size="22" variant="Bold" />
              </Button>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform hover:scale-110"
                    color="primary"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=me"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="signed" className="h-14 gap-2" isReadOnly>
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold text-primary">Ahmed Mohamed</p>
                  </DropdownItem>
                  <DropdownItem key="profile" onPress={() => navigate("/profile")}>
                    👤 My Profile
                  </DropdownItem>
                  <DropdownItem key="friends" onPress={() => navigate("/friends")}>
                    👥 Friends
                  </DropdownItem>
                  <DropdownItem key="settings" onPress={() => navigate("/settings")}>
                    ⚙️ Settings
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onPress={logout}>
                    🚪 Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          ) : (
            <div className="flex gap-2">
              <Button as={Link} to="/login" variant="light" size="sm" className="font-semibold dark:text-white">Login</Button>
              <Button as={Link} to="/register" color="primary" size="sm" className="font-bold">Sign Up</Button>
            </div>
          )}
        </NavbarContent>

        {/* Mobile menu */}
        <NavbarMenu className="pt-6 gap-2">
          {navItems.map(item => (
            <NavbarMenuItem key={item.to}>
              <Link
                className="w-full text-base font-semibold flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon} {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <Link className="w-full text-base font-semibold flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg" to="/settings" onClick={() => setIsMenuOpen(false)}>
              <Setting2 size="24" /> Settings
            </Link>
          </NavbarMenuItem>
          {token && (
            <NavbarMenuItem className="mt-4">
              <Button color="danger" variant="flat" className="w-full font-bold" onPress={logout}>Log Out</Button>
            </NavbarMenuItem>
          )}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
