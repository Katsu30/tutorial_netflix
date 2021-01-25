import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import instance from './axios';
import { requests } from './request';

type movieProps = {
  title?: string;
  name?: string;
  orignal_name?: string;
  backdrop_path?: string;
  overview?: string;
};

export const Banner = () => {
  const [movie, setMovie] = useState<movieProps>({});
  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(requests.fetchNetflixOriginals);
      console.log(request.data.result);

      //apiからランダムで値を取得している
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  console.log(movie);

  // descriptionの切り捨てよう関数
  function truncate(str: any, n: number) {
    // undefinedを弾く
    if (str !== undefined) {
      return str.length > n ? str?.substr(0, n - 1) + "..." : str;
    }
  }

  return (
    <HeaderAreaWithStyled
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${ movie?.backdrop_path }")`,
        backgroundPosition: "center -30px",
      }}
    >
      <BannerContentAreaWithStyled>
        <BannerTitleWithStyled>
          { movie?.title || movie?.name || movie?.orignal_name }
        </BannerTitleWithStyled>
        <BannerButtonAreaWithStyled>
          <BannerButtonWithStyled>Play</BannerButtonWithStyled>
          <BannerButtonWithStyled>My List</BannerButtonWithStyled>
        </BannerButtonAreaWithStyled>

        <BannerDescriptionWithStyled>{truncate(movie?.overview, 150)}</BannerDescriptionWithStyled>
      </BannerContentAreaWithStyled>

      <BannerFadeButtonWithStyled />
    </HeaderAreaWithStyled>
  );
};

const HeaderAreaWithStyled = styled.header`
  color: #fff;
  object-fit: contain;
  height: 448px;
`;

const BannerContentAreaWithStyled = styled.div`
  margin-left: 30px;
  padding-top: 140px;
  height: 190px;
`;

const BannerTitleWithStyled = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.3rem;
`;

const BannerDescriptionWithStyled = styled.h1`
  width: 45rem;
  line-height: 1.3;
  padding-top: 1rem;
  font-size: 0.8rem;
  max-width: 360px;
  height: 80px;
`;

const BannerButtonAreaWithStyled = styled.div`
`;

const BannerButtonWithStyled = styled.button`
  cursor: pointer;
  color: #fff;
  outline: none;
  border: none;
  font-weight: 700;
  border-radius: 0.2vw;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-right: 1rem;
  padding-top: 0.5rem;
  background-color: rgba(51, 51, 51, 0.5);
  padding-bottom: 0.5rem;

  &:hover {
    color: #000;
    background-color: #e6e6e6;
    transition: all 0.2s;
  }
`;

const BannerFadeButtonWithStyled = styled.div`
  height: 7.4rem;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
`;