'use client';

import { useState } from 'react';

export default function SubmitPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-8 text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Service Submitted!</h1>
          <p className="text-gray-400 mb-6">
            Thank you for your submission. Our team will review it and get back to you shortly.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-medium text-gray-900 hover:bg-gray-100 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Submit a Service</h1>
        <p className="text-gray-400">
          Have a paid API to share with the community? Fill out the form below.
        </p>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-300">
                Service Name *
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-2.5 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
                placeholder="e.g., Pawr Link"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="url" className="text-sm font-medium text-gray-300">
                Website URL *
              </label>
              <input
                id="url"
                type="url"
                required
                className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-2.5 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-300">
              Description *
            </label>
            <textarea
              id="description"
              required
              rows={4}
              className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-2.5 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors resize-none"
              placeholder="Briefly describe your API service..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="protocol" className="text-sm font-medium text-gray-300">
                Payment Protocol *
              </label>
              <select
                id="protocol"
                className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-2.5 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
              >
                <option value="x402">x402</option>
                <option value="mpp">MPP</option>
                <option value="acp">ACP</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium text-gray-300">
                Category *
              </label>
              <select
                id="category"
                className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-2.5 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
              >
                <option value="data">Data</option>
                <option value="trading">Trading</option>
                <option value="ai-ml">AI/ML</option>
                <option value="identity">Identity</option>
                <option value="social">Social</option>
                <option value="infra">Infra</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium text-gray-300">
                Pricing *
              </label>
              <input
                id="price"
                type="text"
                required
                className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-2.5 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
                placeholder="e.g., $0.10/req, free tier, varies"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="network" className="text-sm font-medium text-gray-300">
                Network *
              </label>
              <input
                id="network"
                type="text"
                required
                className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-2.5 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
                placeholder="e.g., Base, Ethereum, Solana"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="contact" className="text-sm font-medium text-gray-300">
              Contact Email *
            </label>
            <input
              id="contact"
              type="email"
              required
              className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-2.5 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
              placeholder="contact@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-orange-500 px-6 py-4 font-bold text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Service'}
          </button>

          <p className="text-center text-sm text-gray-500">
            By submitting, you agree to our community guidelines. All submissions are subject to review.
          </p>
        </form>
      </div>
    </div>
  );
}
