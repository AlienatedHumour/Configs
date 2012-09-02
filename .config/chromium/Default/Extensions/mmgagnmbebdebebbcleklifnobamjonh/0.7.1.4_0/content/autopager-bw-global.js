
//chrome global routers
AutoPagerNS.message = AutoPagerNS.extend (AutoPagerNS.namespace("message"),
{
    call_function_on_object : function(fn,options,callback,messager)
    {
//        autopagerBwUtil.consoleLog("call_function_on_object:" + fn)
        options = this.prepareOptions(fn,options,callback,messager);
        var msg = {
            fn:fn,
            options:options
        }
        try{
            this.do_call_function_on_object(messager,AutoPagerNS.message.msgname,msg,callback)
        }catch(e){
            autopagerBwUtil.consoleError("error call_function_on_object:" + fn + ":" + messager + ":" + e) 
        }
    },
    do_call_function_on_object : function(messager,msgname,msg,callback)
    {
        if (typeof callback!="undefined")
        {
            msg.options.callback=true
        }
        try{
            if (typeof messager != "undefined")
            {
                if (typeof messager.callback=='function')
                {
                    messager.callback(msg.options);
                }
                else if (messager.id)//messager is a tab here
                {
                    chrome.tabs.sendRequest(messager.id,msg,callback);
                }
            }
        }catch(e){
            autopagerBwUtil.consoleError("error call_function_on_object:" + msg.fn + ":" + messager + ":" + e) 
        }
    }
//    ,
//    request_handler : function(request, sender,callback){
//        if (request==null)
//            return;
//        if (AutoPagerNS.message_handlers[request.fn])
//        {
//            AutoPagerNS.message_handlers[request.fn](request, sender,callback);
//        }            
//    }
}
);


AutoPagerNS = AutoPagerNS.extend(AutoPagerNS,{
    walk_windows : function (callback) //walk through browser windows
    {
        //can be override in each browser implementation
        if (!callback)
            return;
        chrome.windows.getAll({}, function(ws){
            for(var k in ws)
            {
                callback(ws[k])
            }
        })
    }
    ,
    walk_tabs : function (win,callback) //walk through browser window tabs
    {
        //can be override in each browser implementation
        if (!callback)
            return;
        chrome.tabs.getAllInWindow(win.id, function (tabs){
            for(var k in tabs)
            {
                callback(win,tabs[k])
            }            
        })
    }
    ,
    get_current_window : function (callback) //get current browser window
    {
        if (callback)
        {
            chrome.windows.getCurrent(callback)
        }
    }
    ,
    get_current_tab : function (callback) //get current browser tb
    {
        if (callback)
        {
            chrome.tabs.getSelected(undefined,callback)
        }
    }
    ,
    get_messager : function (tab) //get messager
    {
        if (tab)
            return tab;
        return null;
    }
    ,
    get_tab_content : function (tab) //get messager
    {
        if (tab)
            return tab;
        return null;
    },
    get_tab_url : function (tab) //get tab_url
    {
        if (tab)
            return tab.url;
        return null;
    }
    ,
    close_tab : function (tab) //get tab_url
    {
        if (tab)
            chrome.tabs.remove(tab.id);
        return null;
    }
    ,
    get_accept_languages : function(callback)
    {
        if (callback)
            chrome.i18n.getAcceptLanguages(callback)
    }
    ,
    get_url : function (relative)
    {
        if (relative.indexOf("/")==0)
            relative = relative.substr(1);
        return chrome.extension.getURL(relative);
    }
});

function autopager_request_handler(request, sender, callback){
    if (request==null)
        return;
//    autopagerBwUtil.consoleLog("messageManager APInternalMessage")
    if (request && request.fn)
    {
        if (request.options && !request.options.tabid && sender && sender.tab && sender.tab.id)
        {
            request.options.tabid = sender.tab.id;
        }
        AutoPagerNS.message.request_handler(request,{
            sender:sender,
            callback:callback
        })
    }
}

chrome.extension.onRequest.addListener(autopager_request_handler);
//chrome.extension.onRequestExternal.addListener(autopager_request_handler);

AutoPagerNS.browser = AutoPagerNS.extend (AutoPagerNS.namespace("browser"),
{
    post_init : function()
    {
        window.addEventListener("load",function(){
            window.addEventListener("unload", function(){
                autopagerPrefServer.savePref('last_version',autopagerUtils.version);
            }, true);
        },false);
        
        var lastTabId = 0;
        function refreshIcon(tab) {
            lastTabId = tab.id;
            lazyRefreshIcon(tab.id);
        }
        chrome.tabs.onSelectionChanged.addListener(refreshIcon);
        chrome.tabs.getSelected(null, refreshIcon);
        chrome.tabs.onCreated.addListener(refreshIcon);
        chrome.tabs.onUpdated.addListener(refreshIcon);
            
        function lazyRefreshIcon (tabId)
        {
            window.setTimeout(function(){
                AutoPagerNS.message.call_function("autopager_get_status",{});
            }, 1000);
        }
    }
    ,open_alert : function (title,message,link,callback,options)
    {
        //TODO: user webkitNotifications
        window.arguments = []
        window.arguments.push(title);
        window.arguments.push(message);
        window.arguments.push(link);
        window.arguments.push(callback);
        if (options && options.openTimeout)
            window.arguments.push(options.openTimeout);
        var width = (title.length + message.length)*10+40;
        var height = 60;
        var left = (screen.availLeft + screen.availWidth - window.outerWidth) - 10;
        var top = screen.availTop + screen.availHeight;
        var win = AutoPagerNS.createWindow(AutoPagerNS.get_url("/content/alert.html"),
            "alert:alert",
            "chrome,dialog=yes,titlebar=no,width=" + width + "px,height=" + height + "px,left=" + left + "px,top=10000px,popup=yes",
            title,message,link,callback);
        if (win)
            win.focus();
        return win;
    }
    ,open_notification : function (id,message,buttons,callback,options)
    {
        //TODO: user webkitNotifications
            if (id && message)
            {
                var width=300;
                var height=150;
                var left= (window.screen.width - width)/2
                var top = (window.screen.height - height)/3
                var w =   window.open('about:blank',id,
                    'location=no,links=no,scrollbars=no,toolbar=no,left=' + left
                    +',top=' + top
                    +',width=' + width
                    + ',height=' + height);
                var doc = w.document
                doc.title = message
                
                var img = doc.createElement('img');
                img.setAttribute('src',AutoPagerNS.get_url('/skin/classic/autopager32.png'));
                doc.body.appendChild(img);
                var msgbox = doc.createElement('b');
                msgbox.textContent = message;
                doc.body.appendChild(msgbox);
                doc.body.appendChild(doc.createElement('br'));

                for(var i=0;i<buttons.length;i++)
                {
                    //not support popup yet
                    if (buttons[i].popup)
                        continue;
                    var button = doc.createElement('input');
                    button.setAttribute('type','button');
                    button.setAttribute('value',buttons[i].label);
                    button.setAttribute('id',i);
                    button = doc.body.appendChild(button)
                    doc.body.appendChild(doc.createTextNode(' '))
                    button.addEventListener('click',function(event){
                        callback({
                            "notification_id":id,
                            "button":event.target.id
                            });
                        w.close();
                    },false)
                }
                
                try{
                    w.setTimeout(function(){
                        w.focus();
                    },10)
                }catch(e)
                {}
                
            //con.postMessage({"button":"enabled","value":autopagerPref.loadBoolPref("enabled")});
            }
        
    }
});
AutoPagerNS.buttons = AutoPagerNS.extend (AutoPagerNS.namespace("buttons"),
{
    getIcon : function(enabled,siteenabeld,discoveredRules,options)
    {
        return this.draw(enabled,siteenabeld,discoveredRules,options);
    }
    ,
    showPageIcon : function (show)
    {
        AutoPagerNS.get_current_tab(function(tab) {
                if (tab && tab.id)
                {
                    if (show)
                        chrome.pageAction.show(tab.id);
                    else
                        chrome.pageAction.hide(tab.id);

                }
            })
    }
    ,
    addButton : function(icon)
    {
        this.showPageIcon(true)
    }
    ,
    getButton : function()
    {        
        return this;
    }
    ,removeButton : function()
    {
        this.showPageIcon(false)
    }
    ,setButtonIcon : function(button,icon)
    {
        this.showPageIcon(true);
        AutoPagerNS.get_current_tab(function(tab) {
            if (tab && tab.id)
            {
                if (typeof icon=="string")
                    chrome.pageAction.setIcon({path: icon, tabId: tab.id});
                else
                    chrome.pageAction.setIcon({imageData: icon, tabId: tab.id});
            }
        });
    }
});
