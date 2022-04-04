function debounce(func, wait){
  let timer;
  return function executedFunction(...args){
    clearTimeout(timer);
    timer = setTimeout(func, wait);
  };
}

export { debounce };