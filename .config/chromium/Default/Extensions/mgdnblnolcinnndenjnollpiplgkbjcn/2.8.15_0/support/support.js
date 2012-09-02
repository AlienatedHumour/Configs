// Support code (c) 2011 All Rights Reserved.
// If you want to review the code please contact me at aproject180@gmail.com
// If you don't wish to support me you may disable it in the settings. 

(function(window, document, extension){

if (typeof p180 == "undefined") return;

var base_url = "http://www.imgclck.com/supp0rt/www/delivery";
var delivery_url = base_url + "/afr.php"; 
var refresh = 110; // [sec]

var ad728 = generate_ad.apply(0, p180.zones[0]);
var ad300 = generate_ad.apply(0, p180.zones[1]);
var ad160 = generate_ad.apply(0, p180.zones[2]);

function generate_ad(zoneid, width, height, beacon, n) {

  var info    = extension.getURL("./support/pages/adoptions.html");
  var privacy = extension.getURL("./support/pages/privacy_policy.html");

  var rand  = +new Date;
  var dummy = document.createElement("div");

  dummy.innerHTML =
        "<div style='margin:10px auto 20px; width:728px;' id='p180-root'>" + //  align='center'
          "<iframe style='margin:0; display:block;' class='p180' id='"+ beacon +"' name='"+ beacon +"' " +
          "src='"+ delivery_url +"?zoneid="+ zoneid +"&amp;refresh="+ refresh +"&amp;cb="+ rand +"' frameborder='0' " +
          "scrolling='no' width='"+ width +"' height='"+ height +"'>" +
          "<a href='"+ base_url +"/ck.php?n="+ n +"&amp;cb="+ rand +"' target='_blank'>" +
          "<img src='"+ base_url +"/avw.php?zoneid="+ zoneid +"&amp;cb="+ rand +"&amp;n="+ n +"' border='0' alt='' /></a></iframe>" + 
          "<div style='font:11px arial !important; background:#f9f9f9; color:#444; padding:4px; text-align:center; border-radius:0 0 5px 5px; border: 1px solid #ddd; border-top:0;'>" +
            "This ad is supporting your extension <i>" + p180.name + "</i>: " + 
            "<a href='"+ info +"' style='color:#005790' target='_blank'>More info</a> | " + 
            "<a href='"+ privacy +"' style='color:#005790' target='_blank'>Privacy Policy</a> | " + 
            "<a href='#' style='color:#005790' id='p180-hide'>Hide on this page</a>" + 
          "</div>" +
        "</div>";
  return dummy.firstChild;
}

function init() {
  var body = document.body;

  // SLAVE
  if (body.classList.contains("p180"))
    return;

  // exclude home pages
  if (window.location.pathname === '/')
    return;

  // exclude image previews
  if (/jpg|png|gif/i.test(document.URL.slice(-3)))
    return;

  // exclude adult sites
  if (/(sex|porn|nude|xxx)/.test(document.URL))
    return;

  var meta = document.getElementsByTagName("meta");
  for (var i = meta.length; i--;)
    if (/(keywords|description|rating)/i.test(meta[i].name) &&
        /(sex|porn|nude|mature|boob|RTA-5042-1996-1400-1577-RTA)/i.test(meta[i].content))
      return;

  // MASTER
  body.classList.add("p180");

  var base;
  var wrapper = body.children[0];

  if (body.clientHeight > 200) {
    base = body;
  }
  if (wrapper && wrapper.clientHeight > 200 &&
      window.getComputedStyle(wrapper, null).getPropertyValue('position') == 'absolute') {
    base = wrapper;
  }
  if (base) {
    base.appendChild(ad728);
    document.getElementById("p180-hide").onclick = blacklist;
  }
}

function blacklist(e) {
  var el = document.getElementById('p180-root');
  el.parentNode.removeChild(el);
  extension.sendRequest({name: "blacklist-add", data: window.location.host});
  e.preventDefault();
}

extension.sendRequest({name: "is-enabled", data: window.location.host}, 
  function(enabled) { 
    if (enabled) {
      window.addEventListener("DOMContentLoaded", init, false);
    }
  });


})(window, document, chrome.extension);