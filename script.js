
    let pages = ['home', 'exp', 'proj', 'edu', 'skill', 'cert', 'contact'];
    let currentIndex = 0;

    function showPage(pageId) {
        currentIndex = pages.indexOf(pageId);
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        
        document.getElementById(pageId).classList.add('active');
        document.getElementById('btn-' + pageId).classList.add('active');
        
        document.getElementById('prevBtn').disabled = (currentIndex === 0);
        document.getElementById('nextBtn').disabled = (currentIndex === pages.length - 1);
    }

    function nextPage() {
        if (currentIndex < pages.length - 1) showPage(pages[currentIndex + 1]);
    }

    function prevPage() {
        if (currentIndex > 0) showPage(pages[currentIndex - 1]);
    }

    const canvas = document.getElementById("bg");
    const ctx = canvas.getContext("2d");
    let particles = [];

    function init() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        for(let i=0; i<140; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                size: Math.random() * 2 + 1
            });
        }
    }

    function animate() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
            ctx.fillStyle = "rgba(0, 212, 255, 0.7)"; 
            ctx.fill();
        });

        for(let i=0; i<particles.length; i++) {
            for(let j=i+1; j<particles.length; j++) {
                let d = Math.sqrt((particles[i].x-particles[j].x)**2 + (particles[i].y-particles[j].y)**2);
                if(d < 180) {
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.3 * (1 - d/180)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', init);
    init();
    animate();
    showPage('home');
