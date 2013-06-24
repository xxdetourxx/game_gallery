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
document.write("<div id='header'><div class='title_text'>.gg/ the_game_gallery_{}</div><div class='topnav'></div></div><hr />");
}

function footer_html(){
document.write("<div id='footer'><hr /><div class='link_text'><a href='home.html'>home</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href='about.html'>about</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href='contact.html'>contact</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href='sitemap.html'>site map</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href='jobs.html'>jobs</a></div></div>");
}

function chron_header_html(){
document.write("<div id='header'><div class='title_text'>.gg/ the_game_gallery_{}</div><div class='topnav'><a href='alpha.html'>alpha</a>&nbsp;|&nbsp;<a href='chron.html'><span style='color: red;'>chron</span></a></div></div><hr />");
}

function alpha_header_html(){
document.write("<div id='header'><div class='title_text'>.gg/ the_game_gallery_{<script>document.write(name);</script>}</div><div class='topnav'><a href='alpha.html'><span style='color: red;'>alpha</span></a>&nbsp;|&nbsp;<a href='chron.html'>chron</a></div></div><hr />")
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
