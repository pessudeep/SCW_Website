/* MOBILE MENU */

const toggle =
document.querySelector(".menu-toggle");

const nav =
document.querySelector(".nav-links");

if(toggle){

toggle.addEventListener("click", () => {

nav.classList.toggle("show");

});

}

/* SCROLL ANIMATION */

const reveals =
document.querySelectorAll(".reveal");

const animateElements =
document.querySelectorAll("[data-animate]");

window.addEventListener("scroll", () => {

reveals.forEach((el) => {

const windowHeight =
window.innerHeight;

const revealTop =
el.getBoundingClientRect().top;

if(revealTop < windowHeight - 100){

el.classList.add("active");

}

});

animateElements.forEach((el) => {

const windowHeight =
window.innerHeight;

const elemTop =
el.getBoundingClientRect().top;

if(elemTop < windowHeight - 80){

el.classList.add("active");

}

});

});

/* Trigger on load so visible sections animate immediately */
window.dispatchEvent(new Event("scroll"));









/* ANIMATED COUNTERS */

const counters =
document.querySelectorAll(".counter");

const speed = 200;

const startCounter = (counter) => {

const updateCount = () => {

const target =
+counter.getAttribute("data-target");

const count =
+counter.innerText;

const increment =
target / speed;

if(count < target){

counter.innerText =
Math.ceil(count + increment);

setTimeout(updateCount, 20);

}

else {

counter.innerText = target;

}

};

updateCount();

};

/* Trigger counter when visible */

const counterObserver =
new IntersectionObserver((entries) => {

entries.forEach(entry => {

if(entry.isIntersecting){

startCounter(
entry.target
);

counterObserver.unobserve(
entry.target
);

}

});

},
{
threshold: 0.5
});

counters.forEach(counter => {

counterObserver.observe(counter);

});








/* IMAGE LIGHTBOX */

const galleryImages =
document.querySelectorAll(".gallery-img");

const lightbox =
document.getElementById("lightbox");

const lightboxImg =
document.getElementById("lightbox-img");

const closeBtn =
document.querySelector(".close");

if (galleryImages.length > 0 && lightbox) {

galleryImages.forEach(img => {

img.addEventListener("click", () => {

lightbox.style.display = "flex";

if (lightboxImg) {

lightboxImg.src = img.src;

}

});

});

}

if (closeBtn && lightbox) {

closeBtn.addEventListener("click", () => {

lightbox.style.display = "none";

});

}

window.addEventListener("click", (e) => {

if (lightbox && e.target === lightbox) {

lightbox.style.display = "none";

}

});






















/* ===========================
   SCROLL TO TOP BUTTON FIX
=========================== */

const scrollBtn =
document.getElementById("scrollTopBtn");

window.onscroll = function () {

if (scrollBtn) {

if (
document.body.scrollTop > 200 ||
document.documentElement.scrollTop > 200
) {

scrollBtn.style.display = "block";
scrollBtn.classList.add("show");

/* Update scroll progress for arc indicator */

const scrollTop =
document.documentElement.scrollTop || document.body.scrollTop;

const scrollHeight =
document.documentElement.scrollHeight - document.documentElement.clientHeight;

const progress =
(scrollTop / scrollHeight) * 100;

scrollBtn.style.setProperty(
"--scroll-progress",
progress + "%"
);

}

else {

scrollBtn.style.display = "none";
scrollBtn.classList.remove("show");

}

}

};

if (scrollBtn) {

scrollBtn.addEventListener("click", () => {

window.scrollTo({

top: 0,

behavior: "smooth"

});

});

}



// EMAILJS INIT
(function () {
    emailjs.init("nK1FxemrjZFQSGv-G");
})();


// EMAIL VALIDATION FUNCTION
function validateEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


// PHONE VALIDATION FUNCTION
function validatePhone(phone) {

    const phonePattern =
        /^[0-9]{10}$/;

    return phonePattern.test(phone);

}


// CONTACT FORM
const contactForm =
    document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const email =
                contactForm.email.value;

            if (!validateEmail(email)) {

                alert(
                    "❌ Invalid Email Format!"
                );

                return;
            }

            emailjs.sendForm(
                "service_fivxpji",
                "template_8pclxfs",
                this
            ).then(

                function () {

                    alert(
                        "✅ Message Sent Successfully!"
                    );

                    contactForm.reset();

                },

                function () {

                    alert(
                        "❌ Failed to Send Message"
                    );

                }

            );

        }

    );

}



// BOOKING FORM
const bookingForm =
    document.getElementById("booking-form");

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const email =
                bookingForm.email.value;

            const phone =
                bookingForm.phone.value;

            if (!validateEmail(email)) {

                alert(
                    "❌ Invalid Email Format!"
                );

                return;
            }

            if (!validatePhone(phone)) {

                alert(
                    "❌ Phone must be 10 digits!"
                );

                return;
            }

            emailjs.sendForm(
                "service_fivxpji",
                "template_8kex0z7",
                this
            ).then(

                function () {

                    alert(
                        "✅ Appointment Booked Successfully!"
                    );

                    bookingForm.reset();

                },

                function () {

                    alert(
                        "❌ Booking Failed"
                    );

                }

            );

        }

    );

}
/* ===========================
   GALLERY ALBUM SYSTEM
=========================== */

// Album data
const albums = {
  phase1: {
    name: "Phase 1 of construction 2024",
    photos: [
      "../assets/gallery1.jpg",
      "../assets/gallery2.jpg",
      "../assets/gallery3.jpg",
      "../assets/gallery4.jpg",
      "../assets/gallery5.jpg",
      "../assets/gallery6.jpg"
    ]
  }
};

const albumListView = document.getElementById("album-list-view");
const albumDetailView = document.getElementById("album-detail-view");
const albumDetailTitle = document.getElementById("album-detail-title");
const albumDetailGrid = document.getElementById("album-detail-grid");
const backBtn = document.getElementById("back-to-albums");

// Open album
function openAlbum(albumId) {
  const album = albums[albumId];
  if (!album) return;

  // Set title
  albumDetailTitle.textContent = album.name;

  // Populate photos
  albumDetailGrid.innerHTML = "";
  album.photos.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Gallery photo";
    img.classList.add("album-photo");
    img.addEventListener("click", () => {
      openLightbox(src);
    });
    albumDetailGrid.appendChild(img);
  });

  // Switch views
  albumListView.style.display = "none";
  albumDetailView.style.display = "block";
}

// Back to albums
if (backBtn) {
  backBtn.addEventListener("click", () => {
    albumDetailView.style.display = "none";
    albumListView.style.display = "block";
  });
}

// Album card click handlers
document.querySelectorAll(".album-card").forEach(card => {
  card.addEventListener("click", () => {
    const albumId = card.dataset.album;
    openAlbum(albumId);
  });
});

// Lightbox function for gallery page
function openLightbox(src) {
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  if (lb && lbImg) {
    lbImg.src = src;
    lb.style.display = "flex";
  }
}

/* Disable Past Dates */

const dateInput =
document.querySelector(
'input[type="date"]'
);

if (dateInput) {

const today =
new Date().toISOString().split("T")[0];

dateInput.setAttribute(
"min",
today
);

}









/* FINAL INTRO FIX */

window.addEventListener("load", function () {

    const preloader =
        document.getElementById("preloader");

    if (preloader) {

        setTimeout(function () {

            /* Fade out */

            preloader.style.opacity = "0";

            /* Remove completely */

            setTimeout(function () {

                preloader.remove();

            }, 1000);

        }, 3000); // 7 seconds

    }

});