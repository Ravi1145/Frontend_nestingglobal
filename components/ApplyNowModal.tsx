import React, { useState, useEffect } from 'react';
import { XIcon } from './icons';

interface ApplyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplyNowModal: React.FC<ApplyNowModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
        // Reset form status when modal is opened
        setStatus('idle');
        // Prevent background scrolling when modal is open
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
    // Cleanup function
    return () => {
        document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Simulate a successful response
    setStatus('success');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      <div className="relative bg-white w-full max-w-lg rounded-lg shadow-elegant p-8 md:p-10 transform transition-all duration-300 scale-95 opacity-0 animate-[scaleIn_0.3s_ease-out_forwards]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-warm-gray hover:text-charcoal transition-colors"
          aria-label="Close modal"
        >
          <XIcon className="w-6 h-6" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-10">
            <h2 id="modal-title" className="text-3xl font-serif font-semibold text-charcoal mb-4">Application Sent!</h2>
            <p className="text-warm-gray mb-6">Thank you for your interest. A member of our team will contact you shortly to proceed with your application.</p>
            <button
                onClick={onClose}
                className="w-full bg-teal-accent text-white font-sans font-semibold py-3 rounded-md hover:bg-opacity-90 transition-colors duration-300"
            >
                Close
            </button>
          </div>
        ) : (
          <>
            <h2 id="modal-title" className="text-3xl font-serif font-semibold text-charcoal mb-2">Apply Now</h2>
            <p className="text-warm-gray mb-8">Begin your journey to securing a world-class property.</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="modal-name" className="text-sm font-sans font-semibold text-charcoal block mb-2">Full Name</label>
                <input type="text" id="modal-name" required className="w-full px-4 py-3 text-sm border border-beige-border rounded-md focus:outline-none focus:ring-2 focus:ring-champagne-gold" />
              </div>
              <div>
                <label htmlFor="modal-email" className="text-sm font-sans font-semibold text-charcoal block mb-2">Email Address</label>
                <input type="email" id="modal-email" required className="w-full px-4 py-3 text-sm border border-beige-border rounded-md focus:outline-none focus:ring-2 focus:ring-champagne-gold" />
              </div>
              <div>
                <label htmlFor="modal-phone" className="text-sm font-sans font-semibold text-charcoal block mb-2">Phone Number</label>
                <input type="tel" id="modal-phone" placeholder="+91 98380 03440" required className="w-full px-4 py-3 text-sm border border-beige-border rounded-md focus:outline-none focus:ring-2 focus:ring-champagne-gold" />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-teal-accent text-white font-sans font-semibold py-3 rounded-md hover:bg-opacity-90 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : 'Submit Application'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      <style>{`
        @keyframes scaleIn {
            from {
                transform: scale(0.95);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
      `}</style>
    </div>
  );
};

export default ApplyNowModal;