import { useSectionPager } from "./SectionPagerContext";

export default function ScrollStage() {
  const { sections } = useSectionPager();

  return sections.map(({ id, Component }) => <Component key={id} />);
}
