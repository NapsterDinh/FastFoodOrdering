import io from 'socket.io-client';
import React from 'react';

export const socket = io("localhost:5001", {transports: ['websocket'], upgrade: false})
export const SocketContext = React.createContext();