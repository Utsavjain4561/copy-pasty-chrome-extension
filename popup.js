console.log("Popup is running");
let _clipboardList = document.querySelector("#clipboard_list");
function addClipboardListItem(text){
    console.log("Text is ",text);
    console.log(_clipboardList);
    let listItem = document.createElement("li"),
        listDiv = document.createElement("div"),
        listSpan = document.createElement("span"),
        listText = document.createTextNode(text);
      
    listSpan.appendChild(listText)
    listDiv.appendChild(listText)

    listItem.appendChild(listDiv);
    _clipboardList.appendChild(listItem);

    
    listItem.addEventListener('click',(event)=>{
        let {textContent} = event.target;
        navigator.clipboard.writeText(textContent)
        .then(()=>{console.log(`Text saved to clipboard`);
            chrome.storage.local.get(['list'],clipboard=>{
        
        let list = clipboard.list;
        
        let ind = list.indexOf(textContent);
        if (ind !== -1)
            list.splice(ind,1);
        list.unshift(textContent);
        _clipboardList.innerHTML = "";

        chrome.storage.local.set({'list':list},()=>getClipboardText());

        });
    })

    
});
    listItem.addEventListener('mouseover',(event)=>{
    	let {textContent} = event.target;
    	console.log(textContent);
    	let ind = textContent.indexOf('https://www.youtube.com/');
    	if (ind!==-1)
    	{
    		let videoId = "";
    		let idIndex = textContent.indexOf('watch?v=');
    		let endIndex = textContent.indexOf('&');
    		console.log(`${idIndex} ${endIndex}`);
    		if (endIndex !== -1)
    			videoId = textContent.substring(idIndex+8,endIndex);
    		else
    			videoId = textContent.substring(idIndex+8,textContent.length);
    		console.log(`https://img.youtube.com/vi/${videoId}/1.jpg`);
    	}
    },false);
}
function getClipboardText(){
	chrome.storage.local.get(['list'],clipboard=>{
        let list = clipboard.list;
        if (typeof list !== undefined)
        list.forEach(item => {
            console.log(item);
            addClipboardListItem(item)
        });
});
}
getClipboardText();