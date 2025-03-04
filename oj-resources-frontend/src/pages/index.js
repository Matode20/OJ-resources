import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-16 p-4">
        <h1 className="text-3xl font-bold text-green-600">
          Welcome to AgriShop
        </h1>
        <p>Your one-stop shop for fresh agricultural produce.</p>
      </div>
    </>
  );
}
