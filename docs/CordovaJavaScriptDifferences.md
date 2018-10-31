# Changes to the WebApp code to support Cordova

If we didn't load any local images in the WebApp, and we didn't do oAuth to authenticate via Twitter and Facebook, 
the `bundle.js` could run in the Cordova wrapper created by the Cordova scaffolding.

The following differences have been found:

1. "Root" path in the bundle.js

    The scaffolding that we used to setup cordova, has the index.js and index.html in the `\www` directory
    instead of in `\src\js` and as a result all of the relative/absolute paths for images have to
    be adjusted.  See cordovaDot in cordovaUtils.js.

1. Startup code in index.js

   ```
   // If Apache Cordova is available, wait for it to be ready, otherwise start the WebApp
   if (isCordova()) {
     document.addEventListener("deviceready", () => {
       startApp();
     }, false);
   } else {  // browser
     startApp();
   }
    ```
    Cordova starts after the enclosing iOS or Android app starts, so you have to wait for the
    `deviceready` event to be fired.

1.  Cordova buttons can fire on React class load

    ```
    return <Button bsSize="large" className="btn btn-social btn-twitter u-push--lg"
            onClick={isWebApp() ? this.twitterSignInWebApp.bind() : this.twitterSignInWebAppCordova }>
      <span className="fa fa-twitter"/> {buttonText}
    </Button>;
    ```
    
    In this example, see how we are just passing the name of `this.twitterSignInWebAppCordova` instead of
    using `this.twitterSignInWebAppCordova()` which would immediately execute the method specified in the `onClick()` on
    render.

1. Our Router implementation in the WebApp uses browserHistory.push() to route

    Cordova needs to use `hashHistory.push()` instead of `browserHistory.push()`, both come from the `'react-router'` package.  (I don't 
    remember why the needs are different.)  So every place where there was a `browserHistory.push()`, there is now a `historyPush()` call which is just
    a wrapper that uses the appropriate kind of "history" for standalone WebApp vs WebApp within Cordova. 
    
    
_______  
    
[Return to the WeVote Cordova home documentation page ](/README.md)