import React, { useState } from 'react';
import { CalendarIcon } from 'lucide-react';

interface BookingSectionProps {
  preselectedPg?: string;
}

const BookingSection: React.FC<BookingSectionProps> = ({ preselectedPg }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pgProperty: preselectedPg || '',
    visitDate: '',
    visitTime: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);

  const pgOptions = ['xyz', 'Comfort PG - Central', 'Elite PG - Tech Park'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Your booking request has been sent. We'll contact you shortly!");
        if (!preselectedPg) {
          setFormData({
            name: '',
            email: '',
            phone: '',
            pgProperty: '',
            visitDate: '',
            visitTime: '',
            notes: '',
          });
        }
      } else {
        alert(result.message || 'Failed to send booking request. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending booking request:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-background py-16 w-full" id="book-visit">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Book a Visit</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-secondary-foreground">Schedule a visit to see our PG accommodations in person</p>
        </div>
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-card to-secondary border border-border rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-foreground font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-foreground font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-foreground font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="pgProperty" className="block text-foreground font-medium mb-2">Choose PG Property</label>
              <select
                id="pgProperty"
                name="pgProperty"
                value={formData.pgProperty}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                required
                disabled={loading}
              >
                <option value="">Select a PG</option>
                {pgOptions.map((pg, index) => (
                  <option key={index} value={pg}>{pg}</option>
                ))}
              </select>
            </div>

            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="visitDate" className="block text-foreground font-medium mb-2">Preferred Visit Date</label>
                <div className="relative">
                  <input
                    type="date"
                    id="visitDate"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                    required
                    disabled={loading}
                  />
                  <CalendarIcon size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div>
                <label htmlFor="visitTime" className="block text-foreground font-medium mb-2">Preferred Visit Time</label>
                <input
                  type="time"
                  id="visitTime"
                  name="visitTime"
                  value={formData.visitTime || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="notes" className="block text-foreground font-medium mb-2">Special Notes (Optional)</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                disabled={loading}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:bg-primary/90 hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Booking...' : 'Book My Visit'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
