import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const photos = {
  hero: [
    "photo-1600210492486-724fe5c67fb0",
    "photo-1600607687939-ce8a6c25118c",
    "photo-1616486338812-3dadae4b4ace"
  ],
  rooms: [
    ["Living", "living", "17 pieces", "photo-1555041469-a586c61ea9bc"],
    ["Bedroom", "bedroom", "12 pieces", "photo-1611892440504-42a792e24d32"],
    ["Dining", "dining", "9 pieces", "photo-1617806118233-18e1de247200"],
    ["Lighting", "lighting", "14 pieces", "photo-1507473885765-e6ed057f782c"],
    ["Objects", "decor", "21 pieces", "photo-1600210491369-e753d80a41f3"],
    ["Outdoor", "outdoor", "8 pieces", "photo-1600210491892-03d54c0aaf87"]
  ],
  products: [
    ["Marlow Three-Seat Sofa", "living", "Living · Linen blend", 189000, "Bestseller", "photo-1555041469-a586c61ea9bc"],
    ["Alder Low Platform Bed", "bedroom", "Bedroom · Solid oak", 149000, "New", "photo-1505693416388-ac5ce068fe85"],
    ["Elowen Round Dining Table", "dining", "Dining · White oak", 98000, "Small batch", "photo-1617806118233-18e1de247200"],
    ["Sol Pendant Light", "lighting", "Lighting · Ceramic", 42000, "Hand finished", "photo-1507473885765-e6ed057f782c"],
    ["Cove Reading Chair", "living", "Living · Textured cotton", 76000, "Customer favorite", "photo-1567538096630-e0c55bd6374c"],
    ["Forma Ceramic Vessels", "decor", "Objects · Stoneware", 14500, "Made by hand", "photo-1490312278390-ab64016e0aa9"],
    ["Rowan Bedside Table", "bedroom", "Bedroom · Walnut", 39000, "Just arrived", "photo-1616486338812-3dadae4b4ace"],
    ["Sora Dining Chair", "dining", "Dining · Ash wood", 31000, "Good together", "photo-1615874694520-474822394e73"],
    ["Cove Outdoor Lounge", "outdoor", "Outdoor · Woven resin", 112000, "Made for outside", "photo-1600210491892-03d54c0aaf87"]
  ],
  spaces: [
    ["The living room", "01 — UNWIND A LITTLE", "living", "photo-1600210492486-724fe5c67fb0"],
    ["The bedroom", "02 — REST EASY", "bedroom", "photo-1611892440504-42a792e24d32"],
    ["The dining room", "03 — STAY A WHILE", "dining", "photo-1600607687920-4e2a09cf159d"],
    ["The finishing touch", "04 — LITTLE DETAILS", "decor", "photo-1600210491369-e753d80a41f3"],
    ["Good lighting", "05 — FIND YOUR GLOW", "lighting", "photo-1507473885765-e6ed057f782c"]
  ]
};

const imageUrl = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

function Brand({ footer = false }) {
  return (
    <a className="brand-lockup" href="#" aria-label="Stackly home">
      <span className={`stackly-lockup${footer ? " footer-stackly" : ""}`}>
        <span className="stackly-mark">S</span><span>STACKLY</span>
      </span>
    </a>
  );
}

function Header({ bag, onBag, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const openMissingPage = event => {
    event.preventDefault();
    setMenuOpen(false);
    onNavigate();
  };
    return <>
    <div className="top-note">A softer home starts here <span>·</span> Complimentary delivery on orders over ₹40,000</div>
    <header className="header">
      <div className="wrap nav">
        <Brand />
        <nav className={`nav-links${menuOpen ? " open" : ""}`} aria-label="Main navigation">
              <a href="#404" onClick={openMissingPage}>Collections</a>
              <a href="#404" onClick={openMissingPage}>Shop</a>
              <a href="#404" onClick={openMissingPage}>Room ideas</a>
              <a href="#404" onClick={openMissingPage}>Our story</a>
              <a href="#404" onClick={openMissingPage}>Log in</a>
              <a className="nav-register" href="#404" onClick={openMissingPage}>Register</a>
        </nav>
        <div className="nav-actions">
          <a className="icon-button" href="#shop" aria-label="Find furniture">⌕</a>
          <button className="icon-button bag-button" onClick={onBag} type="button" aria-label={`Shopping bag, ${bag} items`}>
            <span aria-hidden="true">♧</span><span className="bag-count">{bag}</span>
          </button>
          <button className="icon-button menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </div>
    </header>
  </>;
}

function NotFound({ onBack }) {
  return <main className="not-found">
    <div className="not-found-brand"><span className="stackly-mark">S</span><span>STACKLY</span></div>
    <div className="not-found-content"><span className="eyebrow">Page unavailable</span><strong className="not-found-code">404</strong><h1>This page couldn't be found.</h1><p>Return to Stackly to keep browsing.</p><button className="button" type="button" onClick={onBack}>Back to Stackly <span>↗</span></button></div>
    <span className="not-found-foot">STACKLY · MADE FOR LIVING IN</span>
  </main>;
}

function Hero({ onNavigate }) {
  const slides = [
    ["Make space for calm", <>Come home<br />to your own kind.</>, "Considered pieces, honest materials, and little details that make a room feel like yours.", "Explore the collection"],
    ["New season, softer setting", <>Rooms to<br />slow down in.</>, "Easy silhouettes and tactile finishes, designed for the everyday moments worth keeping.", "Find your room"],
    ["Made for living in", <>A little less rush.<br />A lot more home.</>, "Furniture with a gentle point of view and enough room for real life.", "See our spaces"]
  ];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setCurrent(index => (index + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [slides.length]);
  return <section className="hero" aria-label="Featured collection">
    {slides.map((slide, index) => <article className={`hero-slide${index === current ? " active" : ""}`} key={slide[0]}>
      <img src={imageUrl(photos.hero[index], 2000)} alt="Warm, thoughtfully furnished living space" />
      <div className="hero-content"><span className="eyebrow">{slide[0]}</span><h1>{slide[1]}</h1><p>{slide[2]}</p><a className="button button-light" href="#404" onClick={event => { event.preventDefault(); onNavigate(); }}>{slide[3]} <span>↗</span></a></div>
    </article>)}
    <div className="slide-dots" aria-label="Choose a featured slide">
      {slides.map((_, index) => <button key={index} className={index === current ? "active" : ""} type="button" aria-label={`Go to slide ${index + 1}`} onClick={() => setCurrent(index)} />)}
    </div>
    <div className="hero-controls">
      <button type="button" aria-label="Previous slide" onClick={() => setCurrent((current + slides.length - 1) % slides.length)}>←</button>
      <span className="slide-count">{String(current + 1).padStart(2, "0")} &nbsp;/&nbsp; 03</span>
      <button type="button" aria-label="Next slide" onClick={() => setCurrent((current + 1) % slides.length)}>→</button>
    </div>
  </section>;
}

function SectionHeading({ eyebrow, title, link, onNavigate }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div><a className="text-link" href="#404" onClick={event => { event.preventDefault(); onNavigate(); }}>{link} <span>→</span></a></div>;
}

function Intro({ onNavigate }) {
  return <section className="section wrap intro" id="story">
    <div className="intro-copy"><span className="eyebrow">A home with feeling</span><h2>Good things take<br />up good space.</h2>
      <p>We believe the best rooms aren’t finished—they grow with you. Find furniture made with thoughtful materials, quiet character, and the kind of comfort you come back to.</p>
      <div className="perks"><div className="perk"><span className="perk-icon">↗</span><div><strong>Easy delivery</strong><small>Thoughtfully brought home</small></div></div><div className="perk"><span className="perk-icon">✳</span><div><strong>Made to last</strong><small>Materials with a story</small></div></div></div>
      <a className="text-link" href="#404" onClick={event => { event.preventDefault(); onNavigate(); }}>A little about us <span>→</span></a>
    </div>
    <div className="intro-photos"><img src={imageUrl("photo-1618221195710-dd6b41faaea6", 1000)} alt="Relaxed sitting room with earthy details" /><img src={imageUrl("photo-1616486029423-aaa4789e8c9a", 600)} alt="Natural oak furniture and decor" /><div className="photo-stamp">Find your<br />everyday<br />favorite</div></div>
  </section>;
}

function Categories({ onSelect, onNavigate }) {
  return <section className="section wrap" id="collections">
    <SectionHeading eyebrow="A place for everything" title="Shop by room" link="Browse all pieces" onNavigate={onNavigate} />
    <div className="category-grid">{photos.rooms.map(([name, category, count, photo]) => <a className="category-card" href="#shop" key={category} onClick={() => onSelect(category)}>
      <div className="category-image"><img src={imageUrl(photo, 600)} alt={`${name} furniture`} /></div>
      <div className="category-meta"><div><h3>{name}</h3><span>{count}</span></div><span className="category-arrow">↗</span></div>
    </a>)}</div>
  </section>;
}

function Offer({ onNavigate }) {
  const [timeLeft, setTimeLeft] = useState(8 * 24 * 60 * 60);
  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(seconds => Math.max(0, seconds - 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const parts = [Math.floor(timeLeft / 86400), Math.floor(timeLeft / 3600) % 24, Math.floor(timeLeft / 60) % 60, timeLeft % 60];
  return <section className="wrap offer" aria-label="Seasonal offer">
    <div className="offer-copy"><span className="eyebrow">A little something extra</span><h2>Make room for a good deal.</h2><p>Selected favorites are 20% off for a short while. A lovely moment to bring home that piece you’ve been thinking about.</p>
      <div className="timer">{parts.map((part, index) => <div className="timer-unit" key={index}><strong>{String(part).padStart(2, "0")}</strong><span>{["Days", "Hours", "Minutes", "Seconds"][index]}</span></div>)}</div>
      <a className="button" href="#404" onClick={event => { event.preventDefault(); onNavigate(); }}>Shop the edit <span>↗</span></a>
    </div>
    <div className="offer-image"><img src={imageUrl("photo-1600607687920-4e2a09cf159d", 1000)} alt="Quiet lounge with low oak table and a textured sofa" /><div className="sale-badge">20%<small>THE SLOW EDIT</small></div></div>
  </section>;
}

function Products({ filter, setFilter, notify, addToBag, onNavigate }) {
  const filters = [["all", "Everything"], ["living", "Living"], ["bedroom", "Bedroom"], ["dining", "Dining"], ["lighting", "Lighting"], ["decor", "Objects"], ["outdoor", "Outdoor"]];
  const products = photos.products.filter(product => filter === "all" || product[1] === filter);
  const [favorites, setFavorites] = useState([]);
  function toggleFavorite(name) {
    const saved = !favorites.includes(name);
    setFavorites(current => saved ? [...current, name] : current.filter(item => item !== name));
    notify(saved ? "Saved to your favorites." : "Removed from your favorites.");
  }
  return <section className="section product-section" id="shop"><div className="wrap">
    <SectionHeading eyebrow="Picked for your place" title="Pieces to live with." link="See everything" onNavigate={onNavigate} />
    <div className="filter-row" role="group" aria-label="Filter products by room">{filters.map(([id, label]) => <button key={id} className={`filter-button${filter === id ? " active" : ""}`} type="button" onClick={onNavigate}>{label}</button>)}</div>
    <div className="product-grid">{products.map(([name, category, details, price, tag, photo]) => <article className="product-card" key={name}>
      <div className="product-image"><img src={imageUrl(photo, 800)} alt={name} /><span className="product-tag">{tag}</span><button className={`favorite${favorites.includes(name) ? " active" : ""}`} type="button" aria-label={`Save ${name}`} aria-pressed={favorites.includes(name)} onClick={() => toggleFavorite(name)}>{favorites.includes(name) ? "♥" : "♡"}</button></div>
      <div className="product-info"><span>{details}</span><h3>{name}</h3><div className="product-bottom"><span className="price">{money.format(price)}</span><button className="add-button" type="button" onClick={() => addToBag(name)}>Add to bag +</button></div></div>
    </article>)}</div>
  </div></section>;
}

function Spaces({ onSelect, onNavigate }) {
  return <section className="section wrap" id="rooms"><SectionHeading eyebrow="A few ways to make it yours" title="Rooms with a point of view." link="Shop by room" onNavigate={onNavigate} />
    <div className="room-grid">{photos.spaces.map(([name, eyebrow, category, photo]) => <a className="room-card" href="#shop" key={name} onClick={() => onSelect(category)}>
      <img src={imageUrl(photo, 900)} alt={name} /><div className="room-content"><span>{eyebrow}</span><h3>{name}</h3></div>
    </a>)}</div>
  </section>;
}

function Testimonial() {
  const stories = [
    ["The table has become the place we all drift back to. It feels like it’s always been part of our home.", "Clara W."],
    ["The chair is where I start every slow morning. Beautiful, comfortable, and somehow just right.", "Nadia R."],
    ["From the first sketch to the last cushion, every detail feels considered. We love living with it.", "James & Lee"]
  ];
  const [current, setCurrent] = useState(0);
  return <section className="section quote-section"><div className="wrap quote-inner"><div className="eyebrow">Notes from home</div><div className="quote-mark">“</div>
    <blockquote>{stories[current][0]}</blockquote><div className="quote-person"><strong>{stories[current][1]}</strong> &nbsp;·&nbsp; Stackly customer</div>
    <div className="quote-nav">{stories.map((_, index) => <button key={index} className={index === current ? "active" : ""} type="button" aria-label={`Customer story ${index + 1}`} onClick={() => setCurrent(index)} />)}</div>
  </div></section>;
}

function Newsletter({ onNavigate }) {
  const [message, setMessage] = useState("");
  function submit(event) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    if (typeof email !== "string" || !email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }
    event.currentTarget.reset();
    onNavigate();
  }
  return <section className="newsletter"><div className="wrap newsletter-inner">
    <div><span className="eyebrow">Letters from home</span><h2>A good thing in your inbox.</h2><p>New pieces, considered spaces, and notes for making home your own.</p></div>
    <div><form className="newsletter-form" onSubmit={submit}><label className="visually-hidden" htmlFor="email">Email address</label><input id="email" name="email" type="email" placeholder="Your email address" required /><button type="submit">Count me in&nbsp; →</button></form><div className="form-message" role="status">{message}</div></div>
  </div></section>;
}

function Footer({ onNavigate }) {
  const openMissingPage = event => {
    event.preventDefault();
    onNavigate();
  };
  return <footer><div className="wrap"><div className="footer-top">
    <div className="footer-brand"><Brand footer /><p>Thoughtful furniture for slow mornings, long dinners, and every day in between.</p><span className="eyebrow">Made for living in</span></div>
    <div className="footer-col"><h4>Find your way</h4><a href="#404" onClick={openMissingPage}>Home</a><a href="#404" onClick={openMissingPage}>Collections</a><a href="#404" onClick={openMissingPage}>Shop all</a><a href="#404" onClick={openMissingPage}>Our story</a></div>
    <div className="footer-col"><h4>Here to help</h4><a href="#footer">Delivery &amp; returns</a><a href="#footer">Care guide</a><a href="#footer">FAQs</a><a href="mailto:hello@stackly.com">Get in touch</a></div>
    <div className="footer-col" id="footer"><h4>Come say hello</h4><a href="#404" onClick={openMissingPage}>hello@stackly.com</a><a href="#404" onClick={openMissingPage}>+91 8000 555 018</a><a href="#404" onClick={openMissingPage}>Instagram ↗</a><a href="#404" onClick={openMissingPage}>Pinterest ↗</a></div>
  </div><div className="footer-bottom"><span>© 2026 Stackly. Made for living in.</span><span>Privacy &nbsp; · &nbsp; Terms &nbsp; · &nbsp; Accessibility</span></div></div></footer>;
}

function App() {
  const [bag, setBag] = useState(0);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState("");
  const [notFound, setNotFound] = useState(false);
  const notify = message => {
    setToast(message);
    window.clearTimeout(notify.timeout);
    notify.timeout = window.setTimeout(() => setToast(""), 2600);
  };
  const selectCategory = category => setFilter(category);
  const showNotFound = () => setNotFound(true);
  function addToBag(name) {
    setBag(count => count + 1);
    notify(`${name} added to your bag.`);
  }
  if (notFound) return <NotFound onBack={() => setNotFound(false)} />;
  return <>
    <Header bag={bag} onNavigate={showNotFound} onBag={() => notify(bag ? `You have ${bag} ${bag === 1 ? "piece" : "pieces"} in your bag.` : "Your bag is ready for something lovely.")} />
    <main><Hero onNavigate={showNotFound} /><Intro onNavigate={showNotFound} /><Categories onSelect={selectCategory} onNavigate={showNotFound} /><Offer onNavigate={showNotFound} /><Products filter={filter} setFilter={setFilter} notify={notify} addToBag={addToBag} onNavigate={showNotFound} /><Spaces onSelect={selectCategory} onNavigate={showNotFound} /><Testimonial /><section className="wrap section closing">
      <div className="closing-image"><img src={imageUrl("photo-1600607687939-ce8a6c25118c", 1100)} alt="Sun-filled interior with warm timber and soft neutral furnishings" /></div>
      <div className="closing-copy"><span className="eyebrow">Keep what feels like you</span><h2>Make a little<br />space for living.</h2><p>Slow mornings, long dinners, one more chapter. Find pieces that make room for the moments that make a home.</p><a className="button" href="#404" onClick={event => { event.preventDefault(); showNotFound(); }}>Find your favorite <span>↗</span></a></div>
    </section><Newsletter onNavigate={showNotFound} /></main>
    <Footer onNavigate={showNotFound} /><div className={`toast${toast ? " visible" : ""}`} role="status" aria-live="polite">{toast}</div>
  </>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
