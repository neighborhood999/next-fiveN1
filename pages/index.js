import Router from 'next/router';
import Head from '../components/Head';
import NavBar from '../components/NavBar';
import App from '../components/App';
import Footer from '../components/Footer';
import { pageView } from '../utils';

Router.onRouteChangeStart = url => pageView(url);

export default () => (
  <div id="app">
    <Head />
    <NavBar />
    <App />
    <Footer />
  </div>
);
