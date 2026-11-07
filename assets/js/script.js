function announceStatus(message) {
  const liveRegion = document.getElementById("live-status");
  if (!liveRegion) return;
  liveRegion.textContent = "";
  window.requestAnimationFrame(() => {
    liveRegion.textContent = message;
  });
}

function toggleMenu(forceState) {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (!menu || !icon) return;

  const isOpen =
    typeof forceState === "boolean"
      ? menu.classList.toggle("open", forceState)
      : menu.classList.toggle("open");

  icon.classList.toggle("open", isOpen);
  icon.setAttribute("aria-expanded", String(isOpen));
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  const hamburgerNav = document.getElementById("hamburger-nav");
  const menu = document.querySelector(".menu-links");
  if (
    hamburgerNav &&
    menu &&
    menu.classList.contains("open") &&
    !hamburgerNav.contains(e.target)
  ) {
    toggleMenu(false);
  }
});

// Close mobile menu on Escape and restore focus to trigger
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (menu && menu.classList.contains("open")) {
    toggleMenu(false);
    if (icon) icon.focus();
  }
});

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = savedTheme ? savedTheme === "dark" : prefersDark;

  document.body.classList.toggle("dark-theme", isDark);

  const desktopToggle = document.getElementById("theme-toggle");
  const mobileToggle = document.getElementById("theme-toggle-mobile");

  // Suppress transitions on theme switch to prevent color smearing
  const applyTheme = (checked) => {
    const root = document.documentElement;
    root.classList.add("no-transitions");
    document.body.classList.toggle("dark-theme", checked);
    localStorage.setItem("theme", checked ? "dark" : "light");

    if (desktopToggle) desktopToggle.checked = checked;
    if (mobileToggle) mobileToggle.checked = checked;

    void window.getComputedStyle(document.body).opacity;
    window.requestAnimationFrame(() => {
      root.classList.remove("no-transitions");
    });
  };

  if (desktopToggle) {
    desktopToggle.checked = isDark;
    desktopToggle.addEventListener("change", (e) =>
      applyTheme(e.target.checked)
    );
  }

  if (mobileToggle) {
    mobileToggle.checked = isDark;
    mobileToggle.addEventListener("change", (e) =>
      applyTheme(e.target.checked)
    );
  }
}

const translations = {
  en: {
    "nav.skip": "Skip to main content",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    "profile.status": "Seeking Data / Backend internship · April 2027 · Caen & surrounding area",
    "profile.role": "Computer Science undergraduate — IUT d’Ifs (Caen)",
    "profile.summary":
      "Undergraduate in Computer Science, focusing on backend development, databases (SQL / Data), and Linux environments.",
    "profile.ctaProjects": "View projects",
    "profile.ctaContact": "Contact me",

    "about.subtitle": "01 · Profile",
    "about.title": "About",
    "about.experienceTitle": "Experience",
    "about.experienceText": "3+ years\nProgramming & projects",
    "about.educationTitle": "Education",
    "about.educationText": "B.Sc. (BUT) Computer Science\nIUT Campus 3 Ifs (Caen)",
    "about.focusTitle": "Goal",
    "about.focusText": "Backend development,\nData & AI",
    "about.text":
      "Computer Science undergraduate (BUT Informatique) at the IUT in Ifs (University of Caen Normandy), following a general Baccalauréat majoring in Mathematics and Computer Science (NSI). I primarily work with C, Python, Java, SQL, and Shell on Linux across relational database design, software architecture, and embedded systems projects. Outside of code, I play club tennis and music.",
    "about.tl1Title":
      "B.Sc. (BUT) in Computer Science — IUT Grand Ouest Normandie (Ifs)",
    "about.tl1Desc":
      "Algorithms, C programming, Java, SQL databases, Linux system administration, agile project management",
    "about.tl2Title":
      "French Baccalauréat — Institution Sainte-Marie (Caen)",
    "about.tl2Desc":
      "Majors in Mathematics & NSI (Computer Science and Digital Technology)",

    "skills.subtitle": "02 · Technical stack",
    "skills.title": "Skills",
    "skills.catLang": "Languages & software",
    "skills.catWeb": "Web & databases",
    "skills.catSys": "Systems & tools",
    "skills.htmlTitle": "HTML5",
    "skills.cssTitle": "CSS3 / Responsive",
    "skills.pythonTitle": "Python",
    "skills.jsTitle": "JavaScript",
    "skills.sqlTitle": "SQL & data modeling",
    "skills.uiTitle": "UI/UX wireframing",
    "skills.bashTitle": "Bash / Shell",
    "skills.linuxTitle": "Linux / Virtualization",
    "skills.gitTitle": "Git & GitHub",
    "skills.iotTitle": "ESP32 & sensors",
    "skills.javaTitle": "Java",
    "skills.cTitle": "C",

    "projects.subtitle": "03 · Selected work",
    "projects.title": "Projects",
    "projects.filterAll": "All",
    "projects.filterWeb": "Web & Data",
    "projects.filterSys": "Systems & C",
    "projects.filterIot": "IoT & Embedded",

    "projects.eduTitle": "Éduc’Arte project",
    "projects.eduMeta": "Educational project · 2024–2025",
    "projects.eduText":
      "Built an embedded web server on an ESP32 microcontroller to simulate the greenhouse effect. Real-time data acquisition from humidity and temperature sensors with automated CSV export.",

    "projects.gameTitle": "C-Engine architecture",
    "projects.gameMeta": "University project · 2025–2026",
    "projects.gameText":
      "Complete implementation of a game engine and movement logic in C. Designed an ergonomic console interface featuring strict input validation and error handling.",

    "projects.saeTitle": "Virtualized dev workstation",
    "projects.saeMeta": "University project · 2025–2026",
    "projects.saeText":
      "Deployed and configured a complete developer workstation. Set up a dual-boot Windows 10 / Ubuntu Linux virtual machine with shared partitioning and multi-user permissions.",

    "projects.sae2Title": "Lisieux Normandy Community",
    "projects.sae2Text":
      "Developed a web platform and relational database to support the Local Travel Plan (PLD) across 53 municipalities, analyzing the mobility needs of 73,700 residents for the energy transition.",
    "projects.githubCta": "Explore GitHub (@Clemzzz)",

    "contact.subtitle": "04 · Contact",
    "contact.title": "Get in touch",
    "contact.intro":
      "Available for a backend, data, or systems engineering internship starting April 2027.",
    "contact.linkedin": "Clément Bazin",
    "contact.copy": "Copy",
    "contact.copied": "Copied",

    "footer.rights": "© 2026 Clément Bazin · Caen, Normandy",
  },
  fr: {
    "nav.skip": "Aller au contenu principal",
    "nav.about": "À propos",
    "nav.skills": "Compétences",
    "nav.projects": "Projets",
    "nav.contact": "Contact",

    "profile.status": "Recherche de stage Data / Backend · Avril 2027 · Caen & alentours",
    "profile.role": "Étudiant en BUT Informatique — IUT d’Ifs (Caen)",
    "profile.summary":
      "Étudiant en BUT Informatique, orienté développement backend, bases de données (SQL / Data) et environnements Linux.",
    "profile.ctaProjects": "Voir mes projets",
    "profile.ctaContact": "Me contacter",

    "about.subtitle": "01 · Profil",
    "about.title": "À propos",
    "about.experienceTitle": "Expérience",
    "about.experienceText": "3+ ans\nProgrammation & projets",
    "about.educationTitle": "Formation",
    "about.educationText": "BUT Informatique\nIUT Campus 3 Ifs (Caen)",
    "about.focusTitle": "Objectif",
    "about.focusText": "Développement Backend,\nData & IA",
    "about.text":
      "Étudiant en BUT Informatique à l’IUT d’Ifs (Université de Caen Normandie), après un baccalauréat général spécialités Mathématiques et NSI. Je travaille principalement en C, Python, Java, SQL et Shell sous environnement Linux, sur des projets de bases de données relationnelles, d’architecture logicielle et de systèmes embarqués. En dehors du code, je pratique le tennis en club et la musique.",
    "about.tl1Title":
      "BUT Informatique — IUT Grand Ouest Normandie (Ifs)",
    "about.tl1Desc":
      "Algorithmique, langage C, Java, bases de données SQL, administration système Linux, gestion de projet",
    "about.tl2Title":
      "Baccalauréat Général — Institution Sainte-Marie (Caen)",
    "about.tl2Desc":
      "Spécialités Mathématiques & NSI (Numérique et Sciences Informatiques)",

    "skills.subtitle": "02 · Stack technique",
    "skills.title": "Compétences",
    "skills.catLang": "Langages & logiciel",
    "skills.catWeb": "Web & bases de données",
    "skills.catSys": "Systèmes & outils",
    "skills.htmlTitle": "HTML5",
    "skills.cssTitle": "CSS3 / Responsive",
    "skills.pythonTitle": "Python",
    "skills.jsTitle": "JavaScript",
    "skills.sqlTitle": "SQL & modélisation",
    "skills.uiTitle": "Maquettage UI/UX",
    "skills.bashTitle": "Bash / Shell",
    "skills.linuxTitle": "Linux / Virtualisation",
    "skills.gitTitle": "Git & GitHub",
    "skills.iotTitle": "ESP32 & capteurs",
    "skills.javaTitle": "Java",
    "skills.cTitle": "C",

    "projects.subtitle": "03 · Réalisations",
    "projects.title": "Projets réalisés",
    "projects.filterAll": "Tous",
    "projects.filterWeb": "Web & Data",
    "projects.filterSys": "Système & C",
    "projects.filterIot": "IoT & Embarqué",

    "projects.eduTitle": "Projet Éduc’Arte",
    "projects.eduMeta": "Projet pédagogique · 2024–2025",
    "projects.eduText":
      "Création d’un serveur web embarqué pour simuler l’effet de serre, hébergé sur une carte microcontrôleur ESP32. Acquisition en temps réel via capteurs d’humidité et de température et export des données en CSV.",

    "projects.gameTitle": "Architecture C-Engine",
    "projects.gameMeta": "Projet universitaire · 2025–2026",
    "projects.gameText":
      "Implémentation complète du moteur de jeu et de la logique de déplacement. Création d’une interface console ergonomique avec gestion robuste des erreurs de saisie, le tout en langage C.",

    "projects.saeTitle": "Poste de développement virtuel",
    "projects.sae2Title": "Communauté Lisieux Normandie",
    "projects.saeMeta": "Projet universitaire · 2025–2026",
    "projects.saeText":
      "Installation et administration d’un poste complet pour le développement. Configuration d’une machine virtuelle en dual boot Windows 10 / Ubuntu avec partitionnement commun et gestion multi-utilisateurs.",
    "projects.sae2Text":
      "Création d’un site web et d’une base de données pour accompagner l’élaboration du Plan Local de Déplacements (PLD). L’objectif est de recenser les besoins de mobilité de 73 700 habitants face aux enjeux de la transition énergétique.",
    "projects.githubCta": "Voir mon GitHub (@Clemzzz)",

    "contact.subtitle": "04 · Contact",
    "contact.title": "Me contacter",
    "contact.intro":
      "Disponible pour un stage ou une alternance en développement backend, data ou administration système à partir d’avril 2027.",
    "contact.linkedin": "Clément Bazin",
    "contact.copy": "Copier",
    "contact.copied": "Copié",

    "footer.rights": "© 2026 Clément Bazin · Caen, Normandie",
  },
};

let currentLang = "fr";

function setLanguage(lang) {
  const selected = translations[lang] ? lang : "fr";
  currentLang = selected;
  localStorage.setItem("lang", selected);
  document.documentElement.lang = selected;

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const isActive = btn.getAttribute("data-lang") === selected;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = translations[selected][key];
    if (!value) return;

    if (value.includes("\n")) {
      el.innerHTML = value.replace(/\n/g, "<br />");
    } else {
      el.innerText = value;
    }
  });
}

let copyTimeoutId = null;

function copyEmail() {
  const email = "clementbazin363@gmail.com";
  const btn = document.getElementById("copy-email-btn");
  const label = document.getElementById("copy-email-label");
  if (!navigator.clipboard) return;

  navigator.clipboard.writeText(email).then(() => {
    if (!btn || !label) return;
    if (copyTimeoutId) clearTimeout(copyTimeoutId);

    const copiedText = translations[currentLang]["contact.copied"];
    btn.classList.add("copied");
    label.innerText = copiedText;
    announceStatus(`${email} — ${copiedText}`);

    copyTimeoutId = setTimeout(() => {
      btn.classList.remove("copied");
      label.innerText = translations[currentLang]["contact.copy"];
    }, 2000);
  });
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterBtns.forEach((b) => {
        const isCurrent = b === btn;
        b.classList.toggle("active", isCurrent);
        b.setAttribute("aria-pressed", String(isCurrent));
      });

      let visibleCount = 0;
      projectCards.forEach((card) => {
        const categories = (card.getAttribute("data-category") || "").split(" ");
        const matches = filter === "all" || categories.includes(filter);
        card.classList.toggle("hidden", !matches);
        if (matches) visibleCount++;
      });

      announceStatus(`${visibleCount} projets affichés`);
    });
  });
}

function initScrollEffects() {
  const header = document.querySelector(".site-header");
  const backToTop = document.getElementById("back-to-top");
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll("#desktop-nav .nav-links a");

  const onScroll = () => {
    const scrollTop = window.scrollY;

    if (header) {
      header.classList.toggle("scrolled", scrollTop > 20);
    }
    if (backToTop) {
      backToTop.classList.toggle("visible", scrollTop > 400);
    }

    let currentSectionId = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 160;
      if (scrollTop >= top) {
        currentSectionId = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${currentSectionId}`);
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "fr";
  setLanguage(savedLang);
  initTheme();
  initProjectFilters();
  initScrollEffects();
});
