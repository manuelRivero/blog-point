"use client";

import { Box } from "@mui/material";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";
import Loading from "./loading";

export default function Template({ children }: { children: React.ReactNode }) {
  const tl = useRef(gsap.timeline());
  const animateSection = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    tl.current
      .set(animateSection.current, { opacity: 0 })
      .to(animateSection.current, { opacity: 1 })
      .duration(0.5);
  }, [tl, animateSection]);
  useLayoutEffect(() => {
      tl.current
        .to(loader.current, {
          opacity: 0,
          onComplete: () => {
            if(loader.current){
                loader.current.style.display = "none";
            }
          }
        })
        .duration(0.5);
  }, [loader]);
  return (
    <div ref={animateSection}>
      <Box ref={loader}>
        <Loading />
      </Box>
      {children}
    </div>
  );
}
