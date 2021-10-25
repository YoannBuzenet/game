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
