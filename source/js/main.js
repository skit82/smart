"use strict";

(function () {
  var FOOTER_BUTTON_NUMBER = 0;
  var contactButton = document.querySelector(".contact__button");
  var popupForm = document.querySelector(".callform");
  var closePopup = document.querySelector(".callform__close");
  var popupLogin = popupForm.querySelector("[name=callform-login]");
  var popupPhone = popupForm.querySelector("[name=callform-tel]");
  var popupText = popupForm.querySelector("[name=callform-text]");
  var pageMask= document.querySelector(".mask");
  var footerButtons = document.querySelectorAll(".page-footer__button");
  var footerLists = document.querySelectorAll(".page-footer__list-hide");
  var body = document.querySelector("body");
  var footerButtonsArray = Array.prototype.slice.call(footerButtons);
  var footerListsArray = Array.prototype.slice.call(footerLists);
  var isStorageSupport = true;
  var storage = "";

  try {
    storage = localStorage.getItem("login");
  } catch (err) {
    isStorageSupport = false;
  }

  var addClass = function (element, selector) {
    element.classList.add(selector);
  };

  var removeClass = function (element, selector) {
    element.classList.remove(selector);
  };

  var toggleClass = function (element, selector) {
    element.classList.toggle(selector);
  };

  if (footerListsArray) {
    addClass(footerListsArray[FOOTER_BUTTON_NUMBER], "page-footer__list-disable");
    removeClass(footerButtonsArray[FOOTER_BUTTON_NUMBER], "page-footer__button--active");
  }

  if (contactButton) {
    contactButton.addEventListener("click", function () {
      addClass(popupForm, "callform__active");
      if (storage) {
        popupLogin.value = localStorage.getItem("login");
        popupPhone.value = localStorage.getItem("phone");
        popupText.value = localStorage.getItem("text");
      }
      popupLogin.focus();
      addClass(body, "body__overflow");
      addClass(pageMask, "mask-active");
    })
  }

  if (closePopup) {
    closePopup.addEventListener("click", function () {
      removeClass(popupForm, "callform__active");
      removeClass(body, "body__overflow");
      removeClass(pageMask, "mask-active");
    })

    document.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape") {
        removeClass(popupForm, "callform__active");
        removeClass(body, "body__overflow");
        removeClass(pageMask, "mask-active");
      }
    });
  }

  if (popupForm) {
    popupForm.addEventListener("submit", function () {
      if (isStorageSupport) {
        localStorage.setItem("login", popupLogin.value)
        localStorage.setItem("phone", popupPhone.value)
        localStorage.setItem("text", popupText.value)
      }
    });
  }

  if (footerButtons) {
    footerButtonsArray.forEach(function (button, i) {
      button.addEventListener("click", function () {
        toggleClass(button, "page-footer__button--active");
        toggleClass(footerListsArray[i], "page-footer__list-disable");
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      pageBody.classList.remove('overlay');
      headerMenu.classList.remove('main-nav--active');
      header.style.marginTop = '0';
      headerButton.classList.remove('page-header__button--active');
      headerButtonToggle.classList.remove('page-header__block--active');
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
})();
