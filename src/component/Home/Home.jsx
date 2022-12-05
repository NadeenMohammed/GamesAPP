import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import Loading from '../Loading/Loading';
import './Home.modules.scss'

export default function Home() {
 

  const [loading, setLoading] = useState(true);
  const [homeGames, setHomeGames] = useState([])

  let url = `https://free-to-play-games-database.p.rapidapi.com/api/games`;

  async function getData() {

    let { data } = await axios.get(url, {
      headers: {
        'X-RapidAPI-Key': '523aa4b4cfmsh179cf1aa8840e88p1d19cdjsne54d3dde7858',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'


      }

    })
    // console.log(data);
    setHomeGames(data);
    setLoading(false);

  }
  useEffect(() => {

    getData();
  }, [])
  return (
    <>
      {loading && <Loading />}
      {!loading && <>


        <div className="home border-4 shadow-lg d-flex justify-content-center align-items-center " >

          <div className="overlay mt-4 text-center">
            <h1>Find & track the best <span className='text-info'>free-to-play </span> games!</h1>
            <h4>Track what you've played and search for what to play next! Plus get free premium loot!</h4>
           <Link to='/All'> <button className='btn  mt-3'>Browse Game</button></Link>
          </div>

        </div>
        <div className="container my-2 pt-5">
          <div className="row g-4">
            <h2 className='text-muted text-uppercase'><i class="fa-solid fa-robot"></i>Personal Recomindation</h2>
            {homeGames.slice(0, 3).map((platformitem, index) => <div className="col-md-4 my-2 pb-2" key={index}>
              <Link to={'/gameDetails/' + platformitem.id} className='text-decoration-none text-muted'>
                <div className="cardd pb-3 shadow-lg bg-gradient mb-5">
                  <img src={platformitem.thumbnail} className='w-100 mb-3' alt="" />
                  <div className='position-relative '>
                    <h4 className='px-2'>{platformitem.title.slice(0, 10)}</h4>
                    <span className="badge text-bg-info fs-6 px-3 mx-3 py-2 position-absolute end-0 bottom-0">Free</span>
                  </div>
                </div>
              </Link>
            </div>)}

          </div>
        </div>
      </>}
    </>
  )
}