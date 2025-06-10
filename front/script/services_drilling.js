const header = document.querySelector(".naftagaz__items > header");
let lastScrollY = window.scrollY;
const companyInfoSection = document.querySelector(".company-Production");
const servicesUseSection = document.querySelector(".services-use");
window.addEventListener("scroll", () => {
  const companyTop =
    companyInfoSection.getBoundingClientRect().top + window.scrollY;
  const companyBottom = companyTop + companyInfoSection.offsetHeight;
  const servicesUseTop =
    servicesUseSection.getBoundingClientRect().top + window.scrollY;
  const servicesUseBottom = servicesUseTop + servicesUseSection.offsetHeight;
  const currentScrollY = window.scrollY;

  if (
    (currentScrollY >= companyTop && currentScrollY <= companyBottom) ||
    (currentScrollY >= servicesUseTop && currentScrollY <= servicesUseBottom)
  ) {
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
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const serviceScroller = document.querySelector(".services-use");
  const detailText = document.querySelector(".services-use_detail--text");
  const number = document.querySelector(
    ".services-use_description--varibleNumber"
  );
  const descriptionText = document.querySelector(
    ".services-use_description--text"
  );
  const descriptionImg = document.querySelector(
    ".services-use_description--styles"
  );
  const serviceScrollerTwo = document.querySelector(".services-useTwo");
  gsap.set(detailText, { opacity: 1 });
  gsap.set(number, { opacity: 1 });
  gsap.set(descriptionText, { opacity: 1 });
  gsap.set(descriptionImg, { opacity: 1 });
  gsap.set(serviceScrollerTwo, { opacity: 0 });
  ScrollTrigger.create({
    trigger: serviceScroller,
    start: "top top", 
    end: "center top", 
    pin: true,
    scrub: true, 
    onEnter: () => {
      gsap.to(detailText, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(number, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(descriptionText, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(descriptionImg, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      gsap.to(detailText, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(number, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(descriptionText, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(descriptionImg, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(serviceScrollerTwo, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    onEnterBack: () => {
      gsap.to(detailText, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(number, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(descriptionText, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(descriptionImg, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(serviceScrollerTwo, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    },
    onLeaveBack: () => {
      gsap.to(detailText, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(number, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(descriptionText, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(descriptionImg, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(serviceScrollerTwo, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    },
  });
});
const offcanvasBtn = document.querySelector(".services-use_detail--btns");
const offcanvas = document.querySelector(".offcanvas");
const offcanvasCloseBtn = document.querySelector(".offcanvas-btn");
const offcanvasOverlay = document.querySelector(".offcanvas-overlay");
const body = document.body;
offcanvasBtn.addEventListener("click", () => {
  offcanvas.classList.add("active");
  offcanvasOverlay.classList.add("active");
  body.classList.add("offcanvas-open");
});
offcanvasCloseBtn.addEventListener("click", () => {
  offcanvas.classList.remove("active");
  offcanvasOverlay.classList.remove("active");
  body.classList.remove("offcanvas-open");
});
offcanvasOverlay.addEventListener("click", () => {
  offcanvas.classList.remove("active");
  offcanvasOverlay.classList.remove("active");
  body.classList.remove("offcanvas-open");
});
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