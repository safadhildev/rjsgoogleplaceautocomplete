export const stopBubbling = (cb) => (ev) => {
  ev.preventDefault();
  ev.stopPropagation();

  return cb(ev);
};
