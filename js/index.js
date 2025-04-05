document.addEventListener("DOMContentLoaded", () => {

  // ========== Scroll 처리 부분 시작 ==========
  gsap.registerPlugin(ScrollTrigger);

  const projectsWrapper = document.querySelector(".projects-wrapper");
  const projects = document.querySelectorAll(".projects");

  const projectsWidth = [...projects].reduce(
    (acc, cur) => (acc += cur.offsetWidth),
    0
  );
  const projectWidth = projectsWidth / projects.length;

  gsap.to(projectsWrapper, {
    x: () => -(projectsWidth - (window.innerWidth - projectWidth)),
    ease: "none",
    scrollTrigger: {
      trigger: "section#projects",
      pin: true,
      scrub: true,
      start: "top top",
      end: () => projectsWidth - (window.innerWidth - projectWidth),
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });
  // ========== Scroll 처리 부분 끝 ==========


  // ========== Pagination 처리 부분 시작 ==========
  const container = document.querySelector(".container");
  const sections = document.querySelectorAll("main section");
  const pagination = document.querySelector(".pagination ul");
  const paginationItems = document.querySelectorAll(".pagination li");
  // const filterColors = ['white', 'black', 'orange', 'red']

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = [...sections].indexOf(entry.target);

        if (entry.isIntersecting) {
          console.log(index);
          container.style.backgroundImage = `url('./images/background${index}.png')`;
          // container.style.backgroundColor = filterColors[index];
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
// ========== Pagination 처리 부분 끝 ==========
