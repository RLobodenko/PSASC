(function ($) {
    //word counter
    $("#info").on('keyup', function() {
        if (this.value.length !== 0) {
            var words = this.value.match(/\S+/g).length;
        }
        else {
            words = 0;
        }
        if (words > 100) {
            // Split the string on first 100 words and rejoin on spaces
            let trimmed = $(this).val().split(/\s+/, 100).join(" ");
            // Add a space at the end to keep new typing making new words
            $(this).val(trimmed + " ");
        }
        else {
            $('#display_count').text(words);
        }
    });

    //bot checker
    const hiddenInput = $('input[name=bot_checker]');
    let key = Date.now().toString().slice(0, -3);
    setTimeout(function () {
        hiddenInput.val(key);
    }, 3000);

    //form
    $("#submit").click(function() {
        document.querySelector('#join').scrollIntoView({
            behavior: 'smooth'
        });
        const first_name   = $('input[name=first_name]').val();
        const last_name   = $('input[name=last_name]').val();
        const title   = $('input[name=title]').val();
        const email = $('input[name=email]').val();
        const organisation = $('input[name=organisation]').val();
        const country = $('select[name=country]').val();
        const info = $('textarea[name=info]').val();
        const key = $('input[name=bot_checker]').val();
        let agree = false;
        if ($('#agree').is(":checked")) {
            agree = true;
        }

        $.ajax({
            url: 'post.php',
            type: 'post',
            dataType: 'json',
            data: {
                'first_name':   first_name,
                'last_name':   last_name,
                'title': title,
                'email': email,
                'organisation': organisation,
                'country': country,
                'info': info,
                'agree': agree,
                'key' : key
            },
            success: function(data){
                document.querySelectorAll('.form-error').forEach((el) => {
                    el.parentNode.removeChild(el);
                })
                $.each(data.result, function( id, value ) {
                    if (id === 'success') {
                        document.querySelectorAll('input').forEach((el) => {
                            el.style.display = 'none';
                        })
                        document.querySelector('select').style.display = 'none';
                        document.querySelector('textarea').style.display = 'none';
                        document.querySelector('.input-wrapper .text').style.display = 'none';
                        document.querySelector('.counter').style.display = 'none';
                        document.querySelector('.checkbox').style.display = 'none';
                        $('#'+id).text(value);
                        $('#'+id).after('<div class="text-sent">Your info has been successfully sent</div><div class="text-contact">You can contact us at info@psasc.org<br>if you need additional assistance</div>');
                    } else {
                        $('#' + id).after('<div class="form-error">' + value + '</div>');
                    }
                });
            }
        });
    });
})(jQuery);

const header = document.querySelector('header');

let section_home = document.querySelector('#home');
let section_about = document.querySelector('#about');
let section_join = document.querySelector('section.join');
let section_summit = document.querySelector('#summit');
let section_agenda = document.querySelector('#agenda');
let section_contact = document.querySelector('#contact');

const header_home = document.querySelector('#header-home'),
    header_about = document.querySelector('#header-about'),
    header_join = document.querySelector('#header-join'),
    header_summit = document.querySelector('#header-summit'),
    header_agenda = document.querySelector('#header-agenda'),
    header_contact = document.querySelector('#header-contact'),
    header_links = document.querySelectorAll('nav li a');

const line_home = document.querySelector('#first'),
    line_about = document.querySelector('#second'),
    line_join = document.querySelector('#third'),
    line_summit = document.querySelector('#fourth'),
    line_agenda = document.querySelector('#fifth'),
    line_contact = document.querySelector('#sixth'),
    lines = document.querySelectorAll('#navigation_lines .line');

let about_top,
    join_top,
    summit_top,
    agenda_top,
    contact_top,
    loaded = false;

window.onload = function() {
    about_top = section_about.offsetTop;
    join_top = section_join.offsetTop + 100;
    summit_top = section_summit.offsetTop;
    agenda_top = section_agenda.offsetTop;
    contact_top = section_contact.offsetTop;
    loaded = true;

    setActive();

    let menu_button = document.querySelector('#menu-icon');
    let nav = document.querySelector('nav');
    let navLinks = document.querySelectorAll('nav a');
    let isMenuExpanded = false;

    menu_button.addEventListener('click', function() {
        if (isMenuExpanded) {
            isMenuExpanded = false;
            menu_button.classList.remove('cross');
            nav.style.display = 'none';
            document.querySelector('body').style.overflow = 'unset';
        } else {
            isMenuExpanded = true;
            menu_button.classList.add('cross'); 
            nav.style.display = 'block';
            document.querySelector('body').style.overflow = 'hidden';
        }
    })

    if (window.innerWidth <= 768) {
        navLinks.forEach((el) => el.addEventListener('click', function() {
            quitMobileMenu()
        }))
    } else {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
        
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        navLinks.forEach((el) => el.removeEventListener('click', function() {
            quitMobileMenu()
        }))
    }

    function quitMobileMenu() {
        menu_button.classList.remove('cross');
        nav.style.display = 'none';
        isMenuExpanded = false;
        document.querySelector('body').style.overflow = 'unset';
    }
}

document.onscroll = function() {
    let position = window.scrollY;
    position += 50;
    
    if (position <= 50) {
        header.classList.remove('scroll');
    } else {
        header.classList.add('scroll');
    }

    activateLinks(position);
}

function setActive() {
    let position = window.scrollY;
    position += 50;

    if (position <= 50) {
        header.classList.remove('scroll');
    } else {
        header.classList.add('scroll');
    }

    activateLinks(position);
}

function activateLinks(position) {
    let contact_new = window.innerHeight - section_contact.getBoundingClientRect().top;

    if (position) {
        if (position <= about_top) {
            removeActive();
            header_home.classList.add('active');
            line_home.classList.add('active');
        } else if ((position > about_top) && (position <= join_top)) {
            removeActive();
            header_about.classList.add('active');
            line_about.classList.add('active');
        } else if ((position > join_top) && (position <= summit_top)) {
            removeActive();
            header_join.classList.add('active');
            line_join.classList.add('active');
        } else if ((position > summit_top) && (position <= agenda_top)) {
            removeActive();
            header_summit.classList.add('active');
            line_summit.classList.add('active');
        } else if ((position > agenda_top) && (contact_new <= 90)) {
            removeActive();
            header_agenda.classList.add('active');
            line_agenda.classList.add('active');
        } else if (contact_new >= 90) {
            removeActive();
            header_contact.classList.add('active');
            line_contact.classList.add('active');
            lines.forEach((el) => el.classList.add('white'));
        }
    }
}

function removeActive() {
    header_links.forEach((el) => el.classList.remove('active'));
    lines.forEach((el) => el.classList.remove('active'));
    lines.forEach((el) => el.classList.remove('white'));
}