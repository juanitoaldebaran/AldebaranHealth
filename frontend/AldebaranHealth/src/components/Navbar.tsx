import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Stethoscope } from "lucide-react";
import UserMenu from "./UserMenu";

interface NavLinkType {
    name: string;
    path: string;
}

const navLinks: NavLinkType[] = [
    { name: "About", path: "/about" },
    { name: "AI Services", path: "/services" },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <header className={`fixed z-50 top-0 w-full transition-all duration-300 ${
            isScrolled 
                ? 'backdrop-blur-md bg-white/90 shadow-sm border-b border-gray-200' 
                : 'backdrop-blur-sm bg-white/80 border-b-2 border-gray-100'
        }`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <Stethoscope className="w-4 h-4 text-white" />
                        </div>
                        <Link 
                            to="/" 
                            className="text-xl lg:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200"
                        >
                            AldebaranHealth
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <ul className="flex items-center gap-8 font-medium">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `relative px-3 py-2 transition-all duration-200 group ${
                                                isActive
                                                    ? "text-blue-600"
                                                    : "text-gray-700 hover:text-blue-600"
                                            }`
                                        }
                                    >
                                        {link.name}
                                        {/* Underline animation */}
                                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transition-transform duration-200 origin-left ${
                                            'scale-x-0 group-hover:scale-x-100'
                                        }`} />
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="hidden md:block">
                        <UserMenu />
                    </div>

                    <div className="md:hidden flex items-center gap-3">
                        <div className="md:hidden">
                            <UserMenu />
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                        onClick={closeMobileMenu}
                        aria-hidden="true"
                    />
                    
                    <div className="fixed top-16 inset-x-0 bg-white shadow-xl border-t border-gray-200 z-50 md:hidden">
                        <div className="max-w-7xl mx-auto px-4 py-6">
                            <ul className="space-y-4 mb-6">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <NavLink
                                            to={link.path}
                                            onClick={closeMobileMenu}
                                            className={({ isActive }) =>
                                                `block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                                                    isActive
                                                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                                                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                                }`
                                            }
                                        >
                                            <div className="flex items-center gap-3">
                                                <span>{link.name}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Stethoscope className="w-4 h-4 text-blue-500" />
                                    <span>Your AI Health Assistant</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className={`${isMobileMenuOpen ? 'h-80' : 'h-0'} md:h-0 transition-all duration-300`} />
        </header>
    );
}