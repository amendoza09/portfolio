import { createContext, useContext } from "react";

const SectionPagerContext = createContext({
  sections: [],
  activeIndex: 0,
  activeId: null,
  slideRefs: { current: [] },
  goToId: () => {},
});

export function useSectionPager() {
  return useContext(SectionPagerContext);
}

export default SectionPagerContext;
