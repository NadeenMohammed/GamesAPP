import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';

export default function PlatForms() {

    const [platformData, setplatformData] = useState([]);
    const [visible, setVisible] = useState(20);
    const [parames, setParams] = useState(null);
    const [loading, setLoading] = useState(true);
    let params = useParams();

    const showMoreItem = () => {setVisible((prevValue) => prevValue + 20);}


    let url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
    async function getData() {
        let { data } = await axios.get(url, {
            params: { 'platform': params.platform },
            headers: {
                'X-RapidAPI-Key': '523aa4b4cfmsh179cf1aa8840e88p1d19cdjsne54d3dde7858',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        })
        console.log(data);
        setLoading(false);
        setplatformData(data);
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
                            {platformData.slice(0, visible).map((platformitem, index) => <div className="col-md-3" key={index}>
                                <Link to={'/gameDetails/' + platformitem.id} className='text-decoration-none'>
                                    <div className="cardd  pb-3 shadow-lg bg-gradient mb-5 text-muted ">
                                        <img src={platformitem.thumbnail} className='w-100 mb-3' alt="" />
                                        <div className='position-relative px-2'>
                                            <h4 className='px-2 text-decoration-none'>{platformitem.title.slice(0, 15)}</h4>
                                            <span className="badge text-bg-info px-3 mx-3 py-2 position-absolute end-0 bottom-0">Free</span>
                                        </div>
                                        
                                        <div className='d-flex px-2 justify-content-around '>
                                            <i className="fas fa-plus-square px-2 text-muted"></i>
                                            <span className='LightColor rounded p-1 me-2  text-muted text-bg-dark'>{platformitem.genre}</span> <i className="fa-brands fa-windows text-muted"></i> 
                                        </div>
                                    </div>
                                </Link>
                            </div>)}

                        </div>
                        <div className='text-center'>
                            <button className='btn btn-outline-secondary mb-4' onClick={showMoreItem}>More Games <i className="fa-solid fa-chevron-right text-muted"></i></button>
                        </div>
                    </div>
                </section>
            </>}
        </>
    )
}