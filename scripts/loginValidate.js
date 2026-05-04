const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');

const loginState=(state)=> {
    const navBAr = document.getElementById('nav-bar');
    const heroSection = document.getElementById('hero-section');
    const lessonSection = document.getElementById('lesson-section');
    const faqSection = document.getElementById('faq-section');
    if(state) {
       navBAr.classList.remove("hidden");
        heroSection.classList.add('hidden');
        lessonSection.classList.remove('hidden');
        faqSection.classList.remove('hidden')
    }
    else{
        navBAr.classList.add('hidden');
        heroSection.classList.remove('hidden');
        lessonSection.classList.add('hidden');
        faqSection.classList.add('hidden')
    }
}


loginBtn.addEventListener('click', () =>{
    const pin = document.getElementById('pin-code').value;
    const convertedPin = parseInt(pin);
    const name = document.getElementById('login-name').value;
    if (name) {
        if (convertedPin === 123456) {
        loginState(true);
        } else {
        alert('PIN wrong')
        }
    } else {
        alert('Enter your first name')
    }
})
logoutBtn.addEventListener('click', () =>{
    loginState(false);
    
})
