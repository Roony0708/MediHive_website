import { Link } from 'react-router-dom';
import { hospitals } from '../../utils/data';
import { ContactForm } from '../../components/ui/ContactForm';
import { LocationMap } from '../../components/ui/expanded-map';

const channels = [
  { title: 'Emergency', detail: '+91 1800 123 4567', href: 'tel:+9118001234567', note: '24-hour ambulance and emergency line' },
  { title: 'Appointments', detail: '+91 1800 123 4568', href: 'tel:+9118001234568', note: 'Mon to Sat, 9am to 8pm' },
  { title: 'WhatsApp', detail: 'Chat on WhatsApp', href: 'https://wa.me/9118001234567', note: 'Replies within 30 minutes' },
  { title: 'Email', detail: 'care@medihive.com', href: 'mailto:care@medihive.com', note: 'Replies within 24 hours' },
  { title: 'Corporate office', detail: 'MediHive Healthcare, Andheri East, Mumbai 400069', note: 'Mon to Fri, 9am to 6pm' },
];

export function Contact() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Contact us</h1>
          <p className="lead">
            Call the helpline for an appointment or an emergency. The form is a draft
            you can print or copy; it is not connected to a mailbox.
          </p>
          <div className="page-head__meta">
            <a href="tel:+9118001234567" className="read-link">24-hour helpline +91 1800 123 4567</a>
            <Link to="/faq" className="read-link">Read the FAQ</Link>
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div className="contact-layout">
            <div>
              <ContactForm />
            </div>
            <div className="contact-facts">
              {channels.map((channel) => (
                <div key={channel.title} className="contact-fact">
                  <h3>{channel.title}</h3>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      target={channel.href.startsWith('http') ? '_blank' : undefined}
                      rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {channel.detail}
                    </a>
                  ) : (
                    <p>{channel.detail}</p>
                  )}
                  <p className="meta">{channel.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="head">
            <h2>Hospital locations</h2>
            <p className="lead">
              Six hospitals, each with its own address and phone number. Call the
              hospital directly for directions.
            </p>
          </div>
          <div className="contact-layout">
            <div className="map-frame">
              <LocationMap
                location="MediHive Healthcare, Andheri East, Mumbai 400069"
                latitude={19.1136}
                longitude={72.8697}
                zoom={13}
                height={420}
              />
            </div>
            <div>
              {hospitals.map((hospital) => (
                <article key={hospital.id} className="place">
                  <h3>{hospital.name}</h3>
                  <address>{hospital.address}</address>
                  <div className="place__meta">
                    <a href={`tel:${hospital.phone.replace(/\s/g, '')}`}>{hospital.phone}</a>
                    <span>{hospital.emergency ? '24-hour emergency' : 'No emergency department'}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
