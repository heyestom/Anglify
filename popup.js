/* Update the relevant fields with the new data */
function setDOMInfo(info) {
    document.getElementById("count").textContent = info.count;

    // console.log(info.bad_words);
    // console.log(info.good_words);

    var bad_array = info.bad_words.split("\n");
    var good_array = info.good_words.split("\n");

    // console.log(bad_array);
    // console.log(good_array);
    var word_count = {};
    var good_word_count = {};

    var bad_word_set = new Array();
    var good_word_set = new Array();

    for (var i = 0; i < bad_array.length; i++) {
        bad_array[i] = bad_array[i].toLowerCase().replace(/\W/g, '');
        if (bad_array[i].length >= 1) {
            if (word_count[bad_array[i]] === undefined) {
                word_count[bad_array[i]] = 1;
                bad_word_set.push(bad_array[i]);

                good_array[i] = good_array[i].toLowerCase().replace(/\W/g, '');

                if (good_word_count[good_array[i]] === undefined) {
                    good_word_count[good_array[i]] = 1;
                    good_word_set.push(good_array[i].toLowerCase());
                }

            } else {
                word_count[bad_array[i]] += 1;
            }
        }
    };


    var content = "<tr><th>Replaced words</th><th>Displayed words</th><th>Count</th></tr>";
    for (var i = 0; i < bad_word_set.length; i++) {
        content += "<tr><td>" + bad_word_set[i] + "</td>" + "<td>" + good_word_set[i] + "</td><td>" + word_count[bad_word_set[i]] + "</td></tr>";
    };
    document.getElementById("content").innerHTML = content;
}

/* Once the DOM is ready... */
window.addEventListener("DOMContentLoaded", function() {

    $('#twitter_link').click(function(){

            var twitter_link = "https://twitter.com/ThomasHeyes";
            var background_page = chrome.extension.getBackgroundPage();
            console.log(background_page);
            background_page.open(twitter_link);

    })

    /* ...query for the active tab... */
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        /* ...and send a request for the DOM info... */
        chrome.tabs.sendMessage(
            tabs[0].id, {
                from: "popup",
                subject: "DOMInfo"
            },
            /* ...also specifying a callback to be called 
             *    from the receiving end (content script) */
            setDOMInfo);
    });

});