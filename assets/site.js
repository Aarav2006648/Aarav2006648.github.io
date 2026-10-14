// Walkthroughs: each project's steps (image + caption). Add your own by dropping
// an image into assets/img/ and adding a line here.
const WALKTHROUGHS = {
  gateway: {
    title: "Secure public Wi-Fi gateway",
    steps: [
      ["gateway-1.webp", "Before you get internet, the portal shows a safety notice about fake hotspots and data interception."],
      ["gateway-2.webp", "You must tick the agreement first. The Start button stays locked until you do."],
      ["gateway-3.webp", "A secure session starts: a unique session token, a 10-minute countdown and a strike counter. Site rules load from a policy file."],
      ["gateway-4.webp", "Risky sites like streaming get a warning first. You choose whether to carry on."],
      ["gateway-5.webp", "Banking and payment sites are blocked on public Wi-Fi to protect logins and cards. Each blocked attempt is a strike."],
      ["gateway-6.webp", "Three strikes, or the timer running out, ends the session. You reconnect and agree again."]
    ]
  },
  tiger: {
    title: "Tiger Martial Arts website",
    steps: [
      ["tiger-logo.webp", "Brand first: a tiger logo and a bold red, black and white palette that suits a martial arts academy."],
      ["tiger-wireframe.webp", "Every page was planned as a wireframe before any code: hero, why-choose-us, classes, membership plans and sign-up."],
      ["tiger-home.webp", "The finished home page, with full navigation to classes, courses, membership, timetable, instructors and contact."],
      ["tiger-classes.webp", "Class cards for Karate & Taekwondo, MMA & Self Defence, and Fitness & Conditioning, each with a short description."],
      ["tiger-about.webp", "The About page tells the academy's story and values."],
      ["tiger-account.webp", "Members can create an account and sign in, backed by Firebase."],
      ["tiger-mobile.webp", "Tested on mobile sizes in Chrome DevTools, along with navigation, form submission and page load time."]
    ]
  },
  prime: {
    title: "Prime Tours app prototype",
    steps: [
      ["prime-lofi-home.webp", "Round one (Alpha): a grey low-fidelity layout to test structure before any design decisions."],
      ["prime-hifi-home.webp", "Round two (Beta): the same home page in high fidelity, with real imagery, clear calls to action and a stats strip."],
      ["prime-hifi-dest.webp", "Destinations page with category filters and photo cards. The blue lines are the clickable Figma prototype flows."],
      ["prime-planner.webp", "A step-by-step trip planner: customer type, trip details, destinations, hotel and a live price summary."],
      ["prime-dashboard.webp", "Customer dashboard showing enquiries, bookings and account settings."],
      ["prime-admin.webp", "Admin dashboard for managing enquiries, hotel chains, packages and users."],
      ["prime-changes.webp", "What users struggled with in Alpha, and how each issue was fixed in Beta."],
      ["prime-results.webp", "The result of user testing: task completion up from 60% to 90%, booking time down from 3.2 to 1.8 minutes, satisfaction up from 2.8 to 4.4 out of 5."]
    ]
  },
  waste: {
    title: "Waste forecasting dashboard",
    steps: [
      ["waste-flow.webp", "The plan: from the business problem to cleaning the data, building the model, the Power BI dashboard and recommendations."],
      ["waste-dashboard.webp", "Main dashboard: 69.85M tonnes of waste across 321 local authorities, filterable by authority, waste stream and period."],
      ["waste-forecast.webp", "Forecasting the next quarters from the historical trend, with a plain-English explanation of why it goes down."],
      ["waste-clusters.webp", "Clustering groups authorities with similar waste behaviour, so the client knows where to focus collection capacity."],
      ["waste-predict.webp", "A what-if board: change the scenario percentage and see predicted waste for each authority."],
      ["waste-colab.webp", "The same analysis checked in Python on Google Colab."]
    ]
  },
  dc: {
    title: "Dance Central Dubai",
    steps: [
      ["dc-home.webp", "The home page opens with the studio's own stage video and one clear action: book a free class on WhatsApp."],
      ["dc-about.webp", "The mission and the numbers parents look for: a 4.9 Google rating, 1000+ students and three Dance Vaganza seasons."],
      ["dc-classes.webp", "Find Your Groove: every class style with times for each branch, and a quick switch to the Mira schedule."],
      ["dc-vaganza.webp", "A dedicated page for Dance Vaganza, the studio's annual show, with each season's story and photos."],
      ["dc-gallery.webp", "A gallery of real performances from the studio."],
      ["dc-mobile.webp", "Built mobile-first, because most parents find the studio on their phone through Instagram or Google."]
    ]
  },
  cert: {
    title: "Google Cybersecurity Professional Certificate",
    steps: [
      ["google-cert.webp", "Awarded September 2025 after nine Google courses on Coursera. Verify it at coursera.org/verify/professional-cert/GIMNR2IZUKOW."]
    ]
  }
};

(function () {
  const dlg = document.getElementById("viewer");
  if (!dlg) return;
  const img = dlg.querySelector(".v-stage img");
  const title = dlg.querySelector(".v-top h3");
  const num = dlg.querySelector(".v-cap .n");
  const cap = dlg.querySelector(".v-cap p");
  const bar = dlg.querySelector(".v-bar i");
  const playBtn = dlg.querySelector("[data-act=play]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let cur = null, i = 0, timer = null;

  function show() {
    const [src, text] = cur.steps[i];
    img.src = "assets/img/" + src;
    img.alt = text;
    num.textContent = "Step " + (i + 1) + " of " + cur.steps.length;
    cap.textContent = text;
    bar.style.width = ((i + 1) / cur.steps.length * 100) + "%";
  }
  function go(d) { i = (i + d + cur.steps.length) % cur.steps.length; show(); }
  function stop() { clearInterval(timer); timer = null; playBtn.textContent = "Play"; }
  function play() {
    if (timer) return stop();
    playBtn.textContent = "Pause";
    timer = setInterval(() => { if (i === cur.steps.length - 1) return stop(); go(1); }, 4200);
  }
  function open(key) {
    cur = WALKTHROUGHS[key]; if (!cur) return;
    i = 0; title.textContent = cur.title; show();
    const single = cur.steps.length < 2;
    dlg.querySelector(".v-ctl").hidden = single;
    dlg.querySelector(".v-bar").hidden = single;
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    if (!reduce && !single) play();
  }
  function close() { stop(); dlg.close ? dlg.close() : dlg.removeAttribute("open"); }

  document.querySelectorAll("[data-walk]").forEach(el => el.addEventListener("click", () => open(el.dataset.walk)));
  dlg.querySelector("[data-act=prev]").addEventListener("click", () => { stop(); go(-1); });
  dlg.querySelector("[data-act=next]").addEventListener("click", () => { stop(); go(1); });
  playBtn.addEventListener("click", play);
  dlg.querySelector(".v-close").addEventListener("click", close);
  dlg.addEventListener("close", stop);
  dlg.addEventListener("click", e => { if (e.target === dlg) close(); });
  dlg.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") { stop(); go(1); }
    if (e.key === "ArrowLeft") { stop(); go(-1); }
  });

  // step counts on buttons
  document.querySelectorAll("[data-count]").forEach(el => {
    const w = WALKTHROUGHS[el.dataset.count]; if (w) el.textContent = w.steps.length + "-step walkthrough";
  });
})();

// copy buttons
document.querySelectorAll(".copy").forEach(b => {
  b.addEventListener("click", () => {
    const el = document.getElementById(b.dataset.target), t = el.textContent.trim();
    const done = () => { b.textContent = "Copied"; setTimeout(() => b.textContent = "Copy", 1600); };
    const sel = () => { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); };
    try { navigator.clipboard.writeText(t).then(done, sel); } catch (e) { sel(); }
  });
});
document.getElementById("yr") && (document.getElementById("yr").textContent = new Date().getFullYear());
