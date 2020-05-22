const onEnter = (e, cb) => {
  if (e.key === 'Enter') {
    cb(e);
  }
};


export {
  onEnter,
};
