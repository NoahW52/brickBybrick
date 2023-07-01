import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Headers from "./Headers";
import '../css/Parts.css'

function Parts(props) {

    const apiUrl = import.meta.env.VITE_API_URL
    const lsUrl = import.meta.env.VITE_LH_URL
    const authkey = import.meta.env.VITE_AUTH_KEY

    const [oldPart, SetPart] = useState({})
    const [next, SetNext] = useState('')
    const [prev, SetPrev] = useState('')

    const handleNextPage = () => {
        displayParts(next)
    }
    const handlePrevPage = () => {
        displayParts(prev)
    }

    useEffect(() => {
        displayParts()
    }, [])

    const displayParts = async (url) => {
         const response = await fetch(url || `${apiUrl}parts`, {
            headers: {
                "Authorization": `${authkey}`
            } 
        })
        const result = await response.json()
        SetPart(result)
        SetNext(result.next)
        SetPrev(result.previous)
    }
    const partsContent = oldPart.results && oldPart.results.map((part) => {
        return (
            <li key={part.id} className="parts-item">
                <div className="api-item-name">{part.name}</div>
                <div>
                    {part.part_img_url ? (
                        <img src={part.part_img_url} className="partsPic"/>
                    ) : (
                        <img src={'https://tng-avatars.imgix.net/default_avatar.jpeg?ar=1&auto=format&fit=crop&w=250'} className="partsPic" />
                    )}
                </div>
            </li>
        )
    })

    return (
        <>
            <Headers />
            <div>
                {prev &&<button onClick={handlePrevPage} className="pageButton">Prev Page</button>}
                {next &&<button onClick={handleNextPage} className="pageButton">Next Page</button>}
            </div>

            <ul className="parts-list">
            {partsContent}
            </ul>

            <div>
                {prev &&<button onClick={handlePrevPage} className="pageButton">Prev Page</button>}
                {next &&<button onClick={handleNextPage} className="pageButton">Next Page</button>}
            </div>

        </>
    )
} 


export default connect()(Parts)