function getData(gameIndex)
{
	var xmlDoc=loadXMLDoc("alpha.xml");
	console.log("getData gameIndex is:");
	console.log(gameIndex);
	var image=xmlDoc.getElementsByTagName("image")[gameIndex].childNodes[0].nodeValue;
	// this does not work - 
	document.getElementById("gameImage").innerHTML='<a href="images/catacomb_abyss.jpg"><div id="imagethumb" style="background-image:url(images/thumbs/catacomb_abyss.jpg); background-position:center center; background-repeat:no-repeat;"></div></a>';
	var name=xmlDoc.getElementsByTagName("name")[gameIndex].childNodes[0].nodeValue;
	document.getElementById("name").innerText=name;
	var released=xmlDoc.getElementsByTagName("released")[gameIndex].childNodes[0].nodeValue;
	document.getElementById("released").innerText=released;
	var developer=xmlDoc.getElementsByTagName("developer")[gameIndex].childNodes[0].nodeValue;
	document.getElementById("developer").innerText=developer;
	var description=xmlDoc.getElementsByTagName("description")[gameIndex].childNodes[0].nodeValue;
	document.getElementById("description").innerText=description;
	
	//debug
	console.log("image: ");
	console.log(image);
	console.log("name: ");
	console.log(name);
	console.log("released: ");
	console.log(released);
	console.log("developer: ");
	console.log(developer);
	console.log("description: ");
	console.log(description);
}

function nextClick()
{
	var xmlDoc=loadXMLDoc("alpha.xml");
	var count = xmlDoc.getElementsByTagName('name').length;
	console.log("Total gameIndex count is: ");
	console.log(count);
	
	if (gameIndex < count){
		gameIndex = ++gameIndex;
		console.log("Added 1 to gameIndex, new gameIndex:");
		console.log(gameIndex);
		getData(gameIndex);
	} else if (gameIndex == count){
		gameIndex = ++gameIndex;
		if (gameIndex > count){
			console.log("The end is the beginning.");
			gameIndex = 0;
			getData(gameIndex);
		}
	}
}

function prevClick()	
{
	var xmlDoc=loadXMLDoc("alpha.xml");
	var count = xmlDoc.getElementsByTagName('name').length;
	console.log("Total gameIndex count is: ");
	console.log(count);
	
	if (gameIndex > 0){
		gameIndex = --gameIndex;
		console.log("Removed 1 from gameIndex, new gameIndex:");
		console.log(gameIndex);
		getData(gameIndex);
	} else if (gameIndex == 0){
		gameIndex = --gameIndex;
		if (gameIndex < 0){
			console.log("The beginning is the end.");
			gameIndex = count;
			getData(gameIndex);
		}
	}
}

function alphaLoad()
{
gameIndex = 0;
console.log("Starting gameIndex should be 0, it is:");
console.log(gameIndex);
getData(gameIndex);
}

function loadXMLDoc(XMLname){
	var xmlDoc;
	if (window.XMLHttpRequest){
		xmlDoc=new window.XMLHttpRequest();
		xmlDoc.open("GET",XMLname,false);
		xmlDoc.send("");
		return xmlDoc.responseXML;
	} else if (ActiveXObject("Microsoft.XMLDOM")){
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async=false;
		xmlDoc.load(XMLname);
		return xmlDoc;
	}
		alert("Error loading document!");
		return null;
}


function ind_header_html(){
document.write("<div id='header'><div class='title_text'>Game Gallery</div><div class='topnav'></div></div><hr />");
}

function footer_html(){
document.write("<div id='footer'><hr /><div class='link_text'><a href='home.html'>home</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href='about.html'>about</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href='contact.html'>contact</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href='sitemap.html'>site map</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href='jobs.html'>jobs</a></div></div>");
}

function chron_header_html(){
document.write("<div id='header'><div class='title_text'>Game Gallery </div><div class='topnav'><a href='alpha.html'>alpha</a>&nbsp;|&nbsp;<a href='chron.html'><span style='color: red;'>chron</span></a></div></div><hr />");
}

function alpha_header_html(){
document.write("<div id='header'><div class='title_text'>Game Gallery</div><div class='topnav'><a href='alpha.html'><span style='color: red;'>alpha</span></a>&nbsp;|&nbsp;<a href='chron.html'>chron</a></div></div><hr />")
}