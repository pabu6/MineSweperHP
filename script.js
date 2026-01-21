document.addEventListener('DOMContentLoaded', () => {
    // Initialize Animate On Scroll (AOS)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Smooth subtle parallax effect for hero background
    const heroBg = document.querySelector('.hero-bg img');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // BGM Toggle Logic
    const bgmAudio = document.getElementById('bgm-audio');
    const bgmToggle = document.getElementById('bgm-toggle');
    let isPlaying = false;

    if (bgmToggle && bgmAudio) {
        // Function to attempt playing BGM
        const playBgm = () => {
            bgmAudio.play().then(() => {
                // Success - listeners will update UI
                // Remove the interaction listeners since we succeeded
                document.removeEventListener('click', tryPlayOnInteraction);
                document.removeEventListener('keydown', tryPlayOnInteraction);
            }).catch(e => {
                console.log("Autoplay blocked, waiting for interaction");
            });
        };

        // Handler for user interaction fallback
        const tryPlayOnInteraction = () => {
            playBgm();
        };

        // Try to play immediately
        playBgm();

        // Add fallback listeners
        document.addEventListener('click', tryPlayOnInteraction, { once: true });
        document.addEventListener('keydown', tryPlayOnInteraction, { once: true });

        bgmToggle.addEventListener('click', () => {
            if (isPlaying) {
                bgmAudio.pause();
            } else {
                bgmAudio.play().catch(e => {
                    console.error("Audio play failed", e);
                    alert("BGMを再生できませんでした。");
                });
            }
        });

        // Handle case where play fails or audio ends (though looped)
        bgmAudio.addEventListener('pause', () => {
            isPlaying = false;
            bgmToggle.innerHTML = '🔇 BGM OFF';
            bgmToggle.classList.remove('active');
        });

        bgmAudio.addEventListener('play', () => {
            isPlaying = true;
            bgmToggle.innerHTML = '🎵 BGM ON';
            bgmToggle.classList.add('active');
        });
    }

    // Mascot Click Interaction
    const mascotBtn = document.getElementById('mascot-click');
    const clickSfx = document.getElementById('sfx-click');

    if (mascotBtn) {
        mascotBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Play Sound
            if (clickSfx) {
                clickSfx.currentTime = 0; // Rewind to start
                clickSfx.play().catch(e => console.log("Sound play failed", e));
            }

            // Scroll to Top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
