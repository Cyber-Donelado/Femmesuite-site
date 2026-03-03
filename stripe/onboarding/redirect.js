(function(){
  function getTargetDeepLink(defaultDeepLink){
    try{
      var params = new URLSearchParams(window.location.search || "");
      var devOverride = params.get("dev_deep_link");
      return devOverride || defaultDeepLink;
    }catch(e){
      return defaultDeepLink;
    }
  }

  function startDeepLinkRedirect(defaultDeepLink){
    var target = getTargetDeepLink(defaultDeepLink);
    var fallback = document.getElementById("fs-fallback");
    var openBtn = document.getElementById("fs-open-app");

    // If no fallback markup, just try the deep link once.
    if(!fallback || !openBtn){
      window.location.href = target;
      return;
    }

    // Attempt to open the app immediately.
    window.location.href = target;

    // After ~1200ms, show fallback UI for users without the app installed.
    setTimeout(function(){
      fallback.style.display = "block";
    }, 1200);

    openBtn.addEventListener("click", function(ev){
      ev.preventDefault();
      window.location.href = target;
    });
  }

  window.FSStripeOnboarding = {
    startDeepLinkRedirect: startDeepLinkRedirect
  };
})();

