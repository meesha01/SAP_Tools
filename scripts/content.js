/*
    This is the that script runs inside the actual webpage, and has access to it's DOM
    See https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts
    
    Author: meer.shah@actico.com
*/

/*
    TODO / Suggestions:
    - Use Nullish coalescing ??
    - Storage API, IndexedDB
*/

const DURATION_INPUT_ID = "__input0-inner";

console.log("Content script loaded");

// Listen for messages from the popup:
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Message received from popup: " + request);
        
        // Fill the form:
        const isFormFilled = fillForm(request.formData);
        sendResponse(isFormFilled);
    }
);

function fillForm(formData){
    const durationInput = document.getElementById(DURATION_INPUT_ID);

    if(durationInput){
        durationInput.value = formData.duration;
        return true;
    }
    else{
        console.log("Element not found: " + DURATION_INPUT_ID);
        return false;
    }
}