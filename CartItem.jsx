import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, updateQuantity } from '../redux/CartSlice.jsx';

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="cart-page">
      <div className="cart-heading"><div><p className="eyebrow">YOUR GREEN PICKS</p><h1>Shopping Cart</h1><p>Review your plants before you bring them home.</p></div><Link className="outline-button" to="/plants">← Continue Shopping</Link></div>
      {items.length === 0 ? (
        <section className="empty-cart"><div className="empty-icon">🪴</div><h2>Your cart is looking a little empty.</h2><p>Find a plant that makes you smile.</p><Link className="primary-button link-button" to="/plants">Explore Plants</Link></section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {items.map((item) => (
              <article className="cart-row" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-product"><h3>{item.name}</h3><p>${item.price.toFixed(2)} each</p><button className="remove-button" onClick={() => dispatch(removeItem(item.id))}>Remove</button></div>
                <div className="quantity-control"><button aria-label={`Decrease ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button><span>{item.quantity}</span><button aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button></div>
                <strong className="line-total">${(item.price * item.quantity).toFixed(2)}</strong>
              </article>
            ))}
          </section>
          <aside className="order-summary"><h2>Order Summary</h2><div className="summary-line"><span>Items ({items.reduce((n, item) => n + item.quantity, 0)})</span><span>${total.toFixed(2)}</span></div><div className="summary-line"><span>Delivery</span><span>Calculated later</span></div><div className="summary-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div><button className="primary-button checkout-button" onClick={() => window.alert('Coming Soon! Checkout will be available soon.')}>Checkout</button><Link className="continue-link" to="/plants">Continue Shopping</Link></aside>
        </div>
      )}
    </main>
  );
}
