/*
    Content script that runs inside the actual webpage, and has access to it's DOM
    Injects UI elements to the SAP page
    See https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts
    
    Author: meer.shah@actico.com
*/

const TOOLBAR_ID = "__toolbar0";
const TIME_RECORDING_DIV_ID = "timerecording-content";

console.log("injectUI.js loaded");

function injectSaveTemplate(toolbar){
    //Check if this is the correct toolbar:
    const timeRecordingDiv = document.getElementById(TIME_RECORDING_DIV_ID);
    if(!timeRecordingDiv){
        console.log("Time recording div not found");
        return;
    }

    // Create the button:
    const saveTemplateButton = document.createElement("button");
    saveTemplateButton.id = "saveTemplateButton";
    saveTemplateButton.innerText = "Save Template";
    saveTemplateButton.onclick = saveTemplate;

    const saveButton = document.getElementById("__button2");
    console.log("Save button found: " + saveButton.id);
    saveButton.insertAdjacentElement('afterend', saveTemplateButton);
    console.log("Save Template button injected");
}

// Taken from https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

waitForElement('#'+TOOLBAR_ID).then((element) => {
    // Time recording div found
    console.log("Toolbar found. Proof: " + element.id);
    injectSaveTemplate(element);
});

function saveTemplate(){
    console.log("Save Template button clicked");
}