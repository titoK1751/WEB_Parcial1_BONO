import Link from "next/link";

interface Route {
    name: string;
    path: string;
}

const Header = ({ routes }: { routes: Route[]}) => {
    return (
        <header className="bg-slate-400 text-white py-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href = "/" className = "flex items-center space-x-3">
            <span className= "text-4xl font-semibold">Parcial 1 - Bono</span>
            </Link>
            <nav>
                {routes.map((route) => (
                    <Link
                     key = {route.path}
                     href = {route.path}
                     className = " text-lg font-medium px-3 hover:text-gray-300"
                    >
                      {route.name}  
                    </Link>
                ))}
            </nav>
          </div>  
        </header>
    );
};

export default Header;