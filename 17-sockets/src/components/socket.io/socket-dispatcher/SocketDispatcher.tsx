import { PropsWithChildren, useEffect } from "react";
import { io } from "socket.io-client";
import { useAppDispatch } from "../../../redux/hooks";
import { newPost } from "../../../redux/profileSlice";

export default function SocketDispatcher(props: PropsWithChildren) {

    const { children } = props

    const dispatch = useAppDispatch()

    useEffect(() => {
        const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL) 

        socket.onAny((eventName, payload) => {
            switch(eventName) {
                case 'new-post':
                    dispatch(newPost(payload.post))
                    break;
            }
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