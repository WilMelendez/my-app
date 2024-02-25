import NavBar from "./components/NavBar";
import Head from "./components/Head";

export default function Page() {
  return (
    <main className="flex flex-col">
      <NavBar />
      <div className="mb-8" /> 
      <Head />
    </main>
  );
}
