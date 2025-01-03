import * as fp from "fingerpose";

// Define the Thank You Gesture
const ThankYouGesture = new fp.GestureDescription("thank_you");

// Thumb: No curl, generally extended
ThankYouGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
ThankYouGesture.addDirection(
  fp.Finger.Thumb,
  fp.FingerDirection.HorizontalLeft,
  1.0
);
ThankYouGesture.addDirection(
  fp.Finger.Thumb,
  fp.FingerDirection.HorizontalRight,
  1.0
);

// Index finger: No curl, extended straight
ThankYouGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
ThankYouGesture.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.HorizontalLeft,
  1.0
);
ThankYouGesture.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.HorizontalRight,
  1.0
);

// All other fingers (Middle, Ring, Pinky): No curl, extended straight
for (let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  ThankYouGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  ThankYouGesture.addDirection(finger, fp.FingerDirection.HorizontalLeft, 1.0);
  ThankYouGesture.addDirection(finger, fp.FingerDirection.HorizontalRight, 1.0);
}

export default ThankYouGesture;
