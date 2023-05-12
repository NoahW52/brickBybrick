import { useEffect, useState } from "react"
import Headers from "./Headers"
import '../css/Lists.css'

function Lists(props) {
    document.body.className = "list-page"

    const [figList, setFigList] = useState([])
    const [setList, setSetList] = useState([])


    const arrayListFigs = async () => {

        try {
            const userId = localStorage.getItem('userId')
            const response = await fetch(`http://localhost:8080/api/minifigList/${userId}`, {
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

    const arrayListSets = async () => {
        try {
            const userId = localStorage.getItem('userId')
            const response = await fetch(`http://localhost:8080/api/setList/${userId}`, {
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

    useEffect(() => {
        arrayListFigs()
    }, [])

    useEffect(() => {
        arrayListSets()
    }, [])

    const displayFigsList = figList.map((listF) => {
        return (
            <li key={listF.id}>
                <div className="figList-item">
                    <div>
                        {listF.set_img_url ? (
                            <img src={listF.set_img_url} className="figPic" />
                        ) : (
                            <img src={'https://tng-avatars.imgix.net/default_avatar.jpeg?ar=1&auto=format&fit=crop&w=250'} className="figPic" />
                        )}
                    </div>
                    <div>{listF.name}</div>
                </div>
            </li>
        )
    })

    const displaySetList = setList.map((sets) => {
        return (
            <li key={sets.id}>
                <div className="setList-item">
                    <div><img src={sets.set_img_url} className="setPic" /></div>
                    <div>{sets.name}</div>
                    <div>Piece Count: {sets.num_parts}</div>
                    <div>Year Released: {sets.year}</div>
                    <div>{sets.set_num}</div>
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