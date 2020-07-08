console.log("copy-pasty-chrome-extension");
let index=0,
	currentFocus;
const getFocussedTarget = (event)=>event.target;
const pasteCurrentText = (currentText)=>{
	console.log(currentText);
	if(currentFocus instanceof HTMLInputElement){
		
		currentFocus.value = currentFocus.value+' '+currentText;
	}
	else if(currentFocus.isContentEditable){
		let content = document.createTextNode(currentText);
		currentFocus.appendChild(content);
	}
}

// Listener will trigger at CTRL+C or mouse copy event
document.addEventListener('copy',function(event){
    // console.log("Content copied");

    //Add selected data to the clipboard
    let selectedWord = window.getSelection().toString();
    chrome.storage.local.get(['list'],function(result){
    	let localList = result.list;
    	console.log(typeof localList);
    	if (typeof localList === 'undefined')
    		localList = [];
    	localList.push(selectedWord);
    	chrome.storage.local.set({'list':localList},function(arg){
    		console.log(localList);
    	});
    });
});

window.onkeydown =(event)=>{
	let key = event.key,
		localList = [];
	console.log("Key is ",typeof key)
	if (key==="Control")
		return;
	
	 if (event.ctrlKey&&key===".") {
        console.log("Triggered");
    // Even though event.key is not 'Control' (e.g., 'a' is pressed),
    chrome.storage.local.get(['list'],function(result){
		localList = result.list;
		pasteCurrentText(localList[index]);
		index++;
		index%=localList.length;
	})
	
  } 
}

window.onmousedown = (event)=>{
	console.log("Clicked");
	currentFocus = getFocussedTarget(event);
	console.log("Focus changed to ",currentFocus);
}
