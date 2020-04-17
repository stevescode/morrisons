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

    // let's get a refresh going to keep checking for changes and running this script
    const freq = 15000; // 15 seconds
    setTimeout(function(){ location.reload(); }, freq);

    // reduce size of document being worked with
    var content = document.getElementById('content');

    // this gives every unordered list containing list items in the content div
    var listItems = content.querySelectorAll('ul>li');

    console.log(listItems);

    // 22 slots on screen - let's record what's happening first
    let availableSlots = 0;
    let unavailableSlots = 0;
    var curr = Date.now();

    for (let i = listItems.length -1; i >= 0; i--) {
        
        if (listItems[i].innerHTML.includes("Unavail")) {
            unavailableSlots = unavailableSlots + 1;
        }

        else if (listItems[i].innerHTML.includes("selectDeliveryTime")) {
            availableSlots = availableSlots + 1;
        }

    }

    if ( availableSlots >= 0 ) {
        GM_setValue(curr, "Available Slots: " + availableSlots);
    }

    // let's iterate through the Nodelist in reverse length minus 1 because index starts at zero
    // currently minus 14 because we only want to book something within the next 9 days
    // we're driving in reverse because we want the click logic to start from the furthest slot out
    for (let i = listItems.length -10; i >= 0; i--) {

        // this pulls out the delivery slots that are unavailable and highlights them red on screen
        if (listItems[i].innerHTML.includes("Unavail")) {
            console.log(listItems[i]);
            listItems[i].style.backgroundColor = "red";
        }

        // this pulls out the delivery slots that are available and clicks to the next page
        else if (listItems[i].innerHTML.includes("selectDeliveryTime")) {
            console.log(listItems[i]);
            listItems[i].style.backgroundColor = "green";
            
            // this'll click the first avaiable slot it finds
            listItems[i].querySelector("a").click();
        }
    }

})();
