// Baut eine einzelne HTML-Datei, die die Konzept-Artefakte (Markdown + Mermaid) lesbar darstellt.
// Aufruf: node tools/konzept-html/build.mjs  → tools/konzept-html/konzept.html
// Rendering passiert im Browser (marked + mermaid von jsdelivr). Keine Daten verlassen den Rechner.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const docs = [
  ["Architekturbild", "docs/konzept/modelle/architektur.md"],
  ["K3 · Zustandsmodell", "docs/konzept/modelle/zustand-bestellung.md"],
  ["K5 · ER-Diagramm", "docs/konzept/modelle/er-durchstich.md"],
  ["K5 · Datenwörterbuch", "docs/konzept/vertraege/datenwoerterbuch.md"],
  ["FA-01 (abgenommen)", "docs/konzept/anwendungsfaelle/FA-01-ki-nimmt-bestellung-auf.md"],
  ["FA-24 (neu)", "docs/konzept/anwendungsfaelle/FA-24-bekannte-lieferorte.md"],
  ["ADR 0014 · Vorgehen", "docs/decisions/0014-vorgehen-durchstich-spur.md"],
  ["Gegenlesen K3", "docs/konzept/modelle/_gegenlesen-K3.md"],
  ["Gegenlesen K5 · DB", "docs/konzept/modelle/_gegenlesen-K5-db.md"],
  ["Gegenlesen K5 · Compliance", "docs/konzept/modelle/_gegenlesen-K5-compliance.md"],
].filter(([, p]) => existsSync(resolve(root, p)));

const esc = (s) => s.replace(/<\/script/gi, "<\/script");
const sections = docs
  .map(([title, p], i) => `<script type="text/markdown" id="md${i}" data-title="${title}" data-path="${p}">\n${esc(readFileSync(resolve(root, p), "utf8"))}\n</script>`)
  .join("\n");

const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>fluvo Konzept</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
<style>
:root{--bg:#f7f7f5;--fg:#1c1c1a;--muted:#6b6b66;--card:#fff;--line:#e4e3de;--accent:#0f6b5c;--accent-bg:#e6f2ef;--code:#f0efe9}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#15161a;--fg:#e8e8e4;--muted:#9a9a94;--card:#1d1f24;--line:#2c2f36;--accent:#5fc7b0;--accent-bg:#173a34;--code:#23262d}}
:root[data-theme="dark"]{--bg:#15161a;--fg:#e8e8e4;--muted:#9a9a94;--card:#1d1f24;--line:#2c2f36;--accent:#5fc7b0;--accent-bg:#173a34;--code:#23262d}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.55 Inter,system-ui,sans-serif}
header{position:sticky;top:0;z-index:2;background:var(--bg);border-bottom:1px solid var(--line);padding:12px 16px}
header h1{font-size:16px;margin:0 0 8px;font-weight:600}
header h1 small{color:var(--muted);font-weight:400;margin-left:8px}
nav{display:flex;gap:6px;flex-wrap:wrap}
nav button{border:1px solid var(--line);background:var(--card);color:var(--fg);padding:6px 10px;border-radius:999px;cursor:pointer;font:inherit;font-size:13px}
nav button.active{background:var(--accent-bg);border-color:var(--accent);color:var(--accent);font-weight:600}
main{max-width:1100px;margin:0 auto;padding:16px}
article{display:none;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:20px 24px}
article.active{display:block}
article .path{color:var(--muted);font-family:"JetBrains Mono",monospace;font-size:12px;margin-bottom:12px}
h1,h2,h3{line-height:1.25}h1{font-size:24px}h2{font-size:19px;margin-top:32px;border-top:1px solid var(--line);padding-top:16px}h3{font-size:16px}
table{border-collapse:collapse;width:100%;font-size:13.5px;margin:12px 0;display:block;overflow-x:auto}
th,td{border:1px solid var(--line);padding:6px 9px;vertical-align:top;text-align:left}th{background:var(--accent-bg)}
code{font-family:"JetBrains Mono",monospace;font-size:.9em;background:var(--code);padding:1px 4px;border-radius:4px}
pre{background:var(--code);padding:12px;border-radius:8px;overflow-x:auto}pre code{background:none;padding:0}
blockquote{border-left:3px solid var(--accent);margin:12px 0;padding:6px 14px;background:var(--accent-bg);border-radius:0 8px 8px 0}
.mermaid{background:var(--card);padding:8px;overflow-x:auto;text-align:center}
.mermaid svg{max-width:100%;height:auto}
a{color:var(--accent)}
@media (max-width:600px){article{padding:14px 16px}main{padding:12px}}
</style>
</head>
<body>
<header>
  <h1>fluvo · Konzept-Artefakte <small>Stand ${new Date().toISOString().slice(0,10)} · nur lokal</small></h1>
  <nav id="nav"></nav>
</header>
<main id="main"></main>
${sections}
<script src="https://cdn.jsdelivr.net/npm/marked@12/marked.min.js"></script>
<script type="module">
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
const dark = matchMedia("(prefers-color-scheme: dark)").matches;
mermaid.initialize({ startOnLoad:false, theme: dark ? "dark" : "neutral", securityLevel:"loose", er:{useMaxWidth:true}, flowchart:{useMaxWidth:true} });
const srcs=[...document.querySelectorAll('script[type="text/markdown"]')];
const nav=document.getElementById("nav"), main=document.getElementById("main");
srcs.forEach((s,i)=>{
  const b=document.createElement("button"); b.textContent=s.dataset.title; b.onclick=()=>show(i); nav.appendChild(b);
  const a=document.createElement("article"); a.id="a"+i;
  let html=marked.parse(s.textContent);
  html=html.replace(/<pre><code class="language-mermaid">([^]*?)<[/]code><[/]pre>/g,(m,code)=>'<pre class="mermaid">'+code.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'")+'</pre>');
  a.innerHTML='<div class="path">'+s.dataset.path+'</div>'+html; main.appendChild(a);
});
let rendered=new Set();
async function show(i){
  [...nav.children].forEach((b,j)=>b.classList.toggle("active",i===j));
  [...main.children].forEach((a,j)=>a.classList.toggle("active",i===j));
  if(!rendered.has(i)){ rendered.add(i); try{ await mermaid.run({nodes: main.children[i].querySelectorAll(".mermaid")}); }catch(e){ console.error(e); } }
  try{ localStorage.setItem("fluvo-konzept-tab", String(i)); }catch{}
  window.scrollTo(0,0);
}
let start=0; try{ start=Math.min(Number(localStorage.getItem("fluvo-konzept-tab")||0), srcs.length-1); }catch{}
show(start);
</script>
</body>
</html>`;
const out = resolve(root, "tools/konzept-html/konzept.html");
writeFileSync(out, html);
console.log(`geschrieben: ${out} (${docs.length} Artefakte)`);
