console.log("Background is running")
let index = 0;
// Lsitener to recieve message from content script
chrome.commands.onCommand.addListener(function(command) {
  chrome.storage.local.get(['list'],function(result){
    	console.log('hello');
    	console.log(result.list[index]);
    	index = (index+1)%result.list.length;
    });
});

// chrome.runtime.onMessage.addListener(recieveText);
// function recieveText(req,send,res){
//     const {event,message} = req;
//     if(event==='copy'){
//         //store the message in the global list
//         copiedData.push(message);
//         chrome.storage.local.set({'list':copiedData},function (argument) {
//         	console.log('message saved!');
//         });
//     }
//     console.log("Copied Data is ",copiedData)
// }

