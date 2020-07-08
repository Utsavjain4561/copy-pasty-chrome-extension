
let index = 0,
	currentFocus;
	
console.log("copy-pasty-chrome-extension");
const getFocussedTarget = (event)=>event.target;
const recieveText=(req,send,res)=>{
	let {event} = req;
	index = req.index;
    console.log('message recieveText');
    //store the message in the global list
    window.onkeyup = keyReleased;
    return true;
}
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
const keyReleased=(event)=>{
	let key = event.key;
	if (key==="Control"){
		console.log("control released!!");
		chrome.storage.local.get(['list'],(result)=>{
			pasteCurrentText(result.list[index]);             
		})
		
	}
	
	chrome.storage.local.get(['list'],(result)=>{
		currentFocus.placeholder = currentFocus.value+result.list[index]
	})
	console.log(key);
	return true;
}

window.onmousedown = (event)=>{
	console.log("Clicked");
	currentFocus = getFocussedTarget(event);
	console.log("Focus changed to ",currentFocus);
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
    		return true;
    	});
    	return true;
    });
    return true;
});

chrome.runtime.onMessage.addListener(recieveText);


