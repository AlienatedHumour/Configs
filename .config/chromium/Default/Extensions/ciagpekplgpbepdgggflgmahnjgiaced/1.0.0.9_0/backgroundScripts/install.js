(function() {
var version = "1.0.0.9";


if( localStorage ) {

   AMZUWLXT.Settings.set({"pushInterval" : 0});
   AMZUWLXT.Settings.set({"pushDate" : new Date()});

   if(!localStorage["uwlVersion"]) {
       localStorage["uwlVersion"] = version;

       AMZUWLXT.setLocale(true);

   } else if( localStorage["uwlVersion"] != version ) {
       localStorage["uwlVersion"] = version;
   }

}
})();
