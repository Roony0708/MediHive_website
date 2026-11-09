import { Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';

const companyLinks = [
  { label: 'About us', path: '/about' },
  { label: 'Our doctors', path: '/doctors' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact us', path: '/contact' },
  { label: 'FAQ', path: '/faq' },
];

const serviceLinks = [
  { label: 'All services', path: '/services' },
  { label: 'Health checkups', path: '/services#general-checkup' },
  { label: 'Diagnostics', path: '/services#diagnostic-imaging' },
  { label: 'Pharmacy', path: '/services#pharmacy' },
  { label: 'Ambulance', path: '/services#emergency-care' },
  { label: 'All doctors', path: '/doctors' },
];

const specialtyLinks = [
  { label: 'Cardiology', path: '/specialties#cardiology' },
  { label: 'Orthopedics', path: '/specialties#orthopedics' },
  { label: 'Neurology', path: '/specialties#neurology' },
  { label: 'Pediatrics', path: '/specialties#pediatrics' },
  { label: 'Oncology', path: '/specialties#oncology' },
  { label: 'All specialties', path: '/specialties' },
];

const supportLinks = [
  { label: 'Book an appointment', path: '/book-appointment' },
  { label: 'Health packages', path: '/health-packages' },
  { label: 'Privacy policy', path: '/privacy' },
  { label: 'Terms of service', path: '/terms' },
];

export function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="wordmark" aria-label="MediHive home">
              <HeartPulse size={26} aria-hidden="true" />
              <span>MediHive</span>
            </Link>
            <p>
              MediHive connects you with doctors, hospitals and health services across
              India, and tells you the fee before you book.
            </p>
            <p>
              <a href="tel:+9118001234567">+91 1800 123 4567</a>
              <br />
              <a href="mailto:care@medihive.com">care@medihive.com</a>
              <br />
              MediHive Health City, Mumbai, India
            </p>
          </div>

          <div className="footer-links">
            <div>
              <h2>Company</h2>
              <ul>
                {companyLinks.map((link) => (
                  <li key={link.label}><Link to={link.path}>{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Services</h2>
              <ul>
                {serviceLinks.map((link) => (
                  <li key={link.label}><Link to={link.path}>{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Specialties</h2>
              <ul>
                {specialtyLinks.map((link) => (
                  <li key={link.label}><Link to={link.path}>{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Support</h2>
              <ul>
                {supportLinks.map((link) => (
                  <li key={link.label}><Link to={link.path}>{link.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MediHive Healthcare</p>
          <p className="footer-credits">
            Photographs: <a href="https://commons.wikimedia.org/wiki/File:Krankenhaus_002_2015_03_24.jpg" target="_blank" rel="noopener noreferrer">Friedrich Haag</a> (CC BY-SA 4.0),{' '}
            <a href="https://commons.wikimedia.org/wiki/File:The_Stethoscope,_Peru.jpg" target="_blank" rel="noopener noreferrer">Alex Proimos</a> (CC BY 2.0), via Wikimedia Commons.
          </p>
        </div>
      </div>
    </footer>
  );
}
