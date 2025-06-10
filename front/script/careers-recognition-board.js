// header
const header = document.querySelector(".naftagaz__items > header");
let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
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
const transformBtn = document.querySelector(".transform_btn--sm");
const transformItem = document.querySelector(".company-employees");
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
// modal
const modalBtn = document.querySelectorAll(".company-employees_detail");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal_btns--leave");
const body = document.body; 
modalBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    overlay.classList.add("active");
    modal.classList.add("active");
    body.classList.add("modal-open"); 
  });
});
overlay.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  body.classList.remove("modal-open"); 
});

modalCloseBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  body.classList.remove("modal-open"); 
});
// topBtn
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
