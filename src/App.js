import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Stories from './components/Stories/Stories';
import OrderPage from './components/OrderPage/OrderPage';
import NotFound from './components/NotFound/NotFound';
import Footer from './components/Footer/Footer';
import Menu from './components/Menu/Menu';
import About from './components/About/About';
import Contact from './components/Contact/Contact';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/sobre-nos" element={<About />} /> 
                <Route path="/menu" element={<Menu />} />
                <Route path="/pedidos" element={<OrderPage />} />
                <Route path="/historias" element={<Stories />} />  
                <Route path="/contato" element={<Contact />} />  
                <Route path="*" element={<NotFound />} /> 
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
