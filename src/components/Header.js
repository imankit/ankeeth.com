import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Headroom from 'react-headroom';
import { Flex, Image, Link } from 'rebass';
import styled from 'styled-components';
import { SectionLinks } from 'react-scroll-section';
import Fade from 'react-reveal/Fade';
import RouteLink from './RouteLink';
import Logo from './Logo/Portfolio.svg';

const capitalize = s => s && s[0].toUpperCase() + s.slice(1);

const HeaderContainer = styled(Headroom)`
  .headroom--pinned {
    background: ${props => props.theme.colors.primaryDark};
  }

  position: absolute;
  width: 100%;
`;

const ResumeLink = styled(Link)`
  color: unset;
  text-decoration: none;
`;

const formatLinks = allLinks =>
  Object.entries(allLinks).reduce(
    (acc, [key, value]) => {
      const isHome = key === 'home';
      return isHome
        ? {
            ...acc,
            home: value,
          }
        : {
            ...acc,
            links: [...acc.links, { name: capitalize(key), value }],
          };
    },
    { links: [], home: null },
  );

const Header = () => (
  <HeaderContainer>
    <Fade top>
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <SectionLinks>
          {({ allLinks }) => {
            const { home, links } = formatLinks(allLinks);

            const homeLink = home && (
              <Link href={window.location}>
                <Image
                  src={Logo}
                  width="50px"
                  alt="Portfolio Logo"
                  onClick={home.onClick}
                  style={{
                    cursor: 'pointer',
                  }}
                />
              </Link>
            );

            const navLinks = links.map(({ name, value }) => (
              <RouteLink
                key={name}
                onClick={value.onClick}
                selected={value.selected}
              >
                {name}
              </RouteLink>
            ));

            return (
              <Fragment>
                {homeLink}
                <Flex mr={[0, 3, 5]}>
                  {navLinks}
                  <StaticQuery
                    query={graphql`
                      query ResumeQuery {
                        contentfulAbout {
                          resume {
                            resume {
                              file {
                                url
                              }
                            }
                          }
                        }
                      }
                    `}
                    render={({ contentfulAbout }) => {
                      const { url } = contentfulAbout.resume.resume.file;
                      return (
                        <ResumeLink href={url} target="_blank">
                          <RouteLink onClick={() => null} selected={false}>
                            Résumé
                          </RouteLink>
                        </ResumeLink>
                      );
                    }}
                  />
                </Flex>
              </Fragment>
            );
          }}
        </SectionLinks>
      </Flex>
    </Fade>
  </HeaderContainer>
);

export default Header;
