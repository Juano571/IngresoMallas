import React from 'react';
import { Outlet, Link } from 'react-router-dom'

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
                    <Link to="/" className={`text-lg block ${activeSection1 ? 'text-blue-500' : 'text-gray-300'}`}>
                        Ingresar Datos
                    </Link>
                    <Link to="/estimaciongrados" className={`text-lg block ${activeSection2 ? 'text-blue-500' : 'text-gray-300'}`}>
                        Estimar Grados
                    </Link>
                    <Link to="/comprobaciondatos" className={`text-lg block ${activeSection3 ? 'text-blue-500' : 'text-gray-300'}`}>
                        Comprobar Datos
                    </Link>
                </div>
            </nav>
            <Outlet />
        </header>
    );
};

export default Header;