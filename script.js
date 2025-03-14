// Detect mobile devices
const isMobile = window.matchMedia("(max-width: 768px)").matches;

// Custom Cursor Movement (Disable on mobile)
const cursor = document.querySelector(".cursor");
if (!isMobile) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Hide cursor after inactivity
    let cursorTimeout;
    window.addEventListener("mousemove", () => {
        cursor.style.display = "block";
        clearTimeout(cursorTimeout);
        cursorTimeout = setTimeout(() => cursor.style.display = "none", 2000);
    });

    // Hover Effect on Elements
    document.querySelectorAll(".panel, .project, .scroll-btn").forEach(item => {
        item.addEventListener("mouseenter", () => cursor.classList.add("hover"));
        item.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });
} else {
    // Hide cursor on mobile
    if (cursor) cursor.style.display = "none";
}

// ✅ Fix: Smooth Scroll for Navigation Links (Now Works Properly)
document.querySelectorAll('.nav-links a, .nav-links button').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1) || this.dataset.target;

        if (!targetId) {
            console.warn("No target ID found for:", this);
            return;
        }

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50, // Adjusting for navbar height
                behavior: 'smooth'
            });
        } else {
            console.warn("Section not found:", targetId);
        }
    });
});

// GSAP Animations (Adjust for Mobile)
gsap.registerPlugin(ScrollTrigger);
const fadeInDuration = isMobile ? 0.8 : 1.5;

// Fade-in effect on scroll
gsap.utils.toArray(".panel").forEach((panel) => {
    gsap.to(panel, {
        opacity: 1,
        duration: fadeInDuration,
        scrollTrigger: {
            trigger: panel,
            start: isMobile ? "top 90%" : "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// Parallax Effect Optimization (Disable for Mobile)
if (!isMobile) {
    gsap.utils.toArray([".home", ".about"]).forEach((section, i) => {
        gsap.to(section, {
            backgroundPositionY: `${50 + i * 10}%`,
            scrollTrigger: {
                trigger: section,
                scrub: 1
            }
        });
    });
}

// GSAP Animation for Hero Section
gsap.from(".hero-content", {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: "power2.out"
});

// Project Details Popup (Responsive)
function showProjectDetails(project) {
    const projectDetails = {
        strayPet: {
            title: "Stray Pet Adoption App",
            description: "A mobile application designed to help stray animals find homes. Users can browse pets, submit adoption requests, and receive real-time updates.",
            tools: "MIT App Inventor, Firebase, Canva"
        },
        feedbackSystem: {
            title: "Student Feedback System",
            description: "A web application for collecting and analyzing student feedback, improving the decision-making process for academic institutions.",
            tools: "PHP, JavaScript, MySQL"
        },
        ecommerce: {
            title: "E-Commerce Store",
            description: "An online shopping platform featuring user authentication, payment integration, and a secure backend for managing products and orders.",
            tools: "React, Node.js, MongoDB, Stripe API"
        }
    };

    if (!projectDetails[project]) {
        console.warn("Project not found:", project);
        return;
    }

    // Update the popup content
    document.getElementById("projectTitle").innerText = projectDetails[project].title;
    document.getElementById("projectDescription").innerText = projectDetails[project].description;
    document.getElementById("projectTools").innerText = projectDetails[project].tools;

    // Show the popup
    const popup = document.getElementById("projectDetails");
    popup.style.display = "flex";
}

// Close popup when clicking outside
document.addEventListener("click", (event) => {
    const popup = document.getElementById("projectDetails");
    const popupContent = document.querySelector(".popup-content");

    if (popup.style.display === "flex" && !popupContent.contains(event.target)) {
        popup.style.display = "none";
    }
});

// Mobile Navigation (Optional)
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {
    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Close menu after clicking a link
    navLinks.querySelectorAll("a, button").forEach(link => {
        link.addEventListener("click", () => navLinks.classList.remove("active"));
    });
}
