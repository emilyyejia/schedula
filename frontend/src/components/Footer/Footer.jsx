

export default function Footer() {
  return (
    <footer className="bg-body-tertiary mt-auto py-4 border-top">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="mb-3 mb-md-0 text-center text-md-start">
          <span className="fw-bold">Schedula</span> &copy; {new Date().getFullYear()}
        </div>
        <div className="text-center text-md-end">
          <a
            href="https://github.com/your-github-username"
            target="_blank"
            rel="noopener noreferrer"
            className="me-3 text-decoration-none text-dark"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/your-linkedin-username"
            target="_blank"
            rel="noopener noreferrer"
            className="me-3 text-decoration-none text-dark"
          >
            LinkedIn
          </a>
          <a
            href="mailto:schedula.ca@gmail.com"
            className="text-decoration-none text-dark"
          >
            schedula.ca@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
