"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MatrixBackgroundProps {
  className?: string;
}

const MatrixBackground = ({ className = "" }: MatrixBackgroundProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const matrixChars = "01";
  const columns = 40;
  const rows = 30;

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const width = svg.clientWidth;
    const height = svg.clientHeight;
    const fontSize = Math.min(width / columns, height / rows) * 0.8;

    // Clear any existing elements
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // Create text elements
    const textElements: SVGTextElement[] = [];
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        const text = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text",
        );
        text.setAttribute("x", `${(i * width) / columns + fontSize / 3}`);
        text.setAttribute("y", `${(j * height) / rows + fontSize / 1.2}`);
        text.setAttribute("font-size", `${fontSize}px`);
        text.setAttribute("font-family", "monospace");
        text.setAttribute("fill", "currentColor");
        text.setAttribute("opacity", "0");
        text.textContent = matrixChars.charAt(
          Math.floor(Math.random() * matrixChars.length),
        );
        svg.appendChild(text);
        textElements.push(text);
      }
    }

    // Animate the matrix
    const timeline = gsap.timeline();

    // Shuffle and animate text elements
    textElements.forEach((text, index) => {
      // Random delay for each character
      const delay = Math.random() * 5;

      // Random duration for each character
      const duration = 0.5 + Math.random() * 1;

      // Animate opacity
      timeline.to(
        text,
        {
          opacity: 0.1 + Math.random() * 0.3,
          duration,
          delay,
          ease: "power1.inOut",
          onComplete: () => {
            // Change character and animate again
            const changeChar = () => {
              if (!text.parentNode) return; // Check if element still exists

              // Change the character
              text.textContent = matrixChars.charAt(
                Math.floor(Math.random() * matrixChars.length),
              );

              // Animate opacity
              gsap.to(text, {
                opacity: 0.1 + Math.random() * 0.3,
                duration: 1 + Math.random() * 2,
                onComplete: changeChar,
              });
            };

            changeChar();
          },
        },
        delay,
      );
    });

    return () => {
      // Cleanup animations when component unmounts
      timeline.kill();
      gsap.killTweensOf(textElements);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 w-full h-full pointer-events-none opacity-10 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    ></svg>
  );
};

export default MatrixBackground;
