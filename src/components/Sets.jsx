import { connect } from "react-redux"
import { useEffect, useState } from "react"
import Headers from "./Headers"
import '../css/Sets.css'

function Sets(props) {

    const apiUrl = import.meta.env.VITE_API_URL
    const lsUrl = import.meta.env.VITE_LH_URL
    const authkey = import.meta.env.VITE_AUTH_KEY

    const [oldSet, SetNewSet] = useState({})
    const [next, setNext] = useState('')
    const [prev, setPrev] = useState('')

    useEffect(() => {
        displaySets()
    }, [])
    
    const addSetToList = async(legoSet) => {
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('jwt')
        const response = await fetch(`${lsUrl}/api/setList/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ 
                name: legoSet.name,
                set_num: legoSet.set_num,
                set_img_url: legoSet.set_img_url,
                num_parts: legoSet.num_parts,
                year: legoSet.year 
            })
        })
        const result = await response.json()
        console.log(result)
        console.log('set added to list')
    }

    const displaySets = async(url) => {
        const response = await fetch(url || `${apiUrl}sets/`, {
            headers: { 
                "Authorization" : `${authkey}`
            }
        })
        const result = await response.json()
        SetNewSet(result)
        setNext(result.next)
        setPrev(result.previous)
    }
    const setDisplay = oldSet.results && oldSet.results.map((sets) => {
        return(
            <li key={sets.id} className="set-item">
                <div className="api-item-name">{sets.name}</div>
                <div className="api-item-name">{sets.set_num}</div>
                <div><img src={sets.set_img_url} className="setPic"/></div>
                <div className="api-item-name">Piece Count: {sets.num_parts}</div>
                <div className="api-item-name">Year Released: {sets.year}</div>
                <div>
                    {props.authUser ? (
                        <button onClick={() => addSetToList(sets)}>fav-a-set</button>
                        ) : null}
                </div>
            </li>
        )
    })
    const handleNextPage = () => {
        displaySets(next)
    }
    const handlePrevPage = () => {
        displaySets(prev)
    }


    return(
        <>
            <Headers />  
            {prev && <button onClick={handlePrevPage} className="pageButton">Previous</button>}
            {next && <button onClick={handleNextPage} className="pageButton">Next</button>}
            <ul className="set-list">
                {setDisplay}
            </ul>
            {prev && <button onClick={handlePrevPage} className="pageButton">Previous</button>}
            {next && <button onClick={handleNextPage} className="pageButton">Next</button>}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        authUser: state.isAuth
    }
}

export default connect(mapStateToProps)(Sets)