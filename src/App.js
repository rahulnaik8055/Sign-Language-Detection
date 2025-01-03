import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utils.js";
import * as fp from "fingerpose";
import ThumbsDownGesture from "./gestures/ThumbsDown.js";
import OKSignGesture from "./gestures/OKSign.js";
import RaisedHandGesture from "./gestures/RaisedHand.js";
import LoveYouGesture from "./gestures/LoveYou.js";
import RockOnGesture from "./gestures/RockOn.js";
import PointUpGesture from "./gestures/PointUp.js";
import PointDownGesture from "./gestures/PointDown.js";
import PointRightGesture from "./gestures/PointRight.js";
import PointLeftGesture from "./gestures/PointLeft.js";
import RaisedFistGesture from "./gestures/RaisedFist.js";
import ThankYouGesture from "./gestures/Thankyou.js";
import HelloGesture from "./gestures/Hello.js";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [emoji, setEmoji] = useState(null);
  const [handDetected, setHandDetected] = useState(false);
  const [gestureAccuracy, setGestureAccuracy] = useState(0);
  const [gestureInstructions, setGestureInstructions] = useState("");
  const [isWebcamOn, setIsWebcamOn] = useState(false); // Webcam toggle state

  const runHandpose = async () => {
    const net = await handpose.load();
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);

      if (hand.length > 0) {
        setHandDetected(true);
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
          ThumbsDownGesture,
          OKSignGesture,
          RaisedHandGesture,
          LoveYouGesture,
          RockOnGesture,
          PointRightGesture,
          PointUpGesture,
          PointLeftGesture,
          PointDownGesture,
          RaisedFistGesture,
          ThankYouGesture,
          HelloGesture,
        ]);

        const gesture = await GE.estimate(hand[0].landmarks, 8);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const confidence = gesture.gestures.map(
            (prediction) => prediction.score
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          const gestureName = gesture.gestures[maxConfidence].name;
          const accuracy = Math.round(confidence[maxConfidence] * 10);

          setEmoji(gestureName);
          setGestureAccuracy(accuracy);

          // Update instructions for gesture
          setGestureInstructions(
            `You made a "${gestureName}" gesture with ${accuracy}% accuracy.`
          );
        }
      } else {
        setHandDetected(false);
        setGestureInstructions("No hand detected. Please show your hand.");
      }

      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  const toggleWebcam = () => {
    setIsWebcamOn((prevState) => !prevState);
  };

  useEffect(() => {
    runHandpose();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
        padding: "20px",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div style={{ display: "flex", width: "100%", maxWidth: "1200px" }}>
        {/* Left side - Webcam & Canvas */}
        <div
          style={{
            flex: 1,
            position: "relative",
            height: "500px",
            marginRight: "20px",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
            backgroundColor: "#1e1e1e",
            padding: "20px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "24px",
              color: "#ffffff",
              marginBottom: "15px",
            }}
          >
            Webcam & Canvas
          </h2>
          {isWebcamOn && (
            <Webcam
              ref={webcamRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
                borderRadius: "10px",
              }}
            />
          )}
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 2,
              borderRadius: "10px",
            }}
          />
        </div>

        {/* Right side - Output */}
        <div
          style={{
            width: "300px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Heading */}
          <div>
            <h2>Sign Language Detection</h2>
          </div>

          {/* Output */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "#4CAF50",
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
              textAlign: "center",
            }}
          >
            {handDetected && emoji ? (
              <h3
                style={{
                  fontSize: "26px",
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              >
                {emoji}
              </h3>
            ) : (
              <h3 style={{ color: "#ffffff", fontSize: "20px" }}>
                No Hand Detected
              </h3>
            )}
            <p style={{ color: "#ffffff", fontSize: "16px" }}>
              {gestureInstructions}
            </p>
          </div>

          {/* Accuracy */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "#FF5722",
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "#ffffff", fontSize: "20px" }}>Accuracy</h3>
            <p style={{ color: "#ffffff", fontSize: "16px" }}>
              {gestureAccuracy}% Accuracy
            </p>
          </div>

          {/* Webcam Toggle Button */}
          <button
            onClick={toggleWebcam}
            style={{
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "#ffffff",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            {isWebcamOn ? "Turn Webcam Off" : "Turn Webcam On"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
