"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

// Menu data constants
const MENU_DATA = {
  exam: [
    { name: "Punjab Patwari", slug: "punjab-patwari" },
    { name: "SSC", slug: "ssc" },
    { name: "Railway", slug: "railway" },
  ],
  subject: [
    { name: "Mathematics", slug: "mathematics" },
    { name: "Science", slug: "science" },
    { name: "History", slug: "history" },
  ],
};

const Navbar = ({ exams }) => {
  const [openMenus, setOpenMenus] = useState({});
  const menuRef = useRef(null);

  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const closeAll = () => setOpenMenus({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeAll();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative w-full">
      <nav className="h-16 bg-white border-b-2 border-gray-300 relative z-50">
        <div className="max-w-7xl mx-auto h-full flex justify-between items-center px-4 md:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-lg hover:text-amber-600 transition"
          >
            My App
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center h-full">
            <Link
              href="/"
              className="hover:bg-amber-600 hover:text-white rounded px-3 py-5 transition font-medium"
            >
              Home
            </Link>

            {/* Exams Dropdown */}
            <DesktopDropdown
              label="Exams"
              items={exams}
              isOpen={openMenus.exam}
              onToggle={() => toggleMenu("exam")}
              baseLink="exam"
            />

            {/* Subjects Dropdown disabled for now */}
            {/*
            <DesktopDropdown
              label="Subjects"
              items={MENU_DATA.subject}
              isOpen={openMenus.subject}
              onToggle={() => toggleMenu("subject")}
              baseLink="subject"
              alignRight
            />
            */}
          </div>

          {/* Hamburger Icon */}
          <button
            onClick={() => toggleMenu("mobile")}
            className="md:hidden p-2 text-gray-800"
          >
            {openMenus.mobile ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {openMenus.mobile && <MobileMenu items={exams} closeMenu={closeAll} />}
    </div>
  );
};

// Desktop Dropdown Component
const DesktopDropdown = ({
  label,
  items,
  isOpen,
  onToggle,
  alignRight,
  baseLink,
}) => {
  return (
    <div className="relative group h-full flex items-center">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 font-medium hover:bg-amber-600 hover:text-white rounded px-3 py-5 transition"
      >
        {label}
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : "group-hover:rotate-180"}`}
        />
      </button>
      <div
        className={`absolute right-0 top-full pt-2 ${
          isOpen ? "block" : "hidden group-hover:block"
        } z-50`}
      >
        <div className="shadow-xl p-2 rounded-md border border-amber-100 bg-white w-56 max-w-[90vw]">
          {items.slice(0, 5).map((item) => (
            <Link
              key={item.slug}
              href={`/${baseLink}/${item.slug}`}
              className="block py-2 hover:bg-amber-600 hover:text-white px-3 rounded transition"
            >
              {item.name}
            </Link>
          ))}

          {/* Divider */}
          <div className="border-t my-2"></div>

          {/* View All */}
          <Link
            href="/exam"
            className="block py-2 text-center font-semibold text-amber-600 hover:bg-amber-50 rounded"
          >
            View All Exams →
          </Link>
        </div>
      </div>
    </div>
  );
};

// Mobile Menu Component
const MobileMenu = ({ exams, closeMenu }) => (
  <div className="md:hidden absolute left-0 w-full bg-white border-b shadow-lg z-40">
    <div className="p-6 flex flex-col gap-4">
      <Link
        href="/"
        onClick={closeMenu}
        className="font-bold cursor-pointer hover:text-amber-600 transition"
      >
        Home
      </Link>
      <hr className="border-amber-200" />

      <MobileMenuItem
        label="Exams"
        items={exams}
        baseLink="exam"
        closeMenu={closeMenu}
      />
    </div>
  </div>
);

// Mobile Menu Item Component
const MobileMenuItem = ({ label, items, baseLink, closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center font-semibold transition hover:text-amber-600"
      >
        {label}
        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="pl-4 flex flex-col gap-2 border-l-2 border-amber-400 mt-2">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/${baseLink}/${item.slug}`}
              onClick={closeMenu}
              className="py-1 hover:text-amber-600 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
