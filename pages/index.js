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
    if (!res.ok) { out.textContent = "Erreur : " + (data?.error || "requête"); return; }
    out.textContent =
      `URL: ${data.summary.url}\n` +
      `Violations: ${data.summary.violations}\n` +
      `À vérifier: ${data.summary.incomplete}\n` +
      "Par impact: " + Object.entries(data.summary.byImpact).map(([k,v])=>`${k}: ${v}`).join(" · ");
  }

  return (
    <main style={{maxWidth:820,margin:"40px auto",padding:20,fontFamily:"system-ui, sans-serif"}}>
      <h1>SiteOK — Audit accessibilité</h1>
      <p>Collez une URL et obtenez les erreurs WCAG.</p>
      <form onSubmit={onSubmit} style={{display:"flex",gap:8,marginBottom:24}}>
        <input name="url" type="url" required placeholder="https://exemple.com" style={{flex:1,padding:12,border:"1px solid #e5e7eb",borderRadius:8}}/>
        <button type="submit" style={{padding:"12px 16px",border:"none",borderRadius:8,background:"#0066FF",color:"#fff",fontWeight:600}}>Scanner</button>
      </form>
      <pre id="out" style={{whiteSpace:"pre-wrap",background:"#f8fafc",padding:12,borderRadius:8,minHeight:80}} />
    </main>
  );
}
