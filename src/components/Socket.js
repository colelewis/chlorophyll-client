import { io } from 'socket.io-client'
const { token } = sessionStorage

export const socket = io('localhost:62501', { transports: ['polling', 'websocket'] }, { query: { token } })
