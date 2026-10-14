const SESSION_MINUTES = 10; // demo session length
const MAX_STRIKES = 3;

let token = null;
let expiresAt = null;
let timer = null;
let strikes = 0;

let POLICY_ROWS = [];
let policyLoaded = false;

const $ = (id) => document.getElementById(id);

// Extra protected keywords for banking / payment sites
const SENSITIVE_KEYWORDS = [
  "bank",
  "banking",
  "payment",
  "payments",
  "wallet",
  "netbanking",
  "creditcard",
  "debitcard",
  "finance",
  "upi",
  "pay"
];

const SENSITIVE_DOMAINS = [
  "paypal.com",
  "paytm.com",
  "phonepe.com",
  "googlepay.com",
  "gpay.com",
  "stripe.com",
  "wise.com",
  "westernunion.com",
  "bankofamerica.com",
  "chase.com",
  "wellsfargo.com",
  "citibank.com",
  "hsbc.com",
  "barclays.com",
  "sbi.co.in",
  "onlinesbi.sbi",
  "icicibank.com",
  "hdfcbank.com",
  "axisbank.com",
  "kotak.com",
  "yesbank.in",
  "idfcfirstbank.com",
  "indusind.com"
];

function setPill(text){
  $("pillState").textContent = text;
}

function showStep(step){
  ["step-accept","step-session","step-expired"].forEach(id => $(id).classList.add("hidden"));
  $(step).classList.remove("hidden");
}

function generateToken(){
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

function normalizeDomain(input){
  try {
    const withProto = input.includes("://") ? input : "https://" + input;
    return new URL(withProto).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function updateCountdown(){
  const left = expiresAt - Date.now();
  if (left <= 0) return endSession(true);
  const s = Math.floor(left / 1000);
  $("timeLeft").textContent =
    `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
}

function setResult(type, title, msg){
  const r = $("result");
  r.className = `result ${type}`;
  r.innerHTML = `<strong>${title}</strong><div>${msg}</div>`;
  r.classList.remove("hidden");
}

function addStrike(){
  strikes++;
  $("strikes").textContent = strikes;
  if (strikes >= MAX_STRIKES) {
    setResult("bad","Session terminated","Too many blocked attempts.");
    setTimeout(() => endSession(true), 800);
  }
}

function redirectTo(domain){
  // Portfolio demo: show what would happen instead of leaving the page
  setResult("good","Allowed","In a real gateway you would now be taken to " + domain + ".");
}

async function loadPolicyCSV(){
  const res = await fetch("policy.csv");
  const text = await res.text();

  POLICY_ROWS = text.split("\n").slice(1)
    .map(r => r.trim())
    .filter(r => r.length > 0)
    .map(r => r.split(","))
    .filter(r => r.length >= 4)
    .map(([pattern, category, action, reason]) => ({
      pattern: pattern.trim().toLowerCase(),
      category: category.trim(),
      action: action.trim().toLowerCase(),
      reason: reason.trim()
    }));

  policyLoaded = true;
}

function findRule(domain){
  return POLICY_ROWS.find(r => domain.includes(r.pattern)) || null;
}

function isSensitiveDomain(domain){
  if (!domain) return false;

  const matchedSensitiveDomain = SENSITIVE_DOMAINS.some(d =>
    domain === d || domain.endsWith("." + d)
  );

  if (matchedSensitiveDomain) return true;

  const parts = domain.split(/[.\-]/);
  return parts.some(part => SENSITIVE_KEYWORDS.includes(part));
}

function evaluateRequest(input){
  if (!token) return;

  const domain = normalizeDomain(input);
  if (!domain) {
    return setResult("warn","Invalid input","Enter a valid domain.");
  }

  // Hard block banking / payment style domains
  if (isSensitiveDomain(domain)) {
    addStrike();
    return setResult(
      "bad",
      "Blocked",
      "Banking and payment websites are restricted on public Wi-Fi to reduce the risk of credential theft, account compromise, and financial fraud."
    );
  }

  const rule = findRule(domain);
  const action = rule?.action || "allow";

  if (action === "block"){
    addStrike();
    return setResult("bad","Blocked", rule.reason || "This website is blocked by policy.");
  }

  if (action === "warn"){
    setResult(
      "warn",
      "Warning",
      `${rule.reason}<br><button class="btn primary" id="proceed">Proceed</button>`
    );
    setTimeout(() => {
      $("proceed")?.addEventListener("click", () => redirectTo(domain));
    }, 0);
    return;
  }

  setResult("good","Allowed","Redirecting...");
  setTimeout(() => redirectTo(domain), 900);
}

function renderSites(){
  const list = $("siteList");
  list.innerHTML = "";

  const seen = new Set();
  POLICY_ROWS.forEach(r => {
    if (seen.has(r.pattern)) return;
    seen.add(r.pattern);

    const d = document.createElement("div");
    d.className = "site";
    d.innerHTML = `<div class="mono">${r.pattern}</div><div class="tag">${r.category}</div>`;
    d.onclick = () => evaluateRequest(r.pattern);
    list.appendChild(d);
  });
}

function startSession(){
  token = generateToken();
  expiresAt = Date.now() + SESSION_MINUTES * 60000;
  strikes = 0;

  $("token").textContent = token;
  $("strikes").textContent = 0;
  setPill("Connected");
  showStep("step-session");
  renderSites();
  updateCountdown();

  timer = setInterval(updateCountdown, 1000);
}

function endSession(expired){
  clearInterval(timer);
  token = null;
  showStep(expired ? "step-expired" : "step-accept");
  setPill("Not connected");
}

window.addEventListener("DOMContentLoaded", async () => {
  showStep("step-accept");
  await loadPolicyCSV();

  $("agree").onchange = e => $("btnStart").disabled = !e.target.checked;
  $("btnStart").onclick = startSession;
  $("btnGo").onclick = () => evaluateRequest($("urlInput").value);
  $("btnEnd").onclick = () => endSession(false);
  $("btnRestart").onclick = () => location.reload();
  $("btnCopy").onclick = () => { try { navigator.clipboard.writeText($("token").textContent); } catch (e) {} };
});