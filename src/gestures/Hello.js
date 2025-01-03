import * as fp from "fingerpose";

const HelloGesture = new fp.GestureDescription("hello");

// All fingers: No curl, extended straight
for (let finger of [
  fp.Finger.Thumb,
  fp.Finger.Index,
  fp.Finger.Middle,
  fp.Finger.Ring,
  fp.Finger.Pinky,
]) {
  HelloGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  HelloGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
}

export default HelloGesture;
