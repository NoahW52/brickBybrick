import '../css/App.css'
import Headers from './Headers'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

function App() {
  document.body.className = "home-page"

  const [homeTheme, setHomeTheme] = useState({})
  const [homeFig, setHomeFig] = useState({})
  const [prev, setPrev] = useState('')
  const [next, setNext] = useState('')
  const [figsPrev, setFigsPrev] = useState('')
  const [figsNext, setFigsNext] = useState('')


  useEffect(() => {
    displayHomePageThemes()
  }, [])
  useEffect(() => {
    displayFigs()
  },[])

  const displayHomePageThemes = async (url) => {
    const response = await fetch(url || 'https://rebrickable.com/api/v3/lego/themes/', {
      headers: {
        'Authorization': 'key 04d1c7b9d0cf244e51f5f7382774d20e'
      }
    })
    const result = await response.json()
    setHomeTheme(result)
    setPrev(result.previous)
    setNext(result.next)
  }

  const mapDisplayTheme = homeTheme.results && homeTheme.results.map((theme) => {
    return (
      <li key={theme.id} className='theme-item'>
        <div>{theme.name}</div>
      </li>
    )
  })

  const displayFigs = async (url) => {
    const response = await fetch(url || 'https://rebrickable.com/api/v3/lego/minifigs/', {
      headers: {
        'Authorization': 'key 04d1c7b9d0cf244e51f5f7382774d20e'
      }
    })
    const result = await response.json()
    setHomeFig(result)
    setFigsPrev(result.previous)
    setFigsNext(result.next)
  }

  const displayHomeFig = homeFig.results && homeFig.results.map((homeF) => {
    return (
      <li key={homeF.id} className='theme-item'>
        <div>
          {homeF.set_img_url ? (
            <img src={homeF.set_img_url} className="figPic" />
            ) : (
              <img src={'https://tng-avatars.imgix.net/default_avatar.jpeg?ar=1&auto=format&fit=crop&w=250'} className="figPic" />
              )}
              <div>{homeF.name}</div>
        </div>
      </li>
    )
  })

  // const handleFilter = (year) => {
  //   setSelectYear(year)
  //   const filtered = data.filter((item) => item.year === year)
  //   setFilter(filtered)
  // }

  const handleNextPage = () => {
    displayHomePageThemes(next)
  }
  const handlePrevPage = () => {
    displayHomePageThemes(prev)
  }

  const figNext = () => {
    displayFigs(figsNext)
  }
  const figPrev = () => {
    displayFigs(figsPrev)
  }

  return (
    <>
      <Headers />
      <h1>Welcome to brickBybrick</h1>
      <p>Checkout all of the lego themes to exist and The newest sets and figs to be released!</p>
      <ul className='theme-list'>
        <div className="buttonContainer">
          {next && <button onClick={handleNextPage}>Next Page</button>}
          {prev && <button onClick={handlePrevPage}>Prev Page</button>}
        </div>
        {mapDisplayTheme}
        <div className='buttonContainer'>
          {next && <button onClick={handleNextPage}>Next Page</button>}
          {prev && <button onClick={handlePrevPage}>Prev Page</button>}
        </div>
      </ul>
      <ul className='theme-list'>
      <div className="buttonContainer">
          {figsNext && <button onClick={figNext}>Next Page</button>}
          {figsPrev && <button onClick={figPrev}>Prev Page</button>}
        </div>
        {displayHomeFig}
        <div className="buttonContainer">
          {figsNext && <button onClick={figNext}>Next Page</button>}
          {figsPrev && <button onClick={figPrev}>Prev Page</button>}
        </div>
      </ul>


    </>
  )
}

export default connect()(App)