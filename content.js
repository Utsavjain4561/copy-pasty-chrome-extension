console.log("copy-pasty-chrome-extension");

// Listener will trigger at CTRL+C or mouse copy event
document.addEventListener('copy',function(event){
    console.log("Content copied");

    //Add selected data to the clipboard
    let selectedWord = window.getSelection().toString();
    event.clipboardData.setData('text/plain',selectedWord);
    event.preventDefault();
    chrome.runtime.sendMessage({
        event:"copy",
        message:selectedWord
    });
    
})  


