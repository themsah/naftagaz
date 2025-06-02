gsap.registerPlugin(ScrollTrigger);

const progress = document.querySelector(".progress");
const texts = document.querySelectorAll(".text");
const textBlocks = document.querySelector(".text-blocks");
const yearTrack = document.querySelector(".year-track");

const radius = 170;
const circumference = 2 * Math.PI * radius;
progress.style.strokeDasharray = circumference;
for (let y = 2013; y <= 2023; y++) {
  const el = document.createElement("div");
  el.className = "year";
  el.textContent = y.toString().slice(2); // فقط دو رقم آخر
  yearTrack.appendChild(el);
}

const yearElems = document.querySelectorAll(".year-track .year");

ScrollTrigger.create({
  trigger: ".scroll-section",
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  onUpdate: (self) => {
    const progressValue = self.progress;
    const year = Math.min(
      2023,
      Math.max(2013, Math.round(2013 + progressValue * 10))
    );
    const offset = circumference - progressValue * circumference;
    progress.style.strokeDashoffset = offset;

    // فعال‌سازی متن مرتبط
    texts.forEach((text) => {
      const textYear = parseInt(text.dataset.year);
      text.classList.toggle("active", textYear === year);
    });
    const index = year - 2013;
    const textHeight = texts[0].offsetHeight;
    const offsetY = -index * textHeight;
    if (window.innerWidth > 768) {
      textBlocks.style.transform = `translateY(${offsetY}px)`;
    }

    // تغییر سال‌های داخل دایره
    const yearIndex = year - 2013;
    const yearHeight = yearElems[0].offsetHeight;
    const yearOffset = -(yearIndex - 1) * yearHeight;
    yearTrack.style.transform = `translateY(${yearOffset}px)`;

    yearElems.forEach((el, i) => {
      el.classList.toggle("active", i === yearIndex);
    });
  },
});
