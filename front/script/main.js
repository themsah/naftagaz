// main.js

// GSAP Plugins Registration (Must be done once, at the very beginning)
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

// --- Common Header & Footer Features ---
function initCommonFeatures() {
  let lastScrollY = window.scrollY;

  // Header functionality (dynamic selector based on the current page's main wrapper)
  // This approach assumes your header is always directly inside an element with a class like .careers-recognition_items, .company_items, etc.
  // And the header itself is always a <header> tag inside that.
  const pageWrapperClasses = [
    ".careers-recognition_items",
    ".careers-succes_items",
    ".company_items",
    ".index_items",
    ".services-drilling_items",
    ".services-service_items",
    ".contact_items",
    ".news_items",
    ".media_items",
    ".report_items",
    ".call_items",
    ".video_items",
    ".images_items",
    ".single_items",
  ];
  let header = null;

  for (const cls of pageWrapperClasses) {
    const wrapper = document.querySelector(cls);
    if (wrapper) {
      header = wrapper.querySelector("header");
      if (header) break;
    }
  }

  if (header) {
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      // Special header behavior for 'company' and 'services_drilling' pages if specific sections are present
      let hideHeader = false;
      if (document.body.classList.contains("page-company")) {
        const companyInfoSection = document.querySelector(
          ".company_information"
        );
        if (companyInfoSection) {
          const companyTop =
            companyInfoSection.getBoundingClientRect().top + window.scrollY;
          const companyBottom = companyTop + companyInfoSection.offsetHeight;
          if (currentScrollY >= companyTop && currentScrollY <= companyBottom) {
            hideHeader = true;
          }
        }
      } else if (document.body.classList.contains("page-services-drilling")) {
        const companyProductionSection = document.querySelector(
          ".company-Production"
        );
        const servicesUseSection = document.querySelector(".services-use");
        if (companyProductionSection) {
          const companyTop =
            companyProductionSection.getBoundingClientRect().top +
            window.scrollY;
          const companyBottom =
            companyTop + companyProductionSection.offsetHeight;
          if (currentScrollY >= companyTop && currentScrollY <= companyBottom) {
            hideHeader = true;
          }
        }
        if (servicesUseSection) {
          const servicesUseTop =
            servicesUseSection.getBoundingClientRect().top + window.scrollY;
          const servicesUseBottom =
            servicesUseTop + servicesUseSection.offsetHeight;
          if (
            currentScrollY >= servicesUseTop &&
            currentScrollY <= servicesUseBottom
          ) {
            hideHeader = true;
          }
        }
      } else if (document.body.classList.contains("page-services-service")) {
        const servicesCompanyProduction = document.querySelector(
          ".servicesCompany-Production"
        );
        if (servicesCompanyProduction) {
          const companyTop =
            servicesCompanyProduction.getBoundingClientRect().top +
            window.scrollY;
          const companyBottom =
            companyTop + servicesCompanyProduction.offsetHeight;
          if (currentScrollY >= companyTop && currentScrollY <= companyBottom) {
            hideHeader = true;
          }
        }
      } else if (document.body.classList.contains("page-single")) {
        const singleDescription = document.querySelector(".single-description");
        if (singleDescription) {
          const top =
            singleDescription.getBoundingClientRect().top + window.scrollY;
          const bottom = top + singleDescription.offsetHeight;

          if (currentScrollY >= top && currentScrollY <= bottom) {
            hideHeader = true;
          }
        }
      }

      if (hideHeader) {
        header.classList.add("hide-header");
        header.classList.remove("has-background"); // Ensure no background when hidden
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
  }

  const headerBtn = document.querySelectorAll(".header__detail-btns");
  const headerIcon = document.querySelector(".header__detail-icon");
  const headerContacts = document.querySelectorAll(".header__contact");
  const hamburgerMenuBtn = document.querySelector(".hamburger-menu__btn");
  const hamburgerMenuDetail = document.querySelector(".hamburger-menu__detail");
  const hamburgerMenuClose = document.querySelector(
    ".hamburger-menu__btnClose"
  );
  const megaMenuBtn = document.querySelectorAll(".menuSm");

  headerBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      btn.classList.toggle("header__detail-btnsActive");
      if (headerIcon) headerIcon.classList.toggle("header__detail-iconActive");
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

  if (hamburgerMenuBtn && hamburgerMenuDetail && hamburgerMenuClose) {
    hamburgerMenuBtn.addEventListener("click", () => {
      hamburgerMenuDetail.classList.add("hamburger-menu__detailActive");
    });
    hamburgerMenuClose.addEventListener("click", () => {
      hamburgerMenuDetail.classList.remove("hamburger-menu__detailActive");
    });
  }

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

  // Top Button (Footer)
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
}

// --- Page-Specific Features ---

// Careers Recognition Board Page
function initCareersRecognitionBoard() {
  // company-drilling transform
  const transformBtn = document.querySelector(".transform_btn--sm");
  const transformItem = document.querySelector(".company-employees");

  if (transformBtn && transformItem) {
    transformBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const offsetTop =
        transformItem.getBoundingClientRect().top + window.scrollY;

      gsap.to(window, {
        duration: 2,
        scrollTo: {
          y: offsetTop,
          autoKill: false,
        },
        ease: "power2.out",
      });
    });
  }

  // Modal
  const modalBtn = document.querySelectorAll(".company-employees_detail");
  const overlay = document.querySelector(".recognition_overlay");
  const modal = document.querySelector(".recognitionModal");
  const modalCloseBtn = document.querySelector(".recognitionModal_btns--leave");
  const body = document.body;

  if (modalBtn.length > 0 && overlay && modal && modalCloseBtn) {
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
  }
}

// Careers Success Stories Page
function initCareersSuccesStories() {
  // company-drilling transform
  const transformBtn = document.querySelector(".transform_btn--sm");
  const transformItem = document.querySelector(".succesCompany-employees");

  if (transformBtn && transformItem) {
    transformBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const offsetTop =
        transformItem.getBoundingClientRect().top + window.scrollY;

      gsap.to(window, {
        duration: 2,
        scrollTo: {
          y: offsetTop,
          autoKill: false,
        },
        ease: "power2.out",
      });
    });
  }

  // Modal
  const modalBtn = document.querySelectorAll(
    ".succesCompany-employees_detail--imgs"
  );
  const overlay = document.querySelector(".succes_overlay");
  const modal = document.querySelector(".succesModal");
  const modalCloseBtn = document.querySelector(".succesModal_btns--leave");
  const body = document.body;

  if (modalBtn.length > 0 && overlay && modal && modalCloseBtn) {
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
  }
}

// Company Page
function initCompanyPage() {
  // company_intro (transform button and scroll trigger animations)
  const transformBtn = document.querySelector(".company_video-icon");
  const transformItem = document.querySelector(".company_success");
  const transformText = document.querySelector(".company_video-text");
  const naftagazIntro = document.querySelector(".company_intro");

  if (transformBtn && transformItem && transformText && naftagazIntro) {
    transformBtn.addEventListener("click", (e) => {
      e.preventDefault();
      gsap.to(transformText, { opacity: 0, duration: 0.5 });
      const offsetTop =
        transformItem.getBoundingClientRect().top + window.scrollY;
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

    // Ensure naftagazIntro is positioned correctly before animation
    gsap.set(naftagazIntro, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      scale: 1,
    });

    ScrollTrigger.create({
      trigger: "body", // Trigger from body or a higher element
      start: "top top", // Start when body top hits top of viewport
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
  }

  // Slider 1
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
    if (!sliderNumber || !sliderText || !slider) return;

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

    if (sliderImagesElements) {
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
  }
  // Initialize slider images and event listeners
  if (slider) {
    sliderImg.forEach((item) => {
      const el = document.createElement("img");
      el.classList.add("slider_img");
      el.src = item;
      slider.appendChild(el);
    });
    sliderImagesElements = document.querySelectorAll(".slider_img");
    updateSlider(); // Initial update
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  }

  // Slider 2
  const sliderTwoContainer = document.querySelector(".slidersTwo");
  if (sliderTwoContainer) {
    const sliderImgTwoElement =
      sliderTwoContainer.querySelector(".slider__imgTwo");
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
    const sliderPrograsbar =
      sliderTwoContainer.querySelector(".slider_prograsbar");
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

    const modalBtn = document.querySelector(".slider-detail_btns");
    const modal = document.querySelector(".modal");
    const modalClose = document.querySelector(".modal-close");
    const modalImg = document.querySelector(".modal-img");
    const modalImgMobile = document.querySelector(".modal-img-mobile");
    const modalDetail = document.querySelector(".modal-detail");
    const modalOverlay = document.querySelector(".modal-overlay");

    if (
      modalBtn &&
      modal &&
      modalClose &&
      modalImg &&
      modalImgMobile &&
      modalOverlay
    ) {
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
    }

    function startProgressBarAnimation() {
      if (progressBarTween) {
        progressBarTween.kill();
      }
      if (sliderPrograsbar) {
        gsap.set(sliderPrograsbar, { "--after-width": "0%" });
        progressBarTween = gsap.to(sliderPrograsbar, {
          "--after-width": "100%",
          duration: progressDuration,
          ease: "none",
          onComplete: nextSlideTwo,
        });
      }
    }

    function updateSliderTwo() {
      if (
        !sliderImgTwoElement ||
        !sliderTextTwoElement ||
        !sliderDetailTextElement ||
        !sliderTaskElement ||
        !sliderPrograsbarImg
      )
        return;

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
    if (nextBtnTwo) {
      nextBtnTwo.addEventListener("click", (e) => {
        nextSlideTwo(e);
        if (progressBarTween) {
          progressBarTween.restart();
        }
      });
    }
    updateSliderTwo(); // Initial call
  }

  // Card Animation
  const card = document.querySelector(".company-drilling");
  const img = document.querySelector(".company-drilling_img");

  if (card && img) {
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
  }

  // Scroller (Company Information Section)
  const companyInfoSection = document.querySelector(".company_information");
  if (companyInfoSection) {
    const scrollNumbers = gsap.utils.toArray(
      ".company_information-scroll span"
    );
    const scrollImages = gsap.utils.toArray(".company_information-img");
    const scrollTexts = gsap.utils.toArray(".company_information-text");
    const container = document.querySelector(".company_information-scroll");

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
      : 70; // Fallback if no element

    gsap.set(scrollImages.slice(1), { opacity: 0 });
    gsap.set(scrollTexts.slice(1), { opacity: 0, y: 20 });
    if (scrollTexts[0]) scrollTexts[0].classList.add("active");

    scrollNumbers.forEach((num, i) => {
      gsap.set(num, { opacity: i === 0 ? 1 : 0.4 });
    });
    if (scrollNumbers[0]) scrollNumbers[0].classList.add("active");

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
          if (scrollNumbers[0]) scrollNumbers[0].classList.add("active");
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
          if (scrollTexts[0]) scrollTexts[0].classList.add("active");
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

    if (progress) {
      progress.style.strokeDasharray = circumference;
      progress.style.strokeDashoffset = circumference;
    }

    const minYear = 2013;
    const maxYear = 2023;

    if (dynamicSuffixTrack) {
      for (let y = minYear; y <= maxYear; y++) {
        const el = document.createElement("div");
        el.className = "dynamic-suffix";
        el.textContent = y.toString().slice(2);
        el.setAttribute("data-year-suffix", y.toString().slice(2));
        dynamicSuffixTrack.appendChild(el);
      }
    }

    const suffixElems = document.querySelectorAll(
      ".dynamic-suffix-track .dynamic-suffix"
    );
    const suffixHeight = suffixElems[0] ? suffixElems[0].offsetHeight : 0;
    const parentHeight = dynamicSuffixTrack
      ? dynamicSuffixTrack.parentElement.offsetHeight
      : 0;
    const centerOffset = parentHeight / 2 - suffixHeight / 2;

    if (dynamicSuffixTrack) {
      gsap.set(dynamicSuffixTrack, { y: centerOffset });
      if (suffixElems[0]) suffixElems[0].classList.add("active");
    }
    if (texts[0]) texts[0].classList.add("active", "current-year-item");

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
          if (suffixElems[yearIndex])
            suffixElems[yearIndex].classList.add("active");

          const progressValue = (year - minYear) / (maxYear - minYear);
          const offset = circumference - progressValue * circumference;
          gsap.to(progress, { strokeDashoffset: offset, duration: 0.3 });

          texts.forEach((t) =>
            t.classList.remove("active", "current-year-item")
          );
          text.classList.add("active", "current-year-item");
        },
        onLeaveBack: () => {
          if (index > 0) {
            const prevYear = parseInt(texts[index - 1].dataset.year);
            const prevYearIndex = prevYear - minYear;
            const suffixOffset = -(prevYearIndex * suffixHeight) + centerOffset;
            gsap.to(dynamicSuffixTrack, { y: suffixOffset, duration: 0.3 });

            suffixElems.forEach((el) => el.classList.remove("active"));
            if (suffixElems[prevYearIndex])
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
            if (suffixElems[0]) suffixElems[0].classList.add("active");
            gsap.to(progress, {
              strokeDashoffset: circumference,
              duration: 0.3,
            });
            texts.forEach((t) =>
              t.classList.remove("active", "current-year-item")
            );
            if (texts[0]) texts[0].classList.add("active", "current-year-item");
          }
        },
        onEnterBack: () => {
          const yearIndex = year - minYear;
          const suffixOffset = -(yearIndex * suffixHeight) + centerOffset;
          gsap.to(dynamicSuffixTrack, { y: suffixOffset, duration: 0.3 });

          suffixElems.forEach((el) => el.classList.remove("active"));
          if (suffixElems[yearIndex])
            suffixElems[yearIndex].classList.add("active");

          const progressValue = (year - minYear) / (maxYear - minYear);
          const offset = circumference - progressValue * circumference;
          gsap.to(progress, { strokeDashoffset: offset, duration: 0.3 });

          texts.forEach((t) =>
            t.classList.remove("active", "current-year-item")
          );
          text.classList.add("active", "current-year-item");
        },
      });
    });

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
  }

  // Location Scroll Animation
  const companyLocationSection = document.querySelector(".company-location");
  if (companyLocationSection) {
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
        gsap.to(locationCircle, {
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
        });
        gsap.to(locationImg, {
          height: 300,
          duration: 1,
          ease: "power2.out",
        });
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
        gsap.to(locationCircle, {
          scale: 0,
          duration: 0.5,
          ease: "power2.in",
        });
        gsap.to(locationImg, {
          height: 0,
          duration: 0.5,
          ease: "power2.in",
        });
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
        gsap.to(locationCircle, {
          scale: 0,
          duration: 0.5,
          ease: "power2.in",
        });
        gsap.to(locationImg, {
          height: 0,
          duration: 0.5,
          ease: "power2.in",
        });
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
      if (detail) {
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
      }
    });
  }

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
}

// Index Page (script.js was for index)
function initIndexPage() {
  // Header background effect
  if (window.innerWidth > 768) {
    const indexDetail = document.querySelector(".company-detail");
    const indexMan = document.querySelector(".company-detail_man");
    const indexBack = document.querySelector(".company-detail_background");

    if (indexDetail && indexMan && indexBack) {
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
    }
  }

  // index_intro (Transform button for scrolling)
  const indexTransformBtn = document.querySelector(".company-detail_btn");
  const indexTransformItem = document.querySelector(".index-location");

  if (indexTransformBtn && indexTransformItem) {
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
  }

  // Index Slider 1
  const indexNextBtn = document.querySelector(".index-slider_btn-next");
  const indexPrevBtn = document.querySelector(".index-slider_btn-prev");
  const indexSliderNumber = document.querySelector(".index-slider_number");
  const indexSlider = document.querySelector(".index-slider");
  const indexSliderText = document.querySelector(".index-slider_text");
  const indexSliderDescription = document.querySelector(
    ".index-slider_description"
  );
  let indexSlider1CurrentIndex = 0; // Renamed to avoid conflict with company page slider 'index'
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

  function nextIndexSlide(e) {
    if (e) e.preventDefault();
    indexSlider1CurrentIndex =
      (indexSlider1CurrentIndex + 1) % indexSliderImg.length;
    updateIndexSlider();
  }
  function prevIndexSlide(e) {
    e.preventDefault();
    indexSlider1CurrentIndex =
      (indexSlider1CurrentIndex - 1 + indexSliderImg.length) %
      indexSliderImg.length;
    updateIndexSlider();
  }
  function updateIndexSlider() {
    if (
      !indexSliderNumber ||
      !indexSliderText ||
      !indexSliderDescription ||
      !indexSlider
    )
      return;

    indexSliderNumber.textContent = `${indexSlider1CurrentIndex + 1}/${
      indexSliderDetail.length
    }`;

    gsap.to(indexSliderText, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power1.out",
      onComplete: () => {
        indexSliderText.innerHTML =
          indexSliderDetail[indexSlider1CurrentIndex].text;
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
        indexSliderDescription.innerHTML =
          indexSliderDetail[indexSlider1CurrentIndex].des;
        gsap.fromTo(
          indexSliderDescription,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" }
        );
      },
    });

    if (indexSliderImagesElements) {
      indexSliderImagesElements.forEach((img, idx) => {
        if (idx === indexSlider1CurrentIndex) {
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
  }

  if (indexSlider) {
    indexSliderImg.forEach((item) => {
      const el = document.createElement("img");
      el.classList.add("slider_img"); // Use a common class if possible, or a specific one for index slider
      el.src = item;
      indexSlider.appendChild(el);
    });
    indexSliderImagesElements = indexSlider.querySelectorAll(".slider_img");
    updateIndexSlider(); // Initial update
    if (indexNextBtn) indexNextBtn.addEventListener("click", nextIndexSlide);
    if (indexPrevBtn) indexPrevBtn.addEventListener("click", prevIndexSlide);
  }

  // Index Slider 2
  const indexSliderTwoContainer = document.querySelector(".index-slidersTwo");
  if (indexSliderTwoContainer) {
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
    let indexTwoCurrentIndex = 0; // Renamed for clarity
    let progressBarTweenIndex;
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

    function startProgressBarAnimationIndex() {
      if (progressBarTweenIndex) {
        progressBarTweenIndex.kill();
      }
      if (indexSliderPrograsbar) {
        gsap.set(indexSliderPrograsbar, { "--after-width": "0%" });
        progressBarTweenIndex = gsap.to(indexSliderPrograsbar, {
          "--after-width": "100%",
          duration: progressDuration,
          ease: "none",
          onComplete: nextIndexSlideTwo,
        });
      }
    }

    function updateIndexSliderTwo() {
      if (
        !indexSliderImgTwoElement ||
        !indexSliderTextTwoElement ||
        !indexSliderDetailTextElement ||
        !indexSliderTaskElement ||
        !indexSliderPrograsbarImg
      )
        return;

      const indexCurrentSlide = indexSliderTwoDetail[indexTwoCurrentIndex];
      const indexNextSlideData =
        indexSliderTwoDetail[
          (indexTwoCurrentIndex + 1) % indexSliderTwoDetail.length
        ];
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
      startProgressBarAnimationIndex();
    }
    function nextIndexSlideTwo(e) {
      if (e) e.preventDefault();
      indexTwoCurrentIndex =
        (indexTwoCurrentIndex + 1) % indexSliderTwoDetail.length;
      updateIndexSliderTwo();
    }
    if (indexNextBtnTwo) {
      indexNextBtnTwo.addEventListener("click", (e) => {
        nextIndexSlideTwo(e);
        if (progressBarTweenIndex) {
          progressBarTweenIndex.restart();
        }
      });
    }
    updateIndexSliderTwo(); // Initial call
  }

  // Card Animation (Index Page)
  const card = document.querySelector(".index-drilling");
  const img = document.querySelector(".index-drilling_img");

  if (card && img) {
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
  }

  // Location Scroll Animation (Index Page)
  const companyLocationSection = document.querySelector(".index-location");
  if (companyLocationSection) {
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
      // You might want to add onLeave/onEnterBack/onLeaveBack if there's an exit animation
    });
  }

  // Press Center Slider (Horizontal Scroll)
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
      updateButtonStates();
      return;
    }

    const firstItem = sliderItems[0];
    const itemWidth = firstItem.offsetWidth;
    const itemGap = 30; // Your defined gap
    dynamicStep = itemWidth + itemGap;

    const totalContentWidth =
      sliderItems.length * itemWidth + (sliderItems.length - 1) * itemGap;
    const clippingArea = document.querySelector(".company-PressCenter");
    if (!clippingArea) return;

    const clippingAreaStyle = window.getComputedStyle(clippingArea);
    const clippingPaddingLeft = parseFloat(clippingAreaStyle.paddingLeft || 0);
    const clippingPaddingRight = parseFloat(
      clippingAreaStyle.paddingRight || 0
    );
    const visibleClippingWidth =
      clippingArea.offsetWidth - clippingPaddingLeft - clippingPaddingRight;

    currentMaxTranslateX = totalContentWidth - visibleClippingWidth;

    if (currentMaxTranslateX < 0) {
      currentMaxTranslateX = 0;
    }

    // Ensure currentTranslateX doesn't go beyond boundaries
    if (currentTranslateX > currentMaxTranslateX) {
      currentTranslateX = currentMaxTranslateX;
    } else if (currentTranslateX < 0) {
      currentTranslateX = 0;
    }

    activeSliderElement.style.transform = `translateX(${currentTranslateX}px)`; // Corrected to negative for left scroll

    updateButtonStates();
  }

  const preesNextBtn = document.querySelector(
    ".company-pressCenter_slider--nextBtn"
  );
  const pressPrevBtn = document.querySelector(
    ".company-pressCenter_slider--prevBtn"
  );

  function updateButtonStates() {
    // Check if buttons exist before accessing classList
    if (pressPrevBtn) {
      if (currentTranslateX <= 0) {
        pressPrevBtn.classList.remove("active");
      } else {
        pressPrevBtn.classList.add("active");
      }
    }

    if (preesNextBtn) {
      const epsilon = 1; // Small tolerance for float comparisons
      if (
        currentMaxTranslateX === 0 ||
        currentTranslateX >= currentMaxTranslateX - epsilon
      ) {
        preesNextBtn.classList.remove("active");
      } else {
        preesNextBtn.classList.add("active");
      }
    }
  }

  const sliderThreeBtn = document.querySelectorAll(
    ".company-pressCenter_btn--style"
  );
  const sliderDetails = document.querySelectorAll(
    ".company-pressCenter_detail"
  );

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

        currentTranslateX = 0; // Reset scroll position when changing tabs
        calculateAndApplySliderTransforms();
      }
    });
  });

  if (preesNextBtn) {
    preesNextBtn.addEventListener("click", () => {
      currentTranslateX += dynamicStep;
      calculateAndApplySliderTransforms();
    });
  }

  if (pressPrevBtn) {
    pressPrevBtn.addEventListener("click", () => {
      currentTranslateX -= dynamicStep;
      calculateAndApplySliderTransforms();
    });
  }

  // Initialize on DOMContentLoaded for the press center
  const initiallyActiveButton = document.querySelector(
    ".company-pressCenter_btn--style.active"
  );
  if (initiallyActiveButton) {
    const defaultSliderId = initiallyActiveButton.dataset.show;
    const defaultSliderElement = document.getElementById(defaultSliderId);
    if (defaultSliderElement) {
      defaultSliderElement.style.opacity = "1";
      defaultSliderElement.style.display = "flex";
      currentTranslateX = 0; // Reset
      calculateAndApplySliderTransforms();
    }
  } else {
    // Fallback if no button has 'active' class initially
    const defaultSliderElement = document.getElementById("news");
    if (defaultSliderElement) {
      defaultSliderElement.style.opacity = "1";
      defaultSliderElement.style.display = "flex";
      currentTranslateX = 0; // Reset
      calculateAndApplySliderTransforms();
    }
  }
  window.addEventListener("resize", calculateAndApplySliderTransforms);

  // Modal (Index Page)
  const indexModalBtn = document.querySelector(".index-slider-detail_btns");
  const indexModal = document.querySelector(".modal"); // Common modal class
  const indexModalClose = document.querySelector(".modal-close"); // Common modal close class
  const indexModalImg = document.querySelector(".modal-img"); // Common modal img class
  const indexModalImgMobile = document.querySelector(".modal-img-mobile"); // Common modal mobile img class
  const indexModalDetail = document.querySelector(".modal-detail"); // Common modal detail class
  const indexModalOverlay = document.querySelector(".modal-overlay"); // Common modal overlay class

  if (
    indexModalBtn &&
    indexModal &&
    indexModalClose &&
    indexModalImg &&
    indexModalImgMobile &&
    indexModalOverlay
  ) {
    indexModalBtn.addEventListener("click", () => {
      indexModal.classList.add("active");
      indexModalClose.classList.add("active");
      if (window.innerWidth <= 640) {
        indexModalImg.classList.remove("active");
        indexModalImgMobile.classList.add("active");
      } else {
        indexModalImg.classList.add("active");
        indexModalImgMobile.classList.remove("active");
      }
      indexModalOverlay.scrollTop = 0;
    });
    indexModalClose.addEventListener("click", () => {
      indexModal.classList.remove("active");
      indexModalClose.classList.remove("active");
      indexModalImg.classList.remove("active");
      indexModalImgMobile.classList.remove("active");
    });
    window.addEventListener("resize", () => {
      if (indexModal.classList.contains("active")) {
        if (window.innerWidth <= 640) {
          indexModalImg.classList.remove("active");
          indexModalImgMobile.classList.add("active");
        } else {
          indexModalImg.classList.add("active");
          indexModalImgMobile.classList.remove("active");
        }
      }
    });
  }
}

// Services Drilling Page
function initServicesDrillingPage() {
  const transformBtn = document.querySelector(".Company-drilling_icon--btn");
  const transformItem = document.querySelector(".company-drilling_description");

  if (transformBtn && transformItem) {
    transformBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const offsetTop =
        transformItem.getBoundingClientRect().top + window.scrollY;

      gsap.to(window, {
        duration: 2,
        scrollTo: {
          y: offsetTop,
          autoKill: false,
        },
        ease: "power2.out",
      });
    });
  }

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

  const serviceScroller = document.querySelector(".services-use");
  if (serviceScroller) {
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
        // This onLeaveBack is slightly redundant if onEnterBack handles the reverse,
        // but keeping it as per original logic if there's a specific exit back animation
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
  }
  const offcanvasBtn = document.querySelector(".services-use_detail--btns");
  const offcanvas = document.querySelector(".offcanvas");
  const offcanvasCloseBtn = document.querySelector(".offcanvas-btn");
  const offcanvasOverlay = document.querySelector(".offcanvas-overlay");
  const body = document.body;
  if (offcanvasBtn && offcanvas && offcanvasCloseBtn && offcanvasOverlay) {
    offcanvasBtn.addEventListener("click", () => {
      offcanvas.classList.add("active");
      offcanvasOverlay.classList.add("active");
      body.classList.add("modal-open");
    });
    offcanvasCloseBtn.addEventListener("click", () => {
      offcanvas.classList.remove("active");
      offcanvasOverlay.classList.remove("active");
      body.classList.remove("modal-open");
    });
    offcanvasOverlay.addEventListener("click", () => {
      offcanvas.classList.remove("active");
      offcanvasOverlay.classList.remove("active");
      body.classList.remove("modal-open");
    });
  }
}

// Services Service Page
function initServicesServicePage() {
  // company-drilling transform
  const transformBtn = document.querySelector(".Company-drilling_icon--btn");
  const transformItem = document.querySelector(".company-drilling_description");

  if (transformBtn && transformItem) {
    transformBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const offsetTop =
        transformItem.getBoundingClientRect().top + window.scrollY;

      gsap.to(window, {
        duration: 2,
        scrollTo: {
          y: offsetTop,
          autoKill: false,
        },
        ease: "power2.out",
      });
    });
  }

  // Production-Processes
  if (window.innerWidth >= 768) {
    const sections = gsap.utils.toArray(".servicesCompany-production_text");
    const progressNumber = document.getElementById("progress-number"); // This might conflict
    const circle = document.querySelector(".servicesCircle"); // This has a unique class, good!

    if (sections.length > 0 && progressNumber && circle) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".servicesCompany-Production",
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
        trigger: ".servicesCompany-Production",
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
  }
}

// contact page
function initcontactpage() {
  const contactBtn = document.querySelectorAll(".contact_description--btn");
  const contactOne = document.querySelector(".contact_description--detailOne");
  const contactTwo = document.querySelector(".contact_description--detailTwo");
  contactBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tr = parseInt(e.target.dataset.contact);
      contactBtn.forEach((b) => {
        b.classList.remove("active");
      });
      e.target.classList.add("active");
      if (tr === 1) {
        contactOne.classList.add("active");
        contactTwo.classList.remove("active");
      } else if (tr === 2) {
        contactOne.classList.remove("active");
        contactTwo.classList.add("active");
      }
    });
  });
}

// images page
function initimagespage() {
  const imagesBtn = document.querySelector(".images-category");
  const imagesList = document.querySelector(".img-menu");
  const listStyle = document.querySelector(".img-menu-style");
  const categoryIcon = document.querySelector(".images-category_icon");
  imagesBtn.addEventListener("click", () => {
    imagesBtn.classList.toggle("active");
    imagesList.classList.toggle("active");
    listStyle.classList.toggle("active");
    categoryIcon.classList.toggle("active");
  });
}

// press center single page
function initsinglepage() {
  const container = document.querySelector(".single-details");
  const pinned = document.querySelector(".single-detail");
  const scrollable = document.querySelector(".single-description");

  if (!container || !pinned || !scrollable) return;

  let scrollTriggerInstance;

  function setupScrollTrigger() {
    if (window.innerWidth >= 768) {
      // فقط در دسکتاپ فعال کن
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => {
          const extra = scrollable.scrollHeight - pinned.offsetHeight;
          return "+=" + (extra > 0 ? extra : 0);
        },
        pin: pinned,
        scrub: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });
    }
  }

  setupScrollTrigger();

  // اگه resize شد، دوباره بررسی کن
  window.addEventListener("resize", () => {
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
      scrollTriggerInstance = null;
    }
    setupScrollTrigger(); // دوباره بساز اگر لازمه
  });
}

// press center news page
function initnewspage() {
  const pressDescription = document.querySelector(".press-center_description");
  const btn = document.querySelector(".press-center_description--btn");
  btn.addEventListener("click", () => {
    pressDescription.classList.add("active");
  });
}

// press center media pege
function initmediapage() {
  const pressDescription = document.querySelector(".press-center_description");
  const btn = document.querySelector(".press-center_description--btn");
  btn.addEventListener("click", () => {
    pressDescription.classList.add("active");
  });
}

// press center video page
function initvideopage() {
  const videoWrapper = document.querySelector(".video-wrapper");
  const btn = document.querySelector(".press-center_description--btn");
  btn.addEventListener("click", () => {
    videoWrapper.classList.add("active");
  });
}
// --- Main Initialization Block ---
document.addEventListener("DOMContentLoaded", () => {
  // Always initialize common features
  initCommonFeatures();

  // Determine which page we are on and initialize its specific features
  if (document.body.classList.contains("page-careers-recognition")) {
    initCareersRecognitionBoard();
  } else if (document.body.classList.contains("page-careers-succes")) {
    initCareersSuccesStories();
  } else if (document.body.classList.contains("page-company")) {
    initCompanyPage();
  } else if (document.body.classList.contains("page-index")) {
    initIndexPage();
  } else if (document.body.classList.contains("page-services-drilling")) {
    initServicesDrillingPage();
  } else if (document.body.classList.contains("page-services-service")) {
    initServicesServicePage();
  } else if (document.body.classList.contains("page-contact")) {
    initcontactpage();
  } else if (document.body.classList.contains("page-images")) {
    initimagespage();
  } else if (document.body.classList.contains("page-single")) {
    initsinglepage();
  } else if (document.body.classList.contains("page-news")) {
    initnewspage();
  } else if (document.body.classList.contains("page-media")) {
    initmediapage();
  } else if (document.body.classList.contains("page-video")) {
    initvideopage();
  }
});
