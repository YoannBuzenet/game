import jss from "jss";
import { useEffect, useState } from "react";

const Point = () => {
  const [position, setPosition] = useState({
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  });

  const [keysPressed, setKeysPressed] = useState({});

  const [multiTouch, setMultiTouch] = useState(false);

  const STEP = 10;

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
    console.log("deactivating multitouch");
    setMultiTouch(false);
    window.clearInterval(window.timer);
  };

  useEffect(() => {
    console.log("did trigger");
    console.log("multi touch", multiTouch);
    console.log(keysPressed);

    // Check anti multi touch
    if (Object.keys(keysPressed).length <= 1) {
      window.clearInterval(window.timer);
      setMultiTouch(false);
    }

    // Si 2 touches étaient pressées, qu'il n'yen a plus qu'une maintenant et qu'elle fait partie de celles-ci, levier

    if (
      Object.keys(keysPressed).length > 1 &&
      Object.keys(keysPressed).some(
        (property) => keysPressed[property] === true
      )
    ) {
      // Multi touch
      setMultiTouch(true);
    }

    if (
      Object.keys(keysPressed).length > 0 &&
      Object.keys(keysPressed).some(
        (property) => keysPressed[property] === true
      )
    ) {
      console.log("inside");
      console.log("timer :", window.timer);

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
        if (multiTouch) {
          window.timer = window.setInterval(() => {
            console.log("going up");
            setPosition((position) => ({
              ...position,
              top: position.top - STEP,
            }));
          }, 150);
        }
        return;
      }

      if (keysPressed.ArrowDown) {
        console.log("going down");
        setPosition({ ...position, top: position.top + STEP });
        if (multiTouch) {
          window.timer = window.setInterval(() => {
            console.log("going down");
            setPosition((position) => ({
              ...position,
              top: position.top + STEP,
            }));
          }, 150);
        }
        return;
      }

      if (keysPressed.ArrowRight) {
        console.log("going right");
        setPosition({ ...position, left: position.left + STEP });
        if (multiTouch) {
          window.timer = window.setInterval(() => {
            console.log("going right");
            setPosition((position) => ({
              ...position,
              left: position.left + STEP,
            }));
          }, 150);
        }
        return;
      }

      if (keysPressed.ArrowLeft) {
        console.log("going left");
        setPosition({ ...position, left: position.left - STEP });
        if (multiTouch) {
          window.timer = window.setInterval(() => {
            console.log("going left");
            setPosition((position) => ({
              ...position,
              left: position.left - STEP,
            }));
          }, 150);
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
