import React, { useEffect, useState } from 'react';
import BarAnimation from './BarAnimation';
import github from '../assets/GitHub-32px.png';
import menu from '../assets/Burger-menu-36px.png';
import logo from '../assets/Lodestone-32px.png';

import styles from './HeadlineSection.module.scss';

const HeadlineSection = () => {
  const [prevPos, setPrevPos] = useState<number>(0);
  const [scrollStyle, setScrollStyle] = useState<string>(); // styles.[blank] is a `string` type
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // some good old fashion js DOM manipulation :) https://bootstrap-menu.com/detail-autohide.html
    const handleScroll = () => {
      const currPos = window.scrollY;
      if (prevPos < currPos) {
        setScrollStyle(styles.down);
      } else if (prevPos > currPos) {
        setScrollStyle(styles.up);
      } else if (currPos < 30) {
        setScrollStyle(styles.up);
      }
      setPrevPos(currPos);
    };

    window.addEventListener('scroll', handleScroll);

    const widthMatch = window.matchMedia('(min-width: 768px)');

    widthMatch.addEventListener('change', handleCloseMenu);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      widthMatch.removeEventListener('change', handleCloseMenu);
    };
  });

  return (
    <>
      <nav className={`${styles.header} ${scrollStyle}`}>
        <div className={styles.navTop}>
          <div className={styles.navLeft}>
            <img
              className={`${styles.linkImage} ${styles.toggleMenu}`}
              src={menu}
              alt="menu icon"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
            <a href="#home">
              <img
                className={styles.linkImage}
                src={logo}
                alt="Lodestone logo"
              />
            </a>
            <div className={`${styles.linksDesktop}`}>
              <a href="#about">about</a>
              <a href="#setup">setup</a>
              <a href="#security">security</a>
              <a href="#tools">tools</a>
            </div>
          </div>

          <div className={styles.navRight}>
            <a
              className={`${styles.navGitHub}`}
              href="https://github.com/Lodestone-Team"
              style={{ padding: 0 }}
            >
              <img
                className={styles.linkImage}
                src={github}
                alt="github logo"
              />
            </a>
          </div>
        </div>

        <div
          className={`${styles.navBottom} ${
            isOpen ? styles.opened : styles.closed
          }`}
        >
          <div className={`${styles.mobileMenu} `}>
            <a href="#about" onClick={handleCloseMenu}>
              about
            </a>
            <a href="#setup" onClick={handleCloseMenu}>
              setup
            </a>
            <a href="#security" onClick={handleCloseMenu}>
              security
            </a>
            <a href="#tools" onClick={handleCloseMenu}>
              tools
            </a>
            <a href="https://github.com/Lodestone-Team" style={{ padding: 0 }}>
              <img
                className={styles.linkImage}
                src={github}
                alt="github logo"
              />
            </a>
          </div>
        </div>
      </nav>

      <section className={styles.container} id="top">
        <BarAnimation></BarAnimation>

        <div className={styles.headlineContainer}>
          <h1 className={styles.logo}>Lodestone</h1>
          <h2>
            The most comprehensive
            <br />
            Minecraft Server Management tool.
          </h2>
        </div>
      </section>
    </>
  );
};

export default HeadlineSection;
