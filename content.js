let _previousData="";
let _maxListSize = 15;
let time_interval_set = undefined;
const readClipboardText = ()=>{
    console.log("Checking for clipboard changes.....");
    navigator.clipboard.readText()
    .then(clipboardText=>{
        if(clipboardText.length>0 && clipboardText!==_previousData){
            //Add to this text to the storage
			setClipboardText(clipboardText);
            _previousData = clipboardText
        }

    })
    .catch(err=>console.log(err))
}
const setClipboardText = async (clipText)=>{
    chrome.storage.local.get(['list'],clipboard=>{
        let {list} = clipboard;
        if(typeof list === "undefined")
            list = [];
        if(list.length === _maxListSize){
            list.pop();
        }
		if(list.indexOf(clipText)==-1)
			list.unshift(clipText)
        chrome.storage.local.set({'list':list},status=>console.log("Text Saved"));
    })
}

window.addEventListener('mouseout',function(){
    if(time_interval_set===undefined)
        time_interval_set = setInterval(readClipboardText,2000)
})
window.addEventListener('mouseover',function(){
    clearInterval(time_interval_set);
    time_interval_set=undefined;
})
window.addEventListener('copy',function(){
    readClipboardText();
})
document.addEventListener('visibilitychange',function(){
    if(document.hidden){
        clearInterval(time_interval_set);
        time_interval_set=undefined;
    }else{
        if(time_interval_set==undefined)
        time_interval_set = setInterval(readClipboardText,2000);
    }
})




