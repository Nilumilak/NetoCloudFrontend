import Header from "../Header/Header"
import { Outlet } from "react-router-dom"
import './RootElement.css'
import AuthenticationModal from "../AuthenticationModal/AuthenticationModal"
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { getUserRequest } from "../../redux/slices/userSlice";
import { getTokenRefreshRequest } from "../../redux/slices/tokenSlice";
import { useEffect } from 'react'


function RootElement() {
    const accessToken = useAppSelector(state => state.token.accessToken)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if (accessToken !== null) {
            dispatch(getUserRequest())
        } else {
            dispatch(getTokenRefreshRequest())
        }
    }, [accessToken, dispatch])

    return (
        <div className="main-container">
            {accessToken === null ? <AuthenticationModal /> : null}
            <Header />
            <Outlet />
        </div>
    )
}

export default RootElement