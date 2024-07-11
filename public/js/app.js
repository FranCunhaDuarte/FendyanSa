
const openButton=document.querySelector(".open-menu-button").addEventListener('click',toggleMenu);
const closeButton=document.querySelector(".close-menu-button").addEventListener('click',toggleMenu);
const navBar=document.querySelector(".mobile-navbar-container");
const navBarBox=document.querySelector(".mobile-navbar-box");
const navBarLinks = navBarBox.querySelectorAll("li");
const body=document.querySelector("body");

navBarLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

function toggleMenu(){
    navBar.classList.toggle("open-navbar");
}

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }else{
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElementsLeft=document.querySelectorAll('.hidden-left').forEach((el)=>observer.observe(el));
const hiddenElementsRight=document.querySelectorAll('.hidden-right').forEach((el)=>observer.observe(el));
const hiddenElementsBottom=document.querySelectorAll('.hidden-bottom').forEach((el)=>observer.observe(el));
const hiddenElementsTop=document.querySelectorAll('.hidden-top').forEach((el)=>observer.observe(el));


document.querySelectorAll('.mobile-navbar-container li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      let target = this.getAttribute('data-scroll');
      let targetElement = document.getElementById(target);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
});

document.querySelectorAll('.desktop-navbar-container li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      let target = this.getAttribute('data-scroll');
      let targetElement = document.getElementById(target);

      if (targetElement) {
        toggleMenu()
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
});

let header=document.querySelector('header');

let lastScrollTop=0;
window.addEventListener("scroll",function(){
    let scrollTop=window.pageYOffset || document.documentElement.scrollTop;
    if(scrollTop>lastScrollTop){
        header.style.top="-90px";
        header.style.boxShadow="0px 0px 10px rgba(0,0,0,0.2)";
        if(scrollTop<=0){
            header.style.top="0";
        }
    }else{
        if(scrollTop<=100){
            header.style.backgroundImage="none";
            header.style.boxShadow="none";
            if(window.innerWidth>=768){
                header.style.top="30px";
            }
        } else{
            header.style.top="0";
            header.style.backgroundImage="linear-gradient(90deg, rgb(32, 32, 32) 0%, rgb(49, 49, 49) 100%)";
        }
    }
    lastScrollTop=scrollTop;
})


const scrollers=document.querySelectorAll(".brands-section");

if(!window.matchMedia("(prefers-reduce-motion: reduce)").matches){
    addAnimation();
}

function addAnimation(){
    scrollers.forEach((scroller)=>{
        scroller.setAttribute('data-animated',true);

        const scrollerInner=scroller.querySelector('.brands-box');
        const scrollerContent=Array.from(scrollerInner.children);

        scrollerContent.forEach(item=>{
            let duplicatedItem=item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden',true);
            scrollerInner.appendChild(duplicatedItem);
        })
    })
}


const inputName = document.querySelector(".name-input");
const inputEmail = document.querySelector(".email-input");
const inputMessage = document.querySelector(".message-input");
const buttonForm = document.querySelector(".button-send-box");
buttonForm.addEventListener('click', function(event) {
    event.preventDefault();
    if (validate_input()) {
        const formData = new FormData();
        formData.append('input-name', inputName.value.trim());
        formData.append('input-email', inputEmail.value.trim());
        formData.append('input-message', inputMessage.value.trim());

        let popupForm = document.querySelector('.popup-form-container');
        popupForm.classList.add('show-popup-form-container');
        let boxIconForm = document.querySelector('.popup-form-icons');
        let alertMessage = document.querySelector('.form-alert-message');

        const languagesAlerts = {
            'es': {
                'verifying': 'Verificando formulario...',
                'send': 'Enviado',
                'verifyFields': 'Verifique los campos'
            },
            'en': {
                'verifying': 'Verifying form...',
                'send': 'Sent',
                'verifyFields': 'Check the fields'
            },
            'pt': {
                'verifying': 'Verificando formulário...',
                'send': 'Enviado',
                'verifyFields': 'Verifique os campos'
            }
        };
        let actualLanguage=getCurrentLanguage(languagesAlerts);

        alertMessage.textContent = actualLanguage['verifying'];

        fetch('verifyForm', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            return response.text();
        })
        .then(data => {

            if (data != 'false') { 
                boxIconForm.classList.add('success-form');
                alertMessage.textContent = actualLanguage['send'];
            } else {
                boxIconForm.classList.add('failure-form');
                alertMessage.textContent = actualLanguage['verifyFields'];
            }

            setTimeout(function() {
                popupForm.classList.remove('show-popup-form-container');
                setTimeout(function() {
                    boxIconForm.classList.remove('success-form', 'failure-form');
                }, 700);
            }, 3000);
        })
    }
});

function getCurrentLanguage(languageJson){
    if((window.location.pathname).slice(-2) != 'es' && (window.location.pathname).slice(-2) != 'en' && (window.location.pathname).slice(-2) != 'pt'){
        return languageJson['es'];
    }
    return languageJson[(window.location.pathname).slice(-2)]
}

function transaleLanguageAlerts(jsonLanguages){
    if((window.location.pathname).slice(-2)=='en'){
        return jsonLanguages['verifying']
    }
}


function validate_input(){
    const inputNameValue = inputName.value.trim();
    const inputEmailValue = inputEmail.value.trim();
    const inputMessageValue = inputMessage.value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let name=true,email=true,message=true;
    if(inputNameValue === ''){
        inputName.classList.add('error');
        name=false;
    } else {
        inputName.classList.remove('error');
    }

    if(inputEmailValue === '' || !re.test(inputEmailValue)){
        inputEmail.classList.add('error');
        email=false;
    } else {
        inputEmail.classList.remove('error');
    }

    if(inputMessageValue === ''){
        inputMessage.classList.add('error');
        message=false;
    } else {
        inputMessage.classList.remove('error');
    }
    return (name && email && message);
}