import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Headers from "./Headers";
import '../css/Parts.css'

function Parts(props) {
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
         const response = await fetch(url || 'https://rebrickable.com/api/v3/lego/parts', {
            headers: {
                "Authorization": "key 04d1c7b9d0cf244e51f5f7382774d20e"
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
                <div>{part.name}</div>
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
            <div className="buttonContainer">
                {prev &&<button onClick={handlePrevPage}>Prev Page</button>}
                {next &&<button onClick={handleNextPage}>Next Page</button>}
            </div>

            <ul className="parts-list">
            {partsContent}
            </ul>

        </>
    )
} 


export default connect()(Parts)