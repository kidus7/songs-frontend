/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { ArtistStat } from 'models/song';

const CardContainer = styled.div`
  width: 200px;
  margin: 10px;
  color: #fff;
`;

const CardImage = styled.div<{ imageUrl: string }>`
  height: 200px;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.imageUrl});
  border-radius: 16px;
`;

const CardInfo = styled.div`
  padding: 10px;
`;

const CardTitle = styled.h3`
  font-size: 1.2em;
  color: #00378B;
`;

const CardArtist = styled.p`
  font-size: 0.9em;
  color: #00378B;
`;

const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 15px;
`;

// Define types for the Card component props using AlbumStat
const Card: React.FC<ArtistStat & { imageUrl: string }> = ({ totalSongs, artist, totalAlbums, imageUrl }) => {
    return (
        <CardContainer>
            <CardImage imageUrl={imageUrl} />
            <CardInfo>
                <CardTitle>{artist}</CardTitle>
                <CardArtist>{totalAlbums} Albums {totalSongs} Songs</CardArtist>
            </CardInfo>
        </CardContainer>
    );
};

// Define types for the CardList component props
type CardListProps = {
    data: ArtistStat[];
    imageUrl: string;
};

// Use AlbumStat interface for props and pass a static image URL to each Card
const CardList: React.FC<CardListProps> = ({ data, imageUrl }) => {
    return (
        <CardListContainer>
            {data.map((item, index) => (
                <Card
                    key={index}
                    totalSongs={item.totalSongs}
                    artist={item.artist}
                    totalAlbums={item.totalAlbums}
                    imageUrl={imageUrl}
                />
            ))}
        </CardListContainer>
    );
};

export default CardList;