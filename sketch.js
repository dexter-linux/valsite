document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const response = document.getElementById('response');
    const music = document.getElementById('bgMusic');
    const scrollToTopBtn = document.getElementById('scrollToTop');

    // Optional: lower music volume
    if (music) music.volume = 0.4;

    yesBtn.addEventListener('click', () => {
        response.innerHTML = "You said YES! My ocean heart is overflowing with joy. Let's dive into forever together, Lavender. 🌊💙🐟";
        response.classList.remove('hidden');
        createBubbles(60);
        createConfetti();
    });

    noBtn.addEventListener('click', () => {
        response.innerHTML = "That's okay... I'll keep swimming patiently until the tides bring you closer. 💙";
        response.classList.remove('hidden');
    });

    // --- SCROLL TO TOP LOGIC ---
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            // Show button after scrolling down 300px
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    function createBubbles(count) {
        for (let i = 0; i < count; i++) {
            const bubble = document.createElement('div');
            bubble.style.position = 'absolute';
            bubble.style.width = Math.random() * 20 + 8 + 'px';
            bubble.style.height = bubble.style.width;
            bubble.style.background = 'rgba(255,255,255,0.6)';
            bubble.style.borderRadius = '50%';
            bubble.style.left = Math.random() * 100 + 'vw';
            bubble.style.bottom = '-20px';
            bubble.style.pointerEvents = 'none';
            document.body.appendChild(bubble);

            const anim = bubble.animate([
                { transform: 'translateY(0)', opacity: 0.8 },
                { transform: `translateY(-${window.innerHeight + 100}px) translateX(${Math.random()*100 - 50}px)`, opacity: 0 }
            ], {
                duration: Math.random() * 8000 + 6000,
                easing: 'ease-out'
            });

            anim.onfinish = () => bubble.remove();
        }
    }

    function createConfetti() {
        for (let i = 0; i < 80; i++) {
            const conf = document.createElement('div');
            conf.style.position = 'absolute';
            conf.style.width = '12px';
            conf.style.height = '12px';
            conf.style.background = ['#00e5ff','#4fc3f7','#b2ebf2','#ff4081'][Math.floor(Math.random()*4)];
            conf.style.left = Math.random() * window.innerWidth + 'px';
            conf.style.top = '-20px';
            conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            document.body.appendChild(conf);

            conf.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random()*720 - 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 4000 + 3000,
                easing: 'ease-out'
            }).onfinish = () => conf.remove();
        }
    }

    // Gentle background bubbles
    setInterval(() => createBubbles(3), 4000);
});

// Password Configuration (Same as messages.html)
const PASSWORDS = {
    "Mideva": "lavender2026",
    "Gachara": "gachara2026"
};

function attemptLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const errorMsg = document.getElementById('login-error');

    if (user && PASSWORDS[user] === pass) {
        // Hide Login, Show App
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        
        // Personalized Welcome
        document.getElementById('welcome-user').innerText = `Welcome, ${user} ✨`;
        
        // Save session locally so they don't have to log in every refresh (Optional)
        localStorage.setItem('midara_session', user);
        
        // Trigger data load
        if (typeof loadFromSheets === "function") loadFromSheets();
        
    } else {
        // Show error and clear password
        errorMsg.style.display = 'block';
        document.getElementById('password').value = "";
    }
}

function logout() {
    // Clear session
    localStorage.removeItem('midara_session');
    
    // Reset view
    document.getElementById('main-app').style.display = 'none';
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('password').value = "";
    document.getElementById('login-error').style.display = 'none';
}

// Check for existing session on page load
window.addEventListener('load', () => {
    const savedUser = localStorage.getItem('midara_session');
    if (savedUser) {
        document.getElementById('username').value = savedUser;
        // Optionally auto-login or just pre-fill the name
    }
});
