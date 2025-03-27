import { PropsWithChildren, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAppDispatch } from "../../../redux/hooks";
import { newPost } from "../../../redux/profileSlice";
import { v4 } from "uuid";
import { SocketDispatcherContext } from "./SocketDispatcherContext";
import useUserId from "../../hooks/useUserId";

export default function SocketDispatcher(props: PropsWithChildren) {

    const { children } = props

    const dispatch = useAppDispatch()

    const [ clientId ] = useState<string>(v4())

    const userId = useUserId()

    useEffect(() => {
        const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL) 

        socket.onAny((eventName, payload) => {
            if(payload.from === clientId) return;
            switch(eventName) {
                case 'new-post':
                    if (userId === payload.post.userId) {
                        dispatch(newPost(payload.post))
                    }
                    break;
            }
        })

        return () => {
            socket.disconnect()
        }
    }, [ dispatch ])

    return (
        <SocketDispatcherContext value={{clientId}}>
            {children}
        </SocketDispatcherContext>
    )
}