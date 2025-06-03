// card
// const card = document.querySelector(".company-detail");
// const img = document.querySelector(".company-detail_man");
// const imgBack = document.querySelector(".company-detail_background");
// card.addEventListener("mousemove", (e) => {
//   const cardRect = card.getBoundingClientRect();
//   const cardW = cardRect.width;
//   const cardH = cardRect.height;
//   const cardXCenterViewport = cardRect.left + cardW / 2;
//   const cardYCenterViewport = cardRect.top + cardH / 2;
//   const mouseX = e.clientX - cardXCenterViewport;
//   const mouseY = e.clientY - cardYCenterViewport;
//   const rtX = (25 * mouseY) / (cardH / 2);
//   const rtY = (-25 * mouseX) / (cardW / 2);
//   img.style.transform = `perspective(900px) rotateX(${rtX}deg) rotateY(${rtY}deg)`;
//   imgBack.style.transform = `perspective(100000px) rotateX(${rtX}deg) rotateY(${rtY}deg)`;
// });
// card.addEventListener("mouseleave", (e) => {
//   img.style.transform = `perspective(100px) rotateX(0deg) rotateY(0deg)`;
//   imgBack.style.transform = `perspective(10px) rotateX(${rtX}deg) rotateY(${rtY}deg)`;
// });
