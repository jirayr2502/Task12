import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { handelVerify, handleLogout } from '../../Lib/api'
import { IWideUser } from '../../Lib/types'

export const Profile = () => {
    const navigate = useNavigate()
    const [account, setAccount] = useState<IWideUser | null>(null)
    useEffect(() => {
        handelVerify()
            .then(response => {
                if (!response.user) {
                    navigate('/login')
                } else {
                    setAccount(response.user)
                }
            })
    }, [])

    const onLogout = (): void => {
        handleLogout()
        .then(response => {
            if(response.status == 'ok') {
                navigate('/login')
            }
        })
    }
    return (
         account && <>
            <nav>
                <NavLink to="/profile" end>Profile</NavLink>
                <NavLink to="/profile/settings">Settings</NavLink>
                <NavLink to="/profile/search">Search</NavLink>
                <NavLink to="/profile/posts">Posts</NavLink>
                <NavLink to="/profile/followers">Followers</NavLink>
                <NavLink to="/profile/followings">Followings</NavLink>
                <button onClick={onLogout}>Logout</button>
            </nav>

            <Outlet
                context={{ account, setAccount }}
            />
        </>
    )
}