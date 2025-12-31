<h1 class="title">Device detection in iOS</h1>
<h2 class="subtitle"></h2>
<span class="date">2012-09-28</span>

This is just a quick tip on how to determine what device the user is running, this can be useful if you are writing an app for both iPhone and iPad and want to implement a feature in one device but not the other:
**Code snippet:**
```objc
if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone) {
//executed if phone
}
else if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPad){
//executed if ipad
}
else{
//Apple invented a new iDevice
}
```
Another thing we can check for is the version of iOS the user is running as well as the system name,here I simply used NSLog to output the results:
```objc
NSLog(@"%@",[[UIDevice currentDevice] systemVersion]);
NSLog(@"%@",[[UIDevice currentDevice] systemName]);
```
*UIDevice* has many other methods and properties regarding the users device, you can read through them in Apple's documentation [here](http://developer.apple.com/library/ios/#documentation/uikit/reference/UIDevice_Class/Reference/UIDevice.html).

---

*Originally posted on [Blogspot](https://divcode.blogspot.com/2012/09/device-detection-in-ios.html)*
