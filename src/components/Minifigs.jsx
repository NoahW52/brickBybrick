import { connect } from "react-redux"
import { useState, useEffect } from "react"
import Headers from "./Headers"
import '../css/Minifigs.css'

function Minifigs(props) {

    const apiUrl = import.meta.env.VITE_API_URL
    const lsUrl = import.meta.env.VITE_LH_URL
    const authkey = import.meta.env.VITE_AUTH_KEY

    const [info, setInfo] = useState({})
    const [nextUrl, setNextUrl] = useState('')
    const [oldUrl, setPrevUrl] = useState('')

    useEffect(() => {
        displayFigs()
    }, [])

    const addFigsToList = async (legoFig) => {
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('jwt')
        const response = await fetch(`${lsUrl}/api/minifigList/${userId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: legoFig.name,
                set_img_url: legoFig.set_img_url
            })
        })
        const result = await response.json()
        console.log(result)
        console.log('Minifig added to list!')
    }

    const displayFigs = async (url) => {
        const response = await fetch(url || `${apiUrl}minifigs/`, {
            headers: {
                'Authorization': `${authkey}`
            }
        })
        const result = await response.json()
        setInfo(result)
        setNextUrl(result.next)
        setPrevUrl(result.previous)
    }
    const minifigDisplay = info.results && info.results.map((figs) => {
        return (
            <li key={figs.id} className="minifig-item">
                <div>
                    {figs.set_img_url ? (
                        <img src={figs.set_img_url} className="figPic" />
                    ) : (
                        <img src={'https://tng-avatars.imgix.net/default_avatar.jpeg?ar=1&auto=format&fit=crop&w=250'} className="figPic" />
                    )}
                </div>
                <div>
                    {props.authUser ? (
                        <button onClick={() => addFigsToList(figs)} className="button">fav-a-fig</button>
                    ) : null}
                </div>
                <div className="api-item-name">{figs.name}</div>
            </li>
        )
    })

    const handleNextPage = () => {
        displayFigs(nextUrl)
    }
    const handlePrevPage = () => {
        displayFigs(oldUrl)
    }

    return (
        <>
            <Headers />
            <div>
                {oldUrl && <button onClick={handlePrevPage} className="pageButton">Prev Page</button>}
                {nextUrl && <button onClick={handleNextPage} className="pageButton">Next Page</button>}
            </div>
            <ul className="minifig-list">
                {minifigDisplay}
            </ul>
            <div>
                {oldUrl && <button onClick={handlePrevPage} className="pageButton">Prev Page</button>}
                {nextUrl && <button onClick={handleNextPage} className="pageButton">Next Page</button>}
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        authUser: state.isAuth
    }
}

export default connect(mapStateToProps)(Minifigs)