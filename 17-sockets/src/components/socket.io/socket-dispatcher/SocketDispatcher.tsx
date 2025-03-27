import { PropsWithChildren, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { newPost } from "../../../redux/profileSlice";
import { v4 } from "uuid";
import { SocketDispatcherContext } from "./SocketDispatcherContext";
import useUserId from "../../hooks/useUserId";
import { indicateNewContent } from "../../../redux/feedSlice";

export default function SocketDispatcher(props: PropsWithChildren) {

    const { children } = props

    const dispatch = useAppDispatch()

    const [ clientId ] = useState<string>(v4())

    const userId = useUserId()

    const following = useAppSelector(state => state.following.following)

    useEffect(() => {
        const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL) 

        socket.onAny((eventName, payload) => {
            if(payload.from === clientId) return;
            switch(eventName) {
                case 'new-post':
                    console.log(payload.post.userId)
                    console.log(following)
                    console.log('following: ', following.findIndex(f => f.id === payload.post.userId))
                    if (userId === payload.post.userId) {
                        dispatch(newPost(payload.post))
                    } else if (following.findIndex(f => f.id === payload.post.userId) > -1) {
                        dispatch(indicateNewContent())
                    }
                    
                    break;
            }
        })

        return () => {
            socket.disconnect()
        }
    }, [ dispatch, clientId, following, userId ])

    return (
        <SocketDispatcherContext value={{clientId}}>
            {children}
        </SocketDispatcherContext>
    )
}