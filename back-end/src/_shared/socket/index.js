const { Server } = require('socket.io')

const io = new Server(5001, {
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
})

io.on('connection', function (socket) {
    console.log('User Connection')

    socket.on('joinOrder', ({ id, name, room }) => {
        socket.join(room)
        console.log('User Join Order', name, room)

        io.to(room).emit('orderGroup', { id, name, room })
    })

    //Message listening
    socket.on('refreshOrder', ({ name, userId, room, type }) => {
        console.log('[server](refresh): %s', name, userId, room, type)
        io.to(room).emit('refreshOrder', { name, userId, room, type })
    })

    socket.on('disconnect', () => {
        console.log('User Left', socket.id)
    })
})

console.log('Socket app is running on port', 5001)
