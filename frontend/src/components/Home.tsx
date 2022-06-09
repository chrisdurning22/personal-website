import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import profilePicture from '../images/photos/graduation.png'
import { faGithub, faInstagram, faLinkedin, faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import ResumeSectionList from './ResumeSectionList';

type HomeProps = {
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
  isUserLoggedIn: boolean;
}

function Home({setIsUserLoggedIn, isUserLoggedIn}: HomeProps) {
  
    return (
      <div>
        <div className="flex-center margin-top-50">
          <div className="profile-pic-wrapper">
            <img alt="Me at my college graduation" src={profilePicture}/>
          </div>
        </div>
        <div className="flex-center">
          <h2 className="white-text margin-top-15">CHRIS DURNING</h2>
        </div>
        <div className="flex-center flex-gap-10 margin-top-10">
          <a title="Github" href="https://github.com/chrisdurning22?tab=repositories">
            <FontAwesomeIcon icon={faGithub} size={"3x"} />
          </a>
          <a title="Linkedin" href="https://www.linkedin.com/in/chris-durning-9186b5169/">
            <FontAwesomeIcon icon={faLinkedin} size={"3x"} />
          </a>
          <a title="Instagram" href="https://www.instagram.com/chrisdurning96/?hl=en">
            <FontAwesomeIcon icon={faInstagram} size={"3x"} />
          </a>
          <a title="StackOverflow" href="https://ai.stackexchange.com/users/15356/chris">
            <FontAwesomeIcon icon={faStackOverflow} size={"3x"} />
          </a>
        </div>
        <ResumeSectionList
          setIsUserLoggedIn={(isUserLoggedIn: boolean) => setIsUserLoggedIn(isUserLoggedIn)}
          isUserLoggedIn={isUserLoggedIn}
        />
      </div>
    );
}

export default Home;