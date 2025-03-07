import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MdLogin } from "react-icons/md";
import logo from "../assets/logo.png";

const navigation = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Safety", path: "/safety" },
  { name: "Team", path: "/team" },
  { name: "Contact", path: "/contact" }
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-[#4dfad4] shadow-md">
    <nav className="flex items-center justify-between p-4 lg:px-4">
    <div className="flex lg:flex-1 items-center">
    <img src={logo} alt="Logo" className="h-10 w-auto object-contain rounded-lg"/>
      <Link to="/" className="text-lg font-bold text-black ml-2">
        GoVetrix
      </Link>
    </div>

    <div className="flex lg:hidden">
      <button
        type="button"
        onClick={() => setMobileMenuOpen(true)}
        className="p-1 text-black"
      >
        <Bars3Icon className="w-5 h-5" />
      </button>
    </div>

    <div className="hidden lg:flex lg:gap-x-8">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`text-lg font-medium text-black pb-1 ${
            location.pathname === item.path ? "border-b-2 border-black" : ""
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>

    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
      <Link to="/login" className="text-lg font-medium text-black flex items-center gap-1">
        Log in <MdLogin className="inline" />
      </Link>
    </div>
  </nav>

  {/* Mobile Menu */}
  <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full bg-[#4dfad4] p-4 sm:max-w-sm">
      <div className="flex items-center justify-between">
        <img src="src/assets/logo.png" alt="Logo" className="h-10 w-auto" />
        <Link to="/" className="text-lg font-bold text-black">GoVetrix</Link>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="p-1 text-black"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`block py-1 text-base font-medium text-black ${
              location.pathname === item.path ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </DialogPanel>
  </Dialog>
</header>
  );
}
