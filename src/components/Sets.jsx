import { connect } from "react-redux"
import { useEffect, useState } from "react"
import Headers from "./Headers"
import '../css/Sets.css'

function Sets() {
    const [oldSet, SetNewSet] = useState({})

    useEffect(() => {
        displaySets()
    }, [])
    

    const displaySets = async() => {
        const response = await fetch('https://rebrickable.com/api/v3/lego/sets/', {
            headers: { 
                "Authorization" : "key 04d1c7b9d0cf244e51f5f7382774d20e"
            }
        })
        const result = await response.json()
        SetNewSet(result)
    }
    const setDisplay = oldSet.results && oldSet.results.map((sets) => {
        return(
            <li key={sets.id} className="set-item">
                <div>{sets.name}</div>
                <div><img src={sets.set_img_url} className="setPic"/></div>
                <div>Piece Count: {sets.num_parts}</div>
                <div>Year Released: {sets.year}</div>
            </li>
        )
    })

    return(
        <>
            <Headers />  
            <button>Previous</button>
            <button>Next</button>
            <ul className="set-list">
                {setDisplay}
            </ul>
        </>
    )
}

export default connect()(Sets)