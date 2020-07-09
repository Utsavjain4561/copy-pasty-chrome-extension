let _previousData="";

const setClipboardText = async (clipText)=>{
    chrome.storage.local.get(['list'],clipboard=>{
        let {list} = clipboard;
        if(typeof list === "undefined")
			list = [];
		if(list.indexOf(clipText)==-1)
			list.push(clipText);
        chrome.storage.local.set({'list':list},status=>console.log("Text Saved"));
    })
}
const getClipboardText = async()=>{
	chrome.storage.local.get(['list'],clipboard=>{
		console.log(clipboard.list);
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
    .then(()=>getClipboardText())
    .catch(err=>console.log(err))
},2000)
