<h1 class="title">How to create a custom look for your UITableView</h1>
<h2 class="subtitle"></h2>
<span class="date">2012-09-10</span>

What really sets some iOS apps apart from the rest are the way they look , generally , a good look gives the impression that the app was well designed an should therefore work well. This isn't necessarily true but sometimes impression outweighs fact,especially from the point of view of the user.
In this tutorial I will demonstrate how to customise the generally boring look of the UITableViewController and try spice things up a little.
I will be utilising images from  [http://subtlepatterns.com/](http://subtlepatterns.com/) ,which is a great site to get hold of , well ,subtle patterns
[![screenshot](image6.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgiCuwQsNWy0OpSVUUUpnoid6nEV9tPVenBnae7Yd3SAqClA0RWZYEVt7tJmkVNYJ2p1usewCKSrkJChgz48Oz2Steq1KncFiH0ZRFKensW1an74kw2_U0JUvcXwner-66wcbRcEoN8Ww/s1600/exclusive_paper.png)
Exclusive paper
[![screenshot](image2.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg0nsxpGdgSQsa2mbLDlM3T3Psd5jgeXoxGPNcSy3DdOf1HUL8jAItM4HLayrjKnAtL9BWxmxQ0xKK8MOLBGLZbgosMTFIurXwfrpBqdtclNg23zc0nVZ2lIKKgJP_ThoYaD3z6hNzSdw/s1600/retina_wood.png)
Retina Wood
I went for Retina Wood as a background and exclusive paper for the cells for this tutorial.
Ok , lets start by creating a new iPhone app ,then delete the current View from the storyboard and replace it with a Table View Controller
[![screenshot](image8.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhbFNhC3Qx_dwoXoirBMUsIYvXsKnayoQaAAKtpzjioRKrJMnYqoyMRZiCdnkPUnrmjuCLr3C-xGCrlJKjVaKS5HMnNKdq42jbI2ZT-sinQehggE7SZaOlDpacpMADTffES7ResY3kJ-g/s1600/Screen+Shot+2012-09-10+at+5.50.55+PM.png)
Don't forget to set this new ViewController as the initial view controller:
[![screenshot](image13.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjYzNzTcFqFMWXd1CN2n7SS82IUlqUNNiEKqkfPHXkKDcgPqBR2RtjxhFu7PIScoce2YnsJCeA8pkIKHiRfbV7JZQTx1nduTy8RMaxOSkCmvEl5JcJiqPaeSmZ8-hzn-aolTGYpCy6UoQ/s1600/Screen+Shot+2012-09-10+at+6.17.54+PM.png)
If you were to run the app at this stage you would get a boring bunch of lines across your screen,that isn't going to do for testing so lets set up some sample data to display. Create a new UITableViewController class, im naming mine CustomTableViewController:
[![screenshot](image10.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi3kc4kbQvPZWfTg1ILZWJZceeTd3Pfxtyjg4XDf1cEtbjJIJ3YzXmYj2lw3-KUtAFHjtI-cc9yudJRRUJ6hwKFrhPUK9lUOrq6_S74emwkUF7zTGtLKpgrlyIAj9XTWZa5XST4auRDyg/s1600/Screen+Shot+2012-09-10+at+6.25.18+PM.png)
Then set the custom class of the Table View Controller in the storyboard to the class we just created.
Just for the sake of this tutorial , I will make this table static and set the header and contents in the storyboard
Heres what it looked like after I added some sample data,nice and boring:
[![screenshot](image11.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiiOAYBFiZPufL6bANww5f0PnMU6Vq67_blSTnq8vRvz2sKDjukiYEMDBfpj-1gnxgvohLppmFiGjgnFimay-J7x4ijyVIvHlwWu-s64hllYPxxVxjieCsjnRzXaMj105mzSFdgkLHluQ/s1600/Screen+Shot+2012-09-10+at+6.45.24+PM.png)
Time to spice things up , lets add our resource textures before we get started , right click in the project navigator and add the image files, remember to check the copy checkbox.
finally we can get down and code something , go to* CustomTableViewController.m*. The first bit of customisation can be done in the viewDidLoad where we create a view with the wood pattern as a background and then set that view as the background of the table.
```objc
-(void)viewDidLoad{
[super viewDidLoad];
UIView *view = [[UIView alloc] init];
view.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"retina_wood.png"]];
self.tableView.backgroundView = view;
}
```
If you were to run the app at this point you would get the wooden background for everything, This doesn't look great at all. So I will make the cells display with the paper background instead, to do this , we intercept the cell right before it is displayed and make some modifications to it using *willDisplayCell:*
```objc
-(void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath{
cell.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"exclusive_paper.png"]];
}
```
Now we have paper cells but the app still looks pretty darn ugly , so lets tackle that header , we do this in the same way we did with the cells but with *viewForHeaderInSection *. For the header though , I also want some shadow effects , and for that we will need to import the QuartzCore framework. To do this select the project itself in the project navigator and select the "Build Phases" tab,navigate to "Link Binary With Libraries" and click the + button to add QuartzCore.framework.
[![screenshot](image4.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgN1IErXAh5yQfsQjPosQtnj9ZPgGfSm-1e_cQSxor2pCrL3L1Zvb5ZcjnjU_gpAS_G2XbF-cu30KkmAk9jb_EcSkBWTFK2NjVHeHQpqcHSXBjShvhASQ0_NgzL-mp2lP4qRxw4EV5yHg/s1600/Screen+Shot+2012-09-10+at+7.16.24+PM.png)
Now switch back to CustomTableViewController.m and import the quartzcore library:
```objc
#import <QuartzCore/QuartzCore.h>
```
Now we customise the header, I also used *heightForHeaderInSection* to modify the height of the header slightly to make it a little larger:
```objc
-(UIView*)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section{
/*here we return a custom view for the header*/
UILabel *headerview = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, tableView.bounds.size.width,tableView.bounds.size.height)];
headerview.text = [self tableView:tableView titleForHeaderInSection:section];
headerview.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"retina_wood.png"]];
/*I also want the header to throw a shadow on the rest of the table*/
headerview.layer.shadowColor = [[UIColor blackColor] CGColor];
headerview.layer.shadowOffset = CGSizeMake(0, 0);
headerview.layer.shadowOpacity = 0.5f;
headerview.layer.shadowRadius = 3.25f;
headerview.layer.masksToBounds = NO;
return headerview;
}
-(CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section{
return 32.0f;
}
```
Looking a lot better , but the the cells are still the default blue , or optional grey when they are selected.To fix this we go back to *willDisplaycell* and modify the cell a little more, here , we create a view to be set as the background view when the cell is selected(I've gone for a 25% Opacity grey color) .A benefit to implementing this here is that you could actually change the look of the selection according to which cell is selected. Heres the code:
```objc
-(void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath{
cell.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"exclusive_paper.png"]];
UIView *view = [[UIView alloc] init];
view.backgroundColor = [UIColor colorWithRed:.5f green:.5f blue:.5f alpha:.25f];
cell.selectedBackgroundView = view;
cell.textLabel.highlightedTextColor = [UIColor blackColor];
cell.detailTextLabel.highlightedTextColor = [UIColor blackColor];
}
```
Thats it , now lets run the app and see what it looks like:
[![screenshot](image12.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjGc3_Dq8AIWY_Dl1RaEsecHUywjagJWL81hvdpiK9PzhinpkKnRx42_7JbFgsxZLWyPNqZpkaZL4xH7RlHsi4FKbrksSrAJcQzSIcOVulZMKe225r07vScMYHwTLz14_tf-5g7njWTbw/s1600/Screen+Shot+2012-09-10+at+7.43.32+PM.png)
Looks a lot better than what we started out with , of corse its not the best (I decided on the look in about 30 seconds),but hopefully you can take what you learned here and make something amazing.
Below is the entire source for CustomTableViewController.m , it will be the only code file I post as it is pretty much the only source file I edited for this tutorial:
*CustomTableViewController.m*
```objc
//
//  CustomTableViewController.m
//  CustomTable
//
//  Created by Divan Visagie on 2012/09/10.
//  Copyright (c) 2012 Divan Visagie. All rights reserved.
//
#import "CustomTableViewController.h"
#import <QuartzCore/QuartzCore.h>
@implementation CustomTableViewController
-(void)viewDidLoad{
[super viewDidLoad];
UIView *view = [[UIView alloc] init];
view.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"retina_wood.png"]];
self.tableView.backgroundView = view;
}
-(void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath{
cell.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"exclusive_paper.png"]];
UIView *view = [[UIView alloc] init];
view.backgroundColor = [UIColor colorWithRed:.5f green:.5f blue:.5f alpha:.25f];
cell.selectedBackgroundView = view;
cell.textLabel.highlightedTextColor = [UIColor blackColor];
cell.detailTextLabel.highlightedTextColor = [UIColor blackColor];
}
-(UIView*)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section{
/*here we return a custom view for the header*/
UILabel *headerview = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, tableView.bounds.size.width,tableView.bounds.size.height)];
headerview.text = [self tableView:tableView titleForHeaderInSection:section];
headerview.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"retina_wood.png"]];
/*I also want the header to throw a shadow on the rest of the table*/
headerview.layer.shadowColor = [[UIColor blackColor] CGColor];
headerview.layer.shadowOffset = CGSizeMake(0, 0);
headerview.layer.shadowOpacity = 0.5f;
headerview.layer.shadowRadius = 3.25f;
headerview.layer.masksToBounds = NO;
return headerview;
}
-(CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section{
return 32.0f;
}
@end
```

---

*Originally posted on [Blogspot](https://divcode.blogspot.com/2012/09/how-to-create-custom-look-for-your.html)*
