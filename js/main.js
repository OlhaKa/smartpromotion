var header = {
    fixedHeader: function () {
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            if (scroll > 120) {
                $('.catalog-toggle-block').addClass('fixed')
            } else {
                $('.catalog-toggle-block').removeClass('fixed')
            }
        });
    }
};

$(document).ready(function () {
    $(".inner_menu_btn").each(function() {
        if ($(this).siblings('.menuInner').css('display') === 'block') {
        }
    });
    function changeHeaderView() {
        if ($(window).width() < 992) {
            $('.header__top').insertAfter($('.menu-main-list'));
        }
    }
    $(window).on("load resize", function (e) {
        changeHeaderView();
    });

// ======MENU TOGGLE========
    $('#menu-toggler, .close-menu-btn').click(function () {
        $('.menu-content').slideToggle();
        $('.catalog-toggle-block').toggleClass('opened')
    });



    hideMenuArrows();
    function hideMenuArrows() {
        var menuItems = $('.menu-list .menu').children();
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

