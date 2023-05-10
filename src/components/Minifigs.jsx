import { connect } from "react-redux"
import { useState, useEffect } from "react"
import Headers from "./Headers"
import '../css/Minifigs.css'

function Minifigs() {

    const [info, setInfo] = useState({})
    const [nextUrl, setNextUrl] = useState('')
    const [oldUrl, setPrevUrl] = useState('')

    useEffect(() => {
      displayFigs()
    }, [])
    
    const displayFigs = async (url) => {
      const response = await fetch(url || 'https://rebrickable.com/api/v3/lego/minifigs/', {
        headers: {
           'Authorization': 'key 04d1c7b9d0cf244e51f5f7382774d20e'
          }
        })
        const result = await response.json()
        console.log(result)
        setInfo(result)
        setNextUrl(result.next)
        setPrevUrl(result.previous)

    }
    const minfigDisplay = info.results && info.results.map((figs) => {
        return(
                <li key={figs.id} className="minifig-item">
                    <div>{figs.name}</div>
                    <div>
                        {figs.set_img_url ? (
                            <img src={figs.set_img_url} className="figPic"/>
                        ) : (
                            <img src={'https://tng-avatars.imgix.net/default_avatar.jpeg?ar=1&auto=format&fit=crop&w=250'} className="figPic"/>
                        )}
                    </div>
                </li>
        )
    })

    const handleNextPage = () => {
        displayFigs(nextUrl)
    }
    const handlePrevPage = () => {
        displayFigs(oldUrl)
    }
    

    return(
        <>
            <Headers />
            <div className="buttonContainer">
                {oldUrl && <button onClick={handlePrevPage}>Prev Page</button>}
                {nextUrl && <button onClick={handleNextPage}>Next Page</button>}
            </div>
            <ul className="minifig-list">
                {minfigDisplay}
            </ul>
        </>
    )
}

export default connect()(Minifigs)