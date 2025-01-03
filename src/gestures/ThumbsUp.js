import * as fp from "fingerpose";

const ThumbsUpGesture = new fp.GestureDescription("thumbs_up");

// Thumb setup
ThumbsUpGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
ThumbsUpGesture.addDirection(
  fp.Finger.Thumb,
  fp.FingerDirection.VerticalUp,
  1.0
);
ThumbsUpGesture.addDirection(
  fp.Finger.Thumb,
  fp.FingerDirection.DiagonalUpLeft,
  1.0
);
ThumbsUpGesture.addDirection(
  fp.Finger.Thumb,
  fp.FingerDirection.DiagonalUpRight,
  1.0
);

// Other fingers setup
for (let finger of [
  fp.Finger.Index,
  fp.Finger.Middle,
  fp.Finger.Ring,
  fp.Finger.Pinky,
]) {
  ThumbsUpGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  ThumbsUpGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}

export default ThumbsUpGesture;
