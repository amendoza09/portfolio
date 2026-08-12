import { useSectionPager } from "./SectionPagerContext";
import "./ScrollStage.css";

export default function ScrollStage() {
  const { sections, activeIndex, slideRefs } = useSectionPager();

  return (
    <div className="scroll-stage">
      {sections.map(({ id, Component }, index) => (
        <div
          key={id}
          ref={(node) => {
            slideRefs.current[index] = node;
          }}
          className="scroll-slide"
          style={{ transform: `translateY(${(index - activeIndex) * 100}%)` }}
          inert={index !== activeIndex}
        >
          <Component />
        </div>
      ))}
    </div>
  );
}
