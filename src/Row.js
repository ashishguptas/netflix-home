import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import axios from './axios';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import 'swiper/swiper-bundle.css';


SwiperCore.use([Navigation]);

function Row({ title, fetchUrl, isLargeImg }) {
   

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    const baseImgUrl = 'https://image.tmdb.org/t/p/original';


    useEffect(() => {
        async function fetchData() {
            // SwiperCore.use([Navigation]);
            // setPlaceImg(placeImgUrl)
            const request = await axios.get(fetchUrl);
            // console.log(request.data.results)
            setMovies(request.data.results)
            // console.log(request.data.results)
        }
        // console.log(placeImg)
        fetchData()
    }, [fetchUrl])

    const opts = {
        height: '390px',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    }


    
    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl('')
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            }).catch(
                (error) => console.log(error)
            )
        }
    }

    return (
        <div>
            <div className="row">
                <h2 className="titles">{title}</h2>
                <div className="row_posters">
                <Swiper
                spaceBetween={5}
                slidesPerView={7}
                navigation
                scrollbar={{ draggable: false }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}>
                    {movies.map((movie) => {
                       return(
                        <SwiperSlide><img src={`${baseImgUrl}${isLargeImg ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} onClick={() => handleClick(movie)} className={`row_poster ${isLargeImg && "row_largeposter"}`} key={movie.id}  />
                        </SwiperSlide>
                        )
                    })}
                    </Swiper>
                </div>
                {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
            </div>
        </div>
    )
}

export default Row
