import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "./AuthProvider";

const RequireAuth = ({ children }) => {
	const user=localStorage.getItem("email")
	const location = useLocation()
	if (!user) {
		return <Navigate to="/login" state={{ path: location.pathname }} />
	}
	return children
}
export default RequireAuth