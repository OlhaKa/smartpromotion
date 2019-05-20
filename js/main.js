var header = {
    toggleHeaderMenu: function () {
        $('.menuToggleBtn').on('click', function () {
            $('.slideMobBlock').slideToggle('slow');
            if ($('.slideMobBlock').css('display') === 'block') {
                $('.header').removeClass('openedSubmenu')
            };
            $(".inner_menu_btn").each(function(){
                if ($(this).siblings('.menuInner').css('display') === 'block') {
                $(this).siblings('.menuInner').slideToggle('slow');
                $(this).toggleClass('opened');
            }
        });
            $(".sub_menu_btn").each(function(){
                if ($(this).siblings('.subMenu').css('display') === 'block') {
                    $(this).siblings('.subMenu').slideToggle('slow');
                    $(this).toggleClass('opened');
                }
            });

        });
    },


    scrollHeaderMenu: function () {
        $(".inner_menu_btn, .sub_menu_btn").on("click", function () {
            setTimeout(function () {
                var headerHeight = $(".header__bottom").height() + $(".slideMobBlock").height();
                if ((headerHeight) > $(window).height()) {
                    $(".header").addClass("openedSubmenu");
                } else {
                    $(".header").removeClass("openedSubmenu");
                }
            }, 500)
        })
    },

    insertHeaderTop: function (browserW) {
        browserW.on('resize', function () {
            if (browserW.width() > 998) {
                $('.header__top').insertBefore('.header__bottom');
            }
        });
    },

    fixedHeader: function () {

        var stickyOffset = $('.slideMobBlock').offset().top;

        $(window).scroll(function () {

            var sticky = $('.slideMobBlock'),
                scroll = $(window).scrollTop();

            if (scroll >= (stickyOffset)) {
                sticky.addClass('sticky').removeClass('open');
            } else {
                sticky.removeClass('sticky');
            }
        });
    }
};

getMenuMiddle();
function getMenuMiddle() {
    var halfMenuItems = Math.ceil($('.header__nav .menu .menu__item').length / 2);
    var elems = $('.header__nav .menu').children();

    $.each(elems, function (index) {
        if (index > halfMenuItems) {
            $(this).addClass('rightSide')
        }
    });
}

hideMenuArrows();
function hideMenuArrows() {
    var menuItems = $('.header__nav .menu').children();
    $.each(menuItems, function () {
        if ($(this).children(".menuInner").length) {
            $(this).addClass('withSubmenu')
        }
    });
    var menuInnerItems = $('.header__nav .menuInner').children();
    $.each(menuInnerItems, function () {
        if ($(this).children(".subMenu").length) {
            $(this).addClass('withSubmenu')
        }
    });

}

toggleMobileInnerMenu();
function toggleMobileInnerMenu() {
    $(".inner_menu_btn").on('click', function () {
        $(this).siblings('.menuInner').slideToggle('slow');
        $(this).toggleClass('opened');
    })
}

toggleMobileSubMenu();
function toggleMobileSubMenu() {
    $(".sub_menu_btn").on('click', function () {
        $(this).siblings('.subMenu').slideToggle('slow');
        $(this).toggleClass('opened');
    })
}


// -------POPOVERS SETUP--------
$(window).on("load", function () {
    if ($(window).width() < 960) {
        $('[data-toggle="popover"]').popover({
            trigger: 'manual',
        }).click(function () {
            $(this).popover('show');
        })
    }
    else {
        $('[data-toggle="popover"]').popover({
            trigger: 'manual',
        }).hover(function () {
            $(this).popover('show');
        });

    }
});

// -----HIDE POPOVERS BY CLICK OUTSIDE------
$(document).on('click', function (e) {
    $('[data-toggle="popover"],[data-original-title]').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            (($(this).popover('hide').data('bs.popover') || {}).inState || {}).click = false
        }
    });
});

$(".filter-show-btn .text_wrap").click(function () {
    $(".catalog__filter").toggleClass('show')
});

setTimeout(function () {
    $('.leaflet-marker-pane img').attr("src","../images/map_marker.png");
}, 700);



// ------ACTIVE MENU ITEM--submenu opened-------
activeNavMenuStyle();
function activeNavMenuStyle() {
    $(".menuInner").hover(
        function () {
            $(this).siblings('a').addClass('hovered')
        }
    );
    $(".menuInner").mouseleave(
        function () {
            $(this).siblings('a').removeClass('hovered')
        }
    );
}

$('.thumbnailSlider').slick({
    slidesToShow: 4,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

$('.slickFor').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slickFor',
    centerMode: true,
    focusOnSelect: true,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2
            }
        }
    ]
});

var catalog = {
    sortedOptions: function () {
        $('.j-sorted').on('click', function () {
            $('.checkBoxWrap').addClass('open');
            $('.filters').removeClass('open');
            $('html,body').animate({ scrollTop: 0 }, 'slow');
        });
        $('.toggleOption').on('click', function () {
            $('.filters').addClass('open');
            $('.checkBoxWrap').removeClass('open');
            $('html,body').animate({ scrollTop: 0 }, 'slow');
        })
    },
    closeSortedOption: function () {
        $('.closeBtnCross').on('click', function () {
            $('.checkBoxWrap').removeClass('open');
            $('.filters').removeClass('open');
        })
    },
    filtersToggle: function () {
        var filterItem = $('.filtersItem');
        filterItem.children('.filtersItem__inner').hide();
        filterItem.first().children('.filtersItem__inner').slideDown();
        filterItem.first().addClass('open');
        $('.filtersItem__title').on('click', function () {
            $(this).closest('.filtersItem').toggleClass('open');
            $(this).closest('.filtersItem').children('.filtersItem__inner').slideToggle();
        });
    },

};

$(function () {
    var browserW = $(window);
    header.toggleHeaderMenu();
    header.scrollHeaderMenu();
    header.insertHeaderTop(browserW);
    catalog.sortedOptions(browserW);
    catalog.closeSortedOption();
    catalog.filtersToggle();
    if (browserW.width() > 991) {
        header.fixedHeader(browserW);
    }

    browserW.trigger('resize');

    $('.slider').slick({
        autoplay: true,
        dots: false,
        infinite: true,
        speed: 500,
        cssEase: 'ease-in-out',
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
    });

    $('.bigBanner_slider').slick({
        autoplay: true,
        dots: true,
        infinite: true,
        speed: 500,
        cssEase: 'ease-in-out',
        prevArrow: $('.prev_btn'),
        nextArrow: $('.next_btn'),
    });
});

