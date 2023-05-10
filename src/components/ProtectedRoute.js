import { connect } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router"

function ProtectedRoute(props) {
    const navigate = useNavigate()

    useEffect(() => {

        if(!props.authCheck) {
            navigate('/login')
        }
    }, [])
    return props.children
}
const mapStateToProps = (state) => {
    return {
        authCheck: state.isAuth
    }
}

export default connect(mapStateToProps)(ProtectedRoute)