var iz_middle_down=false;
var iz_target=null;
var iz_target_width=0;
var iz_target_height=0;
var iz_coeff=1;
var iz_moved=false;
var iz_start_x=0;
var iz_x=999999;

function iz_file_size(i,n)
{
  var h=new XMLHttpRequest();
  if(h)
  {
    h.open('HEAD',i,true);
    h.onreadystatechange = function()
    {
      if(h.readyState==4&&h.status==200)
      {
        var s=h.getResponseHeader('Content-Length');
        var e=document.getElementById(n);
        if(e)e.innerHTML=s+" bytes, ";
      }
    };
    h.send(null);
  }
}

function iz_mouse_move_fn(e)
{
  if(!e){var e=window.event}
  if(e.x&&e.x!=iz_x)
  {
    iz_x=e.x;
    var d=iz_x-iz_start_x;
    if(d>3)d-=3;else if(d<-3)d+=3;else d=0;
    if(d!=0){iz_moved=true;}
    iz_coeff=Math.exp(d/50.0);
    var w=Math.floor(iz_target_width*iz_coeff);
    var h=Math.floor(iz_target_height*iz_coeff);
    iz_target.style.width=w+"px";
    iz_target.style.height=h+"px";
    if(iz_moved)
      iz_div.innerHTML=iz_target_width+"&times;"+iz_target_height+" &rarr; "+
        w+"&times;"+h+" ("+iz_coeff.toFixed(3)+")";
  }
}

var iz_div=document.createElement("div");
iz_div.style.position="fixed";
iz_div.style.top="4px";
iz_div.style.right="4px";
iz_div.style.color="black";
iz_div.style.backgroundColor="#FFFF80";
iz_div.style.fontFamily="Lucida Console,Courier New,Mono";
iz_div.style.textAlign="right";
iz_div.style.maxWidth="600px";
iz_div.style.fontSize="80%";
document.body.appendChild(iz_div);

window.addEventListener("mousedown",function(e)
  {
    if(!e){var e=window.event}
    if(e.which&&e.which==2)
    {
      iz_target=e.target;
      if(iz_target.nodeName=="IMG")
      {
        iz_target_width=iz_target.width;
        iz_target_height=iz_target.height;
        iz_middle_down=true;
        iz_start_x=e.x;
        iz_moved=false;
        window.addEventListener("mousemove",iz_mouse_move_fn,false);
        iz_div.style.border="1px solid black";
        iz_div.style.padding="3px 3px";
        iz_div.innerHTML="<span id='z'></span>"+
          iz_target_width+"x"+iz_target_height+"<br>"+iz_target.src;
        iz_file_size(iz_target.src,'z');
      }
    }
  },false);

window.addEventListener("mouseup",function(e)
  {
    if(!e){var e=window.event}
    if(e.which&&e.which==2)
    {
      iz_middle_down=false;
      window.removeEventListener("mousemove",iz_mouse_move_fn,false);
      iz_div.innerHTML="";
      iz_div.style.border="0";
      iz_div.style.padding="0 0";
    }
  },false);

