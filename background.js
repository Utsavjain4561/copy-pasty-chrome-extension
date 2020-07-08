console.log("Background is running")
let clipboard=[];
// Lsitener to recieve message from content script
let index = 0;
chrome.storage.onChanged.addListener(()=>{
    console.log("Storage is changed");
    chrome.storage.local.get(['word'],(text)=>{
        clipboard.push(text.word);
        
    });
    console.log(clipboard);

})


// Lsitener to recieve message from content script
chrome.commands.onCommand.addListener(function(command) {
  console.log('onCommand event received for message: ', command);
  console.log(index);
  console.log(clipboard[index]);
  index = (index+1)%clipboard.length;
});



