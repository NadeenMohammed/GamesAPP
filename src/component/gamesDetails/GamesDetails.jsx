import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import Loading from '../Loading/Loading';



export default function GameDetails() {
    let params = useParams();
    const [loading, setLoading] = useState(true);
    const [gameDetails, setGameDetails] = useState([])
    let url = 'https://free-to-play-games-database.p.rapidapi.com/api/game';
    async function GameDetails() {
        let { data } = await axios.get(url, {
            params: { id: params.id },
            headers: {
                'X-RapidAPI-Key': '523aa4b4cfmsh179cf1aa8840e88p1d19cdjsne54d3dde7858',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        })
        console.log(data);
        setLoading(false);
        setGameDetails(data);
    }
    useEffect(() => {

        GameDetails();
    }, [])


    return (


        <>
            {loading && <Loading />}
            {!loading &&

                <div className="conatiner my-5">
                    <div className="row mt-5 g-0">
                        <div className="col-md-4 my-5 ">
                            <div className='px-4'>
                                <img src={gameDetails.thumbnail} className='w-100 rounded-2 ' alt="" />


                                <div className="row info mt-2 w-100 justify-content-between me-0 pe-0">
                                    <div className="free-btn col-3 col-lg-2 me-2">
                                    <span className='btn btn-dark mb-3 py-2 cursor'>Free</span>
                                    </div>
                                <div className="play-btn col me-0 pe-0">
                                <a href={gameDetails.freetogame_profile_url} type='button' rel='nofollow' target='_blank' className='btn btn-primary btn-block w-100 py-2 me-0'>
                                <strong>Play Now </strong><i className="fas fa-sign-out-alt"></i>
                                    </a>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 text-start text-muted px-4 my-5">
                            <h1 >{gameDetails.title}</h1>
                            <h5>About {gameDetails.title}</h5>
                            <p className='fs-5 text-muted'>{gameDetails.description}</p>
                            <h4>{gameDetails.title}  Screenshots</h4>
                            <Carousel controls={false} interval={2500} indicators={false}>
                                {gameDetails?.screenshots?.map((item, index) => <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-75"
                                        src={item.image}
                                        alt=""

                                    />
                                </Carousel.Item>)}
                            </Carousel>

                            <h2 className='py-2'>Additional Information</h2>

                            <div className="row ">
                                <div className="col-md-4 col-6">
                                    <span className='text-muted'>Title</span>
                                    <p>{gameDetails.title}</p>
                                </div>
                                <div className="col-md-4 col-6">
                                    <span className='text-muted'>Developer</span>
                                    <p>{gameDetails.developer}</p>
                                </div>
                                <div className="col-md-4 col-6">
                                    <span className='text-muted'>Publisher</span>
                                    <p>{gameDetails.publisher}</p>
                                </div>
                                <div className="col-md-4 col-6">
                                    <span className='text-muted'>Release Date</span>
                                    <p>{gameDetails.release_date}</p>
                                </div>
                                <div className="col-md-4 col-6">
                                    <span className='text-muted'>Genre</span>
                                    <p>{gameDetails.genre}</p>
                                </div>
                                <div className="col-md-4 col-6">
                                    <span className='text-muted'>Platform</span>
                                    <p><i className="fas fa-window-maximize text-muted"></i> {gameDetails.platform}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            }


        </>
    )
}