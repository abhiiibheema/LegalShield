import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  AlertTriangle,
  MapPin,
  User,
  Scale,
  Edit,
  Trash2,
  Bell
} from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'hearing' | 'meeting' | 'deadline';
  date: string;
  time: string;
  duration: number; // in minutes
  court?: string;
  clientName?: string;
  caseNumber?: string;
  location?: string;
  description?: string;
  reminder?: boolean;
}

const CalendarManagement: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Property Dispute Hearing',
      type: 'hearing',
      date: '2024-02-15',
      time: '10:30',
      duration: 120,
      court: 'Delhi High Court',
      clientName: 'Rajesh Kumar',
      caseNumber: 'CWP-2024-1234',
      location: 'Court Room 15, Delhi High Court',
      description: 'First hearing for property dispute case',
      reminder: true
    },
    {
      id: '2',
      title: 'Client Meeting - Priya Sharma',
      type: 'meeting',
      date: '2024-02-16',
      time: '14:00',
      duration: 60,
      clientName: 'Priya Sharma',
      location: 'Office',
      description: 'Discuss case strategy and document review',
      reminder: true
    },
    {
      id: '3',
      title: 'Document Submission Deadline',
      type: 'deadline',
      date: '2024-02-20',
      time: '17:00',
      duration: 0,
      caseNumber: 'CC-2024-5678',
      description: 'Submit additional evidence documents',
      reminder: true
    }
  ]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'hearing': return 'bg-red-100 text-red-800 border-red-200';
      case 'meeting': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'deadline': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'hearing': return Scale;
      case 'meeting': return User;
      case 'deadline': return Clock;
      default: return CalendarIcon;
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-32 bg-gray-50 border border-gray-200"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

      days.push(
        <div
          key={day}
          className={`h-32 border border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
            isToday ? 'bg-indian-cream border-indian-gold' : ''
          } ${isSelected ? 'bg-indian-gold/20 border-indian-gold' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-indian-maroon' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => {
              const IconComponent = getEventTypeIcon(event.type);
              return (
                <div
                  key={event.id}
                  className={`text-xs p-1 rounded border ${getEventTypeColor(event.type)} truncate`}
                >
                  <div className="flex items-center">
                    <IconComponent className="h-3 w-3 mr-1" />
                    <span className="truncate">{event.title}</span>
                  </div>
                </div>
              );
            })}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const getTodaysEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return events.filter(event => event.date === today);
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= nextWeek;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getConflicts = () => {
    const conflicts = [];
    const eventsByDate = events.reduce((acc, event) => {
      if (!acc[event.date]) acc[event.date] = [];
      acc[event.date].push(event);
      return acc;
    }, {} as Record<string, CalendarEvent[]>);

    Object.entries(eventsByDate).forEach(([date, dayEvents]) => {
      if (dayEvents.length > 1) {
        // Check for time conflicts
        for (let i = 0; i < dayEvents.length; i++) {
          for (let j = i + 1; j < dayEvents.length; j++) {
            const event1 = dayEvents[i];
            const event2 = dayEvents[j];
            
            const time1 = new Date(`${event1.date}T${event1.time}`);
            const time2 = new Date(`${event2.date}T${event2.time}`);
            const end1 = new Date(time1.getTime() + event1.duration * 60000);
            const end2 = new Date(time2.getTime() + event2.duration * 60000);

            if ((time1 < end2 && time2 < end1) && event1.duration > 0 && event2.duration > 0) {
              conflicts.push({ date, events: [event1, event2] });
            }
          }
        }
      }
    });

    return conflicts;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-indian-maroon mb-2">
              Calendar Management
            </h1>
            <p className="text-gray-600">
              Manage hearings, meetings, and deadlines efficiently
            </p>
          </div>
          <button
            onClick={() => setShowAddEvent(true)}
            className="bg-indian-maroon hover:bg-indian-navy text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Calendar */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg border border-indian-gold/20 overflow-hidden">
            {/* Calendar Header */}
            <div className="bg-gradient-to-r from-indian-maroon to-indian-navy p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <h2 className="text-2xl font-serif font-bold">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="bg-white/20 text-white border border-white/30 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All Events</option>
                    <option value="hearing">Hearings</option>
                    <option value="meeting">Meetings</option>
                    <option value="deadline">Deadlines</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 bg-gray-50">
              {daysOfWeek.map((day) => (
                <div key={day} className="p-4 text-center font-medium text-gray-700 border-b border-gray-200">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {renderCalendarGrid()}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Events */}
          <div className="bg-white rounded-xl shadow-lg border border-indian-gold/20 p-6">
            <h3 className="text-lg font-serif font-semibold text-indian-maroon mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Today's Events
            </h3>
            <div className="space-y-3">
              {getTodaysEvents().map((event) => {
                const IconComponent = getEventTypeIcon(event.type);
                return (
                  <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-lg ${getEventTypeColor(event.type)}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-600">
                        {event.time} {event.duration > 0 && `(${event.duration}m)`}
                      </p>
                      {event.location && (
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.location}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
              {getTodaysEvents().length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">
                  No events scheduled for today
                </p>
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-lg border border-indian-gold/20 p-6">
            <h3 className="text-lg font-serif font-semibold text-indian-maroon mb-4 flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Upcoming Events
            </h3>
            <div className="space-y-3">
              {getUpcomingEvents().slice(0, 5).map((event) => {
                const IconComponent = getEventTypeIcon(event.type);
                return (
                  <div key={event.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`p-2 rounded-lg ${getEventTypeColor(event.type)}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-600">
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </p>
                      {event.clientName && (
                        <p className="text-xs text-gray-500">
                          Client: {event.clientName}
                        </p>
                      )}
                    </div>
                    {event.reminder && (
                      <Bell className="h-4 w-4 text-indian-gold" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Conflicts Alert */}
          {getConflicts().length > 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-red-200 p-6">
              <h3 className="text-lg font-serif font-semibold text-red-600 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Schedule Conflicts
              </h3>
              <div className="space-y-3">
                {getConflicts().map((conflict, index) => (
                  <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-sm font-medium text-red-800">
                      {new Date(conflict.date).toLocaleDateString()}
                    </p>
                    <div className="mt-2 space-y-1">
                      {conflict.events.map((event) => (
                        <p key={event.id} className="text-xs text-red-700">
                          • {event.title} at {event.time}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <AddEventModal
          onClose={() => setShowAddEvent(false)}
          onAddEvent={(event) => {
            setEvents([...events, { ...event, id: Date.now().toString() }]);
            setShowAddEvent(false);
          }}
        />
      )}
    </div>
  );
};

// Add Event Modal Component
const AddEventModal: React.FC<{
  onClose: () => void;
  onAddEvent: (event: Omit<CalendarEvent, 'id'>) => void;
}> = ({ onClose, onAddEvent }) => {
  const [eventData, setEventData] = useState({
    title: '',
    type: 'hearing' as 'hearing' | 'meeting' | 'deadline',
    date: '',
    time: '',
    duration: 60,
    court: '',
    clientName: '',
    caseNumber: '',
    location: '',
    description: '',
    reminder: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEvent(eventData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-indian-maroon to-indian-navy p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold">Add New Event</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                value={eventData.title}
                onChange={(e) => setEventData({...eventData, title: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                placeholder="Enter event title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Type *
              </label>
              <select
                value={eventData.type}
                onChange={(e) => setEventData({...eventData, type: e.target.value as any})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
              >
                <option value="hearing">Court Hearing</option>
                <option value="meeting">Client Meeting</option>
                <option value="deadline">Deadline</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                value={eventData.date}
                onChange={(e) => setEventData({...eventData, date: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time *
              </label>
              <input
                type="time"
                value={eventData.time}
                onChange={(e) => setEventData({...eventData, time: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={eventData.duration}
                onChange={(e) => setEventData({...eventData, duration: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name
              </label>
              <input
                type="text"
                value={eventData.clientName}
                onChange={(e) => setEventData({...eventData, clientName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                placeholder="Enter client name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Case Number
              </label>
              <input
                type="text"
                value={eventData.caseNumber}
                onChange={(e) => setEventData({...eventData, caseNumber: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                placeholder="Enter case number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Court/Location
              </label>
              <input
                type="text"
                value={eventData.location}
                onChange={(e) => setEventData({...eventData, location: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                placeholder="Enter location"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={eventData.description}
              onChange={(e) => setEventData({...eventData, description: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
              placeholder="Enter event description"
              rows={3}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="reminder"
              checked={eventData.reminder}
              onChange={(e) => setEventData({...eventData, reminder: e.target.checked})}
              className="h-4 w-4 text-indian-maroon focus:ring-indian-gold border-gray-300 rounded"
            />
            <label htmlFor="reminder" className="ml-2 text-sm text-gray-700">
              Set reminder for this event
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indian-maroon hover:bg-indian-navy text-white px-6 py-2 rounded-lg transition-colors"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CalendarManagement;