let _previousData="";
let _maxListSize = 15;
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




setInterval(()=>{
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
},2000)
