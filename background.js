console.log("Background is running")
let copiedData=[];

// Lsitener to recieve message from content script
let index = 0;
// Lsitener to recieve message from content script
chrome.commands.onCommand.addListener(function(command) {
  console.log('onCommand event received for message: ', command);
  console.log(index);
  console.log(copiedData[index]);
  index = (index+1)%copiedData.length;
});

chrome.runtime.onMessage.addListener(recieveText);
function recieveText(req,send,res){
    const {event,message} = req;
    if(event==='copy'){
        //store the message in the global list
        copiedData.push(message);
    }
    console.log("Copied Data is ",copiedData)
}

