import jss from "jss";
import { useEffect, useState } from "react";
import { usePrevious } from "../../hooks/usePrevious";
import {
  didUserRemovedAKey,
  isAKeyPressed,
} from "../../services/keyboard/keyboardAPI";

const Point = () => {
  const [position, setPosition] = useState({
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  });

  const [keysPressed, setKeysPressed] = useState({});

  const previousKeyPressed = usePrevious(keysPressed);

  const STEP = 10;
  const SET_INTERVAL_MS = 50;

  const styles = {
    point: {
      position: "absolute",
      top: position.top,
      right: position.right,
      left: position.left,
      bottom: position.bottom,
      width: "10px",
      height: "10px",
    },
  };

  const { classes } = jss.createStyleSheet(styles).attach();

  const handleMove = (event) => {
    setKeysPressed({ ...keysPressed, [event.key]: true });
  };

  const cleanControls = (event) => {
    setKeysPressed({ ...keysPressed, [event.key]: false });
    window.clearInterval(window.timer);
  };

  useEffect(() => {
    if (isAKeyPressed(keysPressed)) {
      // Diagonals
      if (keysPressed.ArrowUp && keysPressed.ArrowRight) {
        console.log("going up AND right");
        setPosition({
          ...position,
          top: position.top - STEP,
          left: position.left + STEP,
        });
        return;
      }
      if (keysPressed.ArrowUp && keysPressed.ArrowLeft) {
        console.log("going up AND left");
        setPosition({
          ...position,
          top: position.top - STEP,
          left: position.left - STEP,
        });
        return;
      }

      if (keysPressed.ArrowDown && keysPressed.ArrowRight) {
        console.log("going up AND right");
        setPosition({
          ...position,
          top: position.top + STEP,
          left: position.left + STEP,
        });
        return;
      }
      if (keysPressed.ArrowDown && keysPressed.ArrowLeft) {
        console.log("going down AND left");
        setPosition({
          ...position,
          top: position.top + STEP,
          left: position.left - STEP,
        });
        return;
      }

      // Simple move
      if (keysPressed.ArrowUp) {
        console.log("going up");
        setPosition({ ...position, top: position.top - STEP });
        if (didUserRemovedAKey(keysPressed, previousKeyPressed)) {
          window.clearInterval(window.timer);
          window.timer = window.setInterval(() => {
            console.log("SET INTERVAL - going up");
            setPosition((position) => ({
              ...position,
              top: position.top - STEP,
            }));
          }, SET_INTERVAL_MS);
        }
        return;
      }

      if (keysPressed.ArrowDown) {
        console.log("going down");
        setPosition({ ...position, top: position.top + STEP });
        if (didUserRemovedAKey(keysPressed, previousKeyPressed)) {
          window.clearInterval(window.timer);
          window.timer = window.setInterval(() => {
            console.log("SET INTERVAL - going down");
            setPosition((position) => ({
              ...position,
              top: position.top + STEP,
            }));
          }, SET_INTERVAL_MS);
        }
        return;
      }

      if (keysPressed.ArrowRight) {
        console.log("going right");
        setPosition({ ...position, left: position.left + STEP });
        if (didUserRemovedAKey(keysPressed, previousKeyPressed)) {
          window.clearInterval(window.timer);
          window.timer = window.setInterval(() => {
            console.log("SET INTERVAL - going right");
            setPosition((position) => ({
              ...position,
              left: position.left + STEP,
            }));
          }, SET_INTERVAL_MS);
        }
        return;
      }

      if (keysPressed.ArrowLeft) {
        console.log("going left");
        setPosition({ ...position, left: position.left - STEP });
        if (didUserRemovedAKey(keysPressed, previousKeyPressed)) {
          window.clearInterval(window.timer);
          window.timer = window.setInterval(() => {
            console.log("SET INTERVAL - going left");
            setPosition((position) => ({
              ...position,
              left: position.left - STEP,
            }));
          }, SET_INTERVAL_MS);
        }
        return;
      }
    }

    return () => {
      window.clearInterval(window.timer);
    };
  }, [keysPressed, setKeysPressed]);

  return (
    <div onKeyDown={handleMove} onKeyUp={cleanControls} tabIndex="0">
      <div className={classes.point}>O</div>
    </div>
  );
};

export default Point;
