<h1 class="title">Using UIRefreshControl</h1>
<h2 class="subtitle"></h2>
<span class="date">2012-11-02</span>

**Prerequisites:**
You should be able to create a project and set up a UITableViewController and table view in the storyboard.
**Description:**
Lets start by setting up a new project with a UITableViewController
I wont bother populating it as this isn't required to get the UIRefreshControl working.Basically all we have to do after setting up the table is to create a UIRefreshControl ,set it up and customise if you wish ,give it a target method with which to handle the refreshing and then add the refreshControl to self. The most logical place for this of corse being in the viewDidLoad.
**Code:**
```objc
- (void)viewDidLoad
{
    [super viewDidLoad];
    UIRefreshControl *refreshControl = [[UIRefreshControl alloc] init];
    refreshControl.tintColor = [UIColor redColor]; // you can customize the tint color
    // tell refreshControl where its refreshing will be handled
    [refreshControl addTarget:self action:@selector(refreshing:)
             forControlEvents:UIControlEventValueChanged];
    [self setRefreshControl:refreshControl];
}

- (void)refreshing:(UIRefreshControl *)refreshControl
{
    // refresh code here (reload table data etc.)
    [refreshControl endRefreshing];
}
```
**The result :**
[![screenshot](image2.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjaXqGCR2IuPMBK27q7u6r2euhVPmBTzqjgtdtriCK9mSaN1qaBs9IcceV45u6LTecQec9QOvDRnlM3N7hYP5MA6jMSg4n-sLlKesq580b5mUBwb3rgbEYkySNmzqfLNd39FARwbOLj9Q/s1600/iOS+Simulator+Screen+shot+02+Nov+2012+10.01.21+PM.png)
It really is that simple, for more , read Apples [documentation](http://developer.apple.com/library/ios/#documentation/UIKit/Reference/UIRefreshControl_class/Reference/Reference.html).

---

*Originally posted on [Blogspot](https://divcode.blogspot.com/2012/11/using-uirefreshcontrol.html)*
