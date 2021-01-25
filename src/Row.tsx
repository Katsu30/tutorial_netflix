import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import YouTube from "react-youtube";

import instance from './axios';

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

type Movie = {
  id: string;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
};

type ImageProps = {
  isLargeRow: boolean;
  key: string;
}

type Options = {
  height: string;
  width: string;
  playerVars: {
    autoplay: 0 | 1 | undefined;
  };
};

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");
  const base_url = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [ fetchUrl ]);

  const opts: Options = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = async (movie: Movie) => {
    if ( trailerUrl ) {
      setTrailerUrl("");
    } else {
      let trailerurl = await instance.get(
        `/movie/${ movie.id }/videos?api_key=fb34530271b349314af0de263d16ab5a`
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };

  return(
    <RowContainerWithStyled>
    <h2>{ title }</h2>
    <RowPostersWithStyled>
      {/* ポスターコンテンツ */}
      { movies.map((movie, i) => (
        <PosterImageWithStyled
          isLargeRow
          key={ movie.id }
          src={`${ base_url }${
            isLargeRow ? movie.poster_path : movie.backdrop_path
          }`}
          alt={ movie.name }
          onClick={() => handleClick(movie)}
        />
      ))}
    </RowPostersWithStyled>
    { trailerUrl && <YouTube videoId={ trailerUrl } opts={opts} />}
  </RowContainerWithStyled>
  );
};

const RowContainerWithStyled = styled.div`
  margin-left: 20px;
  color: #fff;
`;

const RowPostersWithStyled = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px;
`;

const PosterImageWithStyled = styled.img<ImageProps>`
  object-fit: contain;
  width: 100%;
  max-height: ${ props => props.isLargeRow ? '250px' : '100px' };
  margin: 10px;
  transition: transform 450ms;

  &:hover {
    transform: ${ props => props.isLargeRow ? 'scale(1.09)' : 'scale(1.08)' };
  }
`;
