/*
Project: FCC Build a Random Quote Machine
File Name: app-jq.js
Date: 05/02/2017
Programmer: James Perrin
REF: https://www.freecodecamp.com/challenges/build-a-random-quote-machine
*/

// Service to retrieve quote from Mashape.com API
var ServiceMashape = (function () {
    "use strict";

    function getQuote(done, fail) {
        $.ajax({
            url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-Mashape-Key", "KUQMDIvEi6mshYLdBtps8CIxTdsvp111rnhjsnCvUeXWkcgSNr");
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.setRequestHeader("Accept", "application/json");
                xhr.overrideMimeType("application/json; charset=utf-8");
            },
            method: "POST",
            cache: false
        }).done(done).fail(fail);
    }

    return {
        GetQuote: getQuote
    };
}());

//============================================================================================
// JS Singleton Pattern IIFE
// Ref: http://www.codeproject.com/Articles/819565/Javascript-design-patterns-and-IIFE
//============================================================================================
var AppController = (function (svc) {
    "use strict";

    function doneMashapeJq(data) {
        //console.log(data);
        var quoteH2 = $("#quote")
        var authorSpan = $("#author");
        quoteH2.text(data.quote);
        authorSpan.text(data.author);
    }

    function fail() {
        toastr["error"]("Something failed!");
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Exposed Public
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    function init() {

        $("#GetNewQuote").on("click keypress", function (e) {
            svc.GetQuote(doneMashapeJq, fail);
        });

        $("#GetNewQuote").trigger("click");

        $("#Tweet").on("click keypress", function () {
            var quoteH2 = $("#quote")
            var authorSpan = $("#author");
            var quote = quoteH2.text().trim();
            var author = " ~ " + authorSpan.text().trim();
            var strWindowFeatures = "location=yes,left=75%,top=25%,height=400,width=700,scrollbars=yes,status=yes";

            var tweetUrl = 'https://twitter.com/intent/tweet?text=' + quote + author;

            var windowName = "TWEET WINDOW";

            window.open(tweetUrl, "", strWindowFeatures);
        });
    }

    return {
        init: init
    };
}(ServiceMashape));

// jQuery Ready event
$(function () {
    "use strict";

    AppController.init();
});
