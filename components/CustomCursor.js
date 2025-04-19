"use client";

import { useEffect, useRef } from "react";
import "../app/cursor.css";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;

      if (dotRef.current && followerRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;

        followerRef.current.style.left = `${x}px`;
        followerRef.current.style.top = `${y}px`;
      }
    };

    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-follower" ref={followerRef}></div>
    </>
  );
}
