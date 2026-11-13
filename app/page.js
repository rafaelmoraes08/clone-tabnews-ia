import Confete from "./components/Confete";

// Revalida a página a cada 60s (ISR): o HTML é servido do cache e a API
// externa é consultada em segundo plano, em vez de a cada requisição.
export const revalidate = 60;

const URL_API_CONTEUDOS =
  "https://www.tabnews.com.br/api/v1/contents?per_page=1&strategy=new";

async function buscarTotalDeConteudos() {
  try {
    const resposta = await fetch(URL_API_CONTEUDOS, {
      next: { revalidate },
      signal: AbortSignal.timeout(5000),
    });
    if (!resposta.ok) return null;
    const total = Number(resposta.headers.get("x-pagination-total-rows"));
    return Number.isFinite(total) ? total : null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const total = await buscarTotalDeConteudos();

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        padding: "2rem 1rem",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <Confete />
      <h1>🚧 Em Construção 🚧</h1>
      <p style={{ maxWidth: "40rem", fontSize: "1.25rem", lineHeight: 1.5 }}>
        Estamos neste exato momento reconstruindo o Tabnews, um lugar na
        internet para quem trabalha com tecnologia e precisa consumir conteúdos
        com valor concreto
      </p>
      <p>
        {total !== null ? (
          <>
            O TabNews já tem{" "}
            <strong>{total.toLocaleString("pt-BR")}</strong> conteúdos
            publicados.
          </>
        ) : (
          "Não foi possível obter o total de conteúdos publicados no momento."
        )}
      </p>
      <a href="https://www.tabnews.com.br" target="_blank" rel="noopener noreferrer">
        Acesse o TabNews oficial
      </a>
    </main>
  );
}
