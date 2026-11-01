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

// Close mobile menu on Escape and restore focus to trigger (better-accessibility)
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

  // Suppress transitions on theme switch to prevent color smearing (better-ui)
  const applyTheme = (checked) => {
    const root = document.documentElement;
    root.classList.add("no-transitions");
    document.body.classList.toggle("dark-theme", checked);
    localStorage.setItem("theme", checked ? "dark" : "light");

    if (desktopToggle) desktopToggle.checked = checked;
    if (mobileToggle) mobileToggle.checked = checked;

    // Force style flush before re-enabling transitions
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

    "profile.status": "Seeking Data / Backend Internship • April 2027 • Caen & surrounding area",
    "profile.greeting": "Hello, I’m",
    "profile.role": "Computer Science Student",
    "profile.summary":
      "Undergraduate in Computer Science, focusing on backend development, databases (SQL / Data), and Linux environments.",
    "profile.ctaProjects": "View My Projects",
    "profile.ctaContact": "Contact Me",

    "about.subtitle": "Get To Know More",
    "about.title": "About Me",
    "about.experienceTitle": "Experience",
    "about.experienceText": "3+ years\nProgramming & Projects",
    "about.educationTitle": "Education",
    "about.educationText": "B.Sc. (BUT) Computer Science\nIUT Campus 3 Ifs (Caen)",
    "about.focusTitle": "Goal",
    "about.focusText": "Software & Systems\nEngineering",
    "about.text":
      "My name is Clément, and I am currently pursuing a Bachelor’s degree (BUT) in Computer Science at the IUT in Ifs (Campus 3, University of Caen Normandy). Passionate about programming and systems, I have grown since graduating from high school (specializing in Mathematics and Computer Science) to become a versatile future engineer. Proficient in several languages (C, Python, Java, SQL, Shell), I am persistent and curious, comfortable working both independently and in a team. An avid tennis player and music enthusiast, I enjoy tackling complex challenges and turning ideas into functional solutions.",
    "about.tl1Title":
      "B.Sc. (BUT) in Computer Science — IUT Grand Ouest Normandie (Ifs)",
    "about.tl1Desc":
      "Algorithms, C programming, Java, SQL databases, Linux system administration, agile project management.",
    "about.tl2Title":
      "French Baccalauréat — Institution Sainte-Marie (Caen)",
    "about.tl2Desc":
      "Majors in Mathematics & NSI (Computer Science and Digital Technology).",

    "skills.subtitle": "Explore My",
    "skills.title": "Technical Skills",
    "skills.catDb": "Databases & Data",
    "skills.dbSql": "SQL (PostgreSQL, Oracle SQL)",
    "skills.dbModel": "Relational Data Modeling (ERD)",
    "skills.dbPlsql": "PL/SQL",
    "skills.catBackend": "Backend & Languages",
    "skills.langC": "C",
    "skills.langPython": "Python",
    "skills.langJava": "Java",
    "skills.langBash": "Bash / Shell Scripting",
    "skills.catSys": "Systems & Tools",
    "skills.sysLinux": "Linux (Arch, Ubuntu)",
    "skills.sysGit": "Git & GitHub CLI",
    "skills.sysDocker": "Docker",
    "skills.sysVirt": "Virtualization",
    "skills.catWeb": "Web",
    "skills.webJs": "JavaScript",
    "skills.webHtmlCss": "HTML5 / CSS3",
    "skills.webApi": "API Design",

    "projects.subtitle": "Discover My",
    "projects.title": "Featured Projects",
    "projects.filterAll": "All",
    "projects.filterWeb": "Web & Data",
    "projects.filterSys": "Systems & C",
    "projects.filterIot": "IoT & Embedded",

    "projects.eduTitle": "ÉDUC’ARTE PROJECT",
    "projects.eduMeta": "Educational project • 2024–2025",
    "projects.eduText":
      "Built an embedded web server on an ESP32 microcontroller to simulate the greenhouse effect. Real-time data acquisition from humidity and temperature sensors with automated CSV export.",

    "projects.gameTitle": "C-ENGINE ARCHITECTURE",
    "projects.gameMeta": "University project • 2025–2026",
    "projects.gameText":
      "Complete implementation of a game engine and movement logic in C. Designed an ergonomic console interface featuring strict input validation and error handling.",

    "projects.saeTitle": "VIRTUALIZED DEV WORKSTATION",
    "projects.saeMeta": "University project • 2025–2026",
    "projects.saeText":
      "Deployed and configured a complete developer workstation. Set up a dual-boot Windows 10 / Ubuntu Linux virtual machine with shared partitioning and multi-user permissions.",

    "projects.sae2Title": "LISIEUX NORMANDY COMMUNITY",
    "projects.sae2Text":
      "Developed a web platform and relational database to support the Local Travel Plan (PLD) across 53 municipalities, analyzing the mobility needs of 73,700 residents for the energy transition.",
    "projects.githubCta": "Explore my GitHub (@Clemzzz)",

    "contact.subtitle": "Get in Touch",
    "contact.title": "Contact Me",
    "contact.intro":
      "Looking for an intern, work-study student, or collaborator? Feel free to reach out directly!",
    "contact.linkedin": "Clément Bazin",
    "contact.copy": "Copy",
    "contact.copied": "Copied!",

    "footer.rights": "Copyright © 2026 Clément Bazin. All Rights Reserved.",
  },
  fr: {
    "nav.skip": "Aller au contenu principal",
    "nav.about": "À propos",
    "nav.skills": "Compétences",
    "nav.projects": "Projets",
    "nav.contact": "Contact",

    "profile.status": "Recherche de stage Data / Backend • Avril 2027 • Caen & alentours",
    "profile.greeting": "Bonjour, je suis",
    "profile.role": "Étudiant en Informatique",
    "profile.summary":
      "Étudiant en BUT Informatique, orienté développement backend, bases de données (SQL / Data) et environnements Linux.",
    "profile.ctaProjects": "Voir mes projets",
    "profile.ctaContact": "Me contacter",

    "about.subtitle": "En savoir plus",
    "about.title": "À propos de moi",
    "about.experienceTitle": "Expérience",
    "about.experienceText": "3+ ans\nProgrammation & Projets",
    "about.educationTitle": "Formation",
    "about.educationText": "BUT Informatique\nIUT Campus 3 Ifs (Caen)",
    "about.focusTitle": "Objectif",
    "about.focusText": "Ingénierie Logicielle\n& Systèmes",
    "about.text":
      "Je m’appelle Clément et je prépare actuellement un BUT en informatique à l’IUT d’Ifs (Campus 3 de l’Université de Caen Normandie). Passionné par la programmation et les systèmes, j’ai évolué depuis le lycée (spécialités Mathématiques et Numérique & Sciences Informatiques) pour devenir un futur ingénieur polyvalent. À l’aise avec plusieurs langages (C, Python, Java, SQL, Shell), je suis persévérant et curieux, capable de travailler aussi bien en autonomie qu’en équipe. Joueur de tennis et amateur de musique, j’aime relever des défis complexes et transformer des idées en solutions fonctionnelles.",
    "about.tl1Title":
      "BUT Informatique — IUT Grand Ouest Normandie (Ifs)",
    "about.tl1Desc":
      "Algorithmique, langage C, Java, bases de données SQL, administration système Linux, gestion de projet.",
    "about.tl2Title":
      "Baccalauréat Général — Institution Sainte-Marie (Caen)",
    "about.tl2Desc":
      "Spécialités Mathématiques & NSI (Numérique et Sciences Informatiques).",

    "skills.subtitle": "Découvrez mes",
    "skills.title": "Compétences",
    "skills.catDb": "Bases de données & Data",
    "skills.dbSql": "SQL (PostgreSQL, Oracle SQL)",
    "skills.dbModel": "Modélisation relationnelle (MCD/MLD)",
    "skills.dbPlsql": "PL/SQL",
    "skills.catBackend": "Backend & Langages",
    "skills.langC": "C",
    "skills.langPython": "Python",
    "skills.langJava": "Java",
    "skills.langBash": "Bash / Shell Scripting",
    "skills.catSys": "Systèmes & Outils",
    "skills.sysLinux": "Linux (Arch, Ubuntu)",
    "skills.sysGit": "Git & GitHub CLI",
    "skills.sysDocker": "Docker",
    "skills.sysVirt": "Virtualisation",
    "skills.catWeb": "Web",
    "skills.webJs": "JavaScript",
    "skills.webHtmlCss": "HTML5 / CSS3",
    "skills.webApi": "Conception d'APIs",

    "projects.subtitle": "Découvrez mes",
    "projects.title": "Projets réalisés",
    "projects.filterAll": "Tous",
    "projects.filterWeb": "Web & Data",
    "projects.filterSys": "Système & C",
    "projects.filterIot": "IoT & Embarqué",

    "projects.eduTitle": "PROJET ÉDUC’ARTE",
    "projects.eduMeta": "Projet pédagogique • 2024–2025",
    "projects.eduText":
      "Création d’un serveur web embarqué pour simuler l’effet de serre, hébergé sur une carte microcontrôleur ESP32. Acquisition en temps réel via capteurs d’humidité et de température et export des résultats en CSV.",

    "projects.gameTitle": "ARCHITECTURE C-ENGINE",
    "projects.gameMeta": "Projet universitaire • 2025–2026",
    "projects.gameText":
      "Implémentation complète du moteur de jeu et de la logique de déplacement. Création d’une interface console ergonomique avec gestion robuste des erreurs de saisie, le tout en langage C.",

    "projects.saeTitle": "POSTE DE DÉVELOPPEMENT VIRTUEL",
    "projects.sae2Title": "COMMUNAUTÉ LISIEUX NORMANDIE",
    "projects.saeMeta": "Projet universitaire • 2025–2026",
    "projects.saeText":
      "Installation et administration d’un poste complet pour le développement. Configuration d’une machine virtuelle en dual boot Windows 10 / Ubuntu avec partitionnement commun et gestion multi-utilisateurs.",
    "projects.sae2Text":
      "Création d’un site web et d’une base de données pour accompagner l’élaboration du Plan Local de Déplacements (PLD). L’objectif est de recenser les besoins de mobilité de 73 700 habitants face aux enjeux de la transition énergétique.",
    "projects.githubCta": "Voir mon GitHub (@Clemzzz)",

    "contact.subtitle": "Entrons en contact",
    "contact.title": "Contactez-moi",
    "contact.intro":
      "Vous avez une opportunité de stage, d’alternance ou un projet à partager ? N’hésitez pas à m’écrire !",
    "contact.linkedin": "Clément Bazin",
    "contact.copy": "Copier",
    "contact.copied": "Copié !",

    "footer.rights": "Copyright © 2026 Clément Bazin. Tous droits réservés.",
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
  const email = "clementbazin@icloud.com";
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
  const progressBar = document.getElementById("scroll-progress");
  const header = document.querySelector(".site-header");
  const backToTop = document.getElementById("back-to-top");
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll("#desktop-nav .nav-links a");

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
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
