import React from 'react'
import Contents from './Contents.jsx'
import { NavLink } from 'react-router-dom'

function NavBar() {
    const Separator = () => <span> | </span>
    return (
        <nav>
            <NavLink end to="/">Home</NavLink>
            <Separator />
            <NavLink to="/employees">All Employees</NavLink>
            <Separator />
            <NavLink to="/report">Reports</NavLink>
        </nav>
    )
}

export default function Page() {
    return (
        <div>
            <NavBar />
            <Contents />
        </div>
    )
}