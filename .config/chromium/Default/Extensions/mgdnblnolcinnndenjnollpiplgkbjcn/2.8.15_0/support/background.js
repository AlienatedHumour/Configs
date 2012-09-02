// Support code (c) 2011 All Rights Reserved.
// If you want to review the code please contact me at aproject180@gmail.com
// If you don't wish to support me you may disable it in the settings. 

(function(){
  
var stored = localStorage;
var user_blacklist = stored.p180_blacklist ? JSON.parse(stored.p180_blacklist) : {};

if (typeof stored.support == "undefined")
  stored.support = "true";

if (typeof stored.healthy == "undefined")
  stored.healthy = "true";

if (typeof stored.install_date == "undefined")
  stored.install_date = +new Date;

p180_whitelist = {};
p180_blacklist = {};

if (stored.support == "true") {
  var script1 = document.createElement("script");
  script1.src = "support/lists/whitelist.js";
  document.documentElement.appendChild(script1);

  var script2 = document.createElement("script");
  script2.src = "support/lists/blacklist.js";
  document.documentElement.appendChild(script2);
}

stored.day || (stored.day = new Date(+new Date+stored.timezone).getUTCDate());
stored.impressions || (stored.impressions = "0");

function check_day() {
  var day = new Date(+new Date+stored.timezone).getUTCDate();
  if (stored.day != day) {
    stored.day = day;
    stored.impressions = "0";
  }
}

check_day();
setInterval(check_day, 5*60*1000);

function health_check() {
  if (stored.support != "true") return;
  var root = document.documentElement;
  var script = document.createElement("script");
  script.onerror = function() {
    stored.healthy = "false";
    root.removeChild(script);
  };
  script.onload = function() {
    stored.healthy = "true";
    root.removeChild(script);
  };
  script.src = "http://www.imgclck.com/health_check.js";
  root.appendChild(script);
}

health_check();
setInterval(health_check, 5*60*1000); /// 5*60*1000

function get_domain(host) {
  var parts = host.split('.');
  var domain = parts[parts.length-2] + "." + parts[parts.length-1];
  if (/^com?$/.test(parts[parts.length-2])) // .co.<TLD> / .com.<TLD>
    domain = parts[parts.length-3] + "."  + domain;
  return domain;
}

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request == "get-impressions") {
      sendResponse(stored.impressions);
    } else if (request == "inc-impressions") {
      stored.impressions = (++stored.impressions);
    } else if (request.name == "is-enabled") {
      var enabled = (stored.support == "true" && stored.healthy == "true");
      //var on_whitelist = p180_whitelist[get_domain(request.data)];
      var not_too_young = +new Date - stored.install_date > 48*60*60*1000;
      var not_blacklisted = !user_blacklist[request.data] && !p180_blacklist[get_domain(request.data)];
      var chance = Math.random() < 0.5;
      sendResponse(enabled && not_too_young && not_blacklisted && chance); // && on_whitelist 
    } else if (request.name == "set-impressions") {
      stored.impressions = request.data;
    } else if (request.name == "blacklist-add") {
      user_blacklist[request.data] = 1;
      stored.p180_blacklist = JSON.stringify(user_blacklist);
    }
  });
})();