var header = {
    fixedHeader: function () {
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            if (scroll > 120) {
                $('.catalog-toggle-block').addClass('fixed fade-in')
            } else {
                $('.catalog-toggle-block').removeClass('fixed fade-in')
            }
        });
    }
};

$(document).ready(function () {

// --------- hide product items on the Home page---------
    function hideProductsList(itemsNumber) {
        $('.grid-block article').slice(0, itemsNumber).show();
        $('.moreCaWrap').on('click', function (e) {
            e.preventDefault();
            $('.grid-block article:hidden').slice(0, itemsNumber).slideDown();
            if ($('.grid-block article:hidden').length == 0) {
                $('.moreCaWrap').hide();
            }
        });
    }

    function setupProductsList() {
        if ($(window).width() >= 1200) {
            hideProductsList(10)
        } else if ($(window).width() < 1200 && $(window).width() > 992) {
            hideProductsList(8)
        } else if ($(window).width() < 992 && $(window).width() > 767) {
            hideProductsList(6)
        } else if ($(window).width() <= 767) {
            hideProductsList(4)
        }
    }
    // --------- hide product items on the Home page (end)---------

    $(".open-form-btn").click(function () {
        $('.searchInput').toggleClass("opened")
    });

    $(".inner_menu_btn").each(function () {
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
        setupProductsList();
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
        } else {
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
        $('.leaflet-marker-pane img').attr("src", "../images/map_marker.png");
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
    catalog.sortedOptions(browserW);
    catalog.closeSortedOption();
    catalog.filtersToggle();
    header.fixedHeader(browserW);

    browserW.trigger('resize');

    $('.slider').slick({
        autoplay: true,
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'ease-in-out',
        arrows: false,
    });

    $('.bigBanner_slider').slick({
        autoplay: true,
        fade: true,
        dots: true,
        infinite: true,
        speed: 500,
        cssEase: 'ease-in-out',
        arrows: false,
    });


    findActiveMenuItemOnLoad();

    function findActiveMenuItemOnLoad() {
        $('.menuInner__item.activeItem').parent().css("display", "block");
        $('.menuInner__item.activeItem').parent().siblings('.inner_menu_btn').addClass('opened')
    }

    // ======FORM SETUP=======

    $.validator.setDefaults({
        debug: true,
        success: "valid"
    });

    $.validator.addMethod("lettersonly", function (value, element) {
        var notEmptyInput = value.replace(/\s/g, '').length > 0;
        return this.optional(element) || (/^[a-zA-Zа-яА-Я ]*$/i.test(value) && notEmptyInput);
    });

    $('#orderForm').validate({
        rules: {
            name: {lettersonly: true},
            tel: {
                digits: true,
                required: true
            },
            email: {email: true}
        }, messages: {
            name: "Неправильный формат. Только буквы",
            tel: "Неправильный формат. Только цифры",
            email: "Неправильный формат"
        },
    });

    $('#orderForm input').bind('keyup', function () {
        if ($('#orderForm').validate().checkForm()) {
            $('#submit-btn').attr('disabled', false);
        } else {
            $('#submit-btn').attr('disabled', true);
        }
    });
    $("#orderForm").on("submit", function () {
        $('.info-message').fadeIn();

        $('#submit-btn').attr('disabled', true);
        return false;
    });

    $('#formModal').on('hide.bs.modal', function (e) {
        $('.info-message').hide();
        $('#orderForm')[0].reset();
        $('#orderForm').validate().destroy();
    });
    // ======FORM SETUP END=======


});

