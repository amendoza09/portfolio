import { useSectionPager } from "../ScrollStage/SectionPagerContext";

export default function SectionLink({ to, children, onClick, ...rest }) {
  const { goToId } = useSectionPager();

  const handleClick = (event) => {
    event.preventDefault();
    goToId(to);
    onClick?.(event);
  };

  return (
    <a href={`#${to}`} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
