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
        bgmToggle.addEventListener('click', () => {
            if (isPlaying) {
                bgmAudio.pause();
                bgmToggle.innerHTML = '🔇 BGM OFF';
                bgmToggle.classList.remove('active');
            } else {
                bgmAudio.play().catch(e => {
                    console.error("Audio play failed", e);
                    alert("BGMを再生できませんでした。assetsフォルダにbgm.mp3があるか確認してください。");
                });
                // Update UI regardless of promise for responsiveness, 
                // though strictly should wait. For simple UI, this is okay 
                // provided catch handles errors.
                if (!bgmAudio.paused || bgmAudio.currentTime > 0) {
                    // Check if actually playing might be async, so simplistic approach:
                }
                // Simpler approach:
                bgmToggle.innerHTML = '🎵 BGM ON';
                bgmToggle.classList.add('active');
            }
            isPlaying = !isPlaying;
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
