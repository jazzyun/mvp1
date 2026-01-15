'use client';

import Link from 'next/link';
import { useState } from 'react';

const events = [
  {
    id: '1',
    title: 'Creator Unplug: LA Edition',
    description: 'An intimate evening of connection, conversation, and community. No phones, no content - just real conversations with fellow creators.',
    date: 'Feb 15, 2025',
    time: '6:00 PM - 9:00 PM',
    city: 'Los Angeles',
    venue: 'The Gathering House',
    capacity: 40,
    attending: 28,
    status: 'upcoming',
    rsvpStatus: null,
    image: '🌴',
  },
  {
    id: '2',
    title: 'Rate Negotiation Workshop',
    description: 'Learn proven strategies to negotiate higher rates with brands. Live role-playing exercises and Q&A with top earners.',
    date: 'Feb 22, 2025',
    time: '2:00 PM - 4:00 PM',
    city: 'Virtual',
    venue: 'Zoom',
    capacity: 100,
    attending: 67,
    status: 'upcoming',
    rsvpStatus: 'confirmed',
    image: '💰',
  },
  {
    id: '3',
    title: 'Creator Unplug: NYC Edition',
    description: 'Our signature no-phones dinner returns to NYC. Deep conversations, great food, and meaningful connections.',
    date: 'Mar 8, 2025',
    time: '7:00 PM - 10:00 PM',
    city: 'New York',
    venue: 'TBD',
    capacity: 30,
    attending: 12,
    status: 'upcoming',
    rsvpStatus: null,
    image: '🗽',
  },
  {
    id: '4',
    title: 'Creator Unplug: Austin',
    description: 'Kicked off 2025 with our Austin community. Amazing conversations about burnout, boundaries, and building sustainable careers.',
    date: 'Jan 20, 2025',
    time: '6:00 PM - 9:00 PM',
    city: 'Austin',
    venue: 'The Good Company',
    capacity: 35,
    attending: 35,
    status: 'past',
    rsvpStatus: 'attended',
    image: '🤠',
  },
];

export default function EventsPage() {
  const [eventList, setEventList] = useState(events);

  const handleRSVP = (eventId: string) => {
    setEventList(eventList.map(event => {
      if (event.id === eventId && !event.rsvpStatus && event.status === 'upcoming') {
        return {
          ...event,
          rsvpStatus: event.attending < event.capacity ? 'confirmed' : 'waitlist',
          attending: event.attending + 1,
        };
      }
      return event;
    }));
  };

  const upcomingEvents = eventList.filter(e => e.status === 'upcoming');
  const pastEvents = eventList.filter(e => e.status === 'past');

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/community" className="text-gray-600 hover:text-gray-900">
              ← Back
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Events</h1>
              <p className="text-sm text-gray-500">Creator meetups & workshops</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Upcoming Events */}
        <div>
          <h2 className="font-semibold text-gray-900 mb-3">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Event Header */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{event.image}</span>
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-purple-200">{event.city}</p>
                      </div>
                    </div>
                    {event.rsvpStatus && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.rsvpStatus === 'confirmed'
                          ? 'bg-green-500 text-white'
                          : 'bg-amber-500 text-white'
                      }`}>
                        {event.rsvpStatus === 'confirmed' ? 'Going' : 'Waitlist'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-5">
                  <p className="text-sm text-gray-600 mb-4">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">📅</span>
                      <span className="text-gray-700">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">🕐</span>
                      <span className="text-gray-700">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">📍</span>
                      <span className="text-gray-700">{event.venue}</span>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500">Spots filled</span>
                      <span className="text-gray-700 font-medium">{event.attending}/{event.capacity}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          event.attending >= event.capacity ? 'bg-red-500' : 'bg-purple-500'
                        }`}
                        style={{ width: `${(event.attending / event.capacity) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* RSVP Button */}
                  <button
                    onClick={() => handleRSVP(event.id)}
                    disabled={!!event.rsvpStatus}
                    className={`w-full py-3 rounded-xl font-medium transition-colors ${
                      event.rsvpStatus
                        ? 'bg-gray-100 text-gray-500 cursor-default'
                        : event.attending >= event.capacity
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {event.rsvpStatus === 'confirmed'
                      ? '✓ You\'re going!'
                      : event.rsvpStatus === 'waitlist'
                      ? 'On waitlist'
                      : event.attending >= event.capacity
                      ? 'Join Waitlist'
                      : 'RSVP Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div>
          <h2 className="font-semibold text-gray-900 mb-3">Past Events</h2>
          <div className="space-y-3">
            {pastEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
                    {event.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.date} · {event.city}</p>
                  </div>
                  {event.rsvpStatus === 'attended' && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Attended
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
