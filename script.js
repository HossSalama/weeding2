// ============================================
// دعوة زفاف فاخرة - التحكم بالمراحل والتفاعلات
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    // ===== عناصر المراحل =====

    const stageLoader = document.getElementById("stageLoader");
    const stageEnvelope = document.getElementById("stageEnvelope");
    const invitationPaper = document.getElementById("invitationPaper");

    const waxSeal = document.getElementById("waxSeal");
    const envelopeFlap = document.getElementById("envelopeFlap");
    const paperCard = document.getElementById("paperCard");

    const music = document.getElementById("music");
    const musicBtn = document.getElementById("musicToggle");

    // ===== المرحلة الأولى: شاشة اللودر =====

    setTimeout(() => {
        stageLoader.classList.add("fade-out");
        stageEnvelope.classList.remove("hidden");

        setTimeout(() => {
            stageLoader.style.display = "none";
        }, 1000);

    }, 2000);

    // ===== المرحلة الثانية: فتح الظرف والختم =====

    waxSeal.addEventListener("click", () => {

        waxSeal.classList.add("clicked");

        setTimeout(() => {
            envelopeFlap.classList.add("open");
        }, 450);

        setTimeout(() => {
            paperCard.classList.add("emerge");
        }, 1300);

        setTimeout(() => {
            paperCard.classList.add("expand");
            stageEnvelope.classList.add("fade-out");
        }, 2700);

        setTimeout(() => {
            stageEnvelope.style.display = "none";
            invitationPaper.classList.remove("hidden");

            requestAnimationFrame(() => {
                invitationPaper.classList.add("visible");
            });

            music.play().catch(() => {
                console.log("المتصفح منع التشغيل التلقائي.");
            });

            if (window.startPetals) window.startPetals();

            revealNames();
            initDrawSVGs();

        }, 4300);

    });

    // ===== زر تشغيل/إيقاف الموسيقى =====

    if (musicBtn) {
        musicBtn.onclick = function () {
            if (music.paused) {
                music.play();
                musicBtn.innerHTML = "🔊";
            } else {
                music.pause();
                musicBtn.innerHTML = "🎵";
            }
        };
    }

    // ===== كتابة الأسماء حرفًا حرفًا =====

    function splitLetters(el){
        const text = el.textContent.trim();
        el.textContent = "";

        [...text].forEach((ch, i) => {
            const span = document.createElement("span");
            span.textContent = ch === " " ? "\u00A0" : ch;
            span.classList.add("letter");
            span.style.animationDelay = (i * 0.045) + "s";
            el.appendChild(span);
        });
    }

    function revealNames(){
        document.querySelectorAll(".couple-names").forEach(splitLetters);
    }

    // ===== الرسم الذاتي للخطوط الذهبية (الخاتم والفواصل) =====

    function initDrawSVGs(){

        const svgs = document.querySelectorAll(".draw-svg");

        svgs.forEach(svg => {

            const shapes = svg.querySelectorAll("path:not(.no-draw), circle:not(.no-draw), line, polyline");

            shapes.forEach(el => {
                const length = el.getTotalLength();
                el.style.strokeDasharray = length;
                el.style.strokeDashoffset = length;
                el.style.transition = "stroke-dashoffset 2.2s ease";
            });

        });

        const drawObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("in-view");

                    entry.target
                        .querySelectorAll("path:not(.no-draw), circle:not(.no-draw), line, polyline")
                        .forEach(el => {
                            el.style.strokeDashoffset = 0;
                        });

                    drawObserver.unobserve(entry.target);
                }

            });

        }, { threshold:.3 });

        svgs.forEach(svg => drawObserver.observe(svg));

    }

    // ===== العد التنازلي =====

    const weddingDate = new Date("October 17, 2026 20:00:00").getTime();

    setInterval(function(){

        const now = new Date().getTime();
        const distance = weddingDate - now;

        const countdownEl = document.getElementById("countdown");

        if (distance < 0) {
            countdownEl.innerHTML = "🎉 لقد بدأ حفل الزفاف 🎉";
            return;
        }

        const days = Math.floor(distance / (1000*60*60*24));
        const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
        const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
        const seconds = Math.floor((distance % (1000*60)) / 1000);

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;

    }, 1000);

    // ===== الجزيئات الذهبية =====

    const particles = document.getElementById("particles");

    function createParticle(){

        const dot = document.createElement("span");

        dot.style.position = "absolute";
        dot.style.width = Math.random()*5 + 2 + "px";
        dot.style.height = dot.style.width;
        dot.style.background = "#b8860b";
        dot.style.borderRadius = "50%";
        dot.style.left = Math.random()*100 + "%";
        dot.style.top = "100%";
        dot.style.opacity = Math.random()*0.5 + 0.2;
        dot.style.boxShadow = "0 0 8px #d4af37";
        dot.style.animation = "floatUp " + (Math.random()*8+6) + "s linear forwards";

        particles.appendChild(dot);

        setTimeout(() => { dot.remove(); }, 14000);
    }

    setInterval(createParticle, 350);

    const floatStyle = document.createElement("style");
    floatStyle.innerHTML = `
        @keyframes floatUp{
            0%{ transform:translateY(0) scale(1); opacity:.6; }
            100%{ transform:translateY(-120vh) scale(.2); opacity:0; }
        }
    `;
    document.head.appendChild(floatStyle);

    // ===== ظهور الأقسام تدريجياً عند التمرير =====

    const revealObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.animate([
                    { opacity:0, transform:"translateY(50px)" },
                    { opacity:1, transform:"translateY(0)" }
                ], {
                    duration:1100,
                    fill:"forwards",
                    easing:"ease-out"
                });
                revealObserver.unobserve(entry.target);
            }
        });

    }, { threshold:.15 });

    document.querySelectorAll(".details div, .action-buttons, .closing, .section-title")
        .forEach(el => revealObserver.observe(el));

    // ===== زر المشاركة =====

    const shareBtn = document.getElementById("shareBtn");

    if (shareBtn) {
        shareBtn.addEventListener("click", async () => {

            const shareData = {
                title: "دعوة زفاف عبدالله ونورهان",
                text: "يسعدنا دعوتكم لحضور حفل زفافنا 💛",
                url: window.location.href
            };

            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (e) {
                    // المستخدم ألغى المشاركة
                }
            } else {
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    const original = shareBtn.textContent;
                    shareBtn.textContent = "تم نسخ الرابط ✓";
                    setTimeout(() => { shareBtn.textContent = original; }, 2000);
                } catch (e) {
                    console.log("تعذر نسخ الرابط.");
                }
            }

        });
    }

});
