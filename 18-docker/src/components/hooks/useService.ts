import { SocketDispatcherContext } from './../socket.io/socket-dispatcher/SocketDispatcherContext';
import { useContext } from "react";
import { AuthContext } from "../auth/auth/AuthContext";
import axios, { AxiosInstance } from "axios";
import AuthAware from "../../services/auth-aware/AuthAware";

export default function useService<T extends AuthAware>(Service: {new(axiosInstance: AxiosInstance): T}): T {
    const { jwt } = useContext(AuthContext)!
    const { clientId } = useContext(SocketDispatcherContext)
    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${jwt}`,
            'x-client-id': clientId
        }
    })

    const service = new Service(axiosInstance)
    return service
}