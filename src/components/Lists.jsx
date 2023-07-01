import { useEffect, useState } from "react"
import Headers from "./Headers"
import '../css/Lists.css'

function Lists(props) {
    document.body.className = "list-page"

    const apiUrl = import.meta.env.VITE_API_URL
    const lsUrl = import.meta.env.VITE_LH_URL

    const [figList, setFigList] = useState([])
    const [setList, setSetList] = useState([])


    const arrayListFigs = async () => {

        try {
            const userId = localStorage.getItem('userId')
            const response = await fetch(`${lsUrl}/api/minifigList/${userId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const result = await response.json()
            setFigList(result)
        } catch (error) {
            console.error(error)
        }
    }

    const deleteFig = async (figId) => {
        const userId = localStorage.getItem('userId')
        const response = await fetch(`${lsUrl}/api/minifigList/${userId}/${figId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        if (response.ok) {
            const updatedFigList = figList.filter((fig) => fig._id !== figId)
            setFigList(updatedFigList)
        }
    }

    const arrayListSets = async () => {
        try {
            const userId = localStorage.getItem('userId')
            const response = await fetch(`${lsUrl}/api/setList/${userId}`, {
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const result = await response.json()
            setSetList(result)
        } catch (error) {
            console.error(error)
        }
    }

    const deleteSet = async (setId) => {
        const userId = localStorage.getItem('userId')
        const response = await fetch(`${lsUrl}/api/setList/${userId}/${setId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        if (response.ok) {
            const updatedSetList = setList.filter((set) => set._id !== setId)
            setSetList(updatedSetList)
        }
    }

    useEffect(() => {
        arrayListFigs()
    }, [])

    useEffect(() => {
        arrayListSets()
    }, [])

    const displayFigsList = figList.map((listF) => {
        return (
            <li key={listF._id}>
                <div className="figList-item">
                    <div>
                        {listF.set_img_url ? (
                            <img src={listF.set_img_url} className="figPic" />
                        ) : (
                            <img src={'https://tng-avatars.imgix.net/default_avatar.jpeg?ar=1&auto=format&fit=crop&w=250'} className="figPic" />
                        )}
                    </div>
                    <div>{listF.name}</div>
                <button className="deleteButton" onClick={() => deleteFig(listF._id)}>Delete</button>
                </div>
            </li>
        )
    })

    const displaySetList = setList.map((sets) => {
        return (
            <li key={sets._id}>
                <div className="setList-item">
                    <div><img src={sets.set_img_url} className="setPic" /></div>
                    <div>{sets.name}</div>
                    <div>Piece Count: {sets.num_parts}</div>
                    <div>Year Released: {sets.year}</div>
                    <div>{sets.set_num}</div>
                    <button className="deleteButton" onClick={() => deleteSet(sets._id)}>Delete</button>
                </div>
            </li>
        )
    })

    return (
        <>
            <Headers />
            <div className="lists-container">
                <div className="list-wrapper">
                    <h3 className="title-of-list">Minifigs List:</h3>
                    <ul className="list-list">
                        {displayFigsList}
                    </ul>
                </div>

                <div className="list-wrapper">
                    <h3 className="title-of-app">Lego Set List:</h3>
                    <ul className="list-list">
                        {displaySetList}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Lists