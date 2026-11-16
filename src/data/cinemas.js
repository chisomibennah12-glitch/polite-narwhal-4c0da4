export const cinemaRows = [
  {
    id: 'pvr-icon',
    name: 'PVR ICON: Palladium, Lower Parel',
    badge: 'LUXE',
    location: 'Phoenix Palladium, High Street Phoenix, 2.4 km away',
    amenities: ['M-Ticket', 'Food & Beverage', 'Dolby Atmos', 'Parking'],
    showtimes: [
      { id: 'pvr-1', time: '10:45 AM', status: 'Available', seats: 28, screen: 'Screen 3 - Dolby Atmos', price: 449 },
      { id: 'pvr-2', time: '02:15 PM', status: 'Filling Fast', seats: 12, screen: 'Screen 5 - IMAX', price: 559 },
      { id: 'pvr-3', time: '06:30 PM', status: 'Almost Full', seats: 5, screen: 'Screen 2 - LUXE', price: 699 },
      { id: 'pvr-4', time: '09:50 PM', status: 'Available', seats: 20, screen: 'Screen 1 - PVR ICON', price: 629 },
    ],
  },
  {
    id: 'inox-megaplex',
    name: 'INOX Megaplex Inorbit',
    badge: 'IMAX',
    location: 'Inorbit Mall, Vashi, 4.1 km away',
    amenities: ['M-Ticket', 'Parking', 'MX4D'],
    showtimes: [
      { id: 'inox-1', time: '11:30 AM', status: 'Available', seats: 18, screen: 'Screen 7 - 4DX', price: 399 },
      { id: 'inox-2', time: '03:00 PM', status: 'Filling Fast', seats: 9, screen: 'Screen 6 - IMAX', price: 489 },
      { id: 'inox-3', time: '07:15 PM', status: 'Available', seats: 24, screen: 'Screen 4 - Dolby Atmos', price: 529 },
    ],
  },
];

export const dateTabs = [
  { label: 'Today', value: 'today' },
  { label: 'Tomorrow', value: 'tomorrow' },
  { label: '+2 days', value: '+2' },
];

export const generateDateTabs = () => {
  const today = new Date();
  return [
    { label: 'Today', value: 'today' },
    { label: new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date(today.getTime() + 86400000)), value: 'tomorrow' },
    { label: new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date(today.getTime() + 172800000)), value: '+2' },
  ];
};
