import { useEffect } from "react";

export function MobileMenuToggle() {
  return (
    <button 
      className="mobile-menu-toggle text-white p-2"
      onClick={() => {
        // Show the mobile navigation drawer
        document.getElementById('mobile-nav')?.classList.remove('hidden');
      }}
      aria-label="Toggle menu"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

// Register a web component to help with usage
export class WebMenuToggleComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <button 
        class="mobile-menu-toggle text-white p-2"
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    `;
    
    this.querySelector('button')?.addEventListener('click', () => {
      document.getElementById('mobile-nav')?.classList.remove('hidden');
    });
  }
}

// Check if running in browser context
if (typeof window !== 'undefined') {
  // Define the custom element
  if (!customElements.get('mobile-menu-toggle')) {
    customElements.define('mobile-menu-toggle', WebMenuToggleComponent);
  }
}
