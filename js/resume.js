class ResumeApp {
  constructor() {
    this.init();
  }

  async init() {
    this.setCurrentYear();
    this.setupPrintButton();
    await this.loadAndRenderResume();
  }

  setCurrentYear() {
    const yearElements = document.querySelectorAll('.year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(element => {
      element.textContent = currentYear;
    });
  }

  setupPrintButton() {
    const printBtn = document.getElementById('print-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  async loadAndRenderResume() {
    const contentElement = document.getElementById('resume-content');

    try {
      // Configure marked for clean HTML output
      marked.setOptions({
        headerIds: false,
        mangle: false,
        breaks: false,
        gfm: true
      });

      // Load the markdown file
      const response = await fetch('https://raw.githubusercontent.com/ebrentnelson/ebrentnelson-com/refs/heads/master/assets/ebn-resume.md');
      if (!response.ok) {
        throw new Error(`Failed to load resume: ${response.status}`);
      }

      let markdownContent = await response.text();

      // Remove YAML front matter if present
      markdownContent = this.removeFrontMatter(markdownContent);

      // Convert markdown to HTML
      const htmlContent = marked.parse(markdownContent);

      // Render the content
      contentElement.innerHTML = this.enhanceHTML(htmlContent);

    } catch (error) {
      console.error('Error loading resume:', error);
      contentElement.innerHTML = `
        <div class="error">
          <h2>Unable to load resume</h2>
          <p>Error: ${error.message}</p>
          <p>Please ensure <code>ebn-resume.md</code> is available in the root directory.</p>
        </div>
      `;
    }
  }

  removeFrontMatter(markdown) {
    // Remove YAML front matter (content between --- lines at the start)
    return markdown.replace(/^---[\s\S]*?---\s*/m, '');
  }

  enhanceHTML(html) {
    // Add semantic structure and styling hooks
    return html
      // Wrap contact info (first paragraph after h1) with special class
      .replace(/(<h1>.*?<\/h1>\s*)(<p>.*?<\/p>)/, '$1<div class="contact-info">$2</div>')
      // Add wrapper for experience entries (h3 + italic paragraph)
      .replace(/(<h3>.*?<\/h3>\s*)(<p><em>.*?<\/em><\/p>)/g, '<div class="experience-entry">$1$2</div>')
      // Enhance lists in professional experience
      .replace(/(<div class="experience-entry">.*?<\/div>\s*)(<ul>)/gs, '$1<div class="experience-details">$2')
      .replace(/(<\/ul>)(\s*<(?:div class="experience-entry"|h2))/gs, '$1</div>$2');
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ResumeApp();
});
