import { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'

export function useSocket({ endpoint, token }) {
  // initialize the client using the server endpoint, e.g. localhost:8000
  // and set the auth "token" (in our case we're simply passing the username
  // for simplicity -- you would not do this in production!)
  // also make sure to use the Socket generic types in the reverse order of the server!
  const socket = socketIOClient(endpoint, {
    auth: {
      token: token,
    },
  })
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    console.log('useSocket useEffect', endpoint, socket)

    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [token])

  // we return the socket client instance and the connection state
  return {
    isConnected,
    socket,
  }
}
