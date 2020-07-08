console.log("Background is running")
let index = 0;
// Lsitener to recieve message from content script
chrome.commands.onCommand.addListener(function(command) {
  chrome.storage.local.get(['list'],function(result){
    	console.log('hello');
    	let localLists = result.list;
    	console.log(localLists);
    	index = (index+1)%localLists.length;
    		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: "send_key_release","index":index}, function() {
    	console.log("done!");
    	return true;
    });  
    return true;
});
    		return true;
    });
  return true;
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

