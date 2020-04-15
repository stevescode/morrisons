// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://groceries.morrisons.com/webshop/getAddressesForDelivery.do?improvedAccess=yes&checkout=yes
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    const freq = 15000; // frequency of refresh
    var listy = document.getElementsByTagName("span");
    var curr = Date.now();
    var notFound = 0;
    var found = 0;

    console.log(listy);
    setTimeout(function(){ location.reload(); }, freq);

    for (var i = 11; i < 32; i++) {
        console.log(listy[i].innerText);

        if (listy[i].innerText.includes("Unava")) {
            notFound = notFound + 1;
            listy[i].style.backgroundColor = "red";
        }
        else {
            found = found + 1;
            listy[i].style.backgroundColor = "green";
            listy[i].style.fontSize = "xx-large";
        }

    }

    if ( notFound > 0 ) {
        GM_setValue(curr, "Unavailable Slots: " + notFound);
    }

    if ( found > 0) {
        GM_setValue(curr, "Available Slots: " + found);
    }

})();
