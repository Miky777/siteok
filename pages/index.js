import Image from 'next/image';

export default function Home() {
  return (
    <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center", padding: "40px" }}>
      <Image src="/logo.jpeg" alt="SiteOK Logo" width={100} height={100} />
      <h1>SiteOK — Audit accessibilité</h1>
      <p>Collez une URL et obtenez les erreurs WCAG.</p>
      <form>
        <input type="url" placeholder="https://exemple.com" style={{ padding: "10px", width: "80%", marginRight: "5px" }} />
        <button type="submit" style={{ padding: "10px 20px", background: "#0070f3", color: "white", border: "none" }}>Scanner</button>
      </form>
      <div style={{ marginTop: "20px", padding: "10px", background: "#f5f5f5", borderRadius: "5px" }}>
        Résultats affichés ici…
      </div>
    </div>
  );
}
