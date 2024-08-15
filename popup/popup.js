document.getElementById("fillFormButton").addEventListener("click", fillForm);

function fillForm(){
    console.log("Jesh");

    // Send a message to the content script of the active tab
    (async () => {
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        const response = await chrome.tabs.sendMessage(tab.id, {formData: {duration: 1.5}});
        console.log("Response from the content script: " + response);
    })();
}