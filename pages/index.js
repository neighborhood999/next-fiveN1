import { App } from '../components/App';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

function IndexPage() {
  return (
    <div id="app">
      <Header />
      <App />
      <Footer />
    </div>
  );
}

export default IndexPage;
