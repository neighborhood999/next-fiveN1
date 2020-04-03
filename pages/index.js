import React from 'react';
import Router from 'next/router';

import App from '../components/App';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import { pageView } from '../utils';

Router.onRouteChangeStart = url => pageView(url);

function IndexPage() {
  return (
    <div id="app">
      <Header />
      <NavBar />
      <App />
      <Footer />
    </div>
  );
}

export default IndexPage;
