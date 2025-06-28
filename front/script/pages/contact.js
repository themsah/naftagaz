
const contactBtn = document.querySelectorAll(".contact_description--btn");
const contactOne = document.querySelector(".contact_description--detailOne");
const contactTwo = document.querySelector(".contact_description--detailTwo");
contactBtn.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        const tr = parseInt(e.target.dataset.contact);
        contactBtn.forEach((b)=>{
            b.classList.remove("active");
        })
        e.target.classList.add("active");
        if(tr === 1){
            contactOne.classList.add("active");
            contactTwo.classList.remove("active");
        }else if (tr === 2){
            contactOne.classList.remove("active");
            contactTwo.classList.add("active");
        }
    })
})