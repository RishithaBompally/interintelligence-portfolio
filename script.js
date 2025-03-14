// Custom Cursor Movement
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});
// Smooth Scroll for Navigation Links
// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50, // Adjusting for navbar height
                behavior: 'smooth'
            });
        }
    });
});


// Hover Effect on Elements
document.querySelectorAll(".panel, .project, .scroll-btn").forEach(item => {
    item.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    item.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Fade-in effect on scroll
gsap.utils.toArray(".panel").forEach((panel) => {
    gsap.to(panel, {
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
            trigger: panel,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// Parallax Effect
gsap.utils.toArray([".home", ".about"]).forEach((section, i) => {
    gsap.to(section, {
        backgroundPositionY: `${50 + i * 10}%`,
        scrollTrigger: {
            trigger: section,
            scrub: 1
        }
    });
});
// GSAP Animation for Hero Section
gsap.from(".hero-content", {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: "power2.out"
});

window.addEventListener("scroll", () => {
    cursor.style.display = "block"; // Ensure cursor remains visible
});
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

    // Update the popup content
    document.getElementById("projectTitle").innerText = projectDetails[project].title;
    document.getElementById("projectDescription").innerText = projectDetails[project].description;
    document.getElementById("projectTools").innerText = projectDetails[project].tools;

    // Show the popup
    const popup = document.getElementById("projectDetails");
    popup.style.display = "flex";

    // Delay adding event listener to prevent immediate closing
    setTimeout(() => {
        document.addEventListener("click", closePopupOnClickOutside);
    }, 100);
}

function closePopup() {
    document.getElementById("projectDetails").style.display = "none";
    document.removeEventListener("click", closePopupOnClickOutside);
}

// Close when clicking outside the popup
function closePopupOnClickOutside(event) {
    const popup = document.getElementById("projectDetails");
    const popupContent = document.querySelector(".popup-content");

    if (popup.style.display === "flex" && !popupContent.contains(event.target)) {
        closePopup();
    }
}
