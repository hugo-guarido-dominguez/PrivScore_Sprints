const el = (id) => document.getElementById(id);

const emptyEl = el("empty");
const mainEl = el("main");

const subtitleEl = el("subtitle");
const hostEl = el("host");
const whenEl = el("when");
const openUrlEl = el("openUrl");
const openPolicyEl = el("openPolicy");
const scoreEl = el("score");
const modePillEl = el("modePill");
const confPillEl = el("confPill");
const estPillEl = el("estPill");
const gradeBarEl = el("gradeBar");
const partialBannerEl = el("partialBanner");

const bulletsEl = el("bullets");

const bTrackers = el("bTrackers");
const bThird = el("bThird");
const bRet = el("bRet");
const bRights = el("bRights");
const tTrackers = el("tTrackers");
const tThird = el("tThird");
const tRet = el("tRet");
const tRights = el("tRights");

const eSale = el("eSale");
const eThird = el("eThird");
const eAds = el("eAds");

const cookiesEl = el("cookies");
const cookieDomainsEl = el("cookieDomains");
const thirdPartyEl = el("thirdParty");
const storageEl = el("storage");
const cmpEl = el("cmp");

function safe(x, fb = "â€”") {
  if (x === null || x === undefined) return fb;
  const s = String(x).trim();
  return s ? s : fb;
}

function setLink(a, url) {
  const isHttp = /^https?:\/\//i.test(String(url || ""));
  if (isHttp) {
    a.href = url;
    a.style.pointerEvents = "auto";
    a.style.opacity = "1";
  } else {
    a.href = "#";
    a.style.pointerEvents = "none";
    a.style.opacity = "0.65";
  }
}

function fmtWhen(ts) {
  const d = new Date(ts || Date.now());
  return d.toLocaleString();
}

function confLabel(c) {
  const n = Number(c);
  if (!Number.isFinite(n)) return "Confianza: â€”";
  if (n >= 0.75) return `Confianza: Alta (${Math.round(n * 100)}%)`;
  if (n >= 0.55) return `Confianza: Media (${Math.round(n * 100)}%)`;
  return `Confianza: Baja (${Math.round(n * 100)}%)`;
}

function renderBullets(items) {
  bulletsEl.innerHTML = "";
  for (const b of items || []) {
    const li = document.createElement("li");
    li.textContent = b;
    bulletsEl.appendChild(li);
  }
}

function setBar(fillEl, textEl, s, outOf) {
  const pct = outOf ? Math.round((Number(s || 0) / outOf) * 100) : 0;
  fillEl.style.width = `${Math.max(0, Math.min(100, pct))}%`;
  textEl.textContent = `${Number(s || 0)}/${outOf}`;
}

function render(report) {
  subtitleEl.textContent = report.pageTitle ? `Detalle â€” ${report.pageTitle}` : "Detalle del Ãºltimo anÃ¡lisis";

  hostEl.textContent = safe(report.host);
  hostEl.title = safe(report.host);

  whenEl.textContent = fmtWhen(report.analyzedAt);
  openUrlEl.href = report.url || "#";

  setLink(openPolicyEl, report.policyUrl);
  openPolicyEl.textContent = /^https?:\/\//i.test(String(report.policyUrl || "")) ? "PolÃ­tica" : "PolÃ­tica (â€”)";

  scoreEl.textContent = `Score ${report.score}/100 Â· Nota ${report.grade}`;

  modePillEl.textContent = report.mode === "ai" ? "Modo: IA" : "Modo: Keywords";
  confPillEl.textContent = confLabel(report.confidence);

  if (report.estimated) estPillEl.classList.remove("hidden");
  else estPillEl.classList.add("hidden");

  gradeBarEl.dataset.grade = ["A","B","C","D","E"].includes(report.grade) ? report.grade : "unknown";

  const pr = Array.isArray(report.partialReasons) ? report.partialReasons : [];
  if (pr.length) {
    partialBannerEl.classList.remove("hidden");
    partialBannerEl.textContent = `Resultado parcial: ${pr[0]}`;
  } else {
    partialBannerEl.classList.add("hidden");
    partialBannerEl.textContent = "";
  }

  renderBullets(report.bullets || []);

  const bd = report.breakdown || {};
  setBar(bTrackers, tTrackers, bd.trackers?.score, bd.trackers?.outOf || 40);
  setBar(bThird, tThird, bd.thirdParties?.score, bd.thirdParties?.outOf || 25);
  setBar(bRet, tRet, bd.retention?.score, bd.retention?.outOf || 15);
  setBar(bRights, tRights, bd.rights?.score, bd.rights?.outOf || 20);

  eSale.textContent = safe(report?.evidence?.sale);
  eThird.textContent = safe(report?.evidence?.thirdParty);
  eAds.textContent = safe(report?.evidence?.ads);

  // Cookies
  const c = report.cookies || {};
  const cats = c.categories || {};
  cookiesEl.textContent =
    `${safe(c.total, "0")} total Â· ${safe(c.persistent, "0")} persistentes Â· ${safe(c.thirdPartyEst, "0")} terceros(est) Â· maxExp ${safe(c.maxExpirationDays, "0")} dÃ­as\n` +
    `categorÃ­as(est): ads=${cats.ads || 0}, analytics=${cats.analytics || 0}, social=${cats.social || 0}, essential=${cats.essential || 0}, other=${cats.other || 0}`;

  const tops = (c.topDomains || []).map(d => `${d.domain} (${d.count})`).join("\n");
  cookieDomainsEl.textContent = tops || "â€”";

  // Terceros en pÃ¡gina
  const ext = report?.page?.external || {};
  const topExt = (ext.topDomains || []).map(d => `${d.domain} (${d.count}${d.category ? ", " + d.category : ""})`).join("\n");
  thirdPartyEl.textContent =
    `dominios: ${safe(ext.thirdPartyDomains, "0")} Â· recursos: ${safe(ext.thirdPartyResources, "0")} Â· fingerprinting: ${ext.possibleFingerprinting ? "sÃ­" : "no"}\n` +
    (topExt || "â€”");

  // Storage
  const st = report?.page?.storage || {};
  const sample = (st.trackingKeysSample || []).join(", ");
  storageEl.textContent =
    `local keys: ${safe(st.localKeysCount, "0")} Â· session keys: ${safe(st.sessionKeysCount, "0")} Â· tracking keys: ${safe(st.trackingKeysCount, "0")}\n` +
    (sample ? `sample: ${sample}` : "â€”");

  // CMP
  const cmp = report?.page?.consent || {};
  cmpEl.textContent = cmp.detected
    ? `${safe(cmp.provider, "banner")} Â· aceptar=${cmp.hasAccept ? "sÃ­" : "no"} Â· rechazar=${cmp.hasReject ? "sÃ­" : "no"}`
    : "â€”";
}

async function load() {
  const { lastReport } = await chrome.storage.local.get({ lastReport: null });
  if (!lastReport) {
    emptyEl.classList.remove("hidden");
    mainEl.classList.add("hidden");
    return;
  }
  emptyEl.classList.add("hidden");
  mainEl.classList.remove("hidden");
  render(lastReport);
}

async function copyText() {
  const { lastReport } = await chrome.storage.local.get({ lastReport: null });
  if (!lastReport) return;

  const lines = [];
  lines.push(`PrivScore â€” ${lastReport.host}`);
  lines.push(`Nota: ${lastReport.grade} (Score ${lastReport.score}/100)`);
  lines.push(`Modo: ${lastReport.mode === "ai" ? "IA (extracciÃ³n)" : "Keywords"}`);
  lines.push(`Confianza: ${Math.round((lastReport.confidence || 0) * 100)}%${lastReport.estimated ? " (estimado)" : ""}`);
  if (lastReport.policyUrl && lastReport.policyUrl !== "â€”") lines.push(`Fuente: ${lastReport.policyUrl}`);
  lines.push("\nMotivos:");
  for (const b of (lastReport.bullets || [])) lines.push(`- ${b}`);

  await navigator.clipboard.writeText(lines.join("\n"));
}

async function copyJson() {
  const { lastReport } = await chrome.storage.local.get({ lastReport: null });
  if (!lastReport) return;
  await navigator.clipboard.writeText(JSON.stringify(lastReport, null, 2));
}

el("reloadBtn").addEventListener("click", load);
el("copyTextBtn").addEventListener("click", () => copyText().catch(console.error));
el("copyJsonBtn").addEventListener("click", () => copyJson().catch(console.error));

load();
// Developep by @marichu_kt
