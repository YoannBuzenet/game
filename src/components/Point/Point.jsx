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
  };

  useEffect(() => {
    console.log("did trigger");
    console.log(keysPressed);

    if (
      Object.keys(keysPressed).length > 0 &&
      Object.keys(keysPressed).some(
        (property) => keysPressed[property] === true
      )
    ) {
      console.log("inside");
      if (keysPressed.ArrowUp && keysPressed.ArrowRight) {
        console.log("going up AND right");
        setPosition({
          ...position,
          top: position.top - STEP,
          left: position.left + STEP,
        });
        return;
      } else if (keysPressed.ArrowUp && keysPressed.ArrowLeft) {
        console.log("going up AND left");
        setPosition({
          ...position,
          top: position.top - STEP,
          left: position.left - STEP,
        });
        return;
      } else if (keysPressed.ArrowUp) {
        console.log("going up");
        setPosition({ ...position, top: position.top - STEP });
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
      } else if (keysPressed.ArrowDown) {
        console.log("going down");
        setPosition({ ...position, top: position.top + STEP });
        return;
      }

      if (keysPressed.ArrowRight) {
        console.log("going right");
        setPosition({ ...position, left: position.left + STEP });
        return;
      }

      if (keysPressed.ArrowLeft) {
        console.log("going left");
        setPosition({ ...position, left: position.left - STEP });
        return;
      }
    }
  }, [keysPressed, setKeysPressed]);

  return (
    <div onKeyDown={handleMove} onKeyUp={cleanControls} tabIndex="0">
      <div className={classes.point}>O</div>
    </div>
  );
};

export default Point;
