@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --gold:       #e8621a;
  --gold-dark:  #c44e0f;
  --gold-light: #f07840;
  --black:      #1a1a18;
  --white:      #ffffff;
  --cream:      #f4f4f2;
  --charcoal:   #f0efed;
  --parchment:  #ffffff;
  --section-dark: #1c1c1a;
  --mid:        #e2e0dc;
  --warm-grey:  #8a8880;
  --light-grey: #6a6a62;
  --nav-h:      72px;

  /* Font aliases */
  --font-title:   var(--font-title);
  --font-body:    var(--font-body);
  --font-display: var(--font-display);

  /* Type sizes */
  --text-label: 0.7rem;
  --text-ui:    0.72rem;
  --text-sub:   0.82rem;
  --text-body:  0.9rem;

  /* Letter spacing */
  --ls-caps: 0.2em;
  --ls-wide: 0.12em;
  --ls-body: 0.02em;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: var(--cream); color: var(--black); font-family: var(--font-body), sans-serif; }
a { text-decoration: none; color: inherit; }
img, video { display: block; max-width: 100%; }
button { cursor: pointer; }

/* Section spacing */
.section-pad { padding: 7rem clamp(2rem, 7vw, 8rem); }

/* Fade-up animation */
.fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
.fade-up.visible { opacity: 1; transform: translateY(0); }

/* Scoreboard card backgrounds — must match HTML site */
.sc-bg-1 { background: linear-gradient(145deg, #1a0e08 0%, #2a1608 50%, #0e0808 100%); }
.sc-bg-2 { background: linear-gradient(155deg, #080e1a 0%, #0e1220 50%, #04080e 100%); }
.sc-bg-3 { background: linear-gradient(150deg, #081408 0%, #0a1a08 50%, #060e06 100%); }
.sc-bg-4 { background: linear-gradient(145deg, #140608 0%, #1a0a08 50%, #0e0608 100%); }
.sc-bg-5 { background: linear-gradient(140deg, #080a10 0%, #0e1008 50%, #080a0e 100%); }
