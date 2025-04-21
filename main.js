console.clear();

// Fonts array
const fonts = [
  "'Poppins', sans-serif",
  "'Montserrat', sans-serif",
  "'Fjalla One', sans-serif",
  "'Ubuntu', sans-serif",
  "'Passion One', sans-serif",
];

// Register plugins
gsap.registerPlugin(TextPlugin);

// Wait until fonts are ready
document.fonts.ready.then(() => {
  console.log("Fonts loaded");

  // Timeline to move wrapper up after 2 seconds
  const wrapperTl = gsap.timeline({ delay: 2 });

  wrapperTl.to(".wrapper", {
    y: "-100%", // Move up full height
    duration: 2, // Animate over 1 second
    ease: "power2.inOut",
  })
 
  .set(".wrapper", { display: "none" ,y:"-100%"}); // Hide it after move
  wrapperTl.to(".banner", {
    y: "0", // Move up full height
    duration: 1, // Animate over 1 second
    ease: "power2.inOut",
  })
  // Font family change timeline
  const fontTimeline = gsap.timeline({
    repeat: -1,
    paused: false,
  });

  fonts.forEach((font, i) => {
    fontTimeline.set("h1", {
      fontFamily: font,
      fontSize: 96,
      fontWeight: 400,
    }, i * 0.5);
  });

  fontTimeline.set({}, {}, "+=1");
});

// Animate text for #spice
// gsap.to("#spice", {
//   duration: 1,
//   text: "WM",
// });

// menu luinks
const burger = document.getElementById('burger');
const menu = document.getElementById('menus');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  menu.classList.toggle('active');
});



// show more on images

function gsapHoverButton(containerSelector) {
  const container = document.querySelector(containerSelector);
  const button = container.querySelector(".hover-button");

  container.addEventListener("mouseenter", () => {
    gsap.to(button, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power3.out"
    });
  });

  container.addEventListener("mousemove", (e) => {
    const bounds = container.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    gsap.to(button, {
      x: x,
      y: y,
      duration: 0.2,
      ease: "power3.out"
    });
  });

  container.addEventListener("mouseleave", () => {
    gsap.to(button, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power3.inOut"
    });
  });
}

// Apply for both containers
gsapHoverButton(".grid-images");
gsapHoverButton(".next-grid");



// header color change in scrolll

gsap.registerPlugin(ScrollTrigger);

const logo = document.querySelector(".spice");
const menus = document.querySelector(".menus");
const menuItems = document.querySelectorAll(".menus a");

// Function to make header white mode
function setWhiteHeader() {
  gsap.to(logo, { color: "#fff", duration: 0.2 });
  gsap.to(menus, { backgroundColor: "#fff", duration: 0.2 });
  gsap.to(menuItems, { color: "black", duration: 0.2 }); // ✅ FIXED
}

// Function to reset header to normal/default
function setDefaultHeader() {
  gsap.to(logo, { color: "black", duration: 0.5 });
  gsap.to(menus, { backgroundColor: "black", duration: 0.5 });
  gsap.to(menuItems, { color: "#fff", duration: 0.5 });
}

// Setup ScrollTriggers
ScrollTrigger.create({
  trigger: ".banner",
  start: "top top",
  end: "bottom top",
  onEnter: setWhiteHeader,
  onLeaveBack: setWhiteHeader,
  onLeave: setDefaultHeader,
  onEnterBack: setWhiteHeader,
});

// --- Middle sections
[".what-we-do", ".latest-projects", ".portfolio", ".dare-company"].forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: "top 80%", // smoother enter before top
    end: "bottom top",
    onEnter: setDefaultHeader,
    onEnterBack: setDefaultHeader
  });
});

// --- Footer section
ScrollTrigger.create({
  trigger: ".footer",
  start: "top bottom",
  end: "bottom bottom",
  onEnter: setWhiteHeader,
  onEnterBack: setWhiteHeader
});

// image showing from 0 to 100% on scroll
gsap.from(".show-img", {
  scale: 0,
  opacity: 0,
  transformOrigin: "center center",
  duration: 1,           // 1 second smooth animation
  ease: "power1.out",    // smooth but fast
  scrollTrigger: {
    trigger: ".show-img",
    start: "top 99%",     // start as soon as image almost enters
    toggleActions: "play none none none"  
  }
});


// random colors of container
const colours = ["#fff", "#acf7ff", "#ebfeff", "#8fa3b4", "#0e1701"];
const containers = document.querySelectorAll(".first-img");

// Animate containers moving left one by one
gsap.fromTo(containers,{x:200}, {
  x: 0, // Move left by 100px (you can adjust this)
  duration: 1,
  stagger: 0.2, // delay between each container
  ease: "power2.inOut",
//  repeat: -1,    loop forever
  // yoyo: true    // come back smoothly
});

// Handle color change on hover
containers.forEach((container) => {
  const tl = gsap.timeline({ paused: true, repeat: -1, yoyo: true });

  tl.to(container, {
    backgroundColor: () => colours[Math.floor(Math.random() * colours.length)],
    duration: 0.6,
    ease: "power3.inOut",
  });

  container.addEventListener("mouseenter", () => tl.play());
  container.addEventListener("mouseleave", () => tl.pause(0)); // reset color when mouse leaves
});



