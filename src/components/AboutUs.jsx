export default function AboutUs({ compact = false }) {
  return (
    <section className={`about-section ${compact ? 'about-compact' : ''}`}>
      <p className="eyebrow">OUR STORY</p>
      <h2>Growing happiness, one plant at a time.</h2>
      <p>Paradise Nursery is a welcoming online plant shop for anyone who wants to bring more nature into everyday life. We make it easier to discover beautiful houseplants and find the right green companion for your space.</p>
      <p>Our goal is simple: help people create calmer, fresher, and more inspiring homes with plants. Whether you are a first-time plant parent or an experienced gardener, there is something here for you.</p>
      {!compact && <div className="about-values"><span>🌱 Thoughtful selection</span><span>🪴 Beginner friendly</span><span>💚 Greener living</span></div>}
    </section>
  );
}
