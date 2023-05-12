import { connect } from "react-redux"
import { useState, useEffect } from "react"
import Headers from "./Headers"
import '../css/Minifigs.css'

function Minifigs(props) {

    const [info, setInfo] = useState({})
    const [nextUrl, setNextUrl] = useState('')
    const [oldUrl, setPrevUrl] = useState('')

    useEffect(() => {
        displayFigs()
    }, [])

    const addFigsToList = async (legoFig) => {
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('jwt')
        const response = await fetch(`http://localhost:8080/api/minifigList/${userId}`, {
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
        const response = await fetch(url || 'https://rebrickable.com/api/v3/lego/minifigs/', {
            headers: {
                'Authorization': 'key 04d1c7b9d0cf244e51f5f7382774d20e'
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
                <div>{figs.name}</div>
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
            <div className="buttonContainer">
                {oldUrl && <button onClick={handlePrevPage}>Prev Page</button>}
                {nextUrl && <button onClick={handleNextPage}>Next Page</button>}
            </div>
            <ul className="minifig-list">
                {minifigDisplay}
            </ul>
            <div className="buttonContainer">
                {oldUrl && <button onClick={handlePrevPage}>Prev Page</button>}
                {nextUrl && <button onClick={handleNextPage}>Next Page</button>}
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