import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addItem } from '../redux/CartSlice.jsx';

const plantCategories = [
  { name: 'Air Purifying Plants', description: 'Freshen your space with leafy favourites.', plants: [
    { id: 'ap1', name: 'Snake Plant', price: 18, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=700' },
    { id: 'ap2', name: 'Peace Lily', price: 22, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=700' },
    { id: 'ap3', name: 'Spider Plant', price: 14, image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=700' },
    { id: 'ap4', name: 'Areca Palm', price: 28, image: 'https://images.unsplash.com/photo-1597055181300-c6f6f1c5c5f5?w=700' },
    { id: 'ap5', name: 'Boston Fern', price: 20, image: 'https://images.unsplash.com/photo-1597055181300-c6f6f1c5c5f5?w=700' },
    { id: 'ap6', name: 'Rubber Plant', price: 26, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=700' },
  ]},
  { name: 'Low Maintenance Plants', description: 'Easy-care plants for busy days.', plants: [
    { id: 'lm1', name: 'ZZ Plant', price: 24, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=700' },
    { id: 'lm2', name: 'Jade Plant', price: 16, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=700' },
    { id: 'lm3', name: 'Aloe Vera', price: 12, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=700' },
    { id: 'lm4', name: 'Pothos', price: 15, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=700' },
    { id: 'lm5', name: 'Chinese Evergreen', price: 21, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=700' },
    { id: 'lm6', name: 'Ponytail Palm', price: 25, image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=700' },
  ]},
  { name: 'Decorative Plants', description: 'Add colour, texture, and personality.', plants: [
    { id: 'dp1', name: 'Monstera Deliciosa', price: 32, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=700' },
    { id: 'dp2', name: 'Calathea Orbifolia', price: 29, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=700' },
    { id: 'dp3', name: 'Bird of Paradise', price: 38, image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=700' },
    { id: 'dp4', name: 'Fiddle Leaf Fig', price: 35, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=700' },
    { id: 'dp5', name: 'Philodendron', price: 23, image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=700' },
    { id: 'dp6', name: 'Anthurium', price: 27, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=700' },
  ]},
];

export function Navbar() {
  const count = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
  return (
    <nav className="navbar">
      <Link className="brand" to="/">🌿 Paradise Nursery</Link>
      <div className="nav-links">
        <Link to="/">Home</Link><Link to="/plants">Plants</Link><Link className="cart-nav" to="/cart">🛒 Cart <span className="cart-count">{count}</span></Link>
      </div>
    </nav>
  );
}

export default function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const addedIds = useMemo(() => new Set(cartItems.map((item) => item.id)), [cartItems]);

  return (
    <main className="catalog-page">
      <section className="catalog-heading">
        <div><p className="eyebrow">THE GREEN COLLECTION</p><h1>Find your happy place.</h1><p>Beautiful plants, ready to make themselves at home.</p></div>
        <button className="outline-button" onClick={() => navigate('/cart')}>View Cart →</button>
      </section>
      {plantCategories.map((category) => (
        <section className="category-section" key={category.name}>
          <div className="category-heading"><div><h2>{category.name}</h2><p>{category.description}</p></div></div>
          <div className="plant-grid">
            {category.plants.map((plant) => {
              const added = addedIds.has(plant.id);
              return (
                <article className="plant-card" key={plant.id}>
                  <img src={plant.image} alt={plant.name} loading="lazy" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=700'; }} />
                  <div className="plant-info"><h3>{plant.name}</h3><p className="plant-price">${plant.price.toFixed(2)}</p>
                    <button className="primary-button add-button" disabled={added} onClick={() => dispatch(addItem(plant))}>{added ? 'Added to Cart ✓' : 'Add to Cart'}</button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
