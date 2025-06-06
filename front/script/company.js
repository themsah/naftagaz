// Header behavior
const header = document.querySelector(".naftagaz__items > header");
let lastScrollY = window.scrollY;
const companyInfoSection = document.querySelector(".company_information");

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
// company_intro
const transformBtn = document.querySelector(".naftagaz_video-icon");
const transformItem = document.querySelector(".naftagaz_success");
const transformText = document.querySelector(".naftagaz_video-text");
const naftagazIntro = document.querySelector(".company_intro");
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
transformBtn.addEventListener("click", (e) => {
  e.preventDefault();

  gsap.to(transformText, { opacity: 0, duration: 0.5 });

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
ScrollTrigger.create({
  trigger: transformBtn,
  start: "top bottom",
  end: "bottom top",
  toggleActions: "play reverse play reverse",
  onEnterBack: () => {
    gsap.to(transformText, { opacity: 1, duration: 0.5 });
  },
  onLeave: () => {
    gsap.to(transformText, { opacity: 0, duration: 0.5 });
  },
  immediateRender: false,
});
ScrollTrigger.create({
  trigger: "body",
  start: "top top",
  end: () =>
    transformItem.getBoundingClientRect().top + window.scrollY + " top",
  scrub: true,
  animation: gsap.to(naftagazIntro, {
    width: "80%",
    height: "80%",
    scale: 0.7,
    xPercent: -50,
    yPercent: -50,
    left: "50%",
    top: "1000px",
    position: "absolute",
    ease: "none",
  }),
});
gsap.set(naftagazIntro, {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  scale: 1,
});
// slider1
const nextBtn = document.querySelector(".slider_btn-next");
const prevBtn = document.querySelector(".slider_btn-prev");
const sliderNumber = document.querySelector(".slider_number");
const slider = document.querySelector(".slider");
const sliderText = document.querySelector(".slider_text");
let index = 0;
let sliderImagesElements;
const sliderDetail = [
  {
    id: 1,
    img: "../img/slide-1.jpg",
    text: "ما افتخار همه ما تعهدات به ما مشتریان – به صورت حرفه‌ای و روی زمان",
  },
  {
    id: 2,
    img: "../img/slide2.jpg",
    text: "ایمنی از ما کارمندان است ما اولویت",
  },
  {
    id: 3,
    img: "../img/slide-3.jpg",
    text: "ما ماموریت است به حفظ و نگهداری ما بلندمدت و پایدار توسعه در ... صنعت، و گرفتن  ... سرب روی  ... بازار برای روغن و گاز خب ساخت و ساز خدمات",
  },
  {
    id: 4,
    img: "../img/slide-4.jpg",
    text: "ما پیاده‌سازی جدید فرآیند راه حل ها از طریق بسیار کارآمد استفاده از تجهیزات",
  },
];
const sliderImg = sliderDetail.map((item) => {
  return item.img;
});
function nextSlide(e) {
  if (e) e.preventDefault();
  index = (index + 1) % sliderImg.length;
  updateSlider();
}
function prevSlide(e) {
  e.preventDefault();
  index = (index - 1 + sliderImg.length) % sliderImg.length;
  updateSlider();
}
function updateSlider() {
  sliderNumber.textContent = `${index + 1}/${sliderDetail.length}`;

  gsap.to(sliderText, {
    opacity: 0,
    y: 20,
    duration: 0.3,
    ease: "power1.out",
    onComplete: () => {
      sliderText.innerHTML = sliderDetail[index].text;
      gsap.fromTo(
        sliderText,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" }
      );
    },
  });

  sliderImagesElements.forEach((img, idx) => {
    if (idx === index) {
      gsap.to(img, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
      });
      img.style.zIndex = 1;
    } else {
      gsap.to(img, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          img.style.zIndex = 0;
        },
      });
    }
  });
}
// slider2
const sliderTwoContainer = document.querySelector(".slidersTwo");
const sliderImgTwoElement = sliderTwoContainer.querySelector(".slider__imgTwo");
const sliderTextTwoElement =
  sliderTwoContainer.querySelector(".slider_textTwo");
const sliderDetailTextElement = sliderTwoContainer.querySelector(
  ".slider-detail_text"
);
const sliderTaskElement = sliderTwoContainer.querySelector(".slider-task");
const nextBtnTwo = sliderTwoContainer.querySelector(".slider_btn-next-two");
const sliderPrograsbarImg = sliderTwoContainer.querySelector(
  ".slider-prograsbar_img"
);
const sliderPrograsbar = sliderTwoContainer.querySelector(".slider_prograsbar");
let indexTwo = 0;
let progressBarTween;
const progressDuration = 5;
const sliderTwoDetail = [
  {
    id: 1,
    img: "../img/twoman.jpg",
    text: "تورال کریموف",
    detail:
      "The شرکت بسیار واجد شرایط اجرایی کارکنان با گسترده تجربه در ... صنعت<br />فراهم کردن «کلید در دست» پروژه توسعه خدمات به به صورت عمودی یکپارچه روغن و گاز<br />شرکت‌ها تأمین از تدارکات خدمات است همچنین در میان ... شرکت اولویت‌ها",
    btnImg: "../img/twoman.jpg", // عکس کوچک برای اسلاید بعدی
    task: "رئیس هیئت مدیره",
  },
  {
    id: 2,
    img: "../img/oneman.jpg",
    text: "نیکولای گریشانکوف",
    detail:
      "The شرکت بسیار واجد شرایط اجرایی کارکنان با تجربه عمیق در زمینه پروژه‌های بزرگ صنعتی.<br />تمرکز بر راه‌حل‌های نوآورانه و پایدار برای توسعه صنعت نفت و گاز.<br />ارائه خدمات کامل از طراحی تا اجرا، با رعایت بالاترین استانداردهای ایمنی و کیفیت.",
    btnImg: "../img/oneman.jpg", // عکس کوچک برای اسلاید بعدی
    task: "مدیرعامل",
  },
];
const modalBtn = document.querySelector(".slider-detail_btns");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close");
const modalImg = document.querySelector(".modal-img");
const modalImgMobile = document.querySelector(".modal-img-mobile");
const modalDetail = document.querySelector(".modal-detail");
const modalOverlay = document.querySelector(".modal-overlay");
modalBtn.addEventListener("click", () => {
  modal.classList.add("active");
  modalClose.classList.add("active");
  if (window.innerWidth <= 640) {
    modalImg.classList.remove("active");
    modalImgMobile.classList.add("active");
  } else {
    modalImg.classList.add("active");
    modalImgMobile.classList.remove("active");
  }
  modalOverlay.scrollTop = 0;
});
modalClose.addEventListener("click", () => {
  modal.classList.remove("active");
  modalClose.classList.remove("active");
  modalImg.classList.remove("active");
  modalImgMobile.classList.remove("active");
});
window.addEventListener("resize", () => {
  if (modal.classList.contains("active")) {
    if (window.innerWidth <= 640) {
      modalImg.classList.remove("active");
      modalImgMobile.classList.add("active");
    } else {
      modalImg.classList.add("active");
      modalImgMobile.classList.remove("active");
    }
  }
});
function startProgressBarAnimation() {
  if (progressBarTween) {
    progressBarTween.kill();
  }
  gsap.set(sliderPrograsbar, { "--after-width": "0%" });
  progressBarTween = gsap.to(sliderPrograsbar, {
    "--after-width": "100%",
    duration: progressDuration,
    ease: "none",
    onComplete: nextSlideTwo,
  });
}
function updateSliderTwo() {
  const currentSlide = sliderTwoDetail[indexTwo];
  const nextSlideData =
    sliderTwoDetail[(indexTwo + 1) % sliderTwoDetail.length];
  gsap.to(sliderImgTwoElement, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
    onComplete: () => {
      sliderImgTwoElement.src = currentSlide.img;
      gsap.to(sliderImgTwoElement, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
      });
    },
  });

  gsap.to(sliderTextTwoElement, {
    opacity: 0,
    y: 20,
    duration: 0.3,
    ease: "power1.out",
    onComplete: () => {
      sliderTextTwoElement.innerHTML = currentSlide.text;
      gsap.fromTo(
        sliderTextTwoElement,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" }
      );
    },
  });
  gsap.to(sliderDetailTextElement, {
    opacity: 0,
    y: 20,
    duration: 0.3,
    ease: "power1.out",
    onComplete: () => {
      sliderDetailTextElement.innerHTML = currentSlide.detail;
      gsap.fromTo(
        sliderDetailTextElement,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" }
      );
    },
  });
  gsap.to(sliderTaskElement, {
    opacity: 0,
    y: 20,
    duration: 0.3,
    ease: "power1.out",
    onComplete: () => {
      sliderTaskElement.innerHTML = currentSlide.task;
      gsap.fromTo(
        sliderTaskElement,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" }
      );
    },
  });

  sliderPrograsbarImg.src = nextSlideData.btnImg;
  startProgressBarAnimation();
}
function nextSlideTwo(e) {
  if (e) e.preventDefault();
  indexTwo = (indexTwo + 1) % sliderTwoDetail.length;
  updateSliderTwo();
}
nextBtnTwo.addEventListener("click", (e) => {
  nextSlideTwo(e);
  if (progressBarTween) {
    progressBarTween.restart();
  }
});
window.addEventListener("DOMContentLoaded", () => {
  sliderImg.forEach((item) => {
    const el = document.createElement("img");
    el.classList.add("slider_img");
    el.src = item;
    slider.appendChild(el);
  });
  sliderImagesElements = document.querySelectorAll(".slider_img");
  updateSlider();
  updateSliderTwo();
});
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
// card
const card = document.querySelector(".company-drilling");
const img = document.querySelector(".company-drilling_img");
card.addEventListener("mousemove", (e) => {
  const cardRect = card.getBoundingClientRect();
  const cardW = cardRect.width;
  const cardH = cardRect.height;
  const cardXCenterViewport = cardRect.left + cardW / 2;
  const cardYCenterViewport = cardRect.top + cardH / 2;
  const mouseX = e.clientX - cardXCenterViewport;
  const mouseY = e.clientY - cardYCenterViewport;
  const rtX = (25 * mouseY) / (cardH / 2);
  const rtY = (-25 * mouseX) / (cardW / 2);
  img.style.transform = `perspective(900px) rotateX(${rtX}deg) rotateY(${rtY}deg)`;
});
card.addEventListener("mouseleave", (e) => {
  img.style.transform = `perspective(400px) rotateX(0deg) rotateY(0deg)`;
});
// scroller
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const scrollNumbers = gsap.utils.toArray(".company_information-scroll span");
  const scrollImages = gsap.utils.toArray(".company_information-img");
  const scrollTexts = gsap.utils.toArray(".company_information-text");
  const container = document.querySelector(".company_information-scroll");
  const companyInfoSection = document.querySelector(".company_information");
  if (
    scrollNumbers.length !== scrollImages.length ||
    scrollNumbers.length !== scrollTexts.length
  ) {
    console.error(
      "تعداد عناصر (اعداد، تصاویر، متون) برابر نیستند. لطفا بررسی کنید."
    );
    return;
  }
  const totalSlides = scrollNumbers.length;
  const scrollStepHeight = companyInfoSection.offsetHeight;
  const numberTotalHeight = scrollNumbers[0]
    ? scrollNumbers[0].offsetHeight +
      parseFloat(getComputedStyle(scrollNumbers[0]).marginBottom)
    : 70;
  gsap.set(scrollImages.slice(1), { opacity: 0 });
  gsap.set(scrollTexts.slice(1), { opacity: 0, y: 20 });
  scrollTexts[0].classList.add("active");

  scrollNumbers.forEach((num, i) => {
    gsap.set(num, { opacity: i === 0 ? 1 : 0.4 });
  });
  scrollNumbers[0].classList.add("active");
  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: companyInfoSection,
      pin: true,
      start: "top top",
      end: `+=${totalSlides * scrollStepHeight + window.innerHeight}`,
      scrub: 1,
      snap: {
        snapTo: "labels",
        duration: { min: 0.2, max: 0.5 },
        delay: 0.1,
      },
      onLeaveBack: () => {
        masterTl.progress(0);
        gsap.to(container, { y: 0, duration: 0.3 });
        scrollNumbers.forEach((num, i) => {
          gsap.to(num, { opacity: i === 0 ? 1 : 0.4, duration: 0.3 });
          num.classList.remove("active");
        });
        scrollNumbers[0].classList.add("active");
        scrollImages.forEach((img, i) => {
          gsap.to(img, { opacity: i === 0 ? 1 : 0, duration: 0.3 });
        });
        scrollTexts.forEach((text, i) => {
          gsap.to(text, {
            opacity: i === 0 ? 1 : 0,
            y: i === 0 ? 0 : 20,
            duration: 0.3,
          });
          text.classList.remove("active");
        });
        scrollTexts[0].classList.add("active");
      },
      onEnterBack: (self) => {
        const currentProgress = self.progress;
        const currentIndex = Math.round(currentProgress * (totalSlides - 1));
        gsap.to(container, {
          y: -currentIndex * numberTotalHeight,
          duration: 0.3,
        });
        scrollNumbers.forEach((num, i) => {
          if (i === currentIndex) {
            num.classList.add("active");
            gsap.to(num, { opacity: 1, duration: 0.3 });
          } else {
            num.classList.remove("active");
            gsap.to(num, { opacity: 0.4, duration: 0.3 });
          }
        });
        scrollImages.forEach((img, i) => {
          gsap.to(img, {
            opacity: i === currentIndex ? 1 : 0,
            duration: 0.3,
          });
        });
        scrollTexts.forEach((text, i) => {
          if (i === currentIndex) {
            text.classList.add("active");
            gsap.to(text, { opacity: 1, y: 0, duration: 0.3 });
          } else {
            text.classList.remove("active");
            gsap.to(text, { opacity: 0, y: 20, duration: 0.3 });
          }
        });
      },
    },
  });
  scrollNumbers.forEach((num, i) => {
    masterTl.addLabel(`slide-${i}`);
    if (i > 0) {
      masterTl.to(
        scrollImages[i - 1],
        { opacity: 0, y: 20, duration: 0.5 },
        `slide-${i}`
      );
      masterTl.to(
        scrollTexts[i - 1],
        {
          opacity: 0,
          y: -20,
          duration: 0.5,
          onComplete: () => scrollTexts[i - 1].classList.remove("active"),
        },
        `slide-${i}`
      );
      masterTl.to(
        scrollNumbers[i - 1],
        {
          opacity: 0.4,
          duration: 0.5,
          onComplete: () => scrollNumbers[i - 1].classList.remove("active"),
        },
        `slide-${i}`
      );
    }
    masterTl.to(scrollImages[i], { opacity: 1, duration: 0.5 }, `slide-${i}`);
    masterTl.to(
      scrollTexts[i],
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        onStart: () => scrollTexts[i].classList.add("active"),
      },
      `slide-${i}`
    );
    masterTl.to(
      scrollNumbers[i],
      {
        opacity: 1,
        duration: 0.5,
        onStart: () => scrollNumbers[i].classList.add("active"),
      },
      `slide-${i}`
    );
    masterTl.to(
      container,
      { y: -i * numberTotalHeight, duration: 0.5, ease: "power2.inOut" },
      `slide-${i}`
    );
    masterTl.to({}, { duration: 1.5 }, `slide-${i}+=0.5`);
  });
  const progress = document.querySelector(".progress");
  const texts = document.querySelectorAll(".text");
  const dynamicSuffixTrack = document.querySelector(".dynamic-suffix-track");
  const radius = 250;
  const circumference = 2 * Math.PI * radius;
  progress.style.strokeDasharray = circumference;
  progress.style.strokeDashoffset = circumference;
  const minYear = 2013;
  const maxYear = 2023;
  for (let y = minYear; y <= maxYear; y++) {
    const el = document.createElement("div");
    el.className = "dynamic-suffix";
    el.textContent = y.toString().slice(2);
    el.setAttribute("data-year-suffix", y.toString().slice(2));
    dynamicSuffixTrack.appendChild(el);
  }
  const suffixElems = document.querySelectorAll(
    ".dynamic-suffix-track .dynamic-suffix"
  );
  const suffixHeight = suffixElems[0] ? suffixElems[0].offsetHeight : 0;
  const parentHeight = dynamicSuffixTrack.parentElement.offsetHeight;
  const centerOffset = parentHeight / 2 - suffixHeight / 2;
  gsap.set(dynamicSuffixTrack, { y: centerOffset });
  suffixElems[0].classList.add("active");
  texts[0].classList.add("active", "current-year-item");
  texts.forEach((text, index) => {
    const year = parseInt(text.dataset.year);
    ScrollTrigger.create({
      trigger: text,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        const yearIndex = year - minYear;
        const suffixOffset = -(yearIndex * suffixHeight) + centerOffset;
        gsap.to(dynamicSuffixTrack, { y: suffixOffset, duration: 0.3 });

        suffixElems.forEach((el) => el.classList.remove("active"));
        suffixElems[yearIndex].classList.add("active");

        const progressValue = (year - minYear) / (maxYear - minYear);
        const offset = circumference - progressValue * circumference;
        gsap.to(progress, { strokeDashoffset: offset, duration: 0.3 });

        texts.forEach((t) => t.classList.remove("active", "current-year-item"));
        text.classList.add("active", "current-year-item");
      },
      onLeaveBack: () => {
        if (index > 0) {
          const prevYear = parseInt(texts[index - 1].dataset.year);
          const prevYearIndex = prevYear - minYear;
          const suffixOffset = -(prevYearIndex * suffixHeight) + centerOffset;
          gsap.to(dynamicSuffixTrack, { y: suffixOffset, duration: 0.3 });

          suffixElems.forEach((el) => el.classList.remove("active"));
          suffixElems[prevYearIndex].classList.add("active");

          const progressValue = (prevYear - minYear) / (maxYear - minYear);
          const offset = circumference - progressValue * circumference;
          gsap.to(progress, { strokeDashoffset: offset, duration: 0.3 });

          texts.forEach((t) =>
            t.classList.remove("active", "current-year-item")
          );
          texts[index - 1].classList.add("active", "current-year-item");
        } else {
          gsap.to(dynamicSuffixTrack, { y: centerOffset, duration: 0.3 });
          suffixElems.forEach((el) => el.classList.remove("active"));
          suffixElems[0].classList.add("active");
          gsap.to(progress, { strokeDashoffset: circumference, duration: 0.3 });
          texts.forEach((t) =>
            t.classList.remove("active", "current-year-item")
          );
          texts[0].classList.add("active", "current-year-item");
        }
      },
      onEnterBack: () => {
        const yearIndex = year - minYear;
        const suffixOffset = -(yearIndex * suffixHeight) + centerOffset;
        gsap.to(dynamicSuffixTrack, { y: suffixOffset, duration: 0.3 });

        suffixElems.forEach((el) => el.classList.remove("active"));
        suffixElems[yearIndex].classList.add("active");

        const progressValue = (year - minYear) / (maxYear - minYear);
        const offset = circumference - progressValue * circumference;
        gsap.to(progress, { strokeDashoffset: offset, duration: 0.3 });

        texts.forEach((t) => t.classList.remove("active", "current-year-item"));
        text.classList.add("active", "current-year-item");
      },
    });
  });
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 10);
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
// Location Scroll Animation
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const companyLocationSection = document.querySelector(".company-location");
  const locationH2 = document.querySelector(".company-location_h2");
  const locationText = document.querySelector(".company-location_text");
  const locationCircle = document.querySelector(".company-location_circle");
  const locationImg = document.querySelector(".company-location_img");
  const companyLocationTwo = document.querySelector(".company-locationTwo");
  const locationTextSm = document.querySelector(".company-location_text-sm");
  const offcanvasDetails = document.querySelectorAll(
    ".company-location_offcanvas--detail"
  );
  gsap.set(locationH2, { opacity: 0, y: 50 });
  gsap.set(locationText, { opacity: 0, y: 50 });
  gsap.set(locationTextSm, { opacity: 0, y: 50 });
  gsap.set(locationCircle, { scale: 0 });
  gsap.set(locationImg, { height: 0 });
  gsap.set(companyLocationTwo, { opacity: 0, visibility: "hidden" });
  // Set initial state for offcanvas details
  offcanvasDetails.forEach((detail) => {
    gsap.set(detail, { right: -500, opacity: 0, visibility: "hidden" });
  });
  ScrollTrigger.create({
    trigger: companyLocationSection,
    start: "top center",
    end: "center center",
    scrub: true,
    onEnter: () => {
      gsap.to(locationH2, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      });
      gsap.to(locationText, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
      });
      gsap.to(locationTextSm, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
      });
      gsap.to(locationCircle, { scale: 1, duration: 1, ease: "back.out(1.7)" });
      gsap.to(locationImg, { height: 300, duration: 1, ease: "power2.out" });
    },
    onLeave: () => {
      gsap.to(locationH2, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.in",
      });
      gsap.to(locationText, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        delay: 0.1,
        ease: "power2.in",
      });
      gsap.to(locationTextSm, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        delay: 0.1,
        ease: "power2.in",
      });
      gsap.to(locationCircle, { scale: 0, duration: 0.5, ease: "power2.in" });
      gsap.to(locationImg, { height: 0, duration: 0.5, ease: "power2.in" });
      gsap.to(companyLocationTwo, {
        opacity: 1,
        visibility: "visible",
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      });
    },
    onEnterBack: () => {
      gsap.to(locationH2, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      });
      gsap.to(locationText, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.7,
        ease: "power2.out",
      });
      gsap.to(locationTextSm, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.7,
        ease: "power2.out",
      });
      gsap.to(locationCircle, {
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.5,
      });
      gsap.to(locationImg, {
        height: 300,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      });
      gsap.to(companyLocationTwo, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.5,
        ease: "power2.in",
      });
    },
    onLeaveBack: () => {
      gsap.to(locationH2, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power2.in",
      });
      gsap.to(locationText, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        delay: 0.1,
        ease: "power2.in",
      });
      gsap.to(locationTextSm, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        delay: 0.1,
        ease: "power2.in",
      });
      gsap.to(locationCircle, { scale: 0, duration: 0.5, ease: "power2.in" });
      gsap.to(locationImg, { height: 0, duration: 0.5, ease: "power2.in" });
      gsap.to(companyLocationTwo, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.5,
        ease: "power2.in",
      });
    },
  });
  document.querySelectorAll(".company-location_title").forEach((title) => {
    const detail = title.nextElementSibling;
    title.addEventListener("mouseenter", () => {
      gsap.to(detail, {
        right: 0,
        opacity: 1,
        visibility: "visible",
        duration: 0.5,
        ease: "power2.out",
      });
    });

    title.addEventListener("mouseleave", () => {
      gsap.to(detail, {
        right: -500,
        opacity: 0,
        visibility: "hidden",
        duration: 0.5,
        ease: "power2.in",
      });
    });
  });
});
// Init Swipers
const yearsSwiper = new Swiper(".years-swiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  centeredSlides: true,
  slideToClickedSlide: true,
  on: {
    slideChange: function () {
      const index = this.activeIndex;
      contentSwiper.slideTo(index);
      updateProgressCircle(index);
    },
  },
  breakpoints: {
    641: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
});
const contentSwiper = new Swiper(".content-swiper", {
  slidesPerView: 1,
  allowTouchMove: false,
  on: {
    init: function () {
      initDetailSwipers();
    },
  },
});
function updateProgressCircle(index) {
  const total = 10;
  const percent = (index / total) * 100;
  const offset = 100 - percent;
  document.querySelector(".circle").style.strokeDashoffset = offset;
}
function initDetailSwipers() {
  document.querySelectorAll(".detail-swiper").forEach(function (element) {
    if (element.swiper) {
      element.swiper.destroy(true, true);
    }
    new Swiper(element, {
      slidesPerView: 1,
      spaceBetween: 10,
      autoHeight: true,
    });
  });
}
AOS.init();
updateProgressCircle(0);
