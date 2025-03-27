import { PropsWithChildren, useEffect } from "react";
import { io } from "socket.io-client";

export default function SocketDispatcher(props: PropsWithChildren) {

    const { children } = props

    useEffect(() => {
        const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL) 

        socket.onAny((eventName, payload) => {
            console.log(eventName)
            console.log(payload)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <>
            {children}
        </>
    )
}