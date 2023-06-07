// Obtain elements from DOM
const menuButton = document.querySelector("#menu-btn");
const closeButton = document.querySelector("#close-btn");
const menuOverlay = document.querySelector("#menu-overlay");
const navItems = Array.from(document.querySelectorAll(".menu-item"));
const submenus = Array.from(document.querySelectorAll(".submenu"));

// Initialize a Map to save visibility status of each submenu
let submenuVisibility = new Map(submenus.map(submenu => [submenu, false]));

// Function to open the menu
function openMenu() {
  menuOverlay.style.display = "block";
  closeButton.style.display = "block"; // Display close button when menu is open

  // Animation
  gsap.fromTo(navItems, { x: "-100%", autoAlpha: 0 }, { x: "0", duration: 0.5, stagger: 0.2, autoAlpha: 1 });
}

// Function to close the menu
function closeMenu() {
  gsap.to(navItems, { x: "-100%", duration: 0.5, autoAlpha: 0 }).then(() => {
    menuOverlay.style.display = "none";
    closeButton.style.display = "none"; // Hide close button when menu is closed
    submenus.forEach((submenu) => {
      gsap.set(submenu, { x: "-100%", autoAlpha: 0 });
      submenuVisibility.set(submenu, false);  // Reset the visibility state
    });
  });
}

// Event listeners for the menu button and the close button
menuButton.addEventListener("click", openMenu);
closeButton.addEventListener("click", closeMenu);

// Event listeners for the main menu items
navItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    const submenu = item.querySelector(".submenu");
    if (submenuVisibility.get(submenu)) {
      gsap.to(submenu, { x: "-100%", duration: 0.5, autoAlpha: 0 });
      submenuVisibility.set(submenu, false);
    } else {
      gsap.to(submenu, { x: "0", duration: 0.5, autoAlpha: 1 });
      submenuVisibility.set(submenu, true);
    }
    event.stopPropagation();
  });
});

// Event listener for the overlay to close submenus
menuOverlay.addEventListener("click", () => {
  submenus.forEach((submenu) => {
    if (submenuVisibility.get(submenu)) {
      gsap.to(submenu, { x: "-100%", duration: 0.5, autoAlpha: 0 });
      submenuVisibility.set(submenu, false);  // Reset the visibility state
    }
  });
});
