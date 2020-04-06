import React from 'react';
import Router from 'next/router';

import About from '../components/About';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import { pageView } from '../utils';

Router.onRouteChangeStart = url => pageView(url);

function AboutPage() {
  return (
    <div id="about">
      <Header />
      <NavBar />
      <About />
      <Footer />
    </div>
  );
}

export default AboutPage;
