import React, { useEffect, useState } from 'react';
import { Form, Tab, Tabs } from 'react-bootstrap';
import './Menu.css';

import coffee1 from '../../assets/images/graos.jpg';
import coffee2 from '../../assets/images/petit.jpg';
import coffee3 from '../../assets/images/croissant.jpeg';
import coffee4 from '../../assets/images/milk.jpeg';
import coffee5 from '../../assets/images/cha.jpeg';
import { menuData } from '../../util/dataMock';

function Menu() {
    const menu = menuData;
    const [currentImage, setCurrentImage] = useState(coffee1);
    const [selectedCategory, setSelectedCategory] = useState('cafes');
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
    });

    const handleCategoryChange = (key) => {
        setSelectedCategory(key);
        switch (key) {
            case 'cafes':
                setCurrentImage(coffee1);
                break;
            case 'sobremesas':
                setCurrentImage(coffee2);
                break;
            case 'especiais':
                setCurrentImage(coffee3);
                break;
            case 'bebidasGeladas':
                setCurrentImage(coffee4);
                break;
            case 'chas':
                setCurrentImage(coffee5);
                break;
            default:
                setCurrentImage(coffee1);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth
            });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="menu-container">
            <div className="menu-header">
                <h1>Café do Amanhã</h1>
            </div>

            <div className="menu-content">
                <div className="menu-image">
                    <img src={currentImage} alt="Menu" />
                </div>

                {windowDimensions.width > 600
                    ? (
                        <div className="menu-tabs">
                            <Tabs
                                activeKey={selectedCategory}
                                id="styled-menu-tabs"
                                className="mb-3"
                                onSelect={handleCategoryChange}
                            >
                                {Object.entries(menuData).map(([key, value]) => (
                                    <Tab eventKey={key} title={value.title} key={key}>
                                        <ul className="menu-list">
                                            {menu[key].items.map((item) => (
                                                <li key={item.name}>{item.name} <span>{item.price}</span></li>
                                            ))}
                                        </ul>
                                    </Tab>
                                ))}
                            </Tabs>
                        </div>
                    ) : (
                        <div className="menu-select">
                            <Form.Select
                                className='styled-menu-tabs'
                                size="lg"
                                value={selectedCategory}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                            >
                                {Object.entries(menuData).map(([key, value]) => (
                                    <option className="menu-list" key={key} value={key}>
                                        {value.title}
                                    </option>
                                ))}
                            </Form.Select>

                            <ul className="menu-list">
                                {menu[selectedCategory].items.map((item) => (
                                    <li key={item.name}>
                                        {item.name} <span>{item.price}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default Menu;
