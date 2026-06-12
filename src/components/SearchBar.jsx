import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

// Search index across all pages
const SEARCH_INDEX = [
  // HomePage
  { page: '/', section: 'hero', title: 'Digital Agency', keywords: ['digital', 'agency', 'engines', 'thrust', 'logic'] },
  { page: '/', section: 'about', title: 'About - We Build A Machine', keywords: ['about', 'machine', 'agencies', 'team', 'senior'] },
  { page: '/', section: 'stats', title: 'Numbers & Stats', keywords: ['stats', 'numbers', 'projects', 'clients', 'roi'] },
  { page: '/', section: 'services', title: 'What We Do Best', keywords: ['services', 'do best', 'development', 'marketing', 'production', 'consulting'] },
  { page: '/', section: 'process', title: 'Our Process', keywords: ['process', 'discovery', 'strategy', 'execution', 'scale'] },
  
  // DevelopmentPage
  { page: '/development', section: 'hero', title: 'Development Services', keywords: ['development', 'engineering', 'systems', 'digital', 'code'] },
  { page: '/development', section: 'capabilities', title: 'What We Build', keywords: ['build', 'frontend', 'backend', 'apis', 'commerce', 'devops', 'cloud'] },
  { page: '/development', section: 'stack', title: 'Tools We Trust', keywords: ['tools', 'react', 'nodejs', 'typescript', 'aws', 'docker', 'postgres'] },
  { page: '/development', section: 'work', title: 'Projects We Shipped', keywords: ['projects', 'shipped', 'case studies', 'work', 'portfolio'] },
  
  // MarketingPage
  { page: '/marketing', section: 'hero', title: 'Marketing Services', keywords: ['marketing', 'growth', 'campaigns', 'performance'] },
  
  // ProductionPage
  { page: '/production', section: 'hero', title: 'Production Services', keywords: ['production', 'video', 'content', 'motion', 'creative'] },
  
  // AboutPage
  { page: '/about', section: 'hero', title: 'About Us', keywords: ['about', 'team', 'company', 'mission', 'values'] },
  
  // ConsultPage
  { page: '/consult', section: 'hero', title: 'Consulting', keywords: ['consult', 'consulting', 'strategy', 'advice', 'contact'] },
];

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Search functionality
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = SEARCH_INDEX.filter((item) =>
      item.keywords.some((kw) => kw.includes(lowerQuery)) ||
      item.title.toLowerCase().includes(lowerQuery)
    );

    setResults(filtered);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) && inputRef.current && !inputRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle result click
  const handleResultClick = (result) => {
    navigate(result.page);
    setQuery('');
    setIsOpen(false);
    // Scroll to section after navigation
    setTimeout(() => {
      const section = document.querySelector(`[data-section="${result.section}"]`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div
      className="search-widget"
      style={{
        position: 'fixed',
        right: '40px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'flex-end',
      }}
    >
      {/* Search Icon Button */}
      <button
        ref={inputRef}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setTimeout(() => document.querySelector('[data-search-input]')?.focus(), 100);
          }
        }}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'var(--accent)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          transition: 'all 0.3s ease',
          boxShadow: '0 8px 24px rgba(200, 241, 53, 0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(200, 241, 53, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(200, 241, 53, 0.3)';
        }}
      >
        🔍
      </button>

      {/* Search Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: '-60px',
            right: '0',
            width: '320px',
            maxHeight: '400px',
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Search Input */}
          <input
            data-search-input
            type="text"
            placeholder="Search pages & sections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '14px',
              padding: '14px 16px',
              border: 'none',
              borderBottom: '1px solid var(--border)',
              background: 'var(--bg)',
              color: 'var(--fg)',
              outline: 'none',
            }}
          />

          {/* Results List */}
          <div
            style={{
              overflowY: 'auto',
              maxHeight: '320px',
            }}
          >
            {query && results.length > 0 ? (
              results.map((result, idx) => (
                <button
                  key={idx}
                  onClick={() => handleResultClick(result)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: idx < results.length - 1 ? '1px solid var(--border)' : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    fontSize: '13px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--accent)33';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div style={{ fontWeight: 600, color: 'var(--accent)', marginBottom: '2px' }}>
                    {result.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--fg)' }}>
                    {result.page === '/' ? 'Home' : result.page.slice(1).toUpperCase()} → {result.section}
                  </div>
                </button>
              ))
            ) : query ? (
              <div
                style={{
                  padding: '20px 16px',
                  textAlign: 'center',
                  color: 'var(--fg)',
                  fontSize: '13px',
                }}
              >
                No results found
              </div>
            ) : (
              <div
                style={{
                  padding: '20px 16px',
                  color: 'var(--fg)',
                  fontSize: '12px',
                  lineHeight: 1.6,
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '8px' }}>Quick Links:</div>
                <div>• Development</div>
                <div>• Marketing</div>
                <div>• Production</div>
                <div>• About</div>
                <div>• Consulting</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
