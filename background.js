console.log("Background is running")
let copiedData=[];

// Lsitener to recieve message from content script
chrome.runtime.onMessage.addListener(recieveText);
function recieveText(req,send,res){
    const {event,message} = req;
    if(event==='copy'){
        //store the message in the global list
        copiedData.push(message);
    }
    console.log("Copied Data is ",copiedData)
}
