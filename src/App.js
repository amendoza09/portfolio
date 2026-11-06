import Cursor from "./components/Cursor/Cursor";
import Nav from "./components/Nav/Nav";
import ScrollStage from "./components/ScrollStage/ScrollStage";
import SectionPagerProvider from "./components/ScrollStage/SectionPagerProvider";
import Hero from "./sections/Hero/Hero";
import Work from "./sections/Work/Work";
import Experience from "./sections/Experience/Experience";
import Personal from "./sections/Personal/Personal";

const SECTIONS = [
  { id: "home", Component: Hero },
  { id: "work", Component: Work },
  { id: "experience", Component: Experience },
  { id: "personal", Component: Personal },
];

function App() {
  return (
    <SectionPagerProvider sections={SECTIONS}>
      <Cursor />
      <Nav />
      <ScrollStage />
    </SectionPagerProvider>
  );
}

export default App;
