import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Sturdy Grave Squirrel</title>
        <meta property="og:title" content="Sturdy Grave Squirrel" />
      </Helmet>
      <div className="home-container01">
        <div className="home-container02">
          <Link to="/" className="home-navlink">
            <svg viewBox="0 0 1024 1024" className="home-icon">
              <path d="M810.667 725.333h-597.333c-47.061 0-85.333 38.272-85.333 85.333s38.272 85.333 85.333 85.333h597.333c47.061 0 85.333-38.272 85.333-85.333s-38.272-85.333-85.333-85.333z"></path>
              <path d="M810.667 426.667h-597.333c-47.061 0-85.333 38.272-85.333 85.333s38.272 85.333 85.333 85.333h597.333c47.061 0 85.333-38.272 85.333-85.333s-38.272-85.333-85.333-85.333z"></path>
              <path d="M810.667 128h-597.333c-47.061 0-85.333 38.272-85.333 85.333s38.272 85.333 85.333 85.333h597.333c47.061 0 85.333-38.272 85.333-85.333s-38.272-85.333-85.333-85.333z"></path>
            </svg>
          </Link>
        </div>
        <div className="home-container03"></div>
        <div className="home-feature-card">
          <div className="home-container04">
            <img
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              alt="image"
              className="home-image"
            />
            <div className="home-container05">
              <h1 className="home-text">Heading</h1>
              <div className="home-container06">
                <span className="home-text01">Text</span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-feature-card1">
          <div className="home-container07">
            <img
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              alt="image"
              className="home-image1"
            />
            <div className="home-container08">
              <h1 className="home-text02">Heading</h1>
              <div className="home-container09">
                <span className="home-text03">Text</span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-feature-card2">
          <div className="home-container10">
            <img
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              alt="image"
              className="home-image2"
            />
            <div className="home-container11">
              <h1 className="home-text04">Heading</h1>
              <div className="home-container12">
                <span className="home-text05">Text</span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-feature-card3">
          <div className="home-container13">
            <img
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              alt="image"
              className="home-image3"
            />
            <div className="home-container14">
              <h1 className="home-text06">Heading</h1>
              <div className="home-container15">
                <span className="home-text07">Text</span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-feature-card4">
          <div className="home-container16">
            <img
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              alt="image"
              className="home-image4"
            />
            <div className="home-container17">
              <h1 className="home-text08">Heading</h1>
              <div className="home-container18">
                <span className="home-text09">Text</span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-feature-card5">
          <div className="home-container19">
            <img
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              alt="image"
              className="home-image5"
            />
            <div className="home-container20">
              <h1 className="home-text10">Heading</h1>
              <div className="home-container21">
                <span className="home-text11">Text</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
