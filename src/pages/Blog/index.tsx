import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../utils/data';
import { formatDate } from '../../utils/helpers';

export function Blog() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = blogPosts.map((p) => p.category);
    return ['All', ...new Set(cats)];
  }, []);

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Health notes</h1>
          <p className="lead">
            Articles written by the doctors on this site, on the conditions they
            treat and the questions they hear most.
          </p>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div className="filters">
            <div className="field">
              <label className="label" htmlFor="blog-search">Search articles</label>
              <input
                id="blog-search"
                className="input"
                type="search"
                placeholder="e.g. diabetes"
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
                aria-pressed={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="result-count" role="status">
            {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
          </p>

          <div className="article-list">
            {filtered.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="article-row">
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
                <span className="meta">
                  {post.category}
                  <br />
                  {post.readTime}
                </span>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <p>No article matches that search.</p>
              <button type="button" className="btn" onClick={() => { setSearch(''); setActiveCategory('All'); }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
