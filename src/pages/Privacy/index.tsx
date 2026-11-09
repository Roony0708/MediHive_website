import { Link } from 'react-router-dom';

const sections = [
  { id: 'introduction', title: '1. Introduction' },
  { id: 'information', title: '2. Information We Collect' },
  { id: 'usage', title: '3. How We Use Your Information' },
  { id: 'security', title: '4. Data Storage and Security' },
  { id: 'sharing', title: '5. Sharing of Information' },
  { id: 'rights', title: '6. Your Rights' },
  { id: 'cookies', title: '7. Cookies Policy' },
  { id: 'changes', title: '8. Changes to Policy' },
  { id: 'contact-privacy', title: '9. Contact Us' },
];

export function Privacy() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Privacy policy</h1>
          <p className="lead mt-lg">Last updated: January 1, 2026</p>
        </div>
      </section>

      <section className="section--tight">
        <div className="container legal-layout">
          <aside className="legal-toc">
            <h2>Contents</h2>
            <nav aria-label="Table of contents">
              <ol>
                {sections.map((s) => (
                  <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="prose">
      <section id="introduction">
          <h2>1. Introduction</h2>
          <p>MediHive Healthcare (&ldquo;MediHive,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our healthcare services.</p>
          <p>By accessing or using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with any part of this policy, please do not use our services.</p>
          <p>We comply with the applicable data protection laws in India, including the Digital Personal Data Protection Act (DPDPA), 2023, and adhere to international best practices for healthcare data privacy.</p>
      </section>

      <section id="information">
          <h2>2. Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>When you use our services, we may collect personal information including but not limited to: your full name, date of birth, gender, email address, phone number, residential address, government-issued identification numbers (Aadhaar, PAN), and emergency contact details.</p>
          <h3>Medical Information</h3>
          <p>We collect medical information necessary for providing healthcare services, including: medical history, current symptoms, diagnostic reports, prescription records, vaccination records, allergy information, imaging studies (X-rays, MRI, CT scans), laboratory test results, and treatment plans.</p>
          <h3>Usage Data</h3>
          <p>We automatically collect certain information when you visit our website, including: your IP address, browser type, operating system, referring URLs, pages visited, time and date of visits, and device information. This data helps us improve our website and services.</p>
          <h3>Cookies and Tracking</h3>
          <p>We use cookies and similar tracking technologies to enhance your experience. Please see our Cookies Policy in Section 7 for more details.</p>
      </section>

      <section id="usage">
          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li>To provide, maintain, and improve our healthcare services</li>
            <li>To process appointment bookings and manage your patient account</li>
            <li>To communicate with you about appointments, test results, and follow-ups</li>
            <li>To facilitate telemedicine consultations</li>
            <li>To process payments and insurance claims</li>
            <li>To send health-related educational content and preventive care reminders</li>
            <li>To comply with legal and regulatory obligations</li>
            <li>To analyze usage patterns and improve our platform</li>
            <li>To detect, prevent, and address technical issues and fraud</li>
          </ul>
      </section>

      <section id="security">
          <h2>4. Data Storage and Security</h2>
          <p>We implement security measures to protect your personal and medical information:</p>
          <ul>
            <li><strong>Encryption:</strong> All data transmitted between your browser and our servers is encrypted using TLS 1.3 protocol. Stored data is encrypted using AES-256 encryption.</li>
            <li><strong>Access Controls:</strong> Strict role-based access controls ensure that only authorized healthcare professionals can access patient information on a need-to-know basis.</li>
            <li><strong>Audit Trails:</strong> All access to patient records is logged and monitored. Regular audits are conducted to detect unauthorized access.</li>
            <li><strong>Data Centers:</strong> Our data is stored in secure, ISO 27001 certified data centers located in India with redundant backups and disaster recovery protocols.</li>
            <li><strong>Employee Training:</strong> All employees undergo mandatory data protection and privacy training on an annual basis.</li>
          </ul>
          <p>While we implement industry-standard security measures, no method of electronic storage or transmission is 100% secure. We encourage you to protect your account credentials and log out after each session.</p>
      </section>

      <section id="sharing">
          <h2>5. Sharing of Information</h2>
          <p>We may share your information in the following circumstances:</p>
          <ul>
            <li><strong>Healthcare Providers:</strong> With doctors, specialists, and healthcare professionals involved in your care</li>
            <li><strong>Insurance Companies:</strong> For processing insurance claims and pre-authorizations</li>
            <li><strong>Diagnostic Labs:</strong> With laboratories for processing diagnostic tests</li>
            <li><strong>Pharmacies:</strong> For prescription fulfillment and medication management</li>
            <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
          </ul>
          <p>We do not sell your personal or medical information to third parties. All third-party service providers are contractually obligated to maintain confidentiality and comply with applicable data protection laws.</p>
      </section>

      <section id="rights">
          <h2>6. Your Rights</h2>
          <p>You have the following rights regarding your personal and medical information:</p>
          <ul>
            <li><strong>Right to Access:</strong> You can request a copy of the personal data we hold about you.</li>
            <li><strong>Right to Rectification:</strong> You can request correction of inaccurate or incomplete data.</li>
            <li><strong>Right to Erasure:</strong> You can request deletion of your data, subject to legal retention requirements.</li>
            <li><strong>Right to Restrict Processing:</strong> You can request restriction of processing in certain circumstances.</li>
            <li><strong>Right to Data Portability:</strong> You can request transfer of your data to another healthcare provider.</li>
            <li><strong>Right to Withdraw Consent:</strong> You can withdraw your consent at any time, though this may affect our ability to provide services.</li>
            <li><strong>Right to Grievance Redressal:</strong> You can file a complaint regarding our data handling practices.</li>
          </ul>
          <p>To exercise any of these rights, please contact our Data Protection Officer at dpo@medihive.com. We will respond to your request within 30 days as required by applicable law.</p>
      </section>

      <section id="cookies">
          <h2>7. Cookies Policy</h2>
          <p>Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from.</p>
          <p><strong>What are cookies?</strong> Cookies are small text files stored on your device by your web browser. They help us remember your preferences and improve your experience.</p>
          <p><strong>Types of cookies we use:</strong></p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for the website to function properly. These include session cookies and security cookies.</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences, such as language and theme selection.</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website, allowing us to improve our services.</li>
            <li><strong>Functional Cookies:</strong> Enable enhanced functionality, such as remembering your login status.</li>
          </ul>
          <p>You can control cookie preferences through your browser settings. Disabling certain cookies may affect website functionality.</p>
      </section>

      <section id="changes">
          <h2>8. Changes to Policy</h2>
          <p>We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or operational needs. We will notify you of any material changes by posting the updated policy on this page and, where appropriate, through email or in-app notifications.</p>
          <p>We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information. Your continued use of our services after any changes constitutes acceptance of the updated policy.</p>
      </section>

      <section id="contact-privacy">
          <h2>9. Contact Us</h2>
          <p>If you have any questions, concerns, or complaints regarding this Privacy Policy or our data handling practices, please contact us:</p>
          <p><strong>Data Protection Officer:</strong><br />Email: dpo@medihive.com<br />Phone: +91 22 6789 1000</p>
          <p><strong>Corporate Office:</strong><br />MediHive Healthcare Pvt. Ltd.,<br />Andheri East, Mumbai - 400069,<br />Maharashtra, India</p>
          <p>We will acknowledge receipt of your complaint within 48 hours and resolve it within 30 days. If you are not satisfied with our response, you may file a complaint with the relevant data protection authority.</p>
      </section>

          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="head">
            <h2>Questions about your data?</h2>
            <p className="lead">Write to the Data Protection Officer or call the corporate office.</p>
          </div>
          <div className="form-actions">
            <a href="mailto:dpo@medihive.com" className="btn btn--primary">dpo@medihive.com</a>
            <Link to="/contact" className="btn">Contact page</Link>
          </div>
        </div>
      </section>
    </>
  );
}
