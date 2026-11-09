import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Link2, Check } from 'lucide-react';
import { blogPosts } from '../../utils/data';
import { formatDate } from '../../utils/helpers';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);
  const post = blogPosts.find((p) => p.slug === slug);

  const related = post
    ? blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)
    : [];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard can be blocked; the address bar still holds the link
    }
  };

  if (!post) {
    return (
      <section className="section">
        <div className="container">
          <h1>Article not found</h1>
          <p className="lead mt-lg">This address does not match a published article.</p>
          <p className="mt-lg"><Link to="/blog" className="read-link">Back to all articles</Link></p>
        </div>
      </section>
    );
  }

  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(post.title);

  return (
    <>
      <article className="section">
        <div className="container">
          <div className="article">
            <p className="meta">
              <Link to="/blog" className="read-link">{post.category}</Link>
            </p>
            <h1 className="mt-lg">{post.title}</h1>
            <div className="byline mt-lg">
              <span>{post.author.name}</span>
              <span>{post.author.role}</span>
              <span>{post.readTime}</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
            <p className="lead mt-lg">{post.excerpt}</p>

            {post.content.split('\n').filter(Boolean).map((para, i) => (
              <p key={i}>{para}</p>
            ))}

            <h2>Tags</h2>
            <div className="filter-strip">
              {post.tags.map((tag) => (
                <span key={tag} className="chip">{tag}</span>
              ))}
            </div>

            <h2>Share this article</h2>
            <div className="form-actions">
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--sm"
              >
                Share on X
              </a>
              <a
                href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--sm"
              >
                Share on Facebook
              </a>
              <a
                href={`https://linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--sm"
              >
                Share on LinkedIn
              </a>
              <button type="button" className="btn btn--sm" onClick={handleCopyLink}>
                {copied ? <Check size={16} aria-hidden="true" /> : <Link2 size={16} aria-hidden="true" />}
                {copied ? 'Link copied' : 'Copy link'}
              </button>
            </div>

            <p className="mt-lg">
              <Link to="/blog" className="read-link">
                <ArrowLeft size={16} aria-hidden="true" /> All articles
              </Link>
            </p>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section band">
          <div className="container">
            <div className="head">
              <h2>More on {post.category.toLowerCase()}</h2>
              <p className="lead">Articles filed under the same specialty.</p>
            </div>
            <div className="article-list">
              {related.map((item) => (
                <Link key={item.id} to={`/blog/${item.slug}`} className="article-row">
                  <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                  </div>
                  <span className="meta">{item.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
