self.onmessage = function(event) {
  console.log('Worker received message:', event.data);
  self.postMessage('Worker response');
};