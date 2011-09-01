#import "PGTesting.h"

@implementation PGTesting

- (void)noop:(NSMutableArray*)arguments
    withDict:(NSMutableDictionary*)options
{
  PluginResult* result = [PluginResult resultWithStatus:PGCommandStatus_OK];
  NSString* callbackID = [arguments objectAtIndex:0];
  [self writeJavascript:[result toSuccessCallbackString:callbackID]];
}

- (void)multipleEvalJS
{
  for (int i = 0; i < 10000; ++i) {
    [self writeJavascript:@"1"];
  }
}

- (void)singleEvalJS
{
  // I know the string building happens in here, but this is probably more
  // representative anyway since this is what a plugin would have to do.
  NSMutableString* js = [NSMutableString stringWithCapacity:10000];

  for (int i = 0; i < 10000; ++i) {
    [js appendString:@"1;"];
  }

  [self writeJavascript:js];
}

- (void)printElapsedSince:(NSDate*)date
              description:(NSString*)desc
{
  NSLog(@"%@: %.2fms.", desc, [date timeIntervalSinceNow] * -1000);
}

- (void)benchmark:(NSMutableArray*)arguments
         withDict:(NSMutableDictionary*)options
{
  NSDate* before;

  before = [NSDate date];
  [self singleEvalJS];
  [self printElapsedSince:before description:@"singleEvalJS 10000 statements"];

  before = [NSDate date];
  [self multipleEvalJS];
  [self printElapsedSince:before description:@"multipleEvalJS 10000 statements"];

  PluginResult* result = [PluginResult resultWithStatus:PGCommandStatus_OK];
  NSString* callbackID = [arguments objectAtIndex:0];
  [self writeJavascript:[result toSuccessCallbackString:callbackID]];
}

@end
