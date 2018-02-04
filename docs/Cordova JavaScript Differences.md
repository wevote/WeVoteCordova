The WebApp could have almost run as-is if dropped into a Cordova wrapper.

The following differences have been found:

1. "Root" path in the bundle.js

The scaffolding that we used to setup cordova, has the index.js and index.html in the \www directory
instead of in \src\js and as a result all of the relative/absolute paths for images have to
be adjusted.  See dot????

1.  Startup code in index.js

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
"deviceready" event to be fired.

1. Cordova buttons can fire on React class load
```
    return <Button bsSize="large" className="btn btn-social btn-twitter u-push--lg"
            onClick={isWebApp() ? this.twitterSignInWebApp.bind() : this.twitterSignInWebAppCordova }>
      <span className="fa fa-twitter"/> {buttonText}
    </Button>;
```

In this example, see how we are just passing the name of `this.twitterSignInWebAppCordova` instead of
using `this.twitterSignInWebAppCordova()` which would immediately execute the method specified in the `onClick()` on
render.
