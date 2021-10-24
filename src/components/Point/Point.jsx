import jss from "jss";
import { useState } from "react";

const Point = () => {
  const [position, setPosition] = useState({
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  });

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
    console.log("event.key", event.key);
    if (event.key === "ArrowUp") {
      setPosition({ ...position, top: position.top - STEP });
    }
    if (event.key === "ArrowDown") {
      setPosition({ ...position, top: position.top + STEP });
    }
    if (event.key === "ArrowRight") {
      setPosition({ ...position, left: position.left + STEP });
    }
    if (event.key === "ArrowLeft") {
      setPosition({ ...position, left: position.left - STEP });
    }
  };

  return (
    <div onKeyDown={handleMove} tabIndex="0">
      <div className={classes.point}>O</div>
    </div>
  );
};

export default Point;
