const sections = [...document.querySelectorAll("main .section[id]")];
const navLinks = [...document.querySelectorAll(".nav a")];
const revealElements = [...document.querySelectorAll(".reveal")];

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
);

revealElements.forEach((el) => revealObserver.observe(el));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        const isMatch = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("active", isMatch);
      });
    });
  },
  {
    rootMargin: "-30% 0px -55% 0px",
    threshold: 0.01
  }
);

sections.forEach((section) => navObserver.observe(section));

const carousel = document.querySelector(".video-carousel");

if (carousel) {
  const slides = [...carousel.querySelectorAll("[data-carousel-slide]")];
  const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  let activeIndex = 0;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("active", isActive);

      const video = slide.querySelector("video");
      if (video && !isActive) {
        video.pause();
      }
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === activeIndex);
    });
  };

  prevButton?.addEventListener("click", () => showSlide(activeIndex - 1));
  nextButton?.addEventListener("click", () => showSlide(activeIndex + 1));
  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => showSlide(dotIndex));
  });
}

