#import <UIKit/UIKit.h>

@interface DebugUIWebView : UIWebView {
 @private
  NSMutableDictionary* sourceIDMap_;
}

@property (nonatomic, retain) NSMutableDictionary* sourceIDMap;

@end
