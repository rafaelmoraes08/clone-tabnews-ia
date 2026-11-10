"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function Confete() {
  const [dimensoes, setDimensoes] = useState(null);

  useEffect(() => {
    function atualizar() {
      setDimensoes({ width: window.innerWidth, height: window.innerHeight });
    }
    atualizar();
    window.addEventListener("resize", atualizar);
    return () => window.removeEventListener("resize", atualizar);
  }, []);

  if (!dimensoes) return null;

  return (
    <Confetti
      width={dimensoes.width}
      height={dimensoes.height}
      recycle={false}
      numberOfPieces={400}
      style={{ position: "fixed", inset: 0, pointerEvents: "none" }}
    />
  );
}
