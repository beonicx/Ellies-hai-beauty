"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Scissors, User, LogOut, ChevronDown, Search, ShoppingBag, Ticket, Coins } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, loading, login, register, logout } = useAuth();
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleSearchOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleSearchOutside);
    return () => document.removeEventListener("mousedown", handleSearchOutside);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/services?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
      setOpen(false);
    }
  }

  function toggleSearch() {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }

  function openLogin() {
    setAuthMode("login");
    setShowAuthModal(true);
    setOpen(false);
  }

  function openRegister() {
    setAuthMode("register");
    setShowAuthModal(true);
    setOpen(false);
  }

  function handleLogout() {
    logout();
    setShowProfileMenu(false);
  }

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-sm shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Scissors
              size={22}
              className="text-rose-gold transition-transform duration-300 group-hover:rotate-45"
            />
            <span className="font-display text-xl text-espresso tracking-wide">
              <span className="text-rose-gold">Ellies</span> Hair & Beauty
            </span>
          </Link>

          {/* Desktop Nav - Centered Links */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm tracking-widest uppercase text-mocha hover:text-rose-gold transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search + Auth - Desktop (Right) */}
          <div className="hidden md:flex items-center gap-5">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex items-center bg-white/80 border border-champagne rounded-md overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                className="w-56 px-4 py-2 font-sans text-sm text-espresso placeholder:text-mocha/50 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="px-3 py-2 text-rose-gold hover:text-espresso transition-colors"
              >
                <Search size={16} />
              </button>
            </form>

            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 group"
                >
                  <div className="w-9 h-9 rounded-full bg-rose-gold text-cream flex items-center justify-center font-sans text-sm font-medium transition-all duration-300 group-hover:bg-espresso">
                    {userInitial}
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-mocha transition-transform duration-200 ${
                      showProfileMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-champagne overflow-hidden animate-fade-in">
                    <div className="px-4 py-3 border-b border-champagne">
                      <p className="font-sans text-sm font-medium text-espresso truncate">
                        {user.name}
                      </p>
                      <p className="font-sans text-xs text-mocha truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 font-sans text-sm text-mocha hover:bg-cream hover:text-rose-gold transition-colors duration-200"
                    >
                      <User size={16} />
                      My Dashboard
                    </Link>
                    <Link
                      href="/orders"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 font-sans text-sm text-mocha hover:bg-cream hover:text-rose-gold transition-colors duration-200"
                    >
                      <ShoppingBag size={16} />
                      Orders
                    </Link>
                    <Link
                      href="/coupons"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 font-sans text-sm text-mocha hover:bg-cream hover:text-rose-gold transition-colors duration-200"
                    >
                      <Ticket size={16} />
                      Coupons
                    </Link>
                    <Link
                      href="/supercoins"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 font-sans text-sm text-mocha hover:bg-cream hover:text-rose-gold transition-colors duration-200"
                    >
                      <Coins size={16} />
                      SuperCoins
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 font-sans text-sm text-mocha hover:bg-cream hover:text-rose-gold transition-colors duration-200 border-t border-champagne"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openLogin}
                className="flex items-center gap-2 font-sans text-sm tracking-widest uppercase text-mocha hover:text-rose-gold transition-colors duration-300"
              >
                <User size={16} />
                Login
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-espresso"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden bg-cream border-t border-champagne px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm tracking-widest uppercase text-mocha hover:text-rose-gold transition-colors duration-300"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Search - Mobile */}
            <form
              onSubmit={handleSearch}
              className="flex items-center border border-champagne rounded-lg overflow-hidden bg-white"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                className="flex-1 px-4 py-2.5 font-sans text-sm text-espresso placeholder:text-mocha/50 focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-2.5 text-rose-gold hover:text-espresso transition-colors"
              >
                <Search size={16} />
              </button>
            </form>

            {/* Auth Section - Mobile */}
            {user ? (
              <>
                <div className="flex items-center gap-3 py-2 border-t border-champagne pt-4">
                  <div className="w-9 h-9 rounded-full bg-rose-gold text-cream flex items-center justify-center font-sans text-sm font-medium">
                    {userInitial}
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-espresso">
                      {user.name}
                    </p>
                    <p className="font-sans text-xs text-mocha">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  className="font-sans text-sm tracking-widest uppercase text-mocha hover:text-rose-gold transition-colors duration-300"
                  onClick={() => setOpen(false)}
                >
                  My Dashboard
                </Link>
                <Link
                  href="/orders"
                  className="font-sans text-sm tracking-widest uppercase text-mocha hover:text-rose-gold transition-colors duration-300"
                  onClick={() => setOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  href="/coupons"
                  className="font-sans text-sm tracking-widest uppercase text-mocha hover:text-rose-gold transition-colors duration-300"
                  onClick={() => setOpen(false)}
                >
                  Coupons
                </Link>
                <Link
                  href="/supercoins"
                  className="font-sans text-sm tracking-widest uppercase text-mocha hover:text-rose-gold transition-colors duration-300"
                  onClick={() => setOpen(false)}
                >
                  SuperCoins
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="text-left font-sans text-sm tracking-widest uppercase text-mocha hover:text-rose-gold transition-colors duration-300"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={openLogin}
                className="flex items-center gap-2 font-sans text-sm tracking-widest uppercase text-mocha hover:text-rose-gold transition-colors duration-300 border-t border-champagne pt-4"
              >
                <User size={16} />
                Login / Register
              </button>
            )}

          </div>
        )}
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          onClose={() => setShowAuthModal(false)}
          login={login}
          register={register}
        />
      )}
    </>
  );
}

function AuthModal({ mode, setMode, onClose, login, register }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(name, email, password, phone);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function switchMode() {
    setMode(mode === "login" ? "register" : "login");
    setError("");
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-espresso/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-cream rounded-lg shadow-2xl w-full max-w-md mx-4 animate-fade-up overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-4 text-center">
          <Scissors
            size={28}
            className="text-rose-gold mx-auto mb-3"
          />
          <h2 className="font-display text-2xl text-espresso">
            {mode === "login" ? "Welcome Back" : "Join Us"}
          </h2>
          <p className="font-sans text-sm text-mocha mt-1">
            {mode === "login"
              ? "Sign in to your account"
              : "Create your account"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-sans rounded-md px-4 py-2">
              {error}
            </div>
          )}

          {mode === "register" && (
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-mocha mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-champagne rounded-md font-sans text-sm text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-rose-gold transition-colors"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-mocha mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-champagne rounded-md font-sans text-sm text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-rose-gold transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-mocha mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-champagne rounded-md font-sans text-sm text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-rose-gold transition-colors"
              placeholder="Min 6 characters"
            />
          </div>

          {mode === "register" && (
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-mocha mb-1.5">
                Phone <span className="normal-case tracking-normal">(optional)</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-champagne rounded-md font-sans text-sm text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-rose-gold transition-colors"
                placeholder="Your phone number"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-rose-gold text-cream py-3 font-sans text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:bg-espresso disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
          >
            {submitting
              ? "Please wait..."
              : mode === "login"
              ? "Sign In"
              : "Create Account"}
          </button>

          <p className="text-center font-sans text-sm text-mocha">
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              type="button"
              onClick={switchMode}
              className="text-rose-gold hover:text-espresso font-medium transition-colors"
            >
              {mode === "login" ? "Register" : "Sign In"}
            </button>
          </p>
        </form>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-mocha hover:text-espresso transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
