function Game() {

}

// Constructor function, use with: gg = new GamGallery();
function GameGallery() {

    this.xmlDocName = 'alpha.xml';                         // TODO: Update - sets xmlDocName to 'alpha.xml'
    this.gameIndex = 0;                                    // sets gameIndex to 0
    this.games = [];                                       // Temporary until _initialize_
    this.debug_enabled = true;                             // toggles debug messages in console

    // Initialize Function: We manually call this at the end of the constructor.
    this._initialize_ = function() {                       // this function calls three functions, one to load the XML doc, one to parse the XML data, and the third to update the page to display the new data.
        var xmlDoc = this.loadXMLDoc(this.xmlDocName);     // puts the XML file into a variable
        this.games = this.xmlParse(xmlDoc);                // parses XML data and puts it into games
        this.update();                                     // updates page with new data
    };


    // This takes the XML doc and returns an array of extracted game data in the order it was within the XML file.
    this.xmlParse = function(xmlDoc) {

        function ext_tag(name, fromGameXml) {                     // functionception
            tag_node = fromGameXml.getElementsByTagName(name);    // gets the passed tag from the XML file
            if ((tag_node[0]) && (tag_node[0].childNodes[0])) {   // checks if tag_node exists, and if it has a child
                return tag_node[0].childNodes[0].nodeValue;       // returns the value of the childnode
            } else {                                              // else
                this.debug("Tag not found: "+name);               // console message that says the tag was not found
                return "NOT FOUND";
            }

        }

        games = [];                                                // creates empty games array

        if(xmlDoc){                                                                         // check if xmlDoc is empty
            var xmlGames = xmlDoc.getElementsByTagName('game');                             // puts the games into the xmlGames variable 

            // Extract each game and store it in games.
            for (var xmlGamesIdx =0; xmlGamesIdx < xmlGames.length; xmlGamesIdx++) {        // steps through each record from 0 to the length of the XML file
                this.debug("Extracting game XML #"+xmlGamesIdx);                            // console message telling the user which game it's extracting

                var xmlGame = xmlGames[xmlGamesIdx];                                        // adds a new Index record to the xmlGames array

                var game = {                                                                // sets the game variable to the contents of the next 4 lines
                  name: ext_tag('name',xmlGame),                                            // extracts the value of the name node
                  released: ext_tag('released',xmlGame),                                    // extracts the value of the released node
                  developer: ext_tag('developer',xmlGame),                                  // extracts the value of the developer node
                  description: ext_tag('description',xmlGame)                               // extracts the value of the description node
                };

                this.debug("Extracted Game: "+game.name);                                   // console message containing the game's name tag value

                games[xmlGamesIdx] = game;                                                  // puts the data gathered into the game variable into the games array
            }                                                                               // end for

        }
        return games;
    };

    this.loadXMLDoc = function(XMLname) {                                    // function to load the XML doc, gets put into var xmlDoc
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

    this.debug = function(msg){                                             // console debug message function
        if (this.debug_enabled)                                             // checks if this.debug is enabled in the code at the top of the file
            console.log('GameGallery: ' + msg);                             // Prints a message to the console
    };

    this.fatal = function(msg){                                             // fatal error catcher
        alert('GameGallery: '+msg);                                         // calls a popup with an error message
        throw(msg);
    };

    this.update = function(){                                                           // update function
        var current_game = this.games[this.gameIndex];                                  // sets current_game to the currently displayed game's index
        this.debug('Updating content.');                                                // debug message to console

        $(document).find('#info span#name').html(current_game.name);                    // finds the info id and the span with id name, and puts the name of the current game in the html
        $(document).find('#info span#released').html(current_game.released);            // finds the info id and the span with id released, and puts the release date of the current game in the html
        $(document).find('#info span#developer').html(current_game.developer);          // finds the info id and the span with id developer, and puts the developer of the current game in the html
        $(document).find('#info span#description').html(current_game.description);      // finds the info id and the span with id description, and puts the description of the current game in the html
    };

    this.left = function(){                                    // left function to go to the next game in a negative direction
        if(this.gameIndex > 0){                                // if gameIndex is greater than 0
            this.debug('Going left');                          // debug message for going left
            this.gameIndex--;                                  // decrement gameIndex varianle
        } else {
            this.debug('Cannot go left');                      // if gameIndex was 0, error message to console saying you are at the beginning of the list.  May be better to put an alert here for users, until we loop the data.
        }

        this.debug('gameIndex = '+ this.gameIndex);            // display new gameIndex in console
        this.update();                                         // update page with new information
    };

    this.right = function(){                                   // right function to go to the next game in a positive direction

        if(this.gameIndex < this.game_count()){                // if gameIndex is less than the count of total games
            this.debug('Going right');                         // debug message for going right
            this.gameIndex++;                                  // increment gameIndex variable
        } else {
            this.debug('Cannot go right');                     // if gameIndex is not less than the total game count, error message. May be better to put an alert here for users, until we loop the data.
        }

        this.debug('gameIndex = '+ this.gameIndex);            // print new gameIndex to console
		this.update();                                         // update the page
    };

    // Return the number of games we have.
    this.game_count = function() {                             // function to count the total number of games in the array
        if(this.games){                                        // if the array exists
            return this.games.length;                          // return the amount of games in the array
        } else {
            return 0;                                          // return 0
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
