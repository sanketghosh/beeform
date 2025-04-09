import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-primary/60 to-primary/70 px-4 py-8">
      <div className="container mx-auto text-center">
        <p>&copy; {currentYear} zapform. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="/privacy" className="transition-colors hover:text-white">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="/terms" className="transition-colors hover:text-white">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};
