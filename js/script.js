// PRELOADER
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) preloader.remove();
});

document.addEventListener("DOMContentLoaded", () => {
  // ACTIVE MENU BY data-page
  const page = document.body.dataset.page;
  document.querySelectorAll(".menu-link").forEach((a) => {
    const href = (a.getAttribute("href") || "").trim();
    const map = {
      home: "index.html",
      about: "about.html",
      projects: "projects.html",
      skills: "skills.html",
      contacts: "contacts.html",
    };
    if (map[page] && href.endsWith(map[page])) a.classList.add("active");
  });

  // THEME (supports 2 buttons: mobile + desktop)
  const btn1 = document.getElementById("themeToggle");
  const btn2 = document.getElementById("themeToggleDesktop");
  const buttons = [btn1, btn2].filter(Boolean);

  const applyThemeUI = () => {
    const isLight = document.body.classList.contains("light");
    buttons.forEach((b) => (b.textContent = isLight ? "☀️" : "🌙"));
  };

  const saved = localStorage.getItem("theme");
  if (saved === "light") document.body.classList.add("light");
  applyThemeUI();

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.body.classList.toggle("light");
      const isLight = document.body.classList.contains("light");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      applyThemeUI();
    });
  });

  // BURGER MENU
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");

  if (burger && menu) {
    const close = () => {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    };

    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });

    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());
    document.addEventListener("click", (e) => {
      const t = e.target;
      if (!menu.contains(t) && !burger.contains(t)) close();
    });
  }

  // COPY BUTTONS
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.dataset.copy || "";
      try {
        await navigator.clipboard.writeText(text);
        const old = btn.innerHTML;
        btn.innerHTML = "✅ Скопійовано!";
        setTimeout(() => (btn.innerHTML = old), 1200);
      } catch (e) {
        alert("Не вдалося скопіювати 😅 Скопіюй вручну: " + text);
      }
    });
  });

  // REVEAL ON SCROLL (respects prefers-reduced-motion)
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");

  if (!reduce) {
    const onScroll = () => {
      const trigger = window.innerHeight * 0.88;
      reveals.forEach((el) => {
        if (el.getBoundingClientRect().top < trigger) el.classList.add("show");
      });
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
  } else {
    reveals.forEach((el) => el.classList.add("show"));
  }

  // SKILL BARS
  document.querySelectorAll(".progress-bar").forEach((bar) => {
    const w = bar.dataset.width;
    if (w) setTimeout(() => (bar.style.width = w), 250);
  });

  // TO TOP
  const toTop = document.getElementById("toTop");
  if (toTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 250) toTop.classList.add("show");
      else toTop.classList.remove("show");
    });
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
});
