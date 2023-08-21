import React from 'react';
import { Outlet, Link } from 'react-router-dom'

interface NavItemProps {
    title: string;
    active: boolean;
}

interface HeaderProps {
    activeSection1: boolean;
    activeSection2: boolean;
    activeSection3: boolean;
}

const Header: React.FC<HeaderProps> = ({ activeSection1, activeSection2, activeSection3 }) => {
    return (
        <header className="bg-gray-800 text-white p-4 fixed z-10 w-full">
            <nav className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Ingreso Mallas</h1>
                </div>
                <div className="flex space-x-10">
                            <Link to="/">
                                <NavItem title="Ingresar Datos" active={activeSection1}/>
                            </Link>
                            <Link to="/estimaciongrados">
                                <NavItem title="Estimar Grados" active={activeSection2} />
                            </Link>
                            <Link to="/comprobaciondatos">
                                <NavItem title="Comprobar Datos" active={activeSection3} />
                            </Link>
                </div>
            </nav>
            <Outlet />
        </header>
    );
};

const NavItem: React.FC<NavItemProps> = ({ title, active }) => {
    return (
        <a
            className={`text-lg block ${active ? 'text-blue-500' : 'text-gray-300'}`}>
            {title}
        </a>
    );
};

export default Header;