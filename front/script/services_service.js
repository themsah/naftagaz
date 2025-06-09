// Header behavior
const header = document.querySelector(".naftagaz__items > header");
let lastScrollY = window.scrollY;
const companyInfoSection = document.querySelector(".company-Production");
window.addEventListener("scroll", () => {
  const companyTop =
    companyInfoSection.getBoundingClientRect().top + window.scrollY;
  const companyBottom = companyTop + companyInfoSection.offsetHeight;
  const currentScrollY = window.scrollY;

  if (currentScrollY >= companyTop && currentScrollY <= companyBottom) {
    header.classList.add("hide-header");
  } else {
    if (currentScrollY === 0) {
      header.classList.remove("hide-header");
      header.classList.remove("has-background");
    } else if (currentScrollY > lastScrollY) {
      header.classList.add("hide-header");
      header.classList.remove("has-background");
    } else {
      header.classList.remove("hide-header");
      header.classList.add("has-background");
    }
  }
  lastScrollY = currentScrollY;
});
const headerBtn = document.querySelectorAll(".header__detail-btns");
const headerIcon = document.querySelector(".header__detail-icon");
const headerContacts = document.querySelectorAll(".header__contact");
const hamburgerMenuBtn = document.querySelector(".hamburger-menu__btn");
const hamburgerMenuDetail = document.querySelector(".hamburger-menu__detail");
const hamburgerMenuClose = document.querySelector(".hamburger-menu__btnClose");
const megaMenuBtn = document.querySelectorAll(".menuSm");
headerBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.stopPropagation();
    btn.classList.toggle("header__detail-btnsActive");
    headerIcon.classList.toggle("header__detail-iconActive");
    btn.classList.toggle("header__detail-hoverable");
    headerContacts.forEach((item) => {
      item.classList.toggle("header__contactActive");
    });
  });
});
document.addEventListener("click", (event) => {
  headerContacts.forEach((contact) => {
    let isClickInsideHeaderContact = contact.contains(event.target);
    let isClickOnHeaderBtn = false;
    headerBtn.forEach((btn) => {
      if (btn.contains(event.target)) {
        isClickOnHeaderBtn = true;
      }
    });
    if (
      contact.classList.contains("header__contactActive") &&
      !isClickInsideHeaderContact &&
      !isClickOnHeaderBtn
    ) {
      contact.classList.remove("header__contactActive");
      headerBtn.forEach((btn) => {
        btn.classList.remove("header__detail-btnsActive");
        btn.classList.add("header__detail-hoverable");
      });
      if (headerIcon) {
        headerIcon.classList.remove("header__detail-iconActive");
      }
    }
  });
});
hamburgerMenuBtn.addEventListener("click", () => {
  hamburgerMenuDetail.classList.add("hamburger-menu__detailActive");
});
hamburgerMenuClose.addEventListener("click", () => {
  hamburgerMenuDetail.classList.remove("hamburger-menu__detailActive");
});
megaMenuBtn.forEach((btn) => {
  const menuSmIcon = btn.querySelector(".menuSm__icon");
  const iconStyle = btn.querySelector(".menuSm__iconStyle");

  btn.addEventListener("click", () => {
    btn.classList.toggle("menuSmActive");
    if (menuSmIcon) menuSmIcon.classList.toggle("menuSm__iconActive");
    if (iconStyle) iconStyle.classList.toggle("menuSm__icon-styleActive");

    megaMenuBtn.forEach((otherBtn) => {
      if (otherBtn !== btn && otherBtn.classList.contains("menuSmActive")) {
        otherBtn.classList.remove("menuSmActive");
        const otherIcon = otherBtn.querySelector(".menuSm__icon");
        const otherIconStyle = otherBtn.querySelector(".menuSm__iconStyle");
        if (otherIcon) otherIcon.classList.remove("menuSm__iconActive");
        if (otherIconStyle)
          otherIconStyle.classList.remove("menuSm__icon-styleActive");
      }
    });
  });
});
// company-drilling transform
const transformBtn = document.querySelector(".company-drilling_icon--btn");
const transformItem = document.querySelector(".company-drilling_description");
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
transformBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const offsetTop = transformItem.getBoundingClientRect().top + window.scrollY;

  gsap.to(window, {
    duration: 2,
    scrollTo: {
      y: offsetTop,
      autoKill: false,
    },
    ease: "power2.out",
  });
});
// Production-Processes
if (window.innerWidth >= 768) {
  const sections = gsap.utils.toArray(".company-production_text");
  const progressNumber = document.getElementById("progress-number");
  const circle = document.querySelector(".circle");
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".company-Production",
      start: "top top",
      end: () => "+=" + sections.length * window.innerHeight,
      scrub: true,
      pin: true,
    },
  });
  tl.to(sections, {
    yPercent: -100 * (sections.length - 1),
    ease: "none",
  });
  ScrollTrigger.create({
    trigger: ".company-Production",
    start: "top top",
    end: () => "+=" + sections.length * window.innerHeight,
    onUpdate: (self) => {
      const index = Math.round(self.progress * (sections.length - 1));
      progressNumber.textContent = `${index + 1}/${sections.length}`;
      circle.style.strokeDashoffset =
        100 - ((index + 1) / sections.length) * 100;
    },
  });
}
// footer btn
const topBtn = document.querySelectorAll(".footer__detail-button");
topBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
});
