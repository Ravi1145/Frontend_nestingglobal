
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Simulate a successful response
        setStatus('success');
    };

    return (
        <div className="bg-cream pt-32 pb-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-serif font-semibold text-charcoal">Get In Touch</h1>
                    <p className="mt-6 text-lg text-warm-gray max-w-2xl mx-auto">
                        We are here to assist you with any inquiries. Whether you are buying, selling, or simply exploring, our team is ready to provide expert guidance.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Contact Form */}
                    <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-lg shadow-elegant">
                        <h2 className="text-3xl font-serif font-semibold text-charcoal mb-8">Send Us a Message</h2>
                        {status === 'success' ? (
                             <div className="text-center bg-teal-accent/10 text-teal-accent p-8 rounded-lg">
                                <h3 className="text-2xl font-semibold">Thank You!</h3>
                                <p className="mt-2">Your message has been sent successfully. One of our consultants will be in touch with you shortly.</p>
                             </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="text-sm font-sans font-semibold text-charcoal block mb-2">Full Name</label>
                                        <input type="text" id="name" required className="w-full px-4 py-3 text-sm border border-beige-border rounded-md focus:outline-none focus:ring-2 focus:ring-champagne-gold" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="text-sm font-sans font-semibold text-charcoal block mb-2">Email Address</label>
                                        <input type="email" id="email" required className="w-full px-4 py-3 text-sm border border-beige-border rounded-md focus:outline-none focus:ring-2 focus:ring-champagne-gold" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="text-sm font-sans font-semibold text-charcoal block mb-2">Phone Number</label>
                                    <input type="tel" id="phone" placeholder="+91 98380 03440" required className="w-full px-4 py-3 text-sm border border-beige-border rounded-md focus:outline-none focus:ring-2 focus:ring-champagne-gold" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="text-sm font-sans font-semibold text-charcoal block mb-2">Message</label>
                                    <textarea id="message" rows={5} required className="w-full px-4 py-3 text-sm border border-beige-border rounded-md focus:outline-none focus:ring-2 focus:ring-champagne-gold"></textarea>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full bg-teal-accent text-white font-sans font-semibold py-4 rounded-md hover:bg-opacity-90 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {status === 'submitting' ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Submitting...
                                            </>
                                        ) : 'Submit Inquiry'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-5">
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-lg shadow-elegant">
                                <h3 className="text-xl font-sans font-semibold text-charcoal mb-4">Main Office (Dubai)</h3>
                                <address className="not-italic text-warm-gray space-y-2">
                                    <p>📍 One Palm, Palm Jumeirah</p>
                                    <p>Dubai, UAE</p>
                                </address>
                            </div>
                             <div className="bg-white p-8 rounded-lg shadow-elegant">
                                <h3 className="text-xl font-sans font-semibold text-charcoal mb-4">Head Office (India)</h3>
                                <address className="not-italic text-warm-gray space-y-2">
                                    <p>📍 New Delhi, India</p>
                                </address>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-elegant">
                                <h3 className="text-xl font-sans font-semibold text-charcoal mb-4">Contact Details</h3>
                                <div className="text-warm-gray space-y-2">
                                    <p>📞 <a href="tel:+919838003440" className="hover:text-gold transition-colors">+91 98380 03440</a></p>
                                    <p>📧 <a href="mailto:inquire@nestingglobal.com" className="hover:text-gold transition-colors">inquire@nestingglobal.com</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="mt-16 h-96 rounded-lg overflow-hidden shadow-elegant border border-beige-border">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.871141151607!2d55.13742461500779!3d25.10619598393843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f152fd4348239%3A0x833350e18817a382!2sOne%26Only%20The%20Palm!5e0!3m2!1sen!2sae!4v1672521000000!5m2!1sen!2sae"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Office Location"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
