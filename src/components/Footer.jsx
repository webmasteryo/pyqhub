const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
        <aside className="grid-flow-col items-center">
          <h5>Pyqhub.com</h5>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a href="/terms">
            <p>Terms of Service</p>
          </a>
          <a href="/privacyPolicy">
            <p>Privacy Policy</p>
          </a>
          <a href="/exam">
            <p>Exams</p>
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
