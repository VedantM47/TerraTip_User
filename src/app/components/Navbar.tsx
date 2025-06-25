export default function Navbar() {
    return (
      <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">TerraTip</h1>
        <div className="space-x-6 text-gray-600 font-medium">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </nav>
    );
  }
  