import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-bold text-blue-700 mb-4">Welcome to TerraTip 🌍</h1>
        <p className="text-lg text-gray-700 mb-6">
          Discover your eco footprint and explore ways to improve your impact.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Get Started
        </button>
      </main>
      <Footer />
    </div>
  );
}
