import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '../../utils/data';

export function FAQ() {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = faqItems.map((f) => f.category);
    return ['All', ...new Set(cats)];
  }, []);

  const filtered = useMemo(() => {
    let list = faqItems;
    if (activeCat !== 'All') list = list.filter((f) => f.category === activeCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCat, search]);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Questions and answers</h1>
          <p className="lead">
            Appointments, reports, insurance and visiting hours, answered in the
            words the hospitals use.
          </p>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div className="filters">
            <div className="field">
              <label className="label" htmlFor="faq-search">Search questions</label>
              <input
                id="faq-search"
                className="input"
                type="search"
                placeholder="e.g. insurance, reports"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-strip">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className="chip"
                aria-pressed={activeCat === cat}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="result-count" role="status">
            {filtered.length} {filtered.length === 1 ? 'question' : 'questions'}
          </p>

          <div className="faq-list">
            {filtered.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className={`faq-item${isOpen ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    <span>
                      <span className="meta">{item.category}</span>
                      <br />
                      {item.question}
                    </span>
                    <ChevronDown size={20} aria-hidden="true" />
                  </button>
                  <div className="faq-answer" id={`faq-answer-${item.id}`} role="region">
                    <div><p>{item.answer}</p></div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <p>No question matches that search.</p>
              <button type="button" className="btn" onClick={() => { setSearch(''); setActiveCat('All'); }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="head">
            <h2>Still have a question?</h2>
            <p className="lead">Call the helpline or send a note to the care team.</p>
          </div>
          <div className="form-actions">
            <Link to="/contact" className="btn btn--primary">Contact us</Link>
            <a href="tel:+9118001234567" className="btn">+91 1800 123 4567</a>
          </div>
        </div>
      </section>
    </>
  );
}
