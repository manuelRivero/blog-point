"use client"

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react"

export default function Template({children}:{children: React.ReactNode}){
    const tl = useRef(gsap.timeline());
    const animateSection = useRef<HTMLDivElement>(null)
    useLayoutEffect(()=>{
        tl.current.set(animateSection.current, {opacity:0})
        .to(animateSection.current, {opacity:1})
        .duration(.5)
    },[tl, animateSection])
    return (
    <div ref={animateSection}>
        {children}
    </div>

    )
}