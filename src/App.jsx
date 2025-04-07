import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import Home from './components/home';
import About from './components/about';
import Services from './components/services';
import Contact from './components/contact';
import Safety from './components/safety';
import Login from './components/login';
import Team from './components/team';
import Register from './components/register';
import { Footer } from './components/footer';
import AppInterface from './screens/appInterface';
import LocationComponent from './screens/location-page';
import Payment from './screens/payment';
import { ToastContainer } from 'react-toastify';
import ThankYou from './components/contact-success';

function App() {
  return (
    <>
     <ToastContainer />
      <Routes>
        <Route
          path="/app-interface"
          element={<AppInterface />}
        />
        <Route
          path="/locationRoute-page"
          element={<LocationComponent />}
        />
        <Route
          path="/payment"
          element={<Payment />}
        />
         <Route path="/contact-success" element={<ThankYou />} />

        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/safety" element={<Safety />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;