console.log("Background is running")
let copiedData=[];
const  getClipboardContent=()=>{
    let backgroundPage =chrome.extension.getBackgroundPage();
    backgroundPage.document.body.innerHTML="";
    let helperDiv = backgroundPage.document.createElement("div");
    document.body.appendChild(helperDiv);
    helperDiv.contentEditable = true;

    let range = document.createRange();
    range.selectNode(helperDiv);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    helperDiv.focus();

    backgroundPage.document.execCommand("Paste");
    return helperDiv.innerHTML;
}
chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
    
})
// Lsitener to recieve message from content script
chrome.runtime.onMessage.addListener(recieveText);
function recieveText(req,send,res){
    const {event} = req;
    if(event==='copy'){
        //store the message in the global list
       
        copiedData.push(getClipboardContent());
    }
    console.log("Copied Data is ",copiedData)
}
