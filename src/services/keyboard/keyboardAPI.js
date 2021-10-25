export function getNumberOfPushedKeys(objectWithKeyboardKeys) {
  return Object.keys(objectWithKeyboardKeys).filter(
    (key) => objectWithKeyboardKeys[key] === true
  ).length;
}

export function didUserRemovedAKey(currentKeyPressed, previousKeyPressed) {
  return (
    getNumberOfPushedKeys(currentKeyPressed) <
    getNumberOfPushedKeys(previousKeyPressed)
  );
}

export function isAKeyPressed(keysPressed) {
  return (
    Object.keys(keysPressed).length > 0 &&
    Object.keys(keysPressed).some((property) => keysPressed[property] === true)
  );
}
