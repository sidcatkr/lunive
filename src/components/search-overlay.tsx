"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X } from "lucide-react";

export default function SearchOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Handle click outside and escape key to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchQuery("");
    }
  };

  const handleClearOrClose = () => {
    if (searchQuery) {
      setSearchQuery("");
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={toggleSearch}
        className="flex items-center text-sm text-white hover:text-gray-300 transition-colors"
        aria-label="Search"
      >
        <Search className="w-4 h-4 mr-2" />
        <span>Search</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <motion.div
              ref={overlayRef}
              className="w-full max-w-2xl mx-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="relative">
                <div className="relative flex items-center rounded-full bg-gray-900 shadow-lg overflow-hidden">
                  <Search className="absolute left-4 w-5 h-5 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for anything..."
                    className="w-full py-4 pl-12 pr-12 bg-transparent text-white text-lg outline-none"
                  />
                  <button
                    onClick={handleClearOrClose}
                    className="absolute right-4 p-1 rounded-full hover:bg-gray-800"
                    aria-label={searchQuery ? "Clear search" : "Close search"}
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Search results would go here */}
              {searchQuery && (
                <motion.div
                  className="mt-4 bg-gray-900 rounded-lg shadow-lg p-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-gray-400">
                    {searchQuery.length > 0
                      ? `Searching for "${searchQuery}"...`
                      : "Start typing to search"}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
