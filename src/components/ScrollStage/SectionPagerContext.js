import { createContext, useContext } from "react";

const SectionPagerContext = createContext({
  sections: [],
  activeId: null,
  goToId: () => {},
});

export function useSectionPager() {
  return useContext(SectionPagerContext);
}

export default SectionPagerContext;
