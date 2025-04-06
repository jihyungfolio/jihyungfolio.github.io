document.addEventListener("DOMContentLoaded", () => {

  gsap.registerPlugin(ScrollTrigger);

  const projectsWrapper = document.querySelector(".tasks-wrapper");
  const tasks = document.querySelectorAll(".tasks");

  const projectsWidth = [...tasks].reduce(
    (acc, cur) => (acc += cur.offsetWidth),
    0
  );
  const projectWidth = projectsWidth / tasks.length;

  gsap.to(projectsWrapper, {
    x: () => -(projectsWidth - (window.innerWidth - projectWidth)),
    ease: "none",
    scrollTrigger: {
      trigger: "section#tasks",
      pin: true,
      scrub: true,
      start: "top top",
      end: () => projectsWidth - (window.innerWidth - projectWidth),
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });


  const container = document.querySelector(".container");
  const sections = document.querySelectorAll("main section");
  const paginationItems = document.querySelectorAll(".pagination li");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = [...sections].indexOf(entry.target);

        if (entry.isIntersecting) {
          console.log(index);
          container.style.backgroundImage = `url('./images/background${index}.png')`;
          paginationItems.forEach((item) => item.classList.remove("active"));
          if (paginationItems[index]) {
            paginationItems[index].classList.add("active");
          }
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  sections.forEach((section) => observer.observe(section));

  paginationItems.forEach((li, index) => {
    li.addEventListener("click", () => {
      sections[index].scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});

