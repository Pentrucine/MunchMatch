let index = 0,
  interval = 1000;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const animate = (logo) => {
  logo.style.setProperty("--logo-left", `${rand(-10, 100)}%`);
  logo.style.setProperty("--logo-top", `${rand(-40, 80)}%`);

  logo.style.animation = "none";
  logo.offsetHeight;
  logo.style.animation = "";
};

for (const logo of document.getElementsByClassName("magic-logo")) {
  setTimeout(() => {
    animate(logo);

    setInterval(() => animate(logo), 1000);
  }, index++ * (interval / 3));
}
