## Dealing With iOS Layout Constraints

IOS Cordova apps have a challenging situation when the keyboard appears: the WebKitView pane is compressed to make room for the keyboard.

A simplified example of the problem would be... a 100 pixel tall dialog in the center of a 1000 pixel tall screen. 
The dialog has an <input /> field, and 400 pixels of padding on the top and bottom of the dialog, thereby requiring 900 verical pixels, 
which can fit into the 1000 pixel screen. In iOS, when you click into that input field, the WebKitView tries to shrink to 
approximately 600 pixels in height, and in this example we are overconstrained, the 900 vertical pixels of markup 
can't fit into the residual 600 pixels of the WebKitView that is available with the keyboard showing. iOS has to break 
some of the constraints in order to shrink the view, as a result you will get a LayoutConstraints error that looks like this.

```
2020-02-03 08:07:08.879280-0800 We Vote[84763:1921169] [LayoutConstraints] Unable to simultaneously satisfy constraints.
	Probably at least one of the constraints in the following list is one you don't want. 
	Try this: 
		(1) look at each constraint and try to figure out which you don't expect; 
		(2) find the code that added the unwanted constraint or constraints and fix it. 
	(Note: If you're seeing NSAutoresizingMaskLayoutConstraints that you don't understand, refer to the documentation for the UIView property translatesAutoresizingMaskIntoConstraints) 
(
    "<NSAutoresizingMaskLayoutConstraint:0x6000021a16d0 h=--& v=--& _UIToolbarContentView:0x7fe50842ea50.width == 0   (active)>",
  ...
    "<NSLayoutConstraint:0x600002186df0 'UIView-leftMargin-guide-constraint' H:|-(0)-[UILayoutGuide:0x600003b7cee0'UIViewLayoutMarginsGuide'](LTR)   (active, names: '|':_UIButtonBarStackView:0x7fe50845c9c0 )>",
    "<NSLayoutConstraint:0x600002187d40 'UIView-rightMargin-guide-constraint' H:[UILayoutGuide:0x600003b7cee0'UIViewLayoutMarginsGuide']-(0)-|(LTR)   (active, names: '|':_UIButtonBarStackView:0x7fe50845c9c0 )>"
)

Will attempt to recover by breaking constraint 
```

All those words of advice displayed in the console have little value for us, since we're not building a native iOS application, but the error is real.  
When LayoutConstraints errors occur, we need to reduce the constraints on the web app page, in order to allow the iOS WebKitView to be 
shrinkable.

Whenever possible eliminate all layout constraint errors by following the steps below.  Unfortunately sometimes you just can't 
get rid of all LayoutConstraints errors. Usually if the over constraint is small, you get the warning, and  the iOS is successful
at breaking the constraint and life goes on, occasionally the constraint is so large that iOS can't recover and the app crashes or silently locks up.

Steps:

1)  Make sure the footer goes away when data entry is in process with the virtual keyboard -- see prepareForCordovaKeyboard and restoreStylesAfterCordovaKeyboard
which Hides and unhide the footer to provide a less constrained view. (The app also looks better without the footer being pushed up above the keyboard.)
2)  Adjust Margins and padding to either go away when the keyboard appears, or conditionally make them smaller, or make the a percentage of the screen instead of a fixed number of pixels. 

### Android Note 
Android handles the keyboard better. We don't end up with overconstraint errors and don't have to do as much coding specifically for android.
The Cordova keyboard plug-in has a nice feature in iOS where you can listen for the keyboard appearing and prepare for it ahead of time, see `addEventListener('keyboardWillShow',` 
 in Application.jsx. Unfortunately that listener is not available in Android, so we add a blur/focus event handler
(See focusTextFieldAndroid() in cordovaUtils.js) to every input field.

-------
**[Return to the WeVote Cordova home documentation page ](/README.md)**
