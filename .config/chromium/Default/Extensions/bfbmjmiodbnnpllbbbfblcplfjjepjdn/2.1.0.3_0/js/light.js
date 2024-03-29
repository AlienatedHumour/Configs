//================================================
/*

Turn Off the Lights
The entire page will be fading to dark, so you can watch the video as if you were in the cinema.
Copyright (C) 2012 Stefan vd
www.stefanvd.net

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.


To view a copy of this license, visit http://creativecommons.org/licenses/GPL/2.0/

*/
//================================================

function $(id) { return document.getElementById(id); }
// settings
var default_opacity = null, suggestions = null, playlist = null, videoheadline = null, flash = null, head = null, infobar = null, likebutton = null, sharebutton = null, viewcount = null, addvideobutton = null, likebar = null, mousespotlighto = null, mousespotlightc = null, mousespotlighta = null, lightcolor = null, lightimagea = null, lightimage = null, interval = null, fadein = null, fadeout = null, readera = null, readerlargestyle = null, mousespotlightt = null, password = null, enterpassword = null, noflash = null, hardflash = null, dynamic = null, dynamic1 = null, dynamic2 = null, dynamic3 = null, dynamic4 = null, dynamic5 = null;
// html elements used
var div = null, video = null, span = null, iframe = null, embed = null, object = null, a = null, img = null;

/////////// Option page settings
chrome.extension.sendRequest({comando:'totlrequest'}, function(response){
suggestions = response.suggestions;
playlist = response.playlist;
videoheadline = response.videoheadline;
flash = response.flash;
head = response.head;
infobar = response.infobar;
likebutton = response.likebutton;
sharebutton = response.sharebutton;
viewcount = response.viewcount;
addvideobutton = response.addvideobutton;
likebar = response.likebar;
noflash = response.noflash;
hardflash = response.hardflash;

// Show YouTube Suggestions
if(suggestions == 'true'){
var watchsidebar = $('watch-sidebar');
if(watchsidebar){$('watch-sidebar').style.zIndex = '1000';}
}

// Show YouTube playlist
if(playlist == 'true'){
// new YouTube playlist (my feeds) 
var quicklist = $('quicklist');
if(quicklist){$('quicklist').style.zIndex = 1001;}

var playlistbar = $('playlist-bar');
if(playlistbar){$('playlist-bar').style.zIndex = 1001;}
}

// Show video title
if(videoheadline == 'true'){
var eowtitle = $('eow-title');
if(eowtitle){$('eow-title').style.color = 'white';$('eow-title').style.zIndex = 1001;$('eow-title').style.position = 'relative';}
}

// Show all Flash
function R(w){
try{
var d=w.document,j,i,t,T,N,b,r=1,C;
for(j=0;t=['object','embed','applet','iframe'][j];++j)
{
T=d.getElementsByTagName(t);
for(i=T.length-1;(i+1)&&(N=T[i]);--i)
if(j!=3||!R((C=N.contentWindow)?C:N.contentDocument.defaultView))
{
N.style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';
}
}
}catch(E){r = 0}
return r
}

if(flash == 'true'){
intelligentvideodetection();

R(self);
var i,x;
for(i=0;x=frames[i];++i)R(x)
} else if(hardflash == 'true'){
intelligentvideodetection();

for(j=0;t=['object','embed','applet','iframe'][j];++j)
{
var a = document.querySelectorAll(t);
for(var i = 0; i < a.length; i++ )
{
a[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';
}
}
}

// Show YouTube Channel name
if(head == 'true'){
var watchheadline = $('watch-headline-user-info');
if(watchheadline){$('watch-headline-user-info').style.zIndex = 1000;$('watch-headline-user-info').style.position = 'relative';}

var watchchannel = $('watch-channel-discoverbox');
if(watchchannel){$('watch-channel-discoverbox').style.zIndex = 1000;$('watch-channel-discoverbox').style.position = 'relative';$('watch-channel-discoverbox').style.background = 'white';}

var watchmore = $('watch-more-from-user');
if(watchmore){$('watch-more-from-user').style.zIndex = 1000;$('watch-more-from-user').style.position = 'relative';$('watch-more-from-user').style.background = 'none';}

var watchuser = $('watch-userbanner');
if(watchuser){$('watch-userbanner').style.zIndex = 1000;$('watch-userbanner').style.position = 'relative';$('watch-userbanner').style.background = 'white';}

span = document.getElementsByTagName('span'); 
for(var i = 0; i < span.length; i++ ) 
{if(span[i].className == ('watch-expander-head yt-uix-expander-head yt-rounded') ) {span[i].style.background = 'white';}}
}

// Show Infobar
if(infobar == 'true'){
var watchinfo = $('watch-info');
if(watchinfo){$('watch-info').style.zIndex = 1000;$('watch-info').style.position = 'relative';$('watch-info').style.background = 'white';}

div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ )
{if(div[i].className == ('watch-expander-head yt-uix-expander-head yt-rounded')) {div[i].style.zIndex = 1000;div[i].style.visibility = 'visible';div[i].style.position = 'relative';div[i].style.background = 'white'; }}
}

// Show like and unlike buttons
if(likebutton == 'true'){
var watchlike = $('watch-like');
if(watchlike){$('watch-like').style.zIndex = 1000;$('watch-like').style.position = 'relative';}

var watchunlike = $('watch-unlike');
if(watchunlike){$('watch-unlike').style.zIndex = 1000;$('watch-unlike').style.position = 'relative';}
}

// Show share buttons
if(sharebutton == 'true'){
var watchshare = $('watch-share');
if(watchshare){$('watch-share').style.zIndex = 1000;$('watch-share').style.position = 'relative';}
}

// Show view count
if(viewcount == 'true'){
span = document.getElementsByTagName('span'); 
for(var i = 0; i < span.length; i++ )
{if(span[i].className == ('watch-view-count')) {span[i].style.color = 'white';span[i].style.zIndex = 1001;span[i].style.position = 'relative';}}
}

// Show add button
if(addvideobutton == 'true'){
var watchaddtobutton = $('watch-addto-button');
if(watchaddtobutton){$('watch-addto-button').style.zIndex = 1000;$('watch-addto-button').style.position = 'relative';}

button = document.getElementsByTagName('button'); 
for(var i = 0; i < button.length; i++ )
{if(button[i].className == ('yt-uix-tooltip-reverse  yt-uix-button yt-uix-button-default yt-uix-tooltip')) {button[i].style.zIndex = 1001;button[i].style.position = 'relative';}}
}

// Show like/dislike bar
if(likebar == 'true'){
var watchdescription = $('watch-description');
if(watchdescription){$('watch-description').style.zIndex = 'auto';}

div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ )
{if(div[i].className == ('watch-sparkbars')) {div[i].style.zIndex = 1001;div[i].style.position = 'relative';}}

span = document.getElementsByTagName('span'); 
for(var i = 0; i < span.length; i++ )
{if(span[i].className == ('watch-likes-dislikes')) {span[i].style.zIndex = 1001;span[i].style.position = 'relative';}}
}

/////////// API for Website Developer
// id way
var websiteidapi = $('dont-turn-off-the-lights');
if(websiteidapi){$('dont-turn-off-the-lights').style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';}

// class way
var websiteclassapi = document.getElementsByClassName('dont-turn-off-the-lights');
for(var i = 0; i < websiteclassapi.length; i++ ){websiteclassapi[i].cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';}

/////////// HTML5 video
// default html5 video detection
video = document.getElementsByTagName('video');
for(var i = 0; i < video.length; i++) {
// other file then "mp3" then run this code
if (video[i].currentSrc.lastIndexOf(".mp3")==-1) {video[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';}
}

// default html5 video detection inside a iframe element
/*iframe = document.getElementsByTagName("iframe");
for(var i = 0; i < iframe.length; i++) {
try {
	var innerDoc = iframe[i].contentWindow ? iframe[i].contentWindow.document : iframe[i].contentDocument ? iframe[i].contentDocument : iframe[i].document;
	if(innerDoc){
		var iframevideo = innerDoc.getElementsByTagName("video");
		for(var j = 0; j < iframevideo.length; j++) {
		iframe[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';
		}
	}
} catch(e){}
}*/

// iframe HTML5 video
// see inside injected.js

// YouTube video OK
if (window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
// HTML5 trial
video = document.getElementsByTagName('video'); 
for(var i = 0; i < video.length; i++ )
{if(video[i].className == ('video-stream html5-main-video')) {video[i].style.cssText = 'visibility:visible !important; position:absolute !important; top: 0 !important; z-index:1000 !important';}}

// MAC & PC & LINUX
var movieplayer = $('movie_player');
if(movieplayer){$('movie_player').style.zIndex = 1000;$('movie_player').style.visibility = 'visible';$('movie_player').style.position = 'relative';}

var movieplayerhtml5 = $('movie_player-html5');
if(movieplayerhtml5){$('movie_player-html5').style.zIndex = 1000;$('movie_player-html5').style.visibility = 'visible';$('movie_player-html5').style.position = 'relative';}

var watchplayer = $('watch-player');
if(watchplayer){$('watch-player').style.zIndex = 1000;$('watch-player').style.visibility = 'visible';$('watch-player').style.position = 'relative';}

// Youtube Channel, fixed show video
var userplaylist = $('user_playlist_navigator');
if(userplaylist)$('user_playlist_navigator').style.zIndex = 'auto';

var playnav = $('playnav-body');
if(playnav)$('playnav-body').style.zIndex = 'auto';

var player = $('playnav-player');
if(player)$('playnav-player').style.zIndex = 1000;

div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ )
{if(div[i].className == ('primary-pane')) {div[i].style.zIndex = 'auto';}}

// HTML5
var html5player = $('html5-player');
if(html5player){$('html5-player').style.zIndex = 1001;$('html5-player').style.visibility = 'visible';$('html5-player').style.position = 'relative';}

var youtubehtml5 = $('video-player');
if(youtubehtml5){$('video-player').style.zIndex = 1001;$('video-player').style.visibility = 'visible';$('video-player').style.position = 'relative';}

div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{if(div[i].className == ('video-controls')) {div[i].style.zIndex = 1001;div[i].style.visibility = 'visible';}}

// YouTube Channel gadget, Google app
var user_fullwidth_gadget = $('user_fullwidth_gadget');
if(user_fullwidth_gadget){$('user_fullwidth_gadget').style.zIndex = 1000;$('user_fullwidth_gadget').style.visibility = 'visible';$('user_fullwidth_gadget').style.position = 'relative';}
}

// YouTube Embed video style iframe
iframe = document.getElementsByTagName('iframe'); 
for(var i = 0; i < iframe.length; i++ )
{if(iframe[i].className == ('youtube-player')) {iframe[i].style.zIndex = 1000;iframe[i].style.visibility = 'visible';iframe[i].style.position = 'relative';}}

});

/////////// Turn Off the Lights -> on

// New intelligent video detection --------------
function intelligentvideodetection() {
if (window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){} // flash detection off for youtube.com
else {

// search for the z-index, if found something give it 'auto'
var x = document.getElementsByTagName('*');
for(var i = 0; i < x.length; i++ ) {
if (x[i].currentStyle){var y = x[i].currentStyle["z-Index"];}
else if (window.getComputedStyle){var y = document.defaultView.getComputedStyle(x[i],null).getPropertyValue("z-Index");}
if (y == "auto"){}
else{x[i].style.zIndex = 'auto';}
}
}
}

//-----------------------------------------------

// embed iframe
var iframe = document.querySelectorAll('iframe');
for(var i = 0; i < iframe.length; i++ ){
var insideframe = iframe[i].src;
if((insideframe.substring(0, 22) == 'http://www.youtube.com') || (insideframe.substring(0, 23) == 'https://www.youtube.com') || (insideframe.substring(0, 31) == 'http://www.youtube-nocookie.com') || (insideframe.substring(0, 32) == 'https://www.youtube-nocookie.com')){iframe[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';}
else if((insideframe.substring(0, 23) == 'http://player.vimeo.com') || (insideframe.substring(0, 24) == 'https://player.vimeo.com')){iframe[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';}
else if((insideframe.substring(0, 26) == 'http://www.dailymotion.com') || (insideframe.substring(0, 27) == 'https://www.dailymotion.com')){iframe[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';}
else if((insideframe.substring(0, 23) == 'http://player.youku.com') || (insideframe.substring(0, 24) == 'https://player.youku.com')){iframe[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';}
}

// embed object
var object = document.querySelectorAll('object');
for(var i = 0; i < object.length; i++ ){
var insideframe = object[i].data;
if((insideframe.substring(0, 22) == 'http://www.youtube.com') || (insideframe.substring(0, 23) == 'https://www.youtube.com') || (insideframe.substring(0, 31) == 'http://www.youtube-nocookie.com') || (insideframe.substring(0, 32) == 'https://www.youtube-nocookie.com')){object[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';}
else if((insideframe.substring(0, 23) == 'http://player.vimeo.com') || (insideframe.substring(0, 24) == 'https://player.vimeo.com')){object[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';}
else if((insideframe.substring(0, 26) == 'http://www.dailymotion.com') || (insideframe.substring(0, 27) == 'https://www.dailymotion.com')){object[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';}
else if((insideframe.substring(0, 23) == 'http://player.youku.com') || (insideframe.substring(0, 24) == 'https://player.youku.com')){object[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';}
}

// embed embed
var embed = document.querySelectorAll('embed');
for(var i = 0; i < embed.length; i++ ){
var insideframe = embed[i].src;
if((insideframe.substring(0, 22) == 'http://www.youtube.com') || (insideframe.substring(0, 23) == 'https://www.youtube.com') || (insideframe.substring(0, 31) == 'http://www.youtube-nocookie.com') || (insideframe.substring(0, 32) == 'https://www.youtube-nocookie.com')){embed[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';}
else if((insideframe.substring(0, 16) == 'http://vimeo.com') || (insideframe.substring(0, 17) == 'https://vimeo.com')){embed[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';}
else if((insideframe.substring(0, 26) == 'http://www.dailymotion.com') || (insideframe.substring(0, 27) == 'https://www.dailymotion.com')){embed[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';}
else if((insideframe.substring(0, 23) == 'http://player.youku.com') || (insideframe.substring(0, 24) == 'https://player.youku.com')){embed[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';}
}


/////////// Video
// Google Reader
if ((window.location.href.match('http://www.google.com/reader'))||(window.location.href.match('https://www.google.com/reader'))){
// entries
var entries = $('entries');
if(entries){$('entries').style.zIndex = 'auto';}

embed = document.getElementsByTagName('embed'); 
for(var i = 0; i < embed.length; i++ ) 
{embed[i].style.zIndex = 1000;embed[i].style.position = 'relative';}
}

// Break, fixed show video
else if (window.location.href.match(/http:\/\/(www\.break\.com\/.*\/.*)/i)){
intelligentvideodetection();

var defaultDiv = $('defaultDiv');
if(defaultDiv){$('defaultDiv').style.zIndex = 1000;$('defaultDiv').style.position = 'relative';}
}

// YouKu.com, fixed show video
else if (window.location.href.match('http://www.youku.com')){
var movieplayer = $('movie_player');
if(movieplayer){$('movie_player').style.zIndex = 1000;$('movie_player').style.visibility = 'visible';$('movie_player').style.position = 'relative';}
}

// Yahoo video, fixed show video
else if (window.location.href.match(/http:\/\/(.*yahoo\.com\/.*|www\.yahoo\.com\/.*\/.*)/i)){
intelligentvideodetection();

div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{if(div[i].className == ('mwvp-yep-player')) {div[i].style.zIndex = 1000;div[i].style.position = 'relative';}}

var ymhplayerswf = $('ymh-player-swf');
if(ymhplayerswf){$('ymh-player-swf').style.zIndex = 1000;$('ymh-player-swf').style.visibility = 'visible';$('ymh-player-swf').style.position = 'relative';}

var yplayer = $('yplayer');
if(yplayer){$('yplayer').style.zIndex = 1000;$('yplayer').style.visibility = 'visible';$('yplayer').style.position = 'relative';}

var yppVideoPlayer84176 = $('yppVideoPlayer84176');
if(yppVideoPlayer84176){$('yppVideoPlayer84176').style.zIndex = 1000;$('yppVideoPlayer84176').style.visibility = 'visible';$('yppVideoPlayer84176').style.position = 'relative';}
}

// vevo, fixed show video
else if (window.location.href.match(/http:\/\/(www\.vevo\.com\/.*\/.*)/i)){
var thePlayer = $('thePlayer');
if(thePlayer){$('thePlayer').style.zIndex = 1000;$('thePlayer').style.visibility = 'visible';$('thePlayer').style.position = 'relative';}
}

// Vimeo, fixed show video
else if (window.location.href.match(/((http:\/\/(.*vimeo\.com\/.*|.*vimeo\.com\/.*\/b\/.*|.*vimeo\.com\/.*\/w\/.*))|(https:\/\/(.*vimeo\.com\/.*|.*vimeo\.com\/.*\/b\/.*|.*vimeo\.com\/.*\/w\/.*)))/i)){
//intelligentvideodetection();

// fix bug video website
video = document.getElementsByTagName('video'); 
for(var i = 0; i < video.length; i++ ) 
{if(video[i]) {video[i].style.zIndex = 1000;video[i].style.visibility = 'visible';video[i].style.position = 'relative';video[i].style.margin = '0px';video[i].style.top = '0%';video[i].style.left = '0px';}}
div = document.getElementsByTagName('div');
for(var i = 0; i < div.length; i++ )
{if(div[i].className == ('an')) {div[i].style.zIndex = 1001;}}
div = document.getElementsByTagName('div');
for(var i = 0; i < div.length; i++ )
{if(div[i].className == ('c')) {div[i].style.zIndex = 1001;}}
//---

try{
cuturl = document.URL.substrsubstring(7);
var parts = cuturl.split('/');
vimeoplayer = 'vimeo_player_' + parts[1];
var vmplayer = $(vimeoplayer);
if(vmplayer){$(vimeoplayer).style.zIndex = 1001;$(vimeoplayer).style.visibility = 'visible';$(vimeoplayer).style.position = 'relative';}
}catch(e){}

div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{if(div[i].className == ('vimeo_holder')) {div[i].style.zIndex = 1001;div[i].style.position = 'relative';}}
}

// Justin.tv, fixed show video
else if (window.location.href.match(/http:\/\/(.*justin\.tv\/.*|.*justin\.tv\/.*\/b\/.*|.*justin\.tv\/.*\/w\/.*)/i)){
//intelligentvideodetection();

var live_frontpage_player_flash = $('live_frontpage_player_flash');
if(live_frontpage_player_flash){$('live_frontpage_player_flash').style.zIndex = 1001;$('live_frontpage_player_flash').style.visibility = 'visible';$('live_frontpage_player_flash').style.position = 'relative';}

var standard_holder = $('standard_holder');
if(standard_holder){$('standard_holder').style.zIndex = 1001;$('standard_holder').style.visibility = 'visible';$('standard_holder').style.position = 'relative';}

var live_site_player_container = $('live_site_player_container');
if(live_site_player_container){$('live_site_player_container').style.zIndex = 'auto';}

div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{if(div[i].className == ('wrapper')) {div[i].style.zIndex = 'auto';}}

var live_site_player_flash = $('live_site_player_flash');
if(live_site_player_flash){$('live_site_player_flash').style.zIndex = 1000;$('live_site_player_flash').style.visibility = 'visible';$('live_site_player_flash').style.position = 'relative';}
}

// Twitch.tv, fixed show video
else if (window.location.href.match(/http:\/\/(.*twitch\.tv\/.*|.*twitch\.tv\/.*\/b\/.*|.*twitch\.tv\/.*\/w\/.*)/i)){
intelligentvideodetection();

var live_frontpage_player_flash = $('live_frontpage_player_flash');
if(live_frontpage_player_flash){$('live_frontpage_player_flash').style.zIndex = 1001;$('live_frontpage_player_flash').style.visibility = 'visible';$('live_frontpage_player_flash').style.position = 'relative';}

var standard_holder = $('standard_holder');
if(standard_holder){$('standard_holder').style.zIndex = 1001;$('standard_holder').style.visibility = 'visible';$('standard_holder').style.position = 'relative';}

var live_site_player_container = $('live_site_player_container');
if(live_site_player_container){$('live_site_player_container').style.zIndex = 'auto';}

var live_site_player_flash = $('live_site_player_flash');
if(live_site_player_flash){$('live_site_player_flash').style.zIndex = 1000;$('live_site_player_flash').style.visibility = 'visible';$('live_site_player_flash').style.position = 'relative';}
}

// Metacafe, fixed show video
else if (window.location.href.match(/http:\/\/(www\.metacafe\.com\/watch\/.*|www\.metacafe\.com\/w\/.*)/i)){
intelligentvideodetection();

var fpObj = $('fpObj');
if(fpObj){$('fpObj').style.zIndex = 1000;$('fpObj').style.visibility = 'visible';$('fpObj').style.position = 'relative';}
}

// Dailymotion, fixed show video
else if (window.location.href.match(/http:\/\/(.*\.dailymotion\.com\/video\/.*|.*\.dailymotion\.com\/.*\/video\/.*)/i)){
intelligentvideodetection();

div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{if(div[i].className == ('dmpi_video_playerv4 span-8')) {div[i].style.zIndex = 1000;div[i].style.position = 'relative';}}

// HTML5 video
div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{if(div[i].className == ('controls_container')) {div[i].style.zIndex = 1000;}}
}

// Veoh, fixed show video
else if (window.location.href.match(/http:\/\/(www\.veoh\.com\/.*\/.*)/i)){
var videoPlayerContainer = $('videoPlayerContainer');
if(videoPlayerContainer){$('videoPlayerContainer').style.zIndex = 1001;$('videoPlayerContainer').style.visibility = 'visible';$('videoPlayerContainer').style.position = 'relative';}
}

// Rutube, fixed show video
else if (window.location.href.match('http://rutube.ru')){
intelligentvideodetection();

var player = $('player');
if(player){$('player').style.zIndex = 'auto';}

var nav = $('nav');
if(nav){$('nav').style.zIndex = 0;}

var header = $('header');
if(header){$('header').style.zIndex = 0;}

var main_menu = $('main_menu');
if(main_menu){$('main_menu').style.zIndex = 0;$('main_menu').style.position = 'relative';}

var pid = $('pid');
if(pid){$('pid').style.zIndex = 1000;}

var playerID = $('playerID');
if(playerID){$('playerID').style.zIndex = 1000;$('playerID').style.visibility = 'visible';$('playerID').style.position = 'relative';}

var VideoWall = $('VideoWall');
if(VideoWall){$('VideoWall').style.zIndex = 1000;$('VideoWall').style.visibility = 'visible';$('VideoWall').style.position = 'relative';}
}

// MyVideo, fixed show video
else if (window.location.href.match(/http:\/\/(.*myvideo\.de\/.*|www\.myvideo\.de\/.*\/.*)/i)){
var home_player_swf = $('home_player_swf');
if(home_player_swf){$('home_player_swf').style.zIndex = 1000;$('home_player_swf').style.visibility = 'visible';$('home_player_swf').style.position = 'relative';}

var video_player_swf = $('video_player_swf');
if(video_player_swf){$('video_player_swf').style.zIndex = 1000;$('video_player_swf').style.visibility = 'visible';$('video_player_swf').style.position = 'relative';}

var specials_video_player_swf = $('specials_video_player_swf');
if(specials_video_player_swf){$('specials_video_player_swf').style.zIndex = 1000;$('specials_video_player_swf').style.visibility = 'visible';$('specials_video_player_swf').style.position = 'relative';}

var series_player_swf = $('series_player_swf');
if(series_player_swf){$('series_player_swf').style.zIndex = 1000;$('series_player_swf').style.visibility = 'visible';$('series_player_swf').style.position = 'relative';}

var player_container = $('player_container');
if(player_container){$('player_container').style.zIndex = 1000;$('player_container').style.position = 'relative';}

var group_player_box = $('group_player_box');
if(group_player_box){$('group_player_box').style.zIndex = 1000;$('group_player_box').style.position = 'relative';}

var featuredvideo1_box_swf = $('featuredvideo1_box_swf');
if(featuredvideo1_box_swf){$('featuredvideo1_box_swf').style.zIndex = 1000;$('featuredvideo1_box_swf').style.visibility = 'visible';$('featuredvideo1_box_swf').style.position = 'relative';}
}

// hulu, fixed show video
else if (window.location.href.match(/http:\/\/(www\.hulu\.com\/watch.*|www\.hulu\.com\/w\/.*|hulu\.com\/watch.*|hulu\.com\/w\/.*)/i)){
var playercontainer = $('player-container');
if(playercontainer){$('player-container').style.zIndex = 1000;$('player-container').style.position = 'relative';}
}

// blip.tv, fixed show video
else if (window.location.href.match(/http:\/\/(.*blip\.tv\/.*|www\.blip\.tv\/.*\/.*)/i)){
var video_player_object = $('video_player_object');
if(video_player_object){$('video_player_object').style.zIndex = 1000;$('video_player_object').style.position = 'relative';}

var Content = $('Content');
if(Content){$('Content').style.zIndex = 'auto';}
}

// revision3.com, fixed show video
else if (window.location.href.match(/http:\/\/(.*revision3\.com\/.*|www\.revision3\.com\/.*\/.*)/i)){
intelligentvideodetection();
}

// zshare.net, fixed show video
else if (window.location.href.match(/http:\/\/(www\.zshare\.net\/.*\/.*)/i)){
var video_wrapper = $('video_wrapper');
if(video_wrapper){$('video_wrapper').style.zIndex = 1000;$('video_wrapper').style.position = 'relative';}

iframe = document.getElementsByTagName('iframe'); 
for(var i = 0; i < iframe.length; i++ ) 
{iframe[i].style.zIndex = 1000;iframe[i].style.position = 'relative';}
}

// crunchyroll.com, fixed show video
else if (window.location.href.match(/http:\/\/(www\.crunchyroll\.com\/.*\/.*)/i)){
var template_body = $('template_body');
if(template_body){$('template_body').style.zIndex = 'auto';}

var template_container = $('template_container');
if(template_container){$('template_container').style.zIndex = 'auto';}

var showmedia_video_player = $('showmedia_video_player');
if(showmedia_video_player){$('showmedia_video_player').style.zIndex = 1000;$('showmedia_video_player').style.position = 'relative';}
}

// muzu.tv, fixed show video
else if (window.location.href.match(/http:\/\/(.*muzu\.tv\/.*|www\.muzu\.tv\/.*\/.*)/i)){
var muzuplayer = $('muzuplayer');
if(muzuplayer){$('muzuplayer').style.zIndex = 1000;$('muzuplayer').style.position = 'relative';$('muzuplayer').style.visibility = 'visible';}
}

// ustream.tv, fixed show video
else if (window.location.href.match(/http:\/\/(www\.ustream\.tv\/recorded\/.*|www\.ustream\.tv\/channel\/.*|www\.ustream\.tv\/.*)/i)){
intelligentvideodetection();

var v2 = $('v2');
if(v2){$('v2').style.zIndex = 1000;$('v2').style.visibility = 'visible';$('v2').style.position = 'relative';}
}

// livestream.com, fixed show video
else if (window.location.href.match(/http:\/\/(www\.livestream\.com\/.*)/i)){
intelligentvideodetection();

var livestreamPlayer = $('livestreamPlayer');
if(livestreamPlayer){$('livestreamPlayer').style.visibility = 'visible';$('livestreamPlayer').style.zIndex = 1000;$('livestreamPlayer').style.position = 'relative';}

var livestreamChannelPlayer = $('livestreamChannelPlayer');
if(livestreamChannelPlayer){$('livestreamChannelPlayer').style.zIndex = 1000;$('livestreamChannelPlayer').style.position = 'relative';}
}

// videobash.com, fixed show video
else if (window.location.href.match(/http:\/\/(www\.videobash\.com\/.*\/.*)/i)){
intelligentvideodetection();

var player = $('player');
if(player){$('player').style.zIndex = 1000;$('player').style.position = 'relative';$('player').style.visibility = 'visible';}
}

// tv.com, fixed show video
else if (window.location.href.match(/http:\/\/(www\.tv\.com\/.*\/.*)/i)){
var canPlayer = $('canPlayer');
if(canPlayer){$('canPlayer').style.zIndex = 1000;$('canPlayer').style.position = 'relative';$('canPlayer').style.visibility = 'visible';}

var mymovie = $('mymovie');
if(mymovie){$('mymovie').style.zIndex = 1000;$('mymovie').style.position = 'relative';$('mymovie').style.visibility = 'visible';}

var flashcontent = $('flashcontent');
if(flashcontent){$('flashcontent').style.zIndex = 'auto';$('flashcontent').style.position = 'relative';$('flashcontent').style.visibility = 'visible';}
}

/////////// Social
// Google Profile page
else if (window.location.href.match('https://plus.google.com')){
div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ )
{if(div[i].className == ('Ye')) {div[i].style.zIndex = 'auto';}}

div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ )
{if(div[i].className == ('Gn')) {div[i].style.zIndex = 'auto';}}

div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ )
{if(div[i].className == ('ii')) {div[i].style.zIndex = 'auto';}}
}

// Netlog, fixed show video
else if (window.location.href.match(/http:\/\/(.*netlog\.com\/.*|.*netlog\.com\/.*\/b\/.*|.*netlog\.com\/.*\/w\/.*)/i)){
var video_player= $('video_player');
if(video_player){$('video_player').style.zIndex = 1001;$('video_player').style.visibility = 'visible';$('video_player').style.position = 'relative';}
}

// Facebook, fixed show video
else if (window.location.href.match(/((http:\/\/(.*facebook\.com\/.*|.*facebook\.com\/.*\/b\/.*|.*facebook\.com\/.*\/w\/.*))|(https:\/\/(.*facebook\.com\/.*|.*facebook\.com\/.*\/b\/.*|.*facebook\.com\/.*\/w\/.*)))/i)){
intelligentvideodetection();

div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{
if(div[i].className == ('__fbswf')) {div[i].style.zIndex = 1001;div[i].style.visibility = 'visible';div[i].style.position = 'relative';}
}

// blue bar on top
var blueBar= $('blueBar');
if(blueBar){$('blueBar').style.zIndex = 999;}

// video inside post
div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{
if(div[i].className == ('uiVideoThumb uiVideoThumbLoading ')) {div[i].style.zIndex = 1000;}
}

// video profile post
div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{
if(div[i].className == ('uiVideoThumb UIImageBlock_Image UIImageBlock_MED_Image uiVideoThumbLoading ') ) {div[i].style.zIndex = 1000;}
}

// video inside profile video
var videoplayer = $('player');
if(videoplayer){$('player').style.zIndex = 1000;$('player').style.visibility = 'visible';$('player').style.position = 'relative';}

// video inside post
div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{
if(div[i].className == ('UIMediaItem')) {div[i].style.zIndex = 1000;div[i].style.position = 'relative';}
}

// video post page
div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{
if(div[i].className == ('UIImageBlock clearfix exploded')) {div[i].style.zIndex = 1000;div[i].style.position = 'relative';}
}

// timeline
var timelinevideoiframe = document.getElementsByTagName('iframe');
for(var i = 0; i < timelinevideoiframe.length; i++ ){timelinevideoiframe[i].style.zIndex = 1000;timelinevideoiframe[i].style.visibility = 'visible';timelinevideoiframe[i].style.position = 'relative';}
}

// twitter, fixed show video
else if (window.location.href.match(/((http:\/\/(.*twitter\.com\/.*))|(https:\/\/(.*twitter\.com\/.*)))/i)){
// bar hide
div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{
if(div[i].className == ('topbar js-topbar')) {div[i].style.zIndex = 999;}
}

iframe = document.getElementsByTagName('iframe'); 
for(var i = 0; i < iframe.length; i++ ) 
{
cross = iframe[i].getAttribute('src');
if(cross.substring(0, 23) == 'https://www.youtube.com'){iframe[i].style.zIndex = 1000;iframe[i].style.position = 'relative';}
}

}

// MySpace, fixed show video
else if (window.location.href.match('http://www.myspace.com')){
var msVideoPlayer = $('msVideoPlayer');
if(msVideoPlayer){$('msVideoPlayer').style.zIndex = 1001;$('msVideoPlayer').style.visibility = 'visible';$('msVideoPlayer').style.position = 'relative';}
}

// vkontakte.ru (ru social network) fixed show video
else if (window.location.href.match(/http:\/\/(.*vkontakte\.ru\/.*|.*vkontakte\.ru\/.*\/b\/.*|.*vkontakte\.ru\/.*\/w\/.*)/i)){
var video_player = $('video_player');
if(video_player){$('video_player').style.visibility = 'visible';$('video_player').style.zIndex = 1000;$('video_player').style.position = 'relative';}

var flash_player_container = $('flash_player_container');
if(flash_player_container){$('flash_player_container').style.zIndex = 'auto';}
}

/////////// Image
// flickr video
else if (window.location.href.match(/http:\/\/(www\.flickr\.com\/photos\/.*|flic\.kr\/.*)/i)){
var photo = $('photo');
if(photo){$('photo').style.zIndex = 1000;}

var candy_nav_button_bar = $('candy_nav_button_bar');
if(candy_nav_button_bar){$('candy_nav_button_bar').style.zIndex = 0;$('candy_nav_button_bar').style.position = 'relative';}

var candy_search_button_bar = $('candy_search_button_bar');
if(candy_search_button_bar){$('candy_search_button_bar').style.zIndex = 0;$('candy_search_button_bar').style.position = 'relative';}

img = document.getElementsByTagName('img'); 
for(var i = 0; i < img.length; i++ ) 
{if(img[i].className == ('pc_img') ) {img[i].style.zIndex = 1000;img[i].style.position = 'relative';}}

var ajax_pagination = $('ajax_pagination');
if(ajax_pagination){$('ajax_pagination').style.zIndex = 1000;$('ajax_pagination').style.position = 'relative';}

img = document.getElementsByTagName('img'); 
for(var i = 0; i < img.length; i++ ) 
{if(img[i].className == ('reflect')) {img[i].style.zIndex = 1000;img[i].style.position = 'relative';}}
}

// Deviantart picture
else if (window.location.href.match(/http:\/\/(.*\.deviantart\.com\/art\/.*|.*\.deviantart\.com\/gallery\/.*|.*\.deviantart\.com\/#\/.*|fav\.me\/.*|.*\.deviantart\.com|.*\.deviantart\.com\/gallery|.*\.deviantart\.com\/.*\/.*\.jpg|.*\.deviantart\.com\/.*\/.*\.gif|.*\.deviantart\.net\/.*\/.*\.jpg|.*\.deviantart\.net\/.*\/.*\.gif)/i)){
div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{
if(div[i].className == ('browse2-results')) {div[i].style.zIndex = 1000;div[i].style.position = 'relative';}
}
var gmiPreviewStream= $('gmi-PreviewStream');
if(gmiPreviewStream){$('gmi-PreviewStream').style.zIndex = 1000;$('gmi-PreviewStream').style.position = 'relative';}

var browse2stream = $('browse2-stream');
if(browse2stream){$('browse2-stream').style.zIndex = 1000;$('browse2-stream').style.position = 'relative';}

var prevnextlinks= $('prev-next-links');
if(prevnextlinks){$('prev-next-links').style.zIndex = 1000;$('prev-next-links').style.position = 'relative';}
}

// Google Picasa
else if (window.location.href.match(/((http:\/\/(picasaweb\.google\.com.*\/.*\/.*#.*|picasaweb\.google\.com.*\/lh\/photo\/.*|picasaweb\.google\.com.*\/.*\/.*))|(https:\/\/(picasaweb\.google\.com.*\/.*\/.*#.*|picasaweb\.google\.com.*\/lh\/photo\/.*|picasaweb\.google\.com.*\/.*\/.*)))/i)){
var lhid_content = $('lhid_content');
if(lhid_content){$('lhid_content').style.visibility = 'visible';$('lhid_content').style.zIndex = 1000;$('lhid_content').style.position = 'relative';}
}

//Windows Media Player
//Silverlight
//Quicktime
// -> object,embed,applet,iframe
// -> turn on the flash detection

///////////

	// Black div on
	var blackon = $('stefanvdlightareoff1');

	function reader() {
		// save the current reader bar settings, before remove it
		if(readera == 'true'){
		var readerontext;
		var readeronrange;
		var readerlargestyle;
		var readerlargeimgclick;
		var readerlargetitleclick;

		function saveSetting(name, value) {chrome.extension.sendRequest({'name' : name, 'value' : value});}
		function textChanged() {saveSetting('readersaveme', readerontext.value);}
		function savereaderstyle(){
			if(readerlargestyle.style.width == '24px'){chrome.extension.sendRequest({'name' : 'readerlargestyle', 'value' : "false"});}
			else{chrome.extension.sendRequest({'name' : 'readerlargestyle', 'value' : "true"});}
		}

		readerontext = $('totlgammaVal');
		readeronrange = $('totlrange');
		if (readerontext != null && readeronrange != null) {
			textChanged();
		}
	
		readerlargestyle = $('__totl-tidbit-box');
		readerlargeimgclick = $('__totl-min');
		readerlargetitleclick = $('__totl-box-info');
		if (readerlargestyle != null && readerlargeimgclick != null && readerlargetitleclick != null) {
			savereaderstyle();
		}	
		}
	
		var totlreaderbar = $('totlreaderbar');
		if(totlreaderbar) {document.body.removeChild(totlreaderbar);}
		
		var totlcloud = $('stefanvdlightcloud');
		if(totlcloud) {document.body.removeChild(totlcloud);}
		
		// remove help div
		var stefanvdlightareoffcustom = $('stefanvdlightareoffcustom');
		if(stefanvdlightareoffcustom) {
		document.body.removeChild(stefanvdlightareoffcustom);
		document.body.style.cursor = "default";
		}
		window.onmousemove = null;
		
		// YouTube video title (set back to default)
		var eowtitle = $('eow-title');
		if(eowtitle){$('eow-title').style.color = '#333';$('eow-title').style.zIndex = 'auto';$('eow-title').style.position = 'relative';}
		// YouTube video view count (set back to default)
		var eowtitle = $('eow-title');
		if(eowtitle){$('eow-title').style.color = '#333';$('eow-title').style.zIndex = 'auto';$('eow-title').style.position = 'relative';}
		span = document.getElementsByTagName('span'); 
		for(var i = 0; i < span.length; i++ )
		{if(span[i].className == ('watch-view-count')) {span[i].style.color = '#333';span[i].style.zIndex = 'auto';span[i].style.position = 'relative';}}		
	}
	
	function removenewframe() {
		var stefanvdlightareoff1 = $('stefanvdlightareoff1');
		var stefanvdlightareoff2 = $('stefanvdlightareoff2');
		var stefanvdlightareoff3 = $('stefanvdlightareoff3');
		var stefanvdlightareoff4 = $('stefanvdlightareoff4');
		var stefanvddynamicbackground = $('stefanvddynamicbackground');
		if(stefanvdlightareoff1) {document.body.removeChild(stefanvdlightareoff1);}
		if(stefanvdlightareoff2) {document.body.removeChild(stefanvdlightareoff2);}
		if(stefanvdlightareoff3) {document.body.removeChild(stefanvdlightareoff3);}
		if(stefanvdlightareoff4) {document.body.removeChild(stefanvdlightareoff4);}
		if(stefanvddynamicbackground) {document.body.removeChild(stefanvddynamicbackground);}
	}
	
chrome.extension.sendRequest({comando:'totlrequest'}, function(response){
mousespotlighto = response.mousespotlighto;if(!mousespotlighto)mousespotlighto = 'true'; // default mousespotlight true
mousespotlightc = response.mousespotlightc;if(!mousespotlightc)mousespotlightc = 'false'; // default mousespotlight false
mousespotlighta = response.mousespotlighta;if(!mousespotlighta)mousespotlighta = 'false'; // default mousespotlight false
lightcolor = response.lightcolor;if(lightcolor)lightcolor = response.lightcolor;else lightcolor = '#000000'; // default color black
lightimagea = response.lightimagea;
lightimage = response.lightimage;
interval = response.interval;if(!interval)interval = 80; default_opacity = interval; // default interval 80%
fadein = response.fadein;if(!fadein)fadein = 'true'; // default fadein true
fadeout = response.fadeout;if(!fadeout)fadeout = 'true'; // default fadeout true
readera = response.readera;if(!readera)readera = 'false'; // default readera false
readerlargestyle = response.readerlargestyle;if(!readerlargestyle)readerlargestyle = 'true'; // default large style
mousespotlightt = response.mousespotlightt;if(!mousespotlightt)mousespotlightt = 'false'; // default mousespotlight false
enterpassword = response.enterpassword;
password = response.password;if(!password)password = 'false';
dynamic = response.dynamic;if(!dynamic)dynamic = 'false'; // default dynamic false
dynamic1 = response.dynamic1;
dynamic2 = response.dynamic2;
dynamic3 = response.dynamic3;
dynamic4 = response.dynamic4;
dynamic5 = response.dynamic5;

// Password in document
// taart make it remove or not
var i18nlockentername = chrome.i18n.getMessage("lockentername");
var i18nlockwrongpassword = chrome.i18n.getMessage("lockwrongpassword");

function taart(){
var pwon2 = $('stefanvdlightareoffpw');
	if(pwon2){
		var entername = prompt(i18nlockentername,'');
		if(enterpassword == entername){
		document.body.removeChild(pwon2);
		if(fadeout == 'true'){ReducingFinished = false;fader('hide');reader();} 
		else {removenewframe();reader();}
		} else {alert(i18nlockwrongpassword);}	
	} else {
		if(fadeout == 'true'){ReducingFinished = false;fader('hide');reader();}
		else {removenewframe();reader();}
	}
}

// Paswoord enable
var pwon = $('stefanvdlightareoffpw');
if(password == 'true'){
	if(pwon){
		var entername = prompt(i18nlockentername,'');
		if(enterpassword == entername){document.body.removeChild(pwon);lightsgoonoroff();} else {alert(i18nlockwrongpassword);}	
	} else {
		lightsgoonoroff();
	    var newpw = document.createElement("div");
	    newpw.setAttribute('id','stefanvdlightareoffpw');
        newpw.style.display = 'none';
	    document.body.appendChild(newpw);
	}
} else {
lightsgoonoroff();
}

function lightsgoonoroff() {
	if(blackon) {
		if(dynamic == 'true'){
			removenewframe();
		}
		if((mousespotlightc == 'true') || (mousespotlighta == 'true')){
			// fade out effect
			if(fadeout == 'true'){taart();}
			else{taart();}
		}
		else {
		// fade out effect
		if(fadeout == 'true'){taart();}
		else{taart();}
		}
	}
	else {	
		default_opacity = interval;

	    if(mousespotlighta == 'true'){
	    var newframe1 = document.createElement("div");
	    newframe1.setAttribute('id','stefanvdlightareoff1');
	    newframe1.setAttribute('class','stefanvdlightareoff');
		var mousespotlightstyle = '-webkit-gradient(radial, -50 -50, 50, -50 -50, 42, from(' + lightcolor + '), to(rgba(0,0,0,0)))';
		
		newframe1.style.backgroundImage = mousespotlightstyle;
		newframe1.style.pointerEvents = 'none'; // make it possible to click on a link 
        newframe1.style.opacity = 0;
        newframe1.style.zIndex = 999;
	    document.body.appendChild(newframe1);
		
	    // fade out effect
		// no click posible

        // fade in effect
		if(fadein == 'true'){fader('show');}
        else{newframe1.style.opacity = default_opacity/100;} // no fade effect	
		
		var spot = $('stefanvdlightareoff1');
		var width = document.documentElement.clientWidth;
		var height = document.documentElement.clientHeight;
		
		function moveSpot(e){
		var x = 0; var y = 0;
		if (!e) var e = window.event;
		if (e.clientX || e.clientY)
		{
			x = e.clientX; y = e.clientY;
		}
		
		var style = '-webkit-gradient(radial, '+x+' '+y+', 50, '+x+' '+y+', 42, from(' + lightcolor + '), to(rgba(0,0,0,0)))';
		spot.style.opacity = default_opacity/100;
		spot.style.backgroundImage = style;
		}
		window.onmousemove = moveSpot;
		}
		else if(mousespotlightc == 'true'){
		var beginxcordinate = null;var beginycordinate = null;var endxcordinate = null;var endycordinate = null;
		var customview;var posx;var posy;var initx = false;var inity = false;
		
		function getMouse(obj,e){
		posx = 0;posy = 0;
		var ev = (!e)?window.event:e;
		if (ev.clientX){
			posx = ev.clientX;
			posy = ev.clientY;
		}
		else{return 0}

		obj.addEventListener("mousedown", function(){
		initx = posx; inity = posy;
		beginxcordinate = posx;beginycordinate = posy;
		try {
			customview = $('stefanvdlightareoffcustom');
			customview.style.left = initx + 'px';customview.style.top = inity + 'px';
			document.body.appendChild(customview);
		}
		catch(err){}
		});
		obj.addEventListener("mouseup", function(){initx = false;inity = false;});
		if(initx){
		customview.style.width = Math.abs(posx - initx) + 'px';customview.style.height = Math.abs(posy - inity) + 'px';
		customview.style.left = posx - initx < 0 ?posx + 'px':initx + 'px';
		customview.style.top = posy - inity < 0 ?posy + 'px':inity + 'px';
		
		endxcordinate = posx;endycordinate = posy;
		// remove help div
		var stefanvdlightareoffcustom = $('stefanvdlightareoffcustom');
		if(stefanvdlightareoffcustom) {document.body.removeChild(stefanvdlightareoffcustom);}
		document.body.style.cursor = "default";
		}
		
		else{return false}
		var viewpartwidth = customview.style.width;
		var viewpartheight = customview.style.height;
		
		var view1 = $('stefanvdlightareoff1');
		view1.className = 'stefanvdlightareoff';
		view1.style.left = 0 + 'px';view1.style.top = 0 + 'px';
		view1.style.width = '100%';view1.style.height = beginycordinate + 'px';
		view1.style.visibility = 'visible';
		document.body.appendChild(view1);
		
		var view2 = $('stefanvdlightareoff2');
		view2.className = 'stefanvdlightareoff';
		view2.style.left = 0 + 'px';view2.style.top = beginycordinate + 'px';
		view2.style.width = beginxcordinate + 'px';view2.style.height = viewpartheight;
		view2.style.visibility = 'visible';
		document.body.appendChild(view2);
		
		var view3 = $('stefanvdlightareoff3');
		var viewcall3awidth = window.innerWidth - beginxcordinate; // calc width
		view3.className = 'stefanvdlightareoff';
		view3.style.left = endxcordinate + 'px';view3.style.top = beginycordinate + 'px';
		view3.style.width = viewcall3awidth + 'px';view3.style.height = viewpartheight;
		view3.style.visibility = 'visible';
		document.body.appendChild(view3);
		
		var view4 = $('stefanvdlightareoff4');
		var viewcall4aheight = window.innerHeight - endycordinate; // calc height
		view4.className = 'stefanvdlightareoff';
		view4.style.left = 0 + 'px';view4.style.top = endycordinate + 'px';
		view4.style.width='100%';view4.style.height = viewcall4aheight + 'px';
		view4.style.visibility = 'visible';
		document.body.appendChild(view4);
		
		var calcpartx = endxcordinate - beginxcordinate;
		var calcparty = endycordinate - beginycordinate;
	if((calcpartx < 0) &&! (calcparty < 0)){ // X as automatic change view
		var view1 = $('stefanvdlightareoff1');
		view1.className = 'stefanvdlightareoff';
		view1.style.left = 0 + 'px';view1.style.top = 0 + 'px';
		view1.style.width = '100%';view1.style.height = beginycordinate + 'px';
		view1.style.visibility = 'visible';
		document.body.appendChild(view1);	
	
		var view2 = $('stefanvdlightareoff2');
		view2.className = 'stefanvdlightareoff';
		view2.style.left = 0 + 'px';view2.style.top = beginycordinate + 'px';
		view2.style.width = endxcordinate + 'px';view2.style.height = viewpartheight;
		view2.style.visibility = 'visible';
		document.body.appendChild(view2);
		
		var view3 = $('stefanvdlightareoff3');
		var viewcall3bwidth = window.innerWidth - beginxcordinate; // calc width
		view3.className = 'stefanvdlightareoff';
		view3.style.left = beginxcordinate + 'px';view3.style.top = beginycordinate + 'px';
		view3.style.width = viewcall3bwidth + 'px';view3.style.height = viewpartheight;
		view3.style.visibility = 'visible';
		document.body.appendChild(view3);
		
		var view4 = $('stefanvdlightareoff4');
		var viewcall4bheight = window.innerHeight - endycordinate; // calc height
		view4.className = 'stefanvdlightareoff';
		view4.style.left = 0 + 'px';view4.style.top = endycordinate + 'px';
		view4.style.width='100%';view4.style.height = viewcall4bheight + 'px';
		view4.style.visibility = 'visible';
		document.body.appendChild(view4);
	}
	else if((calcparty < 0) &&! (calcpartx < 0)){ // Y as automatic change view
		var view1 = $('stefanvdlightareoff1');
		view1.className = 'stefanvdlightareoff';
		view1.style.left = 0 + 'px';view1.style.top = 0 + 'px';
			if(endycordinate < 0){endycordinate = 0;}
		view1.style.width = '100%';view1.style.height = endycordinate + 'px';
		view1.style.visibility = 'visible';
		document.body.appendChild(view1);

		var view2 = $('stefanvdlightareoff2');
		view2.className = 'stefanvdlightareoff';
		view2.style.left = 0 + 'px';view2.style.top = endycordinate + 'px';
		view2.style.width = beginxcordinate + 'px';
			if(endycordinate == 0){view2.style.height = beginycordinate + 'px';}else{view2.style.height = viewpartheight;}
		view2.style.visibility = 'visible';
		document.body.appendChild(view2);
		
		var view3 = $('stefanvdlightareoff3');
		var viewcall3cwidth = window.innerWidth - beginxcordinate; // calc width
		view3.className = 'stefanvdlightareoff';
		view3.style.left = endxcordinate + 'px';view3.style.top = endycordinate + 'px';
		view3.style.width = viewcall3cwidth + 'px';
			if(endycordinate == 0){view3.style.height = beginycordinate + 'px';}else{view3.style.height = viewpartheight;}
		view3.style.visibility = 'visible';
		document.body.appendChild(view3);

		var view4 = $('stefanvdlightareoff4');
		var viewcall4cheight = window.innerHeight - endycordinate; // calc height
		view4.className = 'stefanvdlightareoff';
		view4.style.left = 0 + 'px';view4.style.top = beginycordinate + 'px';
		view4.style.width='100%';view4.style.height = viewcall4cheight + 'px';
		view4.style.visibility = 'visible';
		document.body.appendChild(view4);		
	}
	else if((calcpartx < 0) && (calcparty < 0)){ // X en Y as automatic change view
		var view1 = $('stefanvdlightareoff1');
		view1.className = 'stefanvdlightareoff';
		view1.style.left = 0 + 'px';view1.style.top = 0 + 'px';
			if(endycordinate < 0){endycordinate = 0;}
		view1.style.width = '100%';view1.style.height = endycordinate + 'px';
		view1.style.visibility = 'visible';
		document.body.appendChild(view1);
		
		var view2 = $('stefanvdlightareoff2');
		view2.className = 'stefanvdlightareoff';
		view2.style.left = 0 + 'px';view2.style.top = endycordinate + 'px';
		view2.style.width = endxcordinate + 'px';
			if(endycordinate == 0){view2.style.height = beginycordinate + 'px';}else{view2.style.height = viewpartheight;}
		view2.style.visibility = 'visible';
		document.body.appendChild(view2);
		
		var view3 = $('stefanvdlightareoff3');
		var viewcall3dwidth = window.innerWidth - beginxcordinate; // calc width
		view3.className = 'stefanvdlightareoff';
		view3.style.left = beginxcordinate + 'px';view3.style.top = endycordinate + 'px';
		view3.style.width = viewcall3dwidth + 'px';
			if(endycordinate == 0){view3.style.height = beginycordinate + 'px';}else{view3.style.height = viewpartheight;}
		view3.style.visibility = 'visible';
		document.body.appendChild(view3);		
		
		var view4 = $('stefanvdlightareoff4');
		var viewcall4dheight = window.innerHeight - beginycordinate; // calc height
		view4.className = 'stefanvdlightareoff';
		view4.style.left = 0 + 'px';view4.style.top = beginycordinate + 'px';
		view4.style.width = '100%';view4.style.height = viewcall4dheight + 'px';
		view4.style.visibility = 'visible';
		document.body.appendChild(view4);
	}
		}
		
		window.onmousemove = function(event){try {getMouse(window,event);}catch(err){}};
		
	    var newframe1 = document.createElement("div");
	    var newframe2 = document.createElement("div");
	    var newframe3 = document.createElement("div");
	    var newframe4 = document.createElement("div");
		var newframe5 = document.createElement("div");
	    newframe1.setAttribute('id','stefanvdlightareoff1');
	    newframe2.setAttribute('id','stefanvdlightareoff2');
	    newframe3.setAttribute('id','stefanvdlightareoff3');
	    newframe4.setAttribute('id','stefanvdlightareoff4');
	    newframe1.setAttribute('class','stefanvdlightareoff');
	    newframe2.setAttribute('class','stefanvdlightareoff');
	    newframe3.setAttribute('class','stefanvdlightareoff');
	    newframe4.setAttribute('class','stefanvdlightareoff');
		newframe5.setAttribute('id','stefanvdlightareoffcustom');
		newframe1.style.background = lightcolor;
		newframe2.style.background = lightcolor;
		newframe3.style.background = lightcolor;
		newframe4.style.background = lightcolor;
	    newframe2.style.visibility = 'hidden';
	    newframe3.style.visibility = 'hidden';
	    newframe4.style.visibility = 'hidden';
	    document.body.appendChild(newframe1);
	    document.body.appendChild(newframe2);
	    document.body.appendChild(newframe3);
	    document.body.appendChild(newframe4);
		document.body.appendChild(newframe5);
		document.body.style.cursor = 'crosshair'; // show cursor
		
	    // fade out effect      
		if(fadeout == 'true'){
		newframe1.addEventListener("click", function() {taart();});
		newframe2.addEventListener("click", function() {taart();});
		newframe3.addEventListener("click", function() {taart();});
		newframe4.addEventListener("click", function() {taart();});
		}
        else{
		newframe1.addEventListener("click", function() {taart();});
		newframe2.addEventListener("click", function() {taart();});
		newframe3.addEventListener("click", function() {taart();});
		newframe4.addEventListener("click", function() {taart();});
		}

        // fade in effect      
		if(fadein == 'true'){fader('show');}
        else{newframe1.style.opacity = default_opacity/100;newframe2.style.opacity = default_opacity/100;newframe3.style.opacity = default_opacity/100;newframe4.style.opacity = default_opacity/100;} // no fade effect
		}
		else if(mousespotlightt == 'true'){
		var newdiv = document.createElement('div'); 
        newdiv.setAttribute('id','stefanvdlightareoff1');
        newdiv.setAttribute('class','stefanvdlightareoff');
		newdiv.style.width = '100%'; 
        newdiv.style.height = '100%'; 
        newdiv.style.left = 0; 
        newdiv.style.top = 0; 
        newdiv.style.position = 'fixed';
		newdiv.style.pointerEvents = 'none'; // make it possible to click on a link 
		/* if image background, load it then */
			if (lightimagea == 'true'){newdiv.style.background = "url('"+lightimage+"')";newdiv.style.backgroundSize = "100% 100%";}
			else {newdiv.style.background = lightcolor;}
		/*-------------*/    
        newdiv.style.opacity = 0;
        newdiv.style.zIndex = 999;
		
        document.body.appendChild(newdiv);
	  
	    // fade out effect      
		if(fadeout == 'true'){newdiv.addEventListener("click", function() {taart();})}
        else{newdiv.addEventListener("click", function() {taart();})}

        // fade in effect      
		if(fadein == 'true'){fader('show');}
        else{newdiv.style.opacity = default_opacity/100;} // no fade effect		
		}
		else { // Begin normal lights off		 
		var newdiv = document.createElement('div'); 
        newdiv.setAttribute('id','stefanvdlightareoff1');
        newdiv.setAttribute('class','stefanvdlightareoff');
		newdiv.style.width = '100%'; 
        newdiv.style.height = '100%'; 
        newdiv.style.left = 0; 
        newdiv.style.top = 0; 
        newdiv.style.position = 'fixed';
		/* if image background, load it then */
			if (lightimagea == 'true'){newdiv.style.background = "url('"+lightimage+"')";newdiv.style.backgroundSize = "100% 100%";}
			else {newdiv.style.background = lightcolor;}
		/*-------------*/    
        newdiv.style.opacity = 0;
        newdiv.style.zIndex = 999;
		
        document.body.appendChild(newdiv);
	  
	    // fade out effect      
		if(fadeout == 'true'){newdiv.addEventListener("click", function() {taart();})}
        else{newdiv.addEventListener("click", function() {taart();})}

        // fade in effect      
		if(fadein == 'true'){fader('show');}
        else{newdiv.style.opacity = default_opacity/100;} // no fade effect		
		}

/////////// Turn Off the Lights reader slider
	// Show always option
	if(readera == 'true'){
	// script readerbar
	function showValue(newValue){$("totlgammaVal").value = newValue;$("totlrange").value = newValue;div = document.getElementsByTagName("div");
	for(var i = 0; i < div.length; i++ ){if(div[i].className == ("stefanvdlightareoff")) {div[i].style.opacity = (newValue/100);}}}

	function toggle_small() {
	var totlreader = $("__totl-tidbit-box");var totlreadermin = $("__totl-min");
	if ( totlreader.style.width != "24px" ) {totlreader.style.width = "24px";totlreader.style.height = "24px";totlreadermin.style.opacity = "0";}
	else {totlreader.style.width = "";totlreader.style.height = "";totlreadermin.style.opacity = "100";}}

	// Injected js to page
	var totlreaderbar = document.createElement('div');
	totlreaderbar.setAttribute('id','totlreaderbar');
	document.body.appendChild(totlreaderbar);
	var totlreaderbardiv1 = document.createElement('div');
	totlreaderbardiv1.setAttribute('id','__totl-tidbit-box');

	// if false then use small view
	if(readerlargestyle == 'false'){totlreaderbardiv1.style.width = "24px";totlreaderbardiv1.style.height = "24px";}

	totlreaderbar.appendChild(totlreaderbardiv1);
	var totlreaderbardiv2 = document.createElement('div');
	totlreaderbardiv2.setAttribute('id','__totl-wrapper');
	totlreaderbardiv1.appendChild(totlreaderbardiv2);
	var totlreaderbarimg1 = document.createElement('img');
	totlreaderbarimg1.setAttribute('id','__totl-min');
	totlreaderbarimg1.setAttribute('src',''+chrome.extension.getURL("/images/minimize.png")+'');
	totlreaderbarimg1.addEventListener('click', function (e) {toggle_small()}, true);
	totlreaderbarimg1.addEventListener("mouseover", function (e) {totlreaderbarimg1.setAttribute('src',''+chrome.extension.getURL("/images/minimize_on.png")+'');}, false);
	totlreaderbarimg1.addEventListener("mouseout", function (e) {totlreaderbarimg1.setAttribute('src',''+chrome.extension.getURL("/images/minimize.png")+'');}, false);

	// if false then use small view
	if(readerlargestyle == 'false'){totlreaderbarimg1.style.opacity = "0";}

	totlreaderbardiv2.appendChild(totlreaderbarimg1);
	var totlreaderbardiv3 = document.createElement('div');
	totlreaderbardiv3.setAttribute('id','__totl-box-info');
	totlreaderbardiv3.className = '__totl-box-title';
	totlreaderbardiv3.style.backgroundImage = 'url('+chrome.extension.getURL("/icons/icon16.png")+')';
	totlreaderbardiv3.addEventListener('click', function (e) {toggle_small()}, true);
	totlreaderbardiv2.appendChild(totlreaderbardiv3);
	var totlreaderbarspan1 = document.createElement('span');
	totlreaderbarspan1.className = '__totl-nowrap';
	totlreaderbardiv3.appendChild(totlreaderbarspan1);
	var totlreaderbartxt1 = document.createTextNode('Turn Off the Lights');
	totlreaderbarspan1.appendChild(totlreaderbartxt1);
	var totlreaderbardiv4 = document.createElement('div');
	totlreaderbardiv4.setAttribute('id','__totl-box-tidbits');
	totlreaderbardiv2.appendChild(totlreaderbardiv4);
	var totlreaderbardiv5 = document.createElement('div');
	totlreaderbardiv5.className = '__totl-box-msg';
	totlreaderbardiv4.appendChild(totlreaderbardiv5);
	var totlreaderbartable1 = document.createElement('table');
	totlreaderbardiv5.appendChild(totlreaderbartable1);
	var totlreaderbartbody1 = document.createElement('tbody');
	totlreaderbartable1.appendChild(totlreaderbartbody1);
	var totlreaderbartr1 = document.createElement('tr');
	totlreaderbartbody1.appendChild(totlreaderbartr1);
	var totlreaderbartd1 = document.createElement('td');
	totlreaderbartr1.appendChild(totlreaderbartd1);
	var totlreaderbarinput1 = document.createElement('input');
	totlreaderbarinput1.setAttribute('type','range');
	totlreaderbarinput1.setAttribute('id','totlrange');
	totlreaderbarinput1.setAttribute('min','0');
	totlreaderbarinput1.setAttribute('max','100');
	totlreaderbarinput1.setAttribute('step','1');
	totlreaderbarinput1.setAttribute('value','0');
	totlreaderbarinput1.addEventListener('change', function (e) {showValue(this.value)}, true);
	totlreaderbartd1.appendChild(totlreaderbarinput1);
	var totlreaderbartd2 = document.createElement('td');
	totlreaderbartr1.appendChild(totlreaderbartd2);
	var totlreaderbarinput2 = document.createElement('input');
	totlreaderbarinput2.setAttribute('id','totlgammaVal');
	totlreaderbarinput2.setAttribute('maxlength','3');
	totlreaderbarinput2.setAttribute('size','3');
	totlreaderbarinput2.setAttribute('type','text');
	totlreaderbarinput2.setAttribute('value','0');
	totlreaderbarinput2.addEventListener('change', function (e) {showValue(this.value)}, true);
	totlreaderbartd2.appendChild(totlreaderbarinput2);

// settings reader slider
	$('totlgammaVal').value = interval;
	$('totlrange').value = interval;
} //End option always

// start dynamic
		if(dynamic == 'true'){
			var newdynmaster = document.createElement("div");newdynmaster.setAttribute('id','stefanvddynamicbackground');document.body.appendChild(newdynmaster);
			if(dynamic1 == 'true'){
				var newdynleft = document.createElement("div");newdynleft.setAttribute('class','stefanvddynamicbackgroundbubbleleft');newdynmaster.appendChild(newdynleft);
				for(var i = 0; i < 5; i++ ){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundbubbles stefanvddynamicbubbles'+i+'');newdynleft.appendChild(newdyn);}
				var newdynmid = document.createElement("div");newdynmid.setAttribute('class','stefanvddynamicbackgroundbubblemid');newdynmaster.appendChild(newdynmid);
				for(var i = 6; i < 10; i++ ){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundbubbles stefanvddynamicbubbles'+i+'');newdynmid.appendChild(newdyn);}
				var newdynright = document.createElement("div");newdynright.setAttribute('class','stefanvddynamicbackgroundbubbleright');newdynmaster.appendChild(newdynright);	
				for(var i = 11; i < 16; i++ ){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundbubbles stefanvddynamicbubbles'+i+'');newdynright.appendChild(newdyn);}				
			}
			else if(dynamic2 == 'true'){
				var newdynleft = document.createElement("div");newdynleft.setAttribute('class','stefanvddynamicbackgroundblockleft');newdynmaster.appendChild(newdynleft);
				for(var i = 1; i < 21; i++ ){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundblocks stefanvddynamicblocks'+i+'');newdynleft.appendChild(newdyn);}
				var newdynright = document.createElement("div");newdynright.setAttribute('class','stefanvddynamicbackgroundblockright');newdynmaster.appendChild(newdynright);
				for(var i = 22; i < 42; i++ ){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundblocks stefanvddynamicblocks'+i+'');newdynright.appendChild(newdyn);}
			}
			else if(dynamic3 == 'true'){
				var newdynleft = document.createElement("div");newdynleft.setAttribute('class','stefanvddynamicbackgroundblockleft');newdynmaster.appendChild(newdynleft);
				for(var i = 0; i < 15; i++ ){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundraindrups b'+i+'');newdynleft.appendChild(newdyn);}
				var newdynright = document.createElement("div");newdynright.setAttribute('class','stefanvddynamicbackgroundblockright');newdynmaster.appendChild(newdynright);
				for(var i = 16; i < 31; i++ ){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundraindrups b'+i+'');newdynright.appendChild(newdyn);}
			}
			else if(dynamic4 == 'true'){
				var newdynworld = document.createElement("div");newdynworld.setAttribute('id','stefanvdworld');newdynmaster.appendChild(newdynworld);			
(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelRequestAnimationFrame = window[vendors[x]+'CancelRequestAnimationFrame'];
		}
		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
				  timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};

		if (!window.cancelAnimationFrame)window.cancelAnimationFrame = function(id) {clearTimeout(id);};
	}())

	var layers = [],objects = [],world = document.getElementById('stefanvdworld'),viewport = document.getElementById('stefanvddynamicbackground'),	
	d = 0,p = 400,worldXAngle = 0,worldYAngle = 0;
	
	viewport.style.webkitPerspective = p;viewport.style.MozPerspective = p;viewport.style.oPerspective = p;
	generate();
	
	function createCloud() {
		var div = document.createElement( 'div'  );
		div.className = 'stefanvdcloudBase';
		var x = 256 - ( Math.random() * 512 );
		var y = 256 - ( Math.random() * 512 );
		var z = 256 - ( Math.random() * 512 );
		var t = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(' + z + 'px)';
		div.style.webkitTransform = t;div.style.MozTransform = t;div.style.oTransform = t;
		world.appendChild(div);
		
		for( var j = 0; j < 5 + Math.round( Math.random() * 10 ); j++ ) {
			var cloud = document.createElement('div');
			cloud.style.opacity = 0;
			cloud.style.opacity = .8;
			cloud.className = 'stefanvdcloudLayer';
			var x = 256 - ( Math.random() * 512 );
			var y = 256 - ( Math.random() * 512 );
			var z = 100 - ( Math.random() * 200 );
			var a = Math.random() * 360;;
			var s = .25 + Math.random();
			x *= .2; y *= .2;
			cloud.data = {x: x,y: y,z: z,a: a,s: s,speed: .1 * Math.random()};
			var t = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(' + z + 'px) rotateZ(' + a + 'deg) scale(' + s + ')';
			cloud.style.webkitTransform = t;cloud.style.MozTransform = t;cloud.style.oTransform = t;
			div.appendChild(cloud);
			layers.push(cloud);
		}
		return div;
	}
	
	function generate() {
		objects = [];
		if (world.hasChildNodes()) {
			while ( world.childNodes.length >= 1 ) {world.removeChild(world.firstChild);} 
		}
		for(var j = 0; j < 5; j++) {objects.push(createCloud());}
	}
	
	function updateView(){
		var t = 'translateZ( ' + d + 'px ) rotateX( ' + worldXAngle + 'deg) rotateY( ' + worldYAngle + 'deg)';
		world.style.webkitTransform = t;world.style.MozTransform = t;world.style.oTransform = t;}
	
	function update (){
		for( var j = 0; j < layers.length; j++ ) {
			var layer = layers[ j ];
			layer.data.a += layer.data.speed;
			var t = 'translateX(' + layer.data.x + 'px) translateY(' + layer.data.y + 'px) translateZ(' + layer.data.z + 'px) rotateY(' + ( - worldYAngle ) + 'deg) rotateX(' + ( - worldXAngle ) + 'deg) rotateZ(' + layer.data.a + 'deg) scale(' + layer.data.s + ')';
			layer.style.webkitTransform = t;layer.style.MozTransform = t;layer.style.oTransform = t;
		}
		requestAnimationFrame(update);
	}
	update();
			}
			else if(dynamic5 == 'true'){
				var newdynspaceworld = document.createElement("div");newdynspaceworld.setAttribute('id','stefanvddynamicspace');newdynmaster.appendChild(newdynspaceworld);			
				for(var j = 1; j < 17; j++ ){
				if(j<=9){j="0"+j}
					var newdynpart1 = document.createElement("div");
					newdynpart1.setAttribute('id','p'+ j);newdynspaceworld.appendChild(newdynpart1);
					for(var i = 1; i < 31; i++ ){
					if(i<=9){i="0"+i}
					var newdynlow = document.createElement("b");newdynlow.setAttribute('class','s0'+i+'');newdynpart1.appendChild(newdynlow);
					}
				}
			}
		} // end dynamic
	}
	
	}

});

///////////

// animation browser engine
window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

// Fade engine
//  Variable for the fade in and out effect
var opacity = 0;

var ReducingFinished = true;
var OpacityLevelIncrement = 10;   //  Percentage value: 1-100

//  Function determines whether we show or hide the item referenced by ElementID
function fader(ActionToTake)
{
  DIVElementById = $('stefanvdlightareoff1');
  if (ActionToTake == 'hide')
  { opacity = default_opacity; reduceOpacity(); }
  else if (ActionToTake == 'show')
  { increaseOpacity(); }
}

//  Makes div increase
function increaseOpacity()
{
try {
  //  If opacity level is less than default_opacity, we can still increase the opacity
  if ((opacity < default_opacity) && (ReducingFinished == true))
  {
	if ((opacity > (default_opacity-10)) && (ReducingFinished == true)){
    ReducingFinished = true;
    opacity  += (default_opacity - opacity);
    DIVElementById.style.opacity = opacity/100;
	window.requestAnimFrame(increaseOpacity);
	}
	else {
    ReducingFinished = true;
    opacity  += OpacityLevelIncrement;
    DIVElementById.style.opacity = opacity/100;
	window.requestAnimFrame(increaseOpacity);
	}
  }
  else
  {
    ReducingFinished = false;
  }
//control opacity for all <div>
var div = document.querySelectorAll('div.stefanvdlightareoff');
for(var i = 0; i < div.length; i++ ){div[i].style.opacity = opacity/100;}
} catch(e){}
}

//  Makes div reduce
function reduceOpacity() 
{
try {
  //  If opacity level is greater than 0, we can still reduce the opacity
  if ((opacity > 0) && (ReducingFinished == false))
  {
    ReducingFinished = false;
    opacity  -= OpacityLevelIncrement;
    DIVElementById.style.opacity = opacity/100;
	window.requestAnimFrame(reduceOpacity);
  }
  else
  {
    ReducingFinished = true;

    //  When finished, make sure the DIVElementById is set to remove element
    if (DIVElementById.style.opacity = '0')
    {document.body.removeChild(DIVElementById);removenewframe();}
  }
//control opacity for all <div>
var div = document.querySelectorAll('div.stefanvdlightareoff');
for(var i = 0; i < div.length; i++ ){div[i].style.opacity = opacity/100;}
} catch(e){}
}