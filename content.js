let _previousData="";
const setClipboardText =(clipText)=>{
    chrome.storage.local.get(['list'],clipboard=>{
        let {list} = clipboard;
        if(typeof list === "undefined")
            list = [];
        list.push(clipText);
        chrome.storage.local.set({'list':list},status=>{});
    })
}
const getClipboardText = ()=>{
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
			getClipboardText();
            _previousData = clipboardText;
        }
    })
    .catch(err=>console.log(err))
},2000)
