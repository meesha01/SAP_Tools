/*
    Content script that runs inside the actual webpage, and has access to it's DOM
    Listens for messages from the popup and fills the form with the data received
    See https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts
    
    Author: meer.shah@actico.com
*/

/*
    TODO / Suggestions:
    - Use Nullish coalescing ??
    - Storage API, IndexedDB
*/

const DURATION_INPUT_ID = "__input0-inner";
const PROJECT_INPUT_ID = "application-Timerecording-display-component---ViewAddEntry--productInput-inner";

console.log("fillForm.js loaded");

// Listen for messages from the popup:
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.type !== "fillForm"){
            // Ignore messages that are not meant for this script
            return;
        }
        console.log("Message received from popup: " + request);

        // Fill the form:
        const isFormFilled = fillForm(request.formData);
        sendResponse(isFormFilled);
    }
);

function fillForm(formData){

    const focusEvent = new Event('focus');
    const blurEvent = new Event('blur');
    const fillField = (fieldId, value)=>{
        const field = document.getElementById(fieldId);
        if(field){
            field.value = value;
            field.dispatchEvent(focusEvent);
            field.dispatchEvent(blurEvent);
            return true;
        }
        else{
            console.log("Element not found: " + fieldId);
            return false;
        }
    };

    let isFormFilled = true;

    isFormFilled = isFormFilled && fillField(DURATION_INPUT_ID, formData.duration);
    isFormFilled = isFormFilled && fillField(PROJECT_INPUT_ID, formData.project);

    return isFormFilled;
}