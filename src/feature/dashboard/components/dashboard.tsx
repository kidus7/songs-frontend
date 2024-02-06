/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatsStart, selectStatistics } from 'feature/songs';
import styled from '@emotion/styled';
import { space, layout, flexbox, color, border, typography, shadow } from 'styled-system';
import Nav from 'components/Nav/Nav'
import GenrePieChart from 'components/charts/GenrePieChart';

// Enhanced color palette
const colors = {
  primary: '#007bff', // Vibrant blue for primary actions
  background: '#f8f9fa', // Soft background color
  cardBackground: '#ededed',
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
`;

// Card component for displaying statistics with enhanced shadows and hover effect
const StatCard = styled.div`
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3);
  }
  background: ${colors.cardBackground};
  border-radius: 40px;
  box-shadow: 0 21px 6px rgba(0, 0, 0, 0.45);
  ${space}
  ${layout}
  ${flexbox}
  ${color}
  ${layout}
  ${space}
  ${border}
  ${shadow}
  padding: 20px;
  margin: 10px;
`;

// Typography enhancements for readability and visual hierarchy
const CardTitle = styled.h2`
  ${typography}
  color: ${colors.text};
  margin-bottom: 15px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
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

    useEffect(() => {
        dispatch(fetchStatsStart());
    }, [dispatch]);

    if (!stats || Object.keys(stats).length === 0) {
        return <div>Loading statistics...</div>;
    } else {
        // console.log(" SSTATS - ",  stats)
    }

    return (
        <DashboardContainer>
            <Nav />
            <h1>Music Dashboard</h1>
            <StatDetail>
                <DetailTitle>Total Songs: {stats.totalSongs}</DetailTitle>
            </StatDetail>
            <GridContainer>
              <StatCard>
                <DetailTitle>Artist Statistics</DetailTitle>
                {stats.artistStats.map((artist) => (
                    <DetailItem key={artist.artist}>
                        {artist.artist}: {artist.totalSongs} songs in {artist.totalAlbums} albums
                    </DetailItem>
                ))}
              </StatCard>
              <StatCard>
                    <DetailTitle>Album Statistics</DetailTitle>
                    {stats.albumStats.map((album) => (
                        <DetailItem key={album.album}>
                            {album.album} by {album.artist}: {album.totalSongs} songs
                        </DetailItem>
                    ))}
                </StatCard>
                <StatCard>
                    <DetailTitle>Genre Statistics</DetailTitle>
                    {stats.genreStats.map((genre) => (
                        <DetailItem key={genre._id}>
                            {genre._id}: {genre.totalSongs} songs
                        </DetailItem>
                    ))}
                </StatCard>
                <StatCard>
                <DetailTitle>Genres</DetailTitle>
                    <GenrePieChart data={stats.genreStats}/>
                </StatCard>
            </GridContainer>
        </DashboardContainer>
    );
};