let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 4000);


const galleryData = {
  kitchen: ['images/kitchen1.jfif', 'images/kitchen2.jfif', 'images/kitchen3.jfif'],
  wardrobe: ['images/wardrobe1.jfif', 'images/wardrobe2.jfif', 'images/wardrobe3.jfif'],
  tvunit: ['images/tv1.jfif', 'images/tv2.jfif', 'images/tv3.jpg']
};

function showGallery(type) {
  const container = document.getElementById('gallery-scroll');
  const gallery = document.getElementById('gallery-images');
  gallery.innerHTML = ''; // Clear old images

  galleryData[type].forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    gallery.appendChild(img);
  });

  container.classList.remove('hidden');
  container.scrollIntoView({ behavior: 'smooth' });
}


document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("close");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  let current = 0;

  function showImage(index) {
    current = index;
    lightboxImg.src = images[current].src;
    lightbox.style.display = "flex";
  }

  images.forEach((img, i) => {
    img.addEventListener("click", () => showImage(i));
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % images.length;
    lightboxImg.src = images[current].src;
  });

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + images.length) % images.length;
    lightboxImg.src = images[current].src;
  });

  // Optional: close lightbox on outside click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });
});



// Add zoom click
document.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG" && e.target.closest(".gallery-scroll")) {
    document.getElementById("lightbox-img").src = e.target.src;
    document.getElementById("lightbox").classList.remove("hidden");
  }
});

function closeLightbox() {
  document.getElementById("lightbox").classList.add("hidden");
}

// Show image in full screen (lightbox)
document.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG" && e.target.closest(".gallery-scroll")) {
    const lightboxImg = document.getElementById("lightbox-img");
    const lightbox = document.getElementById("lightbox");
    lightboxImg.src = e.target.src;
    lightbox.classList.remove("hidden");
  }
});

function closeLightbox() {
  document.getElementById("lightbox").classList.add("hidden");
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
}); 

let galleryImages = [];
let currentIndex = 0;

function openLightbox(index) {
  galleryImages = Array.from(document.querySelectorAll("#gallery-scroll img"));
  currentIndex = index;
  document.getElementById("lightbox-img").src = galleryImages[currentIndex].src;
  document.getElementById("lightbox").classList.remove("hidden");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.add("hidden");
}

function nextImage() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  document.getElementById("lightbox-img").src = galleryImages[currentIndex].src;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  document.getElementById("lightbox-img").src = galleryImages[currentIndex].src;
}

// Automatically bind click event to all gallery images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("#gallery-scroll img");
  images.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });
});

// Keyboard support (ESC, ←, →)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
});
