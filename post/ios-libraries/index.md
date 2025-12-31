<h1 class="title">Some useful libraries for iOS development.</h1>
<h2 class="subtitle"></h2>
<span class="date">2012-08-19</span>

One of the great things about developing for iOS in Objective-C is the amount of freely available [MIT licensed](http://en.wikipedia.org/wiki/MIT_License) libraries out there .While some just make your life easier so that you don't have to re-invent the wheel,others like FMDB are almost essential to certain functionality.Here is a list of some libraries I just cant live without.
[![screenshot](image1.png)](http://db-in.com/blog/wp-content/uploads/2011/07/framework_ios_2.png)
[FMDB](https://github.com/ccgus/fmdb)
One of the major issues I stumbled over when working with sqlite in iOS was that the database connection seemed to keep breaking,causing tons of unneeded frustration. I then learned of the Flying Meat Database wrapper (I know, coolest name ever) which fixed this problem and now I will never create a database based app without it.
[Pull to Refresh](https://github.com/leah/pulltorefresh)
Pulling down on a UITableView to refresh is a nice touch ,but its also something you don't want to spend too much time on. This library makes it simple for you , all you have to do is make your tableViewController a sub-class of *PullRefreshTableViewController.h* and then implement the -(void)refresh method. Put all your refresh code in that method and end it off with [self stopLoading]; Simple!
[![image](https://a248.e.akamai.net/camo.github.com/c204704fea6595f218def0a58c8fd2ddd2aeb61b/687474703a2f2f73332e616d617a6f6e6177732e636f6d2f6c6561682e6261636f6e66696c652e636f6d2f626c6f672f726566726573682d736d616c6c2d312e706e67)](https://a248.e.akamai.net/camo.github.com/c204704fea6595f218def0a58c8fd2ddd2aeb61b/687474703a2f2f73332e616d617a6f6e6177732e636f6d2f6c6561682e6261636f6e66696c652e636f6d2f626c6f672f726566726573682d736d616c6c2d312e706e67)
[NSData+base64](https://github.com/dave8401/g3Mobile/tree/master/Classes)
For those who need to convert their NSData ,such as images to a base 64 string for use with web services,this is pretty much the alternative to writing it yourself. This guy writes a ton more libraries that I just haven't looked at, though the GPL licenses for the ones that I did look at deterred me from looking at the rest  (if you use a GPL library ,your software must be licensed under GPL as well).
[XMLReader](https://github.com/bcaccinolo/XML-to-NSDictionary)
This library is absolutely awesome if you are connecting to a SOAP based web service, no need to parse XML, just send the string through this baby and out pops an NSArray/NSDictionary structure that is way easier to work with in Objective-C.
There are tons more libraries hanging around the internet, so stay sharp,you never know when you may come across a gem.

---

*Originally posted on [Blogspot](https://divcode.blogspot.com/2012/08/some-useful-libraries-for-ios.html)*
