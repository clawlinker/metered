'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export default function SubmitPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    protocol: 'x402',
    category: 'data',
    price: '',
    network: '',
    contact: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
          <Button asChild className="bg-white text-gray-900 hover:bg-gray-100">
            <a href="/">Back to Home</a>
          </Button>
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
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Pawr Link"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="url" className="text-sm font-medium text-gray-300">
                Website URL *
              </label>
              <Input
                id="url"
                type="url"
                required
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-300">
              Description *
            </label>
            <Textarea
              id="description"
              required
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
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
                className="w-full rounded-lg bg-black/30 border border-input px-3 py-2 text-white focus:border-ring focus:ring-1 focus:ring-ring/50 outline-none transition-colors"
                value={formData.protocol}
                onChange={(e) => handleInputChange('protocol', e.target.value)}
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
                className="w-full rounded-lg bg-black/30 border border-input px-3 py-2 text-white focus:border-ring focus:ring-1 focus:ring-ring/50 outline-none transition-colors"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
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
              <Input
                id="price"
                type="text"
                required
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="e.g., $0.10/req, free tier, varies"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="network" className="text-sm font-medium text-gray-300">
                Network *
              </label>
              <Input
                id="network"
                type="text"
                required
                value={formData.network}
                onChange={(e) => handleInputChange('network', e.target.value)}
                placeholder="e.g., Base, Ethereum, Solana"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="contact" className="text-sm font-medium text-gray-300">
              Contact Email *
            </label>
            <Input
              id="contact"
              type="email"
              required
              value={formData.contact}
              onChange={(e) => handleInputChange('contact', e.target.value)}
              placeholder="contact@example.com"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Service'}
          </Button>

          <p className="text-center text-sm text-gray-500">
            By submitting, you agree to our community guidelines. All submissions are subject to review.
          </p>
        </form>
      </div>
    </div>
  );
}
