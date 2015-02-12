var tab_count_dict = {};
var count;
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    chrome.browserAction.setBadgeText({
        text: request.data.count
    });
    count = request.data.count;
    return false;
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    tab_count_dict[tabId] = count;
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    // how to fetch tab url using activeInfo.tabid
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        //alert("Sam");
        var tmp = tab_count_dict[activeInfo.tabId];
        //alert(tmp);
        //alert(activeInfo.tabId);
        if (tmp != undefined) {
            chrome.browserAction.setBadgeText({
                text: tmp
            });
        } else {
            chrome.browserAction.setBadgeText({
                text: ""
            });
        }
    });
});