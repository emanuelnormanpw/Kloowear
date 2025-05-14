// Logos Slider Swiper
new Swiper("#clients-swiper", {
  loop: true,
  speed: 800,
  slidesPerView: 4,
  spaceBetween: 20,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

// Logos Slider Swiper
new Swiper("#testimonial-swiper", {
  loop: true,
  speed: 600,
  autoplay: {
    delay: 5000,
  },
  slidesPerView: "auto",
  pagination: {
    el: ".testimonial-swiper-pagination",
    type: "bullets",
    clickable: true,
  },
});
