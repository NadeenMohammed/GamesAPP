import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
// PlatFormBrowser


export default function Category() {
  const [categorytData, setCategoryData] = useState([]);
  const [showGames, setShowGames] = useState(20);
  const [param, setParams] = useState(null);
  const [loading, setLoading] = useState(true);

  let params = useParams();

  const showMoreGames = () => {
    setShowGames((prevValue) => prevValue + 20);
  }
  let url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
  async function getData() {
    let { data } = await axios.get(url, {
      params: { category: params.category },
      headers: {
        'X-RapidAPI-Key': '523aa4b4cfmsh179cf1aa8840e88p1d19cdjsne54d3dde7858',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    })
    console.log(data);
    setCategoryData(data);
    setLoading(false);
  }
  useEffect(() => {
    setParams(params);
    getData();
  }, [params])


  return (
    <>
      {loading && <Loading />}
      {!loading && <>
        <section>
          <div className="container mt-5">
            <div className="row g-4">
              {categorytData.slice(0, showGames).map((catitem, index) => <div className="col-md-3" key={index}>
                <Link to={'/gameDetails/' + catitem.id} className='text-decoration-none'>
                  <div className="cardd  pb-3 shadow-lg bg-gradient mb-5 ">
                    <img src={catitem.thumbnail} className='w-100 mb-3' alt="" />
                    <div className='position-relative px-2 text-muted'>
                      <h4 className='px-2'>{catitem.title.slice(0, 15)}</h4>
                      <span className="badge text-bg-info px-3 mx-3 py-2 position-absolute end-0 bottom-0">Free</span>
                    </div>
                    
                    <div className='d-flex px-2 justify-content-around'>
                      <i className="fas fa-plus-square px-2 text-muted"></i>
                      <span className='LightColor rounded px-2 py-1 text-muted text-bg-dark me-2'>{catitem.genre}</span> {catitem.platform == "PC (Windows)" ? <i className="fa-brands fa-windows text-muted"></i> : <i className="text-muted fa-solid fa-window-maximize"></i>}
                    </div>
                  </div>
                </Link>
              </div>)}

            </div>
            <div className='text-center'>
              <button className='btn btn-outline-secondary mb-4' onClick={showMoreGames}>More Games <i className="fa-solid fa-chevron-right text-muted"></i></button>
            </div>
          </div>
        </section>
      </>}

    </>
  )
}