import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { formatCurrency } from '../../util/util';
import { menuItemsPedidos } from '../../util/dataMock';
import './OrderPage.css';

function OrderPage() {
    const menuItems = menuItemsPedidos;
    const [order, setOrder] = useState({
        name: '',
        tableNumber: '',
        items: []
    });

    const [showModal, setShowModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('');
    const [currentItem, setCurrentItem] = useState('');
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const [openAlert, setOpenAlert] = useState(false);


    const calculateTotal = (items) => {
        return items.reduce((total, item) => {
            const price = menuItems[item.category]?.[item.name] || 0;
            return total + (price * item.quantity);
        }, 0);
    };

    const handleCategoryClick = (category) => {
        setCurrentCategory(category);
        setCurrentItem('');
        setCurrentQuantity(1);
        setShowModal(true);
    };

    const handleAddItem = () => {
        if (!currentItem || currentQuantity <= 0) {
            alert('Por favor, selecione um item e uma quantidade válida.');
            return;
        }

        const updatedItems = [...order.items];
        const existingItemIndex = updatedItems.findIndex(item => item.category === currentCategory && item.name === currentItem);

        if (existingItemIndex !== -1) {
            updatedItems[existingItemIndex].quantity += currentQuantity;
        } else {
            updatedItems.push({ category: currentCategory, name: currentItem, quantity: currentQuantity });
        }

        setOrder({
            ...order,
            items: updatedItems
        });

        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenAlert(true);
    };

    const closeAlert = () => {
        setOrder({
            name: '',
            tableNumber: '',
            items: []
        });
        setOpenAlert(false)
    }

    return (
        <>
            <div className="order-container">
                <h2>Faça seu pedido</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={order.name}
                            onChange={(e) => setOrder({ ...order, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tableNumber">Número da Mesa:</label>
                        <input
                            type="number"
                            id="tableNumber"
                            name="tableNumber"
                            value={order.tableNumber}
                            onChange={(e) => setOrder({ ...order, tableNumber: e.target.value })}
                            required
                        />
                    </div>

                    <div className="menu-category-list">
                        {Object.keys(menuItems).map((category) => (
                            <Button key={category} onClick={() => handleCategoryClick(category)} className="category-button">
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </Button>
                        ))}
                    </div>

                    <h3>Total: {formatCurrency(calculateTotal(order.items))}</h3>

                    <button type="submit">Enviar Pedido</button>
                </form>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Selecione o item e a quantidade</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="itemSelect">Item:</label>
                            <select
                                id="itemSelect"
                                name="itemSelect"
                                value={currentItem}
                                onChange={(e) => setCurrentItem(e.target.value)}
                                className="form-control"
                            >
                                <option value="">Selecione um item</option>
                                {Object.keys(menuItems[currentCategory] || {}).map((item) => (
                                    <option key={item} value={item}>{item} - {formatCurrency(menuItems[currentCategory][item])}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Quantidade:</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={currentQuantity}
                                onChange={(e) => setCurrentQuantity(parseInt(e.target.value))}
                                min="1"
                                className="form-control"
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={handleAddItem}>
                            Adicionar ao Pedido
                        </Button>
                    </Modal.Footer>
                </Modal>


            </div>
            <Alert show={openAlert} variant="success" className='order-alert' style={{ position: 'fixed' }}>
                <Alert.Heading>Pedido realizado com sucesso!</Alert.Heading>
                <span>Pedido enviado com sucesso! </span>
                <p>
                    {`Valor total: R$ ${formatCurrency(calculateTotal(order.items))}`}
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={closeAlert} variant="outline-success">
                        OK
                    </Button>
                </div>
            </Alert>
        </>
    );
}

export default OrderPage;
