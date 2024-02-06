/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import bgImage from 'assets/bg-3.jpg'

const HeroImage = styled.div`
  width: 100%;
  height: 370px;
  background-image: url(${bgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 15px;
`;

const HeroContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 3rem;
  width: 80%;
  height: 40vh;
`;

type HeroProps = {
    imgUrl: string;
};

const Hero: React.FC<HeroProps> = ({ imgUrl }) => {
    return (
        <HeroContainer>
            <HeroImage />
        </HeroContainer>
    );
};

export default Hero;
