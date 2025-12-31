<h1 class="title">Hidden menu Part 2: Following the finger</h1>
<h2 class="subtitle"></h2>
<span class="date">2012-09-24</span>

In[ Part 1 of Creating a hidden menu in iOS ](http://divcode.blogspot.com/2012/09/creating-hidden-menu-in-ios.html) I showed how to add gestures to handle the hide/reveal functionality. The swipe gesture is a great and gives a good impression , but it can be better. It is much nicer to have the effect that the *content *View is following the users finger , and that is exactly what we are going to do here.
Lets start with the project form the previous tutorial , if you dont have it , you can pick it up [here](https://github.com/snip3r8/HiddenMenu).
First we start by commenting out/removing the GestureRecognizer code in the viewDidLoad , we need to get rid of it because the touch events could conflict with them.
- (void)viewDidLoad
{
[super viewDidLoad];
// Do any additional setup after loading the view, typically from a nib.
//Find the path for the menu resource and load it into the menu array
NSString *menuPlistPath = [[NSBundle mainBundle] pathForResource:@"Menu" ofType:@"plist"];
menuArray = [[NSArray alloc] initWithContentsOfFile:menuPlistPath];
//add some gestures
//    UISwipeGestureRecognizer *swipeLeft = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(handleSwipeLeft:)];
//    [swipeLeft setDirection:UISwipeGestureRecognizerDirectionLeft];
//[self.view addGestureRecognizer:swipeLeft];
//    UISwipeGestureRecognizer *swipeRight = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(handleSwipeRight:)];
//    [swipeRight setDirection:UISwipeGestureRecognizerDirectionRight];
//[self.view addGestureRecognizer:swipeRight];
}
Now lets jump to the touch events ,this requires no additional setup,all we have to do is implement the delegate methods.
The first one we will handle is *touchesBegan *. All we will be doing here is storing the x coordinate of where the touch began ,this is used later to calculate how we should move the *contents* view.
float difference;
-(void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event{
CGPoint contentTouchPoint = [[touches anyObject] locationInView:content];
difference = contentTouchPoint.x;
}
Next up is *touchesMoved* ,here we get the coordinate of the touch in *self.view* ,then based on the coordinate ,calculate a new x coordinate for the  *content *view. Here we also implement a check to make sure that the movement does not exceed the bounds of *menuTable. *After we have calculated *xTarget , *All thats left to do is animate the movement.
-(void)touchesMoved:(NSSet *)touches withEvent:(UIEvent *)event{
CGPoint pointInView = [[touches anyObject] locationInView:self.view];
float xTarget = pointInView.x - difference;
if(xTarget > menuTable.frame.size.width)
xTarget = menuTable.frame.size.width;
else if( xTarget < 0)
xTarget = 0;
[UIView animateWithDuration:.25
animations:^{
[content setFrame:CGRectMake(xTarget, content.frame.origin.y, content.frame.size.width, content.frame.size.height)];
}
];
}
The final method we need to handle is touchesEnded. This event is fired when the users finger leaves the screen , at this point the *content* view is most likely to be in mid transition between the "menu shown" and "menu hidden" states,so here we need to calculate which of those states it "snaps" to:
-(void)touchesEnded:(NSSet *)touches withEvent:(UIEvent *)event{
CGPoint endPoint = [[touches anyObject] locationInView:self.view];
float xTarget = endPoint.x - difference;
if(xTarget < (menuTable.frame.size.width/2))
xTarget = 0;
else
xTarget = menuTable.frame.size.width;
[UIView animateWithDuration:.25
animations:^{
[content setFrame:CGRectMake(xTarget, content.frame.origin.y, content.frame.size.width, content.frame.size.height)];
}
];
}
And thats a wrap , now if you run the project you will be able to drag the menu into hidden/shown states and it will actually follow your finger and not just be fired by a swipe. Below is the full modified code of HiddenMenu:
[![screenshot](image2.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgzvHVrRELPibx1mVFz1rgIPYIk_EHBdC09vLzmEJ3kKJjUNbqlg8W1xpwF_z_Cp7qtWDCCVBRzpLpNO0_VFtsR7Os8ud1XEAuufWjTxyUe-G_0e3iehV4GbvWkbTAJrgXwvAsGmjMg5A/s1600/iOS+Simulator+Screen+shot+24+Sep+2012+5.20.15+PM.png)
*ViewController.h:*
//
//  ViewController.h
//  HiddenMenu
//
//  Created by Divan Visagie on 2012/09/23.
//  Copyright (c) 2012 Divan Visagie. All rights reserved.
//
#import <UIKit/UIKit.h>
@interface ViewController : UIViewController <UITableViewDataSource,UITableViewDelegate>
@property (weak, nonatomic) IBOutlet UITableView *menuTable;
@property (weak, nonatomic) IBOutlet UIView *content;
@property (weak, nonatomic) IBOutlet UINavigationBar *contentNavBar;
- (IBAction)showMenuDown:(id)sender;
@end
*ViewController.m*
//
//  ViewController.m
//  HiddenMenu
//
//  Created by Divan Visagie on 2012/09/23.
//  Copyright (c) 2012 Divan Visagie. All rights reserved.
//
#import "ViewController.h"
@interface ViewController ()
@property (strong,nonatomic) NSArray *menuArray; //array for menu
-(void)showMenu;
-(void)hideMenu;
@end
@implementation ViewController
@synthesize menuArray,
menuTable,
content,
contentNavBar;
- (void)viewDidLoad
{
[super viewDidLoad];
// Do any additional setup after loading the view, typically from a nib.
//Find the path for the menu resource and load it into the menu array
NSString *menuPlistPath = [[NSBundle mainBundle] pathForResource:@"Menu" ofType:@"plist"];
menuArray = [[NSArray alloc] initWithContentsOfFile:menuPlistPath];
//add some gestures
//    UISwipeGestureRecognizer *swipeLeft = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(handleSwipeLeft:)];
//    [swipeLeft setDirection:UISwipeGestureRecognizerDirectionLeft];
//[self.view addGestureRecognizer:swipeLeft];
//    UISwipeGestureRecognizer *swipeRight = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(handleSwipeRight:)];
//    [swipeRight setDirection:UISwipeGestureRecognizerDirectionRight];
//[self.view addGestureRecognizer:swipeRight];
}
- (void)didReceiveMemoryWarning
{
[super didReceiveMemoryWarning];
// Dispose of any resources that can be recreated.
}
#pragma mark - UITableView Datasource -
-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
return menuArray.count;
}
-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView{
return 1;
}
-(UITableViewCell*)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"MenuCell"];
NSDictionary *menuItem = [menuArray objectAtIndex:indexPath.row];
cell.textLabel.text = menuItem[@"Title"]; /* Note , this is new objective c functionality , 
for older versions use [menuItem objectForKey:@"Title"];*/
cell.detailTextLabel.text = menuItem[@"Subtitle"];
return cell;
}
#pragma mark - UITableView Delegate -
-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
contentNavBar.topItem.title = menuArray[indexPath.row][@"Title"]; /*I went wild with the new 
syntax on this one*/
}
#pragma mark - Actions -
- (IBAction)showMenuDown:(id)sender {
if(content.frame.origin.x == 0) //only show the menu if it is not already shown
[self showMenu];
else
[self hideMenu];
}
#pragma mark - animations -
-(void)showMenu{
//slide the content view to the right to reveal the menu 
[UIView animateWithDuration:.25
animations:^{
[content setFrame:CGRectMake(menuTable.frame.size.width, content.frame.origin.y, content.frame.size.width, content.frame.size.height)];
}
];
}
-(void)hideMenu{
//slide the content view to the left to hide the menu
[UIView animateWithDuration:.25
animations:^{
[content setFrame:CGRectMake(0, content.frame.origin.y, content.frame.size.width, content.frame.size.height)];
}
];
}
#pragma mark - Gesture handlers -
-(void)handleSwipeLeft:(UISwipeGestureRecognizer*)recognizer{
//    if(content.frame.origin.x != 0)
//        [self hideMenu];
}
-(void)handleSwipeRight:(UISwipeGestureRecognizer*)recognizer{
//    if(content.frame.origin.x == 0)
//        [self showMenu];
}
#pragma mark - Touch events -
float difference;
-(void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event{
CGPoint contentTouchPoint = [[touches anyObject] locationInView:content];
difference = contentTouchPoint.x;
}
-(void)touchesMoved:(NSSet *)touches withEvent:(UIEvent *)event{
CGPoint pointInView = [[touches anyObject] locationInView:self.view];
float xTarget = pointInView.x - difference;
if(xTarget > menuTable.frame.size.width)
xTarget = menuTable.frame.size.width;
else if( xTarget < 0)
xTarget = 0;
[UIView animateWithDuration:.25
animations:^{
[content setFrame:CGRectMake(xTarget, content.frame.origin.y, content.frame.size.width, content.frame.size.height)];
}
];
}
-(void)touchesEnded:(NSSet *)touches withEvent:(UIEvent *)event{
CGPoint endPoint = [[touches anyObject] locationInView:self.view];
float xTarget = endPoint.x - difference;
if(xTarget < (menuTable.frame.size.width/2))
xTarget = 0;
else
xTarget = menuTable.frame.size.width;
[UIView animateWithDuration:.25
animations:^{
[content setFrame:CGRectMake(xTarget, content.frame.origin.y, content.frame.size.width, content.frame.size.height)];
}
];
}
@end

---

*Originally posted on [Blogspot](https://divcode.blogspot.com/2012/09/hidden-menu-part-2-following-finger.html)*
