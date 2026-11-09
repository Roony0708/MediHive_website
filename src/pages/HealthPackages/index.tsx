import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { healthPackages } from '../../utils/data';
import { formatCurrency } from '../../utils/helpers';

type PriceRange = 'all' | 'low' | 'medium' | 'high';
type SortOption = 'popularity' | 'price-asc' | 'price-desc';

const rangeLabels: Record<PriceRange, string> = {
  all: 'All',
  low: 'Under ₹1,500',
  medium: '₹1,500 to ₹2,999',
  high: '₹3,000 and above',
};

export function HealthPackages() {
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');

  const visible = useMemo(() => {
    const list = healthPackages.filter((pkg) => {
      if (priceRange === 'all') return true;
      if (priceRange === 'low') return pkg.price <= 1499;
      if (priceRange === 'medium') return pkg.price >= 1500 && pkg.price <= 2999;
      return pkg.price >= 3000;
    });

    return list.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    });
  }, [priceRange, sortBy]);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Health checkup packages</h1>
          <p className="lead">
            Nine screening packages. Each one lists every test, the time it takes and
            the price, so you can compare before booking.
          </p>
          <div className="page-head__meta">
            <span>{healthPackages.length} packages</span>
            <span>Prices per person</span>
            <Link to="/contact" className="read-link">Ask about a package</Link>
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div className="filters">
            <div className="field">
              <span className="label">Price</span>
              <div className="filter-strip">
                {(Object.keys(rangeLabels) as PriceRange[]).map((range) => (
                  <button
                    key={range}
                    type="button"
                    className="chip"
                    aria-pressed={priceRange === range}
                    onClick={() => setPriceRange(range)}
                  >
                    {rangeLabels[range]}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="package-sort">Sort</label>
              <select
                id="package-sort"
                className="select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="popularity">Most booked</option>
                <option value="price-asc">Price, low to high</option>
                <option value="price-desc">Price, high to low</option>
              </select>
            </div>
          </div>

          <p className="result-count" role="status">
            {visible.length} {visible.length === 1 ? 'package' : 'packages'}
          </p>

          <div className="grid grid--3">
            {visible.map((pkg) => (
              <article key={pkg.id} className={`package${pkg.popular ? ' package--lead' : ''}`}>
                <h3>{pkg.name}</h3>
                <p>{pkg.description}</p>
                <p className="meta">{pkg.tests.length} tests · {pkg.duration}</p>
                <ul>
                  {pkg.tests.map((test) => (
                    <li key={test}>{test}</li>
                  ))}
                </ul>
                <div className="package__price-row">
                  <span className="price">{formatCurrency(pkg.price)}</span>
                  <span className="strike">{formatCurrency(pkg.originalPrice)}</span>
                  <span className="meta">Save {formatCurrency(pkg.originalPrice - pkg.price)}</span>
                </div>
                <Link to="/book-appointment" className="btn">Book this package</Link>
              </article>
            ))}
          </div>

          {visible.length === 0 && (
            <div className="empty-state">
              <p>No package in this price range.</p>
              <button type="button" className="btn" onClick={() => setPriceRange('all')}>Show all</button>
            </div>
          )}
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="head">
            <h2>What the price covers</h2>
            <p className="lead">
              The package price covers the listed tests. Consultation, medicines and
              repeat tests are charged separately.
            </p>
          </div>
          <p>
            <Link to="/faq" className="read-link">Read how reports and fasting work</Link>
          </p>
        </div>
      </section>
    </>
  );
}
