$(document).ready(function () {
  $("li").click(function (e) {
    e.stopPropagation();
    var subMenu = $(this).children(".sub-menu");
    if (subMenu.is(":visible")) {
      // Sublinks disappear to the left using GSAP
      gsap.to(subMenu, {
        duration: 0.5,
        x: -100,
        autoAlpha: 0,
        onComplete: function () {
          subMenu.hide();
          gsap.set(subMenu, { clearProps: "all" });
        }
      });
    } else {
      subMenu.show();
      // Sublinks appear using GSAP
      gsap.from(subMenu, { duration: 0.5, x: -100, autoAlpha: 0 });
    }
  });
});
function closeNav() {
    document.getElementById("menu").style.display = "none";
}
