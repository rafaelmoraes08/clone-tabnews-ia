"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Carrega o react-confetti em um chunk separado, só no cliente, para não
// pesar no bundle inicial nem bloquear a hidratação da página.
const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function Confete() {
  const [dimensoes, setDimensoes] = useState(null);
  const [concluido, setConcluido] = useState(false);

  useEffect(() => {
    if (concluido) return;
    function atualizar() {
      setDimensoes({ width: window.innerWidth, height: window.innerHeight });
    }
    atualizar();
    window.addEventListener("resize", atualizar);
    return () => window.removeEventListener("resize", atualizar);
  }, [concluido]);

  if (!dimensoes || concluido) return null;

  return (
    <Confetti
      width={dimensoes.width}
      height={dimensoes.height}
      recycle={false}
      numberOfPieces={400}
      onConfettiComplete={() => setConcluido(true)}
      style={{ position: "fixed", inset: 0, pointerEvents: "none" }}
    />
  );
}
