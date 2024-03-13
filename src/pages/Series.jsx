import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "../lib/firebase";

const Series = () => {

    const [watchContent, setWatchContent] = useState([]);
    const [selectedSeries, setSelectedSeries] = useState(null);
    const [selectedSeriesEpisodes, setSelectedSeriesEpisodes] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "movies")), (snapshot) => {
            const contentData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()})).filter(data => data.type === 'series');
            setWatchContent(contentData);
        });

        return () => unsubscribe();
    }, []);

    const handleSeriesClick = async (series) => {
        setSelectedSeries(series);
        try {
            const episodesQuerySnapshot = await getDocs(collection(db, "movies", series.id, "episodes"));
            const episodesData = episodesQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
            setSelectedSeriesEpisodes(episodesData);
        } catch (error) {
            console.error("Error fetching episodes:", error);
        }
    };

    return (
        <Container>
            <h4>Watch Series</h4>
            <Content>
                {selectedSeries ? (
                    selectedSeriesEpisodes.map((episode, key) => (
                        <Wrap key={key}>
                            {episode.id}
                            <Link to={`/category/series/detail/${selectedSeries.id}/${episode.id}`}>
                                <img src={episode.cardImg} alt={episode.title} />
                            </Link>
                        </Wrap>
                    ))
                ) : (
                    watchContent.map((series, key) => (
                        <Wrap key={key} onClick={() => handleSeriesClick(series)}>
                            {series.id}
                            <div>
                                <img src={series.cardImg} alt={series.title} />
                            </div>
                        </Wrap>
                    ))
                )}
            </Content>
        </Container>
    );
};

const Container = styled.div`
  padding: 0 0 26px;
  margin: 100px 100px;

  @media (max-width: 768px) {
    margin: 100px 50px;
  }
`;

const Content = styled.div`
    display: grid;
    grid-gap: 25px;
    gap: 25px;
    grid-template-columns: repeat(4, minmax(0, 1fr));

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

const Wrap = styled.div`
    padding-top: 56.25%;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    border: 3px solid rgba(249, 249, 249, 0.1);

    img {
        inset: 0px;
        display: block;
        height: 100%;
        object-fit: cover;
        opacity: 1;
        position: absolute;
        transition: opacity 500ms ease-in-out 0s;
        width: 100%;
        z-index: 1;
        top: 0;
    }

    &:hover {
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
        rgb(0 0 0 / 72%) 0px 30px 22px -10px;
        transform: scale(1.05);
        border-color: rgba(249, 249, 249, 0.8);
    }
`;

export default Series;
