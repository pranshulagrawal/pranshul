!(function (o) {
  "use strict";
  var e = {
    root: o(":root"),
    init: function () {
      e.BgImg(),
        e.imgToSVG(),
        e.rightPanelScroll(),
        e.rightNav(),
        e.tabs(),
        e.progress(),
        e.cursor(),
        e.portfolioCarousel(),
        e.testimonialCarousel(),
        e.loadBlogPosts(),
        e.movingPlaceholder(),
        e.contactForm(),
        e.scrollToAnchor(),
        e.pageWidthAnimation(),
        e.modal(),
        e.typed();
    },
    typed: function () {
      o(".animated_title").each(function () {
        var e = o(this),
          t = e.find(".title_in");
        if ("" !== t) {
          var n = [];
          t.each(function () {
            n.push(o(this).text());
          }),
            e.typed({
              strings: n,
              loop: !0,
              smartBackspace: !1,
              typeSpeed: 40,
              startDelay: 700,
              backDelay: 3e3,
            });
        }
      });
    },
    modal: function () {
      var e = this,
        t = o(".resumo_fn_modalbox"),
        n = o(".modal_item"),
        a = t.find(".closer,.extra_closer"),
        s = t.find(".fn__nav");
      t
        .find(".extra_closer")
        .on("mouseenter", function () {
          t.addClass("hovered");
        })
        .on("mouseleave", function () {
          t.removeClass("hovered");
        }),
        n.on("click", function () {
          var n = o(this),
            a = n.find(".fn__hidden").html(),
            r = n.closest(".modal_items"),
            i = n.attr("data-index"),
            l = r.attr("data-from");
          return (
            s.attr("data-index", i),
            s.attr("data-from", l),
            o("body").addClass("modal"),
            t.addClass("opened"),
            t.find(".modal_in").html(a),
            e.modal_prevnext(s, t),
            e.imgToSVG(),
            e.BgImg(),
            !1
          );
        }),
        e.modal_prevnext(s, t),
        a.on("click", function () {
          return (
            t.removeClass("opened hovered"),
            t.find(".modal_in").html(""),
            o("body").removeClass("modal"),
            !1
          );
        });
    },
    modal_prevnext: function (e, t) {
      var n = this;
      e.find("a")
        .off()
        .on("click", function () {
          var a = o(this),
            s = e.attr("data-from"),
            r = parseInt(e.attr("data-index")),
            i = o('.modal_items[data-from="' + s + '"]'),
            l = parseInt(i.attr("data-count"));
          a.hasClass("prev") ? r-- : r++, r < 1 && (r = l), r > l && (r = 1);
          var c = i
            .find('.modal_item[data-index="' + r + '"] .fn__hidden')
            .html();
          return (
            e.removeClass("disabled"),
            e.attr("data-index", r),
            setTimeout(function () {
              t.find(".modal_in").fadeOut(500, function () {
                o(this).html("").html(c).fadeIn(500);
              });
            }, 500),
            o(".resumo_fn_modalbox .modal_content")
              .stop()
              .animate({ scrollTop: 0 }, 500, "swing"),
            n.modal_prevnext(e, t),
            n.imgToSVG(),
            n.BgImg(),
            !1
          );
        });
    },
    scrollToAnchor: function () {
      o('a[href^="#"]')
        .not('[href="#"]')
        .not('[href^="#tab"]')
        .on("click", function () {
          var e = o(this),
            t = o(e.attr("href"));
          if (t.length)
            return (
              o("html, body").animate({ scrollTop: t.offset().top }, 1e3),
              o("#nav ul li").css({ transitionDelay: "0ms" }),
              o(".resumo_fn_wrapper").removeClass("nav-opened nav-hover-close"),
              o(".resumo_fn_navigation .nav_footer").removeClass("ready"),
              !1
            );
        }),
        o(".resumo_fn_totop").on("click", function () {
          o("html, body").animate({ scrollTop: 0 }, 1500);
        });
    },
    pageWidthAnimation: function () {
      e.changeWidth(),
        o(window).on("scroll", function () {
          e.changeWidth();
        });
    },
    changeWidth: function () {
      var t = o(window).scrollTop(),
        n = 0;
      t > 0 && !o("body").hasClass("scrolled")
        ? (o("body").addClass("scrolled"), n++)
        : 0 === t &&
          o("body").hasClass("scrolled") &&
          (o("body").removeClass("scrolled"), n++),
        n > 0 &&
          setTimeout(function () {
            e.portfolioCarousel(), e.testimonialCarousel();
          }, 500);
    },
    contactForm: function () {
      o("#send_message").on("click", function (event) {
        event.preventDefault(); // Prevent default form submission

        var e = o(".resumo_fn_contact .contact_form"),
          t = o("#name").val(),
          n = o("#email").val(),
          a = o("#message").val(),
          s = o("#phone").val(),
          r = e.find(".success"),
          i = r.data("success"),
          l = e.attr("action");

        r.empty(); // Clear previous messages

        // Validate form fields
        if ("" === t || "" === n || "" === a) {
          o(".empty_notice").slideDown(500).delay(2000).slideUp(500);
          return false;
        }

        // Submit the form using the Fetch API
        const formData = new FormData(e[0]);

        fetch(l, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((text) => {
            if (text.toLowerCase().includes("success")) {
              r.append("<span class='contact_success'>" + i + "</span>");
              r.slideDown(500).delay(4000).slideUp(500);
              e[0].reset(); // Reset the form fields
            } else {
              r.append(
                "<span class='contact_error'>There was an error.</span>"
              );
              r.slideDown(500).delay(4000).slideUp(500);
            }
          })
          .catch((error) => {
            r.append(
              "<span class='contact_error'>There was a technical error.</span>"
            );
            r.slideDown(500).delay(4000).slideUp(500);
            console.error("Error:", error);
          });

        return false;
      });
    },

    movingPlaceholder: function () {
      o(".resumo_fn_contact .input_wrapper").each(function () {
        var e = o(this),
          t = e.find("input, textarea");
        "" === t.val() && e.removeClass("active"),
          t
            .on("focus", function () {
              e.addClass("active");
            })
            .on("blur", function () {
              "" === t.val() && e.removeClass("active");
            });
      });
    },
    loadBlogPosts: function () {
      let loadedPosts = 6; // Number of initially visible posts
      const postsPerLoad = 6; // Number of posts to load on each click
      const posts = o(".resumo_fn_blog_list .be_animated"); // All posts
      const loadMoreButton = o(".resumo_fn_blog_list .load_more a"); // Load More link
      const buttonText = loadMoreButton.find(".text");

      // Set initial visibility: First 6 posts without classes, the rest with 'hidden'
      posts.slice(0, loadedPosts).removeClass("hidden visible be_animated");
      posts.slice(loadedPosts).addClass("hidden");

      loadMoreButton.on("click", function (event) {
        event.preventDefault(); // Prevent default link behavior

        if (
          loadMoreButton.hasClass("loading") ||
          loadMoreButton.hasClass("done")
        )
          return false;

        loadMoreButton.addClass("loading");

        setTimeout(function () {
          // Show the next set of posts by removing their classes
          const nextPosts = posts.slice(
            loadedPosts,
            loadedPosts + postsPerLoad
          );
          nextPosts.each(function () {
            o(this).removeClass("hidden visible be_animated");
          });

          // Update the count of loaded posts
          loadedPosts += postsPerLoad;

          // If all posts are loaded, update the button state
          if (loadedPosts >= posts.length) {
            loadMoreButton.addClass("done").removeClass("loading");
            buttonText.text(loadMoreButton.attr("data-done")); // Update link text to "Done"
          } else {
            loadMoreButton.removeClass("loading");
          }
        }, 1500);

        return false;
      });
    },

    testimonialCarousel: function () {
      o(".resumo_fn_testimonials .owl-carousel").each(function () {
        var e = o(this),
          t = e.closest(".resumo_fn_testimonials");
        e.owlCarousel({
          autoplay: !0,
          autoplayTimeout: 7e3,
          smartSpeed: 1e3,
          margin: 20,
          nav: !1,
          loop: !0,
          items: 1,
          dots: !1,
        }),
          e.trigger("refresh.owl.carousel"),
          e.on("changed.owl.carousel", function () {
            e.trigger("stop.owl.autoplay"), e.trigger("play.owl.autoplay");
          });
        var n = t.find(".my__nav .prev"),
          a = t.find(".my__nav .next");
        n.off().on("click", function () {
          return e.trigger("prev.owl"), !1;
        }),
          a.off().on("click", function () {
            return e.trigger("next.owl"), !1;
          });
      }),
        e.imgToSVG(),
        e.BgImg();
    },
    portfolioCarousel: function () {
      o("#portfolio .owl-carousel").each(function () {
        var e = o(this),
          t = e.closest("#portfolio");
        e.owlCarousel({
          autoplay: !0,
          autoplayTimeout: 7e3,
          smartSpeed: 1e3,
          margin: 20,
          nav: !1,
          loop: !0,
          autoWidth: !0,
          items: 4,
          dots: !1,
          responsive: {
            0: { autoWidth: !1, items: 1 },
            700: { autoWidth: !0, items: 4 },
          },
        }),
          e.trigger("refresh.owl.carousel"),
          e.on("changed.owl.carousel", function () {
            e.trigger("stop.owl.autoplay"), e.trigger("play.owl.autoplay");
          });
        var n = t.find(".my__nav .prev"),
          a = t.find(".my__nav .next");
        n.off().on("click", function () {
          return e.trigger("prev.owl"), !1;
        }),
          a.off().on("click", function () {
            return e.trigger("next.owl"), !1;
          });
      }),
        e.imgToSVG(),
        e.BgImg();
    },
    cursor: function () {
      if (o(".frenify-cursor").length) {
        const n = document.querySelector(".cursor-inner"),
          a = document.querySelector(".cursor-outer");
        var e = "a, input[type='submit'], .cursor-link, button, .modal_item",
          t = ".owl-carousel, .swiper-container, .cursor-link";
        (window.onmousemove = function (o) {
          (a.style.transform =
            "translate(" + o.clientX + "px, " + o.clientY + "px)"),
            (n.style.transform =
              "translate(" + o.clientX + "px, " + o.clientY + "px)"),
            o.clientY,
            o.clientX;
        }),
          o("body").on("mouseenter", e, function () {
            n.classList.add("cursor-hover"), a.classList.add("cursor-hover");
          }),
          o("body").on("mouseleave", e, function () {
            (o(this).is("a") && o(this).closest(".cursor-link").length) ||
              (n.classList.remove("cursor-hover"),
              a.classList.remove("cursor-hover"));
          }),
          (n.style.visibility = "visible"),
          (a.style.visibility = "visible"),
          o("body")
            .on("mouseenter", t, function () {
              n.classList.add("cursor-slider"),
                a.classList.add("cursor-slider");
            })
            .on("mouseleave", t, function () {
              n.classList.remove("cursor-slider"),
                a.classList.remove("cursor-slider");
            }),
          o("body")
            .on("mousedown", t, function () {
              n.classList.add("mouse-down"), a.classList.add("mouse-down");
            })
            .on("mouseup", t, function () {
              n.classList.remove("mouse-down"),
                a.classList.remove("mouse-down");
            }),
          o("body")
            .on("mouseenter", ".dark-section", function () {
              n.classList.add("dark"), a.classList.add("dark");
            })
            .on("mouseleave", ".dark-section", function () {
              n.classList.remove("dark"), a.classList.remove("dark");
            });
      }
    },
    progress: function () {
      o(".resumo_fn_progress_bar").each(function () {
        var t = o(this);
        t.waypoint({
          handler: function () {
            e.progressF(t);
          },
          offset: "90%",
        });
      });
    },
    progressF: function (e) {
      e.find(".progress_item").each(function (e) {
        var t = o(this),
          n = parseInt(t.data("value")),
          a = t.find(".progress_percent");
        t.find(".progress_bg").css({ width: n + "%" }),
          setTimeout(function () {
            t.addClass("open"), a.html(n + "%").css({ right: 100 - n + "%" });
          }, 500 * e);
      });
    },
    recallProgress: function (o) {
      o.find(".progress_bg").css({ width: "0%" }),
        o.find(".progress_percent").html("").css({ right: "100%" }),
        o.find(".progress_item").removeClass("open"),
        e.progress();
    },
    tabs: function () {
      o(".resumo_fn_tabs .tab_header a")
        .off()
        .on("click", function () {
          var t = o(this),
            n = t.parent(),
            a = t.closest(".resumo_fn_tabs");
          return (
            !n.hasClass("active") &&
            (n.siblings().removeClass("active"),
            a.find(".tab_content").children().removeClass("active"),
            n.addClass("active"),
            o(t.attr("href")).addClass("active"),
            e.recallProgress(a),
            !1)
          );
        });
    },
    rightNav: function () {
      var e = o(".resumo_fn_navigation .closer,.resumo_fn_nav_overlay"),
        t = o(".resumo_fn_nav_overlay"),
        n = o(".resumo_fn_right .menu_trigger"),
        a = o(".resumo_fn_wrapper"),
        s = o(".resumo_fn_navigation .nav_footer"),
        r = o("#nav ul li"),
        i = 200 * (r.length + 1) + 700;
      n.on("click", function () {
        return (
          a.addClass("nav-opened"),
          r.each(function (e, t) {
            o(t).css({ transitionDelay: 200 * e + 700 + "ms" });
          }),
          setTimeout(function () {
            s.addClass("ready");
          }, i),
          !1
        );
      }),
        e.on("click", function () {
          return (
            r.css({ transitionDelay: "0ms" }),
            a.removeClass("nav-opened nav-hover-close"),
            s.removeClass("ready"),
            !1
          );
        }),
        t
          .on("mouseenter", function () {
            a.addClass("nav-hover-close");
          })
          .on("mouseleave", function () {
            a.removeClass("nav-hover-close");
          });
    },
    rightPanelScroll: function () {
      var e = o(".resumo_fn_right .right_in"),
        t = o(".resumo_fn_navigation .nav_in"),
        n = o("#nav"),
        a = o(".resumo_fn_navigation .nav_footer");
      e.css({ height: o(window).height() }),
        n.css({ height: t.height() - a.outerHeight() }),
        o().niceScroll &&
          (e.niceScroll({
            touchbehavior: !1,
            cursorwidth: 0,
            autohidemode: !0,
            cursorborder: "0px solid #333",
          }),
          n.niceScroll({
            touchbehavior: !1,
            cursorwidth: 0,
            autohidemode: !0,
            cursorborder: "1px solid #333",
          }));
    },
    imgToSVG: function () {
      o("img.fn__svg").each(function () {
        var e = o(this),
          t = e.attr("class"),
          n = e.attr("src");
        o.get(
          n,
          function (n) {
            var a = o(n).find("svg");
            void 0 !== t && (a = a.attr("class", t + " replaced-svg")),
              e.replaceWith(a);
          },
          "xml"
        );
      });
    },
    BgImg: function () {
      o("*[data-bg-img]").each(function () {
        var e = o(this),
          t = e.attr("data-bg-img");
        void 0 !== t && e.css({ backgroundImage: "url(" + t + ")" });
      }),
        o("*[data-fn-bg-img]").each(function () {
          var e = o(this),
            t = e.attr("data-fn-bg-img");
          void 0 !== t && e.css({ backgroundImage: "url(" + t + ")" });
        });
    },
  };
  o(document).ready(function () {
    e.init();
  }),
    o(window).on("resize", function () {
      e.rightPanelScroll();
    }),
    o(window).on("load", function () {
      setTimeout(function () {}, 10);
    }),
    o(window).on("scroll", function () {});
})(jQuery);
