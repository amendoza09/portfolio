import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Hero from "./sections/Hero/Hero";
import Work from "./sections/Work/Work";
import Experience from "./sections/Experience/Experience";
import Personal from "./sections/Personal/Personal";
import Contact from "./sections/Contact/Contact";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Personal />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
