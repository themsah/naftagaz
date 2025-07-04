// header
const indexHeader = document.querySelector(".index_items > header");
let indexLastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
  const indexCurrentScrollY = window.scrollY;
  if (indexCurrentScrollY === 0) {
    indexHeader.classList.remove("hide-header");
    indexHeader.classList.remove("has-background");
  } else if (indexCurrentScrollY > indexLastScrollY) {
    indexHeader.classList.add("hide-header");
    indexHeader.classList.remove("has-background");
  } else {
    indexHeader.classList.remove("hide-header");
    indexHeader.classList.add("has-background");
  }
  indexLastScrollY = indexCurrentScrollY;
});
// header background effect
window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth <= 768) return;

  const indexDetail = document.querySelector(".company-detail");
  const indexMan = document.querySelector(".company-detail_man");
  const indexBack = document.querySelector(".company-detail_background");

  if (!indexDetail || !indexMan || !indexBack) {
    console.warn("یکی از المنت‌های شرکت پیدا نشد.");
    return;
  }
  indexDetail.addEventListener("mousemove", (e) => {
    const rect = indexDetail.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const percentX = (mouseX / rect.width - 0.5) * 2;
    const percentY = (mouseY / rect.height - 0.5) * 2;

    gsap.to(indexMan, {
      duration: 1,
      rotateX: percentY * 4,
      rotateY: percentX * -4,
      transformOrigin: "center center",
      transformPerspective: 1000,
      ease: "power3.out",
    });

    gsap.to(indexBack, {
      duration: 2,
      xPercent: percentX * 1.2,
      yPercent: percentY * 1.2,
      transformOrigin: "center center",
      ease: "power4.out",
    });
  });

  indexDetail.addEventListener("mouseleave", () => {
    gsap.to(indexMan, {
      duration: 1,
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
    });
    gsap.to(indexBack, {
      duration: 1.5,
      x: 0,
      y: 0,
      ease: "power3.out",
    });
  });
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
// index_intro
const indexTransformBtn = document.querySelector(".company-detail_btn");
const indexTransformItem = document.querySelector(".index-location");
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
indexTransformBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const offsetTop =
    indexTransformItem.getBoundingClientRect().top + window.scrollY;

  gsap.to(window, {
    duration: 2,
    scrollTo: {
      y: offsetTop,
      autoKill: false,
    },
    ease: "power2.out",
  });
});
// index-slider1
const indexNextBtn = document.querySelector(".index-slider_btn-next");
const indexPrevBtn = document.querySelector(".index-slider_btn-prev");
const indexSliderNumber = document.querySelector(".index-slider_number");
const indexSlider = document.querySelector(".index-slider");
const indexSliderText = document.querySelector(".index-slider_text");
const indexSliderDescription = document.querySelector(
  ".index-slider_description"
);
let index = 0;
let indexSliderImagesElements;
const indexSliderDetail = [
  {
    id: 1,
    img: "../img/slider1img.jpg",
    text: "ایمنی در اولویت. حفاظت از جان و سلامت پرسنل و پیمانکاران نفت گاز، سلامت دارایی‌ها، قابلیت اطمینان تجهیزات و حفاظت از محیط زیست برای توسعه پایدار شرکت ما بسیار مهم است. هدف سیاست ایمنی شغلی نفت گاز، به صفر رساندن آسیب‌ها و حوادث است. برای دستیابی به این هدف، نفت گاز از تمام تجربیات به دست آمده از طریق عملیات خود و مطالعه بهترین شیوه‌های صنعت استفاده می‌کند. ابتکارات و ابزارهای بسیاری در این زمینه توسعه یافته است و کاربرد آنها ایمنی شغلی پرسنل را در تمام سطوح تضمین می‌کند.",
    des: "ایمنی شغلی",
  },
  {
    id: 2,
    img: "../img/slider2img.jpg",
    text: "این شرکت آگاه است که فرآیند تولید، حفر و سرویس چاه، تهدیدی بالقوه برای طبیعت است و ما مسئولیت خود را در قبال جامعه و نسل‌های آینده برای حفاظت از محیط زیست، تضمین سازگاری زیست‌محیطی کسب و کارهای خود و استفاده منطقی از منابع طبیعی، بر عهده می‌گیریم. در همین راستا، شرکت یک سیاست حفاظت از محیط زیست اتخاذ کرده است که اصول و استانداردهایی را برای رعایت الزامات زیست‌محیطی تعیین می‌کند که توسط همه کارکنان ما در فعالیت‌هایشان به شدت رعایت می‌شود. این امر به شرکت اجازه می‌دهد تا تعادل اکولوژیکی را حفظ کرده و اکوسیستم را در حوزه‌های عملیاتی شرکت ایمن نگه دارد.",
    des: "حفاظت از محیط زیست",
  },
  {
    id: 3,
    img: "../img/slider3img.jpg",
    text: "نفتگاز یک شرکت مسئولیت‌پذیر اجتماعی است. شرکت ما یک کارفرمای قابل اعتماد، مسئول و جذاب است. هدف ما تبدیل شدن به بزرگترین شرکت خدمات میدان نفتی مستقل در روسیه است. این هدف تنها توسط یک تیم شایسته و کارآمد، که در آن هر عضو کاملاً درگیر و وابسته است، قابل دستیابی است. با درک این موضوع، شرکت به طور مداوم در حال بهبود انگیزه پرسنل، آموزش پیشرفته کارکنان و گسترش برنامه‌های حمایتی اجتماعی است. متخصصان ما ارزشمندترین دارایی نفتگاز هستند و ایمنی و حمایت اجتماعی کارکنان ما اولویت اصلی شرکت ما است.",
    des: "تأمین اجتماعی کارمندان",
  },
  {
    id: 4,
    img: "../img/slider4img.jpg",
    text: "استانداردهای HSE از طریق سیستم مدیریت یکپارچه ایمنی شغلی اجرا می‌شوند. این سیستم، محیط کاری ایمن را در تمام مراحل عملیاتی فراهم می‌کند. این شرکت به طور منظم برای رعایت استانداردهای بین‌المللی ISO مورد ممیزی قرار می‌گیرد: ISO 9001 (ساخت و نصب چاه‌های نفت و گاز)، ISO 45001 (بهداشت و ایمنی شغلی) و ISO 14001 (مدیریت زیست‌محیطی). شرکت ما دارای مجوز بهره‌برداری از تأسیسات تولیدی خطرناک در برابر انفجار/آتش‌سوزی و مواد شیمیایی کلاس‌های I، II و III است و مجوز استفاده از اتوبوس برای حمل و نقل مسافر را دارد. شرکت ما عضو انجمن پیمانکاران عمومی در ساخت و ساز است. شرکت ما توسط آژانس ملی صلاحیت جوشکاری (NAKS) تأیید شده است.",
    des: "سطح بالای شایستگی",
  },
];
const indexSliderImg = indexSliderDetail.map((item) => {
  return item.img;
});
function nextSlide(e) {
  if (e) e.preventDefault();
  index = (index + 1) % indexSliderImg.length;
  updateSlider();
}
function prevSlide(e) {
  e.preventDefault();
  index = (index - 1 + indexSliderImg.length) % indexSliderImg.length;
  updateSlider();
}
function updateSlider() {
  indexSliderNumber.textContent = `${index + 1}/${indexSliderDetail.length}`;

  gsap.to(indexSliderText, {
    opacity: 0,
    y: 20,
    duration: 0.3,
    ease: "power1.out",
    onComplete: () => {
      indexSliderText.innerHTML = indexSliderDetail[index].text;
      gsap.fromTo(
        indexSliderText,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" }
      );
    },
  });
  gsap.to(indexSliderDescription, {
    opacity: 0,
    y: 20,
    duration: 0.3,
    ease: "power1.out",
    onComplete: () => {
      indexSliderDescription.innerHTML = indexSliderDetail[index].des;
      gsap.fromTo(
        indexSliderDescription,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" }
      );
    },
  });
  indexSliderImagesElements.forEach((img, idx) => {
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
// index-slider2
const indexSliderTwoContainer = document.querySelector(".index-slidersTwo");
const indexSliderImgTwoElement = indexSliderTwoContainer.querySelector(
  ".index-slider__imgTwo"
);
const indexSliderTextTwoElement = indexSliderTwoContainer.querySelector(
  ".index-slider_textTwo"
);
const indexSliderDetailTextElement = indexSliderTwoContainer.querySelector(
  ".index-slider-detail_text"
);
const indexSliderTaskElement =
  indexSliderTwoContainer.querySelector(".index-slider-task");
const indexNextBtnTwo = indexSliderTwoContainer.querySelector(
  ".index-slider_btn-next-two"
);
const indexSliderPrograsbarImg = indexSliderTwoContainer.querySelector(
  ".index-slider-prograsbar_img"
);
const indexSliderPrograsbar = indexSliderTwoContainer.querySelector(
  ".index-slider_prograsbar"
);
let indexTwo = 0;
let progressBarTween;
const progressDuration = 5;
const indexSliderTwoDetail = [
  {
    id: 1,
    img: "../img/twoman.jpg",
    text: "تورال کریموف",
    detail:
      "The شرکت بسیار واجد شرایط اجرایی کارکنان با گسترده تجربه در ... صنعت<br />فراهم کردن «کلید در دست» پروژه توسعه خدمات به به صورت عمودی یکپارچه روغن و گاز<br />شرکت‌ها تأمین از تدارکات خدمات است همچنین در میان ... شرکت اولویت‌ها",
    btnImg: "../img/twoman.jpg",
    task: "رئیس هیئت مدیره",
  },
  {
    id: 2,
    img: "../img/oneman.jpg",
    text: "نیکولای گریشانکوف",
    detail:
      "The شرکت بسیار واجد شرایط اجرایی کارکنان با تجربه عمیق در زمینه پروژه‌های بزرگ صنعتی.<br />تمرکز بر راه‌حل‌های نوآورانه و پایدار برای توسعه صنعت نفت و گاز.<br />ارائه خدمات کامل از طراحی تا اجرا، با رعایت بالاترین استانداردهای ایمنی و کیفیت.",
    btnImg: "../img/oneman.jpg",
    task: "مدیرعامل",
  },
];
function startProgressBarAnimation() {
  if (progressBarTween) {
    progressBarTween.kill();
  }
  gsap.set(indexSliderPrograsbar, { "--after-width": "0%" });
  progressBarTween = gsap.to(indexSliderPrograsbar, {
    "--after-width": "100%",
    duration: progressDuration,
    ease: "none",
    onComplete: nextSlideTwo,
  });
}
function updateSliderTwo() {
  const indexCurrentSlide = indexSliderTwoDetail[indexTwo];
  const indexNextSlideData =
    indexSliderTwoDetail[(indexTwo + 1) % indexSliderTwoDetail.length];
  gsap.to(indexSliderImgTwoElement, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
    onComplete: () => {
      indexSliderImgTwoElement.src = indexCurrentSlide.img;
      gsap.to(indexSliderImgTwoElement, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
      });
    },
  });

  gsap.to(indexSliderTextTwoElement, {
    opacity: 0,
    y: 20,
    duration: 0.3,
    ease: "power1.out",
    onComplete: () => {
      indexSliderTextTwoElement.innerHTML = indexCurrentSlide.text;
      gsap.fromTo(
        indexSliderTextTwoElement,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" }
      );
    },
  });
  gsap.to(indexSliderDetailTextElement, {
    opacity: 0,
    y: 20,
    duration: 0.3,
    ease: "power1.out",
    onComplete: () => {
      indexSliderDetailTextElement.innerHTML = indexCurrentSlide.detail;
      gsap.fromTo(
        indexSliderDetailTextElement,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" }
      );
    },
  });
  gsap.to(indexSliderTaskElement, {
    opacity: 0,
    y: 20,
    duration: 0.3,
    ease: "power1.out",
    onComplete: () => {
      indexSliderTaskElement.innerHTML = indexCurrentSlide.task;
      gsap.fromTo(
        indexSliderTaskElement,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" }
      );
    },
  });

  indexSliderPrograsbarImg.src = indexNextSlideData.btnImg;
  startProgressBarAnimation();
}
function nextSlideTwo(e) {
  if (e) e.preventDefault();
  indexTwo = (indexTwo + 1) % indexSliderTwoDetail.length;
  updateSliderTwo();
}
indexNextBtnTwo.addEventListener("click", (e) => {
  nextSlideTwo(e);
  if (progressBarTween) {
    progressBarTween.restart();
  }
});
window.addEventListener("DOMContentLoaded", () => {
  indexSliderImg.forEach((item) => {
    const el = document.createElement("img");
    el.classList.add("slider_img");
    el.src = item;
    indexSlider.appendChild(el);
  });
  indexSliderImagesElements = document.querySelectorAll(".slider_img");
  updateSlider();
  updateSliderTwo();
});
indexNextBtn.addEventListener("click", nextSlide);
indexPrevBtn.addEventListener("click", prevSlide);
// card
const card = document.querySelector(".index-drilling");
const img = document.querySelector(".index-drilling_img");
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
// Location Scroll Animation
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const companyLocationSection = document.querySelector(".index-location");
  const locationH2 = document.querySelector(".index-location_h2");
  const locationText = document.querySelector(".index-location_text");
  const locationCircle = document.querySelector(".index-location_circle");
  const locationImg = document.querySelector(".index-location_img");
  const locationTextSm = document.querySelector(".index-location_text-sm");
  gsap.set(locationH2, { opacity: 0, y: 50 });
  gsap.set(locationText, { opacity: 0, y: 50 });
  gsap.set(locationTextSm, { opacity: 0, y: 50 });
  gsap.set(locationCircle, { scale: 0 });
  gsap.set(locationImg, { height: 0 });
  // Set initial state for offcanvas details
  ScrollTrigger.create({
    trigger: companyLocationSection,
    start: "top top",
    end: "top center",
    scrub: true,
    onEnter: () => {
      gsap.to(locationText, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
      });
      gsap.to(locationTextSm, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
      });
      gsap.to(locationCircle, {
        scale: 1,
        ease: "back.out",
      });
      gsap.to(locationImg, { height: 300, ease: "power2.out" });
    },
  });
});
// pressCenter
let currentTranslateX = 0;
let dynamicStep = 0;
let currentMaxTranslateX = 0;
function calculateAndApplySliderTransforms() {
  const activeSliderElement = document.querySelector(
    ".company-pressCenter_detail[style*='display: flex']"
  );
  if (!activeSliderElement) return;
  const sliderItems = activeSliderElement.querySelectorAll(
    ".company-pressCenter_detail--items"
  );
  if (sliderItems.length === 0) {
    dynamicStep = 0;
    currentMaxTranslateX = 0;
    currentTranslateX = 0;
    activeSliderElement.style.transform = `translateX(0px)`;
    return;
  }
  const firstItem = sliderItems[0];
  const itemWidth = firstItem.offsetWidth;
  const itemGap = 30;
  dynamicStep = itemWidth + itemGap;
  const totalContentWidth =
    sliderItems.length * itemWidth + (sliderItems.length - 1) * itemGap;
  const clippingArea = document.querySelector(".company-PressCenter");
  const clippingAreaStyle = window.getComputedStyle(clippingArea);
  const clippingPaddingLeft = parseFloat(clippingAreaStyle.paddingLeft || 0);
  const clippingPaddingRight = parseFloat(clippingAreaStyle.paddingRight || 0);
  const visibleClippingWidth =
    clippingArea.offsetWidth - clippingPaddingLeft - clippingPaddingRight;

  currentMaxTranslateX = totalContentWidth - visibleClippingWidth;

  if (currentMaxTranslateX < 0) {
    currentMaxTranslateX = 0;
  }

  if (currentTranslateX > currentMaxTranslateX) {
    currentTranslateX = currentMaxTranslateX;
  } else if (currentTranslateX < 0) {
    currentTranslateX = 0;
  }

  activeSliderElement.style.transform = `translateX(${currentTranslateX}px)`;

  updateButtonStates();
}
function updateButtonStates() {
  if (currentTranslateX <= 0) {
    pressPrevBtn.classList.remove("active");
  } else {
    pressPrevBtn.classList.add("active");
  }
  const epsilon = 1;
  if (
    currentMaxTranslateX === 0 ||
    currentTranslateX >= currentMaxTranslateX - epsilon
  ) {
    preesNextBtn.classList.remove("active");
  } else {
    preesNextBtn.classList.add("active");
  }
}
const sliderThreeBtn = document.querySelectorAll(
  ".company-pressCenter_btn--style"
);
const sliderDetails = document.querySelectorAll(".company-pressCenter_detail");
sliderThreeBtn.forEach((item) => {
  item.addEventListener("click", () => {
    sliderThreeBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
    item.classList.add("active");
    const dataShow = item.dataset.show;
    sliderDetails.forEach((detail) => {
      detail.style.opacity = "0";
      detail.style.display = "none";
    });
    const targetSlider = document.getElementById(dataShow);
    if (targetSlider) {
      targetSlider.style.opacity = "1";
      targetSlider.style.display = "flex";

      currentTranslateX = 0;

      calculateAndApplySliderTransforms();
    }
  });
});
const preesNextBtn = document.querySelector(
  ".company-pressCenter_slider--nextBtn"
);
preesNextBtn.addEventListener("click", () => {
  currentTranslateX += dynamicStep;
  calculateAndApplySliderTransforms();
});
const pressPrevBtn = document.querySelector(
  ".company-pressCenter_slider--prevBtn"
);
pressPrevBtn.addEventListener("click", () => {
  currentTranslateX -= dynamicStep;
  calculateAndApplySliderTransforms();
});
document.addEventListener("DOMContentLoaded", () => {
  const initiallyActiveButton = document.querySelector(
    ".company-pressCenter_btn--style.active"
  );
  if (initiallyActiveButton) {
    const defaultSliderId = initiallyActiveButton.dataset.show;
    const defaultSliderElement = document.getElementById(defaultSliderId);
    if (defaultSliderElement) {
      defaultSliderElement.style.opacity = "1";
      defaultSliderElement.style.display = "flex";
      currentTranslateX = 0;
      calculateAndApplySliderTransforms();
    }
  } else {
    const defaultSliderElement = document.getElementById("news");
    if (defaultSliderElement) {
      defaultSliderElement.style.opacity = "1";
      defaultSliderElement.style.display = "flex";
      currentTranslateX = 0;
      calculateAndApplySliderTransforms();
    }
  }
  window.addEventListener("resize", calculateAndApplySliderTransforms);
});
// modal
const modalBtn = document.querySelector(".index-slider-detail_btns");
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
