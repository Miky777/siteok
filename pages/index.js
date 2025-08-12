export default function Home() {
  async function onSubmit(e) {
    e.preventDefault();
    const url = e.target.url.value;
    const out = document.getElementById("out");
    out.textContent = "Analyse en cours…";

    const res = await fetch("/api/scan", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await res.json();
    if (!res.ok) {
      out.textContent = "Erreur : " + (data?.error || "requête");
      return;
    }

    out.textContent =
      `URL: ${data.summary.url}\n` +
      `Violations: ${data.summary.violations}\n` +
      `À vérifier: ${data.summary.incomplete}\n` +
      "Par impact: " +
      Object.entries(data.summary.byImpact).map(([k, v]) => `${k}: ${v}`).join(" · ");
  }

  return (
    <main style={{maxWidth:880,margin:"40px auto",padding:"0 20px",fontFamily:"system-ui, -apple-system, Segoe UI, Roboto, sans-serif"}}>
      <header style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
        <img src="/IMG_6863.jpeg" alt="SiteOK" width="44" height="44" style={{display:"block"}} />
        <div>
          <h1 style={{margin:0,fontSize:32,lineHeight:1.1}}>SiteOK — Audit accessibilité</h1>
          <p style={{margin:"6px 0 0",opacity:0.8}}>Collez une URL et obtenez les erreurs WCAG.</p>
        </div>
      </header>

      <form onSubmit={onSubmit} style={{display:"flex",gap:10,margin:"16px 0 20px"}}>
        <input name="url" type="url" required placeholder="https://exemple.com"
               style={{flex:1,padding:14,border:"1px solid #e5e7eb",borderRadius:10,fontSize:16}} />
        <button type="submit"
                style={{padding:"14px 18px",borderRadius:10,border:"none",background:"#1E6ACB",color:"#fff",fontWeight:700}}>
          Scanner
        </button>
      </form>

      <pre id="out" style={{whiteSpace:"pre-wrap",background:"#F2F7FF",padding:14,borderRadius:10,minHeight:90,border:"1px solid #E3ECFF"}} />
      <footer style={{marginTop:32,opacity:0.7,fontSize:13}}>© {new Date().getFullYear()} SiteOK — Prototype MVP</footer>
    </main>
  );
}
