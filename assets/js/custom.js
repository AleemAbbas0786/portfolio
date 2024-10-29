
// right-sidebar
function open_aside() {
    "use strict";
    const sidepanel = document.getElementById("mySidenav");
    if (sidepanel) {
        sidepanel.style.left = "0";
    } else {
        console.error("Error: Side panel element not found!");
    }
}
function close_aside() {
    "use strict";
    const sidepanel = document.getElementById("mySidenav");
    if (sidepanel) {
        sidepanel.style.left = "-355px";
    } else {
        console.error("Error: Side panel element not found!");
    }
}
let slid = document.getElementById("slid-btn");
if (slid !== null) {
    slid.onclick = () => {
        let dropdwon = document.getElementById("slid-drop");
        dropdwon.classList.toggle("aside-dropdwon");
    }
}


// End of right-sidebar 




/*========= DropDown menu slide section =========*/
document.addEventListener('DOMContentLoaded', function () {
    const animatedText = document.querySelector('.animated-text');
    const options = {
        root: null,
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animatedText.classList.add('animate');
                observer.unobserve(entry.target); // Stop observing after it has been animated
            }
        });
    }, options);

    observer.observe(animatedText);
});



/*========= End of DropDown menu slide section =========*/





// ========= 1.3. Skills section section ===========
if (document.querySelector(".ProgressContainer")) {
    document.addEventListener("DOMContentLoaded", function () {
        const progressBars = document.querySelectorAll(".ProgressContainer");

        const animateProgress = (progressBar) => {
            const skillProgress = progressBar.querySelector(".SkillProgress");
            const progressValue = parseInt(skillProgress.getAttribute("data-progress"), 10);
            const filledProgress = progressBar.querySelector(".FilledProgress");
            const emptyProgress = progressBar.querySelector(".EmptyProgress");

            let currentProgress = 0;
            const duration = 2000;
            const stepTime = duration / 100;
            const incrementValue = progressValue / 100;

            const interval = setInterval(() => {
                currentProgress += incrementValue;
                const percentageWidth = (currentProgress / 100) * 100;
                filledProgress.style.width = percentageWidth + "%";

                const maxWidth = emptyProgress.offsetWidth;
                const percentageLeft = (currentProgress / 100) * 100;
                const maxLeft = maxWidth - skillProgress.offsetWidth;
                const textLeft = Math.min((percentageLeft / 100) * maxLeft, maxLeft);

                skillProgress.textContent = Math.round(currentProgress) + "%";
                skillProgress.style.left = (percentageLeft - 5) + "%";

                if (currentProgress >= progressValue) {
                    skillProgress.textContent = progressValue + "%";
                    filledProgress.style.width = progressValue + "%";
                    skillProgress.style.left = (progressValue - 5) + "%";
                    clearInterval(interval);
                }
            }, stepTime);
        };

        const observerOptions = {
            root: null,
            threshold: 0.1
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgress(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        progressBars.forEach(progressBar => {
            observer.observe(progressBar);
        });
    });
}
// End of CreativeSkills Tools js ===========



// ========= 1.8. Images Slider section section =========
$(document).ready(function () {
    $('.ImagesSlider').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 2000,
        cssEase: 'linear',
        dots: false,
        arrows: false,
        infinite: true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 6
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 361,
                settings: {
                    slidesToShow: 3.5
                }
            },
        ]
    });
});
// ========= End of 1.8. Images Slider section section =========





// ======== 1.9. Form Validation section ========
if (document.querySelector('.Myform')) {
    document.querySelector('.Myform').addEventListener('submit', function (event) {
        event.preventDefault();

        const form = event.target;
        const inputs = form.querySelectorAll('input[required]');
        let allFilled = true;

        inputs.forEach(input => {
            if (input.type === 'checkbox' && !input.checked) {
                allFilled = false;
            } else if (!input.value) {
                allFilled = false;
            }
        });

        if (allFilled) {
            const modal = document.querySelector('.response-modal');
            modal.style.display = 'flex';

            modal.querySelector('.close-modal').addEventListener('click', function () {
                modal.style.display = 'none';
            });

            form.reset();
        } else {
            console.error('Please fill in all required fields.');
        }
    });
}
// ======== 1.9. Form Validation section ========





// ========  Back to top button section ========
const backToTopButton = document.querySelector('.back-to-top');
let isScrolling;
let isMouseMoving;

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            clearTimeout(isScrolling);
            backToTopButton.classList.add('show');

            isScrolling = setTimeout(() => {
                if (!backToTopButton.matches(':hover')) {
                    backToTopButton.classList.remove('show');
                }
            }, 5000);
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    window.addEventListener('mousemove', () => {
        if (window.scrollY > 100) {
            clearTimeout(isMouseMoving);
            backToTopButton.classList.add('show');

            isMouseMoving = setTimeout(() => {
                if (!backToTopButton.matches(':hover')) {
                    backToTopButton.classList.remove('show');
                }
            }, 5000);
        }
    });

    backToTopButton.addEventListener('click', () => {
        if (window.scrollY > 100) {
            smoothScrollToTop();
        }
    });

    backToTopButton.addEventListener('mouseenter', () => {
        clearTimeout(isScrolling);
        clearTimeout(isMouseMoving);
    });

    backToTopButton.addEventListener('mouseleave', () => {
        if (window.scrollY > 100) {
            isScrolling = setTimeout(() => {
                backToTopButton.classList.remove('show');
            }, 5000);
        }
    });
}

function smoothScrollToTop() {
    const duration = 1000;
    const startPosition = window.pageYOffset;
    const startTime = performance.now();

    function scrollStep(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easing = easeOutQuad(progress);
        window.scrollTo(0, startPosition * (1 - easing));

        if (timeElapsed < duration) {
            requestAnimationFrame(scrollStep);
        }
    }

    function easeOutQuad(t) {
        return t * (2 - t);
    }

    requestAnimationFrame(scrollStep);
}

// ======== End of Back to top button section ========
