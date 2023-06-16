$(document).ready(function () {
    $("li").click(function (e) {
        e.stopPropagation();

        var subMenu = $(this).children(".sub-menu");
        var otherSubMenus = $(this).siblings().children(".sub-menu:visible");

        if (subMenu.is(":visible")) {
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
            gsap.from(subMenu, { duration: 0.5, x: -100, autoAlpha: 0 });
        }

        if (otherSubMenus.length > 0) {
            gsap.to(otherSubMenus, {
                duration: 0.5,
                x: -100,
                autoAlpha: 0,
                onComplete: function () {
                    otherSubMenus.hide();
                    gsap.set(otherSubMenus, { clearProps: "all" });
                }
            });
        }
    });function toggleMenu(id) {
      var menu = document.getElementById(id);
      if (menu.className === 'sub-menu') {
        menu.className = 'sub-menu open';
      } else {
        menu.className = 'sub-menu';
      }
    }
});

 function toggleFlexbox(id) {
      var flexbox = document.getElementById(id);
      if (flexbox.dataset.open === 'true') {
        flexbox.dataset.open = 'false';
        flexbox.className = 'flexbox';
      } else {
        flexbox.dataset.open = 'true';
        flexbox.className = 'flexbox open';
      }
    }
