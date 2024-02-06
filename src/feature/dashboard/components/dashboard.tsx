/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatsStart, selectStatistics, selectLoading } from 'feature/songs';
import styled from '@emotion/styled';
import { space, layout, flexbox, color, border, typography, shadow } from 'styled-system';
import Nav from 'components/Nav/Nav'
import GenrePieChart from 'components/charts/GenrePieChart';
import CardList from 'components/Common/StatCard'
import ArtistCardList from 'components/Common/ArtistCardList'
import bgImage from 'assets/bg-2.jpg'
import bgImage2 from 'assets/bg-1.jpg'
import bgImage3 from 'assets/bg-3.jpg'
import Hero from 'components/Common/Hero';
import Loader from 'components/Common/Loader'

// Enhanced color palette
const colors = {
    primary: '#007bff', // Vibrant blue for primary actions
    background: '#f8f9fa', // Soft background color
    cardBackground: '#ADD8E6',
    text: '#343a40', // Dark grey for text
    detailBorder: '#dee2e6', // Light grey for borders
};

// Container for the dashboard layout with responsive design adjustments
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${space}
  ${layout}
  padding: 20px;
  background-color: #f0f8ff;
`;

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${space}
  ${layout}
  padding: 20px;
//   background-color: #f0f8ff;
  width: 100%;
`;

const StatCard = styled.div`
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3);
  }
  background: ${colors.cardBackground};
  border-radius: 40px;
  box-shadow: 0 8px 6px rgba(0, 0, 0, 0.45);
  ${space}
  ${layout}
  ${flexbox}
  ${color}
  ${layout}
  ${space}
  ${border}
  ${shadow}
  padding: 10px;
  margin: 10px;
`;

const StatTitle = styled.h3`
  ${typography}
  color: #0b7603;
  margin-bottom: 15px;
  font-size: 2rem;
  font-weight: bold;
  text-align: left !important;
  display: flex;
  justify-content: flex-start;
  align-items: end;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2px;
  width: 90%;
  ${space}
`;

const StatDetail = styled.div`
  ${color}
  ${border}
  background: ${colors.background};
  border: 1px solid ${colors.detailBorder};
  border-radius: 20px;
  ${space}
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const DetailTitle = styled.h3`
  ${typography}
  color: ${colors.primary};
  margin-bottom: 10px;
`;

const DetailItem = styled.p`
  ${typography}
  color: ${colors.text};
`;

const StatNumber = styled.span`
  ${space}
  ${typography}
  color: ${colors.primary};
`;

export const Dashboard: React.FC = () => {
    const dispatch = useDispatch();
    const stats = useSelector(selectStatistics);
    const isLoading = useSelector(selectLoading);

    useEffect(() => {
        dispatch(fetchStatsStart());
    }, [dispatch]);

    if (!stats || Object.keys(stats).length === 0) {
        return <Loader isLoading={isLoading} loadingText="Loading Stats"/>
    }

    const albumStatsForCardList = stats.albumStats.map(albumStat => ({
        totalSongs: albumStat.totalSongs,
        artist: albumStat.artist,
        album: albumStat.album,
        imageUrl: bgImage
    }));

    const artisttatsForCardList = stats.artistStats.map(albumStat => ({
        totalSongs: albumStat.totalSongs,
        artist: albumStat.artist,
        totalAlbums: albumStat.totalAlbums,
        imageUrl: bgImage2
    }));

    return (
        <DashboardContainer>
            <Nav />
            <Hero imgUrl={bgImage2}/>
            <StatContainer>
                <GridContainer>
                    <StatTitle>
                        Top Selling Albums
                    </StatTitle>
                    <hr style={{ width: '100%', margin: '0 auto', border: '1px solid #C3EFC0', marginTop: "0rem", marginBottom: "5px" }} />
                    <CardList data={albumStatsForCardList} imageUrl={bgImage} />
                </GridContainer>
                <GridContainer>
                    <StatTitle>
                        Artists
                    </StatTitle>
                    <hr style={{ width: '100%', margin: '0 auto', border: '1px solid #C3EFC0', marginTop: "0rem" }} />
                    <ArtistCardList data={artisttatsForCardList} imageUrl={bgImage2} />
                </GridContainer>
                <GridContainer>
                    <StatCard>
                        <DetailTitle>Genres</DetailTitle>
                        <GenrePieChart data={stats.genreStats} />
                    </StatCard>
                </GridContainer>
            </StatContainer>
        </DashboardContainer>
    );
};