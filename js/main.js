var header = {
    toggleHeaderMenu: function () {
        $('.menuToggleBtn').on('click', function () {
            $('.slideMobBlock').slideToggle('slow');
            $('.innerMenuContainer').slideUp();
        });
    },
    insertSearchBlock: function (browserW) {
        browserW.on('resize', function () {
            if (browserW.width() > 991) {
                $('.searchContent').insertAfter('.logo');
            } else {
                $('.searchContent').insertBefore('.header__nav');
            }
        });
    },
    insertHeaderTop: function (browserW) {
        browserW.on('resize', function () {
            if (browserW.width() > 991) {
                $('.header__top').insertBefore('.header__bottom');
            } else {
                $('.header__top').insertAfter('.header__nav');
            }
        });
    },

        menu: function (browserW) {
        browserW.on('resize', function () {
            // if (browserW.width() > 1199) {
            //     $('.menu__item ').hover(function () {
            //         $(this).closest('.slideMobBlock').toggleClass('shadow');
            //         $(this).children('.innerMenuContainer').stop().slideToggle(300);
            //     });
            // } else {
            //     $('.closeInnerMenu').on('click', function () {
            //         $(this).closest('.innerMenuContainer').slideUp();
            //     });
            //     $('.menu__item a').on('click', function () {
            //         $(this).siblings('.innerMenuContainer').slideDown();
            //     });
            // }
        });

    },
    fixedHeader: function () {

            var stickyOffset = $('.slideMobBlock').offset().top;

            $(window).scroll(function(){
                
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



// $('body').on('click', function (e) {
//     if ($('.slideMobBlock').hasClass('open') &&
//         e.target.className != 'menuToggleBtn' ) {
//             $('.slideMobBlock').removeClass('open')
//     }
// });


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
    $(".menu__item a").on('click', function () {
        $(this).siblings('.menuInner').slideToggle('slow');
    })
}

toggleMobileSubMenu();
function toggleMobileSubMenu() {
    $(".menuInner__item a").on('click', function () {
        $(this).siblings('.subMenu').slideToggle('slow');
    })
}


$('#more_tel_btn').popover({
    
});

// getElementsPrevPrice();
// function  getElementsPrevPrice() {
//     $('.previous_price').each (function () {
//         if (!$(this).text().trim().length) {
//             $(this).addClass("withoutPrice");
//         }
//     })
// }

var catalog = {
    sortedOptions: function () {
        $('.j-sorted').on('click', function () {
            $('.checkBoxWrap').addClass('open');
            $('.filters').removeClass('open');
            $('html,body').animate({scrollTop: 0}, 'slow');
        });
        $('.toggleOption').on('click', function () {
            $('.filters').addClass('open');
            $('.checkBoxWrap').removeClass('open');
            $('html,body').animate({scrollTop: 0}, 'slow');
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
    header.insertSearchBlock(browserW);
    header.insertHeaderTop(browserW);
    header.menu(browserW);

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
        dots: false,
        infinite: true,
        speed: 500,
        cssEase: 'ease-in-out',
        prevArrow: $('.prev_btn'),
        nextArrow: $('.next_btn'),
    });

     $("#slider-range").slider({
        range: true,
        min: 0,
        max: 300000,
        values: [75, 30000],
        slide: function (event, ui) {
            $("#amount").val(ui.values[0]);
            $("#amountMax").val(ui.values[1]);
        }
    });

    $("#amount").val($("#slider-range").slider("values", 0));
    $("#amountMax").val($("#slider-range").slider("values", 1));

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
});

