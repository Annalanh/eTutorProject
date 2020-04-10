let calling_socket = io.connect('/calling')

console.log('calling')
calling_socket.emit('joinCallRoom', ({ userId: localStorage.getItem('userId')}))
