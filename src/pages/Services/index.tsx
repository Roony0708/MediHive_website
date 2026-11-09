import { Link } from 'react-router-dom';
import { services, specialties } from '../../utils/data';

export function Services() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Our services</h1>
          <p className="lead">
            Fourteen services, from a general checkup to cancer care. Each one names
            the specialty behind it and the doctors who practise it.
          </p>
          <div className="page-head__meta">
            <span>{services.length} services</span>
            <span>{specialties.length} specialties</span>
            <Link to="/health-packages" className="read-link">Health packages and prices</Link>
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div className="rows">
            {services.map((service) => (
              <article key={service.id} id={service.slug} className="row row--service">
                <div className="row__main">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <div className="row__end">
                  <Link to={`/book-appointment?service=${service.slug}`} className="btn btn--sm">Book</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section band--ink">
        <div className="container">
          <div className="split">
            <div className="split__text">
              <h2>Not sure which service you need?</h2>
              <p className="lead mt-lg">
                Call the helpline and describe the problem. The team will name the
                specialty and the doctor, or tell you to go straight to emergency.
              </p>
              <div className="hero-index__actions">
                <a href="tel:+9118001234567" className="btn btn--primary">Call +91 1800 123 4567</a>
                <Link to="/specialties" className="btn">Browse specialties</Link>
              </div>
            </div>
            <div className="split__media">
              <p>
                Emergency care is open 24 hours at all hospitals with an emergency
                department. For chest pain, stroke symptoms or severe bleeding, call
                the helpline and say it is an emergency.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
