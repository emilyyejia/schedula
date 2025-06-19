import './Footer.css';
export default function Footer() {
  return (
    <footer className="mt-auto py-4" style={{ backgroundColor: 'white' }}>
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="mb-3 mb-md-0 text-center text-md-start">
          <span className="fw-bold">Schedula</span> by <span className="fw-bold">Ye Jia</span> &copy; {new Date().getFullYear()}
        </div>
        <div className="text-center text-md-end">
          <a
            href="https://github.com/emilyyejia"
            target="_blank"
            rel="noopener noreferrer"
            className="me-3 text-decoration-none text-dark"
          >
            <i className="bi bi-github" style={{ fontSize: '1.5rem' }}></i>
          </a>
          <a
            href="https://www.linkedin.com/in/ye-jia-a80245205/"
            target="_blank"
            rel="noopener noreferrer"
            className="me-3 text-decoration-none text-dark"
          >
            <i className="bi bi-linkedin" style={{ fontSize: '1.5rem' }}></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
