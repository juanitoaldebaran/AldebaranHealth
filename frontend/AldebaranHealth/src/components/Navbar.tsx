import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";

interface NavLinkType {
    name: string;
    path: string;
}

const navLinks: NavLinkType[] = [
    {name: "About", path: "/about"},
    {name: "AI Services", path: "/services"},
]

export default function Navbar() {

    return (
        <header className="fixed z-50 top-0 w-full backdrop-blur border-b-2">
           <nav className="max-w-7xl mx-auto px-4 sm:px-6 sm:px-8">
                <div className="flex items-center justify-between h-16">
                        <div className="flex items-center justify-center">
                            <Link to={"/"} className="text-[22px] font-semibold text-blue-500 hover:text-blue-400">
                                AldebaranHealth
                            </Link>
                        </div>

                        <div>
                            <ul className="flex items-center justify-center gap-6 font-light">
                                {navLinks.map((value) => (
                                    <li key={value.name}>
                                    <NavLink
                                        to={value.path}
                                        className={({ isActive }) =>
                                        `pb-2 border-b-2 transition-all duration-200 ${
                                            isActive
                                            ? "border-blue-600 text-blue-600"
                                            : "border-transparent text-black hover:text-gray-600 hover:border-blue-600"
                                        }`
                                        }
                                    >
                                        {value.name}
                                    </NavLink>
                                    </li>
                                    ))}
                            </ul>
                        </div>
                        
                        <div>
                            <UserMenu />
                        </div>
                </div>
           </nav>
        </header>
    )
}
