chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.todo == "getURL")
    {
        chrome.tabs.query({active:true,currentWindow: true}, function(tabs){
            chrome.storage.sync.set({"url": window.location.hostname}, function() {
                console.log('Value is set to ' + window.location.hostname);
              });
            
        });
    }
})