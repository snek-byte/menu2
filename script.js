// Get elements from DOM
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const menuOverlay = document.querySelector("#menu-overlay");
const navItems = Array.from(document.querySelectorAll(".menu-item"));
const submenus = Array.from(document.querySelectorAll(".submenu"));

// Create a Map to store the visibility state of each submenu
const submenuVisible = new Map(submenus.map(submenu => [submenu, false]));

// Function to open the menu
function openMenu() {
  menuOverlay.style.display = "block";
  gsap.fromTo(
    navItems,
    { x: "-100%", autoAlpha: 0 },
    { x: "0", duration: 0.5, stagger: 0.2, autoAlpha: 1 }
  );
}

// Function to close the menu
function closeMenu() {
  gsap.to(navItems, { x: "-100%", duration: 0.5, autoAlpha: 0 }).then(() => {
    menuOverlay.style.display = "none";
    submenus.forEach((submenu) => {
      gsap.set(submenu, { x: "-100%", autoAlpha: 0 });
      submenuVisible.set(submenu, false);  // Reset the visibility state
    });
  });
}

// Event listeners for the menu button and the close button
menuBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);

// Event listeners for the main menu items
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    const submenu = item.querySelector(".submenu");
    // Toggle submenu visibility based on its current state
    if (submenuVisible.get(submenu)) {
      gsap.to(submenu, { x: "-100%", duration: 0.5, autoAlpha: 0 });
      submenuVisible.set(submenu, false);
    } else {
      gsap.to(submenu, { x: "0", duration: 0.5, autoAlpha: 1 });
      submenuVisible.set(submenu, true);
    }
    e.stopPropagation();
  });
});

// Event listener for the overlay to close submenus
menuOverlay.addEventListener("click", () => {
  submenus.forEach((submenu) => {
    gsap.to(submenu, { x: "-100%", duration: 0.5, autoAlpha: 0 });
    submenuVisible.set(submenu, false);  // Reset the visibility state
  });
});
