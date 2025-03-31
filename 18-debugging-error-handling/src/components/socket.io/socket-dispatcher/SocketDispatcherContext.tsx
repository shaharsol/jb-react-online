import { createContext } from "react"

interface SocketDispatcherContextInterface {
    clientId: string
}

export const SocketDispatcherContext = createContext<SocketDispatcherContextInterface>({
    clientId: ''
})