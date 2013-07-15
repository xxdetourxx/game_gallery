function Game() {

}

// Constructor function, use with: gg = new GamGallery();
function GameGallery() {

    this.xmlDocName = 'alpha.xml';    // TODO: Update
    this.gameIndex = 0;
    this.games = []; // Temporary until _initialize_
    this.debug_enabled = true;

    // Initialize Function: We manually call this at the end of the constructor.
    this._initialize_ = function() {
        var xmlDoc = this.loadXMLDoc(this.xmlDocName);
        this.games = this.xmlParse(xmlDoc);
        this.update();
    };


    // This takes the XML doc and returns an array of extracted game data in the order it was within the XML file.
    this.xmlParse = function(xmlDoc) {

        function ext_tag(name, fromGameXml) {
            tag_node = fromGameXml.getElementsByTagName(name);
            if ((tag_node[0]) && (tag_node[0].childNodes[0])) {
                return tag_node[0].childNodes[0].nodeValue;
            } else {
                this.debug("Tag not found: "+name);
                return "NOT FOUND";
            }

        }

        games = [];

       if(xmlDoc){
            var xmlGames = xmlDoc.getElementsByTagName('game');

            // Extract each game and store it in games.
            for (var xmlGamesIdx =0; xmlGamesIdx < xmlGames.length; xmlGamesIdx++) {
                this.debug("Extracting game XML #"+xmlGamesIdx);

                var xmlGame = xmlGames[xmlGamesIdx];

                var game = {
                  image: ext_tag('image',xmlGame),
				  name: ext_tag('name',xmlGame),
                  released: ext_tag('released',xmlGame),
                  developer: ext_tag('developer',xmlGame),
                  description: ext_tag('description',xmlGame)
                };

                this.debug("Extracted Game: "+game.name);

                games[xmlGamesIdx] = game;
            }

        }
        return games;
    };

    this.loadXMLDoc = function(XMLname) {
        this.debug('loading XML doc from: '+XMLname);

        var xmlDoc;
        if (window.XMLHttpRequest){
            this.debug('XMLHTTPRequest detected');

            xmlDoc=new window.XMLHttpRequest();
            xmlDoc.open("GET",XMLname,false);
            xmlDoc.send("");
            return xmlDoc.responseXML;
        } else if (ActiveXObject("Microsoft.XMLDOM")){
            this.debug('ActiveXObject detected');

            xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async=false;
            xmlDoc.load(XMLname);
            return xmlDoc;
        }

        this.fatal("Error loading document!");
        return null;
    };

    this.debug = function(msg){
        if (this.debug_enabled)
            console.log('GameGallery: ' + msg);
    };

    this.fatal = function(msg){
        alert('GameGallery: '+msg);
        throw(msg);
    };

    this.update = function(){
        var current_game = this.games[this.gameIndex];
        this.debug('Updating content.');

		//testing image code, insert URL and image from thumbs dir
		$(document).find('a#image_link').attr("href","images/" + current_game.image);
		$(document).find('#image').css("background-image","url(images/thumbs/" + current_game.image + ")");
		$(document).find('#image').css("background-position","center center"); 
		$(document).find('#image').css("background-repeat","no-repeat");

		$(document).find('#header span#title_name').html(current_game.name);
        
		$(document).find('#info span#name').html(current_game.name);
        $(document).find('#info span#released').html(current_game.released);
        $(document).find('#info span#developer').html(current_game.developer);
        $(document).find('#info span#description').html(current_game.description);
    };




	
    this.left = function(){
        if(this.gameIndex > 0){
            this.debug('Going left');
            this.gameIndex--;
        } else {
            this.debug('Cannot go left');
        }

        this.debug('gameIndex = '+ this.gameIndex);

        this.update();
    };

    this.right = function(){

        if(this.gameIndex < this.game_count()){
            this.debug('Going right');
            this.gameIndex++;
        } else {
            this.debug('Cannot go right');
        }

        this.debug('gameIndex = '+ this.gameIndex);

        this.update();
    };

    // Return the number of games we have.
    this.game_count = function() {
        if(this.games){
            return this.games.length;
        } else {
            return 0;
        }
    };


    this._initialize_();
}

$(document).ready(function()
{
    document.gg = new GameGallery();
});

function loadXMLDoc(XMLname){
    alert('Depreciated Interface Used!');
    return document.gg.loadXMLDoc(XMLname);
}



function ind_header_html(){
document.write("<div id='header'><div class='title_text'>.gg/ the_game_gallery_{}</div><div class='topnav'></div></div><hr />");
}

function footer_html(){
document.write("");
}

function chron_header_html(){
document.write("<div id='header'><div class='title_text'>.gg/ the_game_gallery_{}</div><div class='topnav'><a href='alpha.html'>alpha</a>&nbsp;|&nbsp;<a href='chron.html'><span style='color: red;'>chron</span></a></div></div><hr />");
}

function alpha_header_html(){
alert('depreciated');
//document.write("<div id='header'><div class='title_text'>.gg/ the_game_gallery_{<script>document.write(name);</script>}</div><div class='topnav'><a href='alpha.html'><span style='color: red;'>alpha</span></a>&nbsp;|&nbsp;<a href='chron.html'>chron</a></div></div><hr />")
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
