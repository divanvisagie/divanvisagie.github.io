<h1 class="title">Beginning iOS development</h1>
<h2 class="subtitle"></h2>
<span class="date">2012-07-12</span>

When developing in iOS you need to know one very important thing; where to start.There are many secrets to
Here I will be trying my very hardest to give you that information by listing things you need to know and great places to find the information you might need.
I will start by listing a few rules of iOS development
- You need a Mac , this is pretty non negotiable , the [SDK](https://developer.apple.com/xcode/) is only available for OSX so you need something capable of running OSX.
- Code is generally written in Objective-C/C++ ,A lot of tutorials will steer you away from integrating C++ because its "too advanced for this stage" , but my tutorials won't , because I believe that if everybody steered away from the advanced stuff then nobody would know the advanced stuff and then the human race becomes useless.
- [Paul Hegarty](http://itunes.apple.com/us/itunes-u/developing-apps-for-ios-sd/id395631522) is your new best friend ,he runs a great series of free lectures and learning material with regards to iOS development on iTunes and he really knows what he is doing. Get these videos! I suggest the 2011 version if you are only doing iOS 5 and higher as I do ,because there have been a lot of changes to the SDK recently.
- Understand the concepts of [MVC](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) and [delegates](http://dvisagie.blogspot.com/2012/04/using-delegates-in-objective-c-why-use.html) , as these are key concepts in iOS development , delegates especially are used a lot to communicate between classes. 
I think thats enough of the jibber jabber ,its time to show you some code,or not. I'm not Going to start with the traditional hello world because that's out there on the net already ,and because you listened to me and watched Paul Hegarty's video and he showed you how. Instead il give you a quick tip of a habit to get into early;
You may not have come across them yet but there are functions in Objective-C called NSLog()  that we use to print information to the debug console and they are a very handy debugging tool.However these logs can cause an extreme performance knock  and you definitely don't want them hanging around in your release build.The trick to doing this is to write a macro that will be at the top of your program that will prevent the execution of NSLogs , you can find an article I have already written over [here](http://dvisagie.blogspot.com/2012/06/removing-nslogs-from-release-build.html) on how to do this.Getting into the habit of optimisation early can save you a lot of time later on.
Well that concludes my first post on this blog with regards to iOS development , I hope you left feeling a lot more informed than I felt when I first started.
If you have any requests for tutorials on other sections of iOS development just mention it in the comments and I may write a tutorial on it(if I actually know what you are talking about) or if there is an existing resource that I know of , I will refer you to it.

---

*Originally posted on [Blogspot](https://divcode.blogspot.com/2012/07/beginning-ios-development.html)*
