"use client";
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet for icon configuration

// Fix for default marker icon in React-Leaflet
// CORRECTED: Removed the extra space in the property name '_getIconUrl'
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


// --- Components (Defined internally for single-file requirement) ---

// 1. Navigation/Header Component
const Header = ({ currentPage, setCurrentPage, isLoggedIn, setIsLoggedIn }) => (
  <header className="sticky top-0 z-50 bg-white shadow-lg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('landing')}>
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.836 4.582a48.7 48.7 0 00-2.31 3.376c1.17 1.258 1.578 2.875 1.45 4.354l-1.396 1.396M12 4.048V20m4-4l-4 4-4-4m4-12v.048M6.594 18l-1.99 1.99L2 20m2-2h2.594m-2.594 0l1.99 1.99M16 18l1.99 1.99L22 20m-2-2h-2.594m2.594 0l-1.99 1.99"></path></svg>
        <span className="text-xl font-bold text-gray-800">Open Waste Exchange</span>
      </div>

      <nav className="hidden md:flex space-x-6">
        {isLoggedIn ? (
          <>
            <a href="#" onClick={() => setCurrentPage('dashboard')} className="text-gray-600 hover:text-green-600 font-medium transition duration-150">Dashboard</a>
            <a href="#" onClick={() => setCurrentPage('map')} className="text-gray-600 hover:text-green-600 font-medium transition duration-150">Map View</a>
            <a href="#" onClick={() => setCurrentPage('postings')} className="text-gray-600 hover:text-green-600 font-medium transition duration-150">Postings</a>
            <a href="#" onClick={() => setCurrentPage('badges')} className="text-gray-600 hover:text-green-600 font-medium transition duration-150">Badges</a>
            <button
              onClick={() => setCurrentPage('postitem')}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-green-600 hover:bg-green-700 transition duration-150 shadow-md"
            >
              Post Item
            </button>
            <button
              onClick={() => { setIsLoggedIn(false); setCurrentPage('landing'); }}
              className="text-red-500 hover:text-red-700 font-medium transition duration-150"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="#" onClick={() => setCurrentPage('signin')} className="text-gray-600 hover:text-green-600 font-medium transition duration-150">Sign In</a>
            <a href="#" onClick={() => setCurrentPage('signup')} className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition duration-150">Sign Up</a>
          </>
        )}
      </nav>
    </div>
  </header>
);

// 2. Landing Page Component
const LandingPage = ({ setCurrentPage }) => (
  <section className="bg-gray-50 py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        Recycle Smarter. <span className="text-green-600">Impact Faster.</span>
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        The community-driven digital marketplace connecting your recyclable waste (plastic, e-waste, clothes) directly to recyclers and NGOs.
      </p>
      <div className="space-x-4">
        <button
          onClick={() => setCurrentPage('signup')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
        >
          Join The Exchange
        </button>
        <button
          onClick={() => setCurrentPage('postings')} // Show current postings as a teaser
          className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
        >
          View Postings
        </button>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <FeatureCard title="Transparent Tracking" icon="🔍" description="See exactly where your waste goes and the environmental impact it makes." />
        <FeatureCard title="Community Rewards" icon="🏆" description="Earn badges, climb leaderboards, and get recognized for your contributions." />
        <FeatureCard title="Efficient Pickup" icon="🚚" description="NGOs and recyclers can quickly claim items, ensuring less waste ends up in landfills." />
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-xl shadow-xl transition duration-300 hover:shadow-2xl">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);


// 3. Auth Form Component (for Sign In and Sign Up)
const AuthForm = ({ type, setCurrentPage, setIsLoggedIn }) => {
  const isSignIn = type === 'signin';
  const title = isSignIn ? 'Welcome Back' : 'Join Open Waste Exchange';
  const buttonText = isSignIn ? 'Sign In' : 'Sign Up';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful login/signup
    console.log('Auth attempt submitted.');
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-900">{title}</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isSignIn && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name / Organization</label>
              <input type="text" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
          >
            {buttonText}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setCurrentPage(isSignIn ? 'signup' : 'signin')} className="font-medium text-green-600 hover:text-green-500">
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

// 4. Dashboard Component
const Dashboard = () => {
  const stats = [
    { label: 'Items Contributed', value: '42', icon: '📦' },
    { label: 'Plastic Saved (kg)', value: '150', icon: '♻️' },
    { label: 'E-Waste Picked Up', value: '7', icon: '📱' },
    { label: 'Leaderboard Rank', value: '#3', icon: '🥇' },
  ];

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Your Impact Dashboard 🚀</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 transition duration-300 hover:shadow-xl">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{stat.icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Activity Feed</h3>
      <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
        <ActivityItem action="Picked Up" item="15kg of cardboard boxes" entity="Local NGO GreenHands" time="5 hours ago" />
        <ActivityItem action="Posted" item="Old PC Monitor (E-Waste)" entity="You" time="1 day ago" />
        <ActivityItem action="Claimed" item="5 bags of mixed plastic" entity="Recycler BetaCorp" time="2 days ago" />
      </div>
    </section>
  );
};

const ActivityItem = ({ action, item, entity, time }) => (
  <div className="flex justify-between items-center py-2 border-b last:border-b-0">
    <p className="text-gray-700">
      <span className={`font-semibold ${action === 'Posted' ? 'text-blue-500' : 'text-green-600'}`}>{action}</span> {item} by <span className="font-medium text-gray-900">{entity}</span>
    </p>
    <span className="text-sm text-gray-500">{time}</span>
  </div>
);

// 5. Postings Page Component
const PostingsPage = ({ setCurrentPage }) => {
  const dummyPostings = [
    { id: 1, type: 'Plastic', title: '5 large bags of plastic bottles', location: 'City Hostel, North Area', user: 'Hostel Manager', status: 'Available', color: 'bg-blue-500', lat: 34.0522, lng: -118.2437 },
    { id: 2, type: 'E-Waste', title: 'Two old laptops and a printer', location: 'Office Tower, Downtown', user: 'Tech Corp', status: 'Claimed', color: 'bg-red-500', lat: 34.0535, lng: -118.2530 },
    { id: 3, type: 'Clothes', title: 'Box of gently used clothes', location: 'Individual Residence', user: 'Jane Doe', status: 'Available', color: 'bg-yellow-500', lat: 34.0410, lng: -118.2650 },
  ];

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Current Waste Postings 🌍</h2>
        <button
          onClick={() => setCurrentPage('postitem')}
          className="px-6 py-2 border border-transparent text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 shadow-md"
        >
          + Post New Item
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyPostings.map((post) => (
          <PostingCard key={post.id} post={post} />
        ))}
        {/* Placeholder for more cards */}
        <div className="bg-gray-200 h-60 rounded-xl flex items-center justify-center text-gray-600 font-medium">
          More Postings Loading...
        </div>
      </div>
    </section>
  );
};

const PostingCard = ({ post }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl">
    <div className={`p-4 text-white font-bold ${post.color}`}>
      {post.type}
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-4">{post.location}</p>
      <div className="flex justify-between items-center">
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${post.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {post.status}
        </span>
        <button className={`text-sm font-medium py-1 px-4 rounded-full transition duration-150 ${post.status === 'Available' ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`} disabled={post.status !== 'Available'}>
          {post.status === 'Available' ? 'Claim Item' : 'Already Claimed'}
        </button>
      </div>
    </div>
  </div>
);


// 6. Post Item Component
const PostItemPage = ({ setCurrentPage }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation, replace with actual Firestore/API call
    console.log('Item Posted Successfully! Awaiting claim.');
    setCurrentPage('postings');
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Contribute Recyclable Item ♻️</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="title" placeholder="e.g., 10kg of mixed plastics from office" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select id="category" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500">
            <option value="">Select Category</option>
            <option value="plastic">Plastic</option>
            <option value="ewaste">E-Waste</option>
            <option value="clothes">Clothes/Textiles</option>
            <option value="paper">Paper/Cardboard</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" rows="4" placeholder="Specific type, quantity, and condition of the items." required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"></textarea>
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Pickup Location</label>
          <input type="text" id="location" placeholder="Full address or GPS coordinates" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
        </div>

        <div>
          <label htmlFor="photos" className="block text-sm font-medium text-gray-700">Photos (Optional)</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-8m32-8l-3.172-3.172a4 4 0 00-5.656 0L16 26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
        >
          Post Item
        </button>
      </form>
    </div>
  );
};

// 7. Badges Page Component (Gamification)
const BadgesPage = () => {
  const earnedBadges = [
    { name: 'First Contribution', icon: '🌱', description: 'Posted your very first item.', earned: true },
    { name: 'Plastic Pioneer', icon: '💧', description: 'Contributed over 100kg of plastic.', earned: true },
    { name: 'E-Waste Warrior', icon: '🔋', description: 'Posted 5 items of e-waste.', earned: false },
    { name: 'Community Hero', icon: '🤝', description: 'Had 10 items claimed by different NGOs.', earned: false },
    { name: 'Eco-Champion', icon: '👑', description: 'Top contributor for the month.', earned: true },
  ];

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Your Gamification Stats 🏅</h2>

      <div className="bg-white p-6 rounded-xl shadow-xl mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Leaderboard Snapshot (Monthly)</h3>
        <ul className="space-y-2">
          <li className="flex justify-between items-center text-lg font-bold text-green-600"><span>#1 GreenHostel</span><span>1500 pts</span></li>
          <li className="flex justify-between items-center text-lg font-semibold"><span>#2 AlphaCorp</span><span>1200 pts</span></li>
          <li className="flex justify-between items-center text-lg font-medium bg-green-50 p-2 rounded-lg border border-green-200"><span>#3 You</span><span>1050 pts</span></li>
          <li className="flex justify-between items-center text-lg"><span>#4 RecycleNGO</span><span>980 pts</span></li>
        </ul>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Your Badges ({earnedBadges.filter(b => b.earned).length}/{earnedBadges.length} Earned)</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {earnedBadges.map((badge) => (
          <div key={badge.name} className={`p-4 rounded-xl shadow-lg text-center transition duration-300 ${badge.earned ? 'bg-green-50 border-2 border-green-500' : 'bg-gray-100 opacity-60'}`}>
            <span className="text-5xl block mb-2">{badge.icon}</span>
            <p className="font-bold text-gray-900">{badge.name}</p>
            <p className="text-sm text-gray-500 mt-1">{badge.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// 8. Map View Component
const MapView = () => {
  const center = [34.0522, -118.2437]; // Default to Los Angeles, CA
  
  // Using the same dummy data as the PostingsPage, but adding coordinates
  const mapPostings = [
    { id: 1, title: 'Plastic Bottles', status: 'Available', lat: 34.07, lng: -118.26 },
    { id: 2, title: 'Old Laptops', status: 'Claimed', lat: 34.05, lng: -118.24 },
    { id: 3, title: 'Used Clothes', status: 'Available', lat: 34.03, lng: -118.28 },
  ];

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Waste Pickup Map 🗺️</h2>
      <div className="rounded-xl shadow-2xl overflow-hidden" style={{ height: '600px' }}>
        {/* The map container must have a fixed height */}
        <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mapPostings.map((post) => (
            <Marker 
              key={post.id} 
              position={[post.lat, post.lng]}
            >
              <Popup>
                <div className="font-bold">{post.title}</div>
                <div className={`text-sm ${post.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                  Status: {post.status}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

// --- Main Application Component ---
export default function OpenWasteExchangeSPA() {
  // State for navigation (simulates a router)
  const [currentPage, setCurrentPage] = useState('landing');
  // State for authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Conditional rendering logic
  let PageContent;

  if (currentPage === 'landing') {
    PageContent = <LandingPage setCurrentPage={setCurrentPage} />;
  } else if (currentPage === 'signin') {
    PageContent = <AuthForm type="signin" setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} />;
  } else if (currentPage === 'signup') {
    PageContent = <AuthForm type="signup" setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} />;
  } else if (!isLoggedIn) {
    // Redirect to sign in if trying to access protected pages without login
    setCurrentPage('signin');
    PageContent = <AuthForm type="signin" setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} />;
  } else if (currentPage === 'dashboard') {
    PageContent = <Dashboard />;
  } else if (currentPage === 'map') {
    PageContent = <MapView />;
  } else if (currentPage === 'postings') {
    PageContent = <PostingsPage setCurrentPage={setCurrentPage} />;
  } else if (currentPage === 'postitem') {
    PageContent = <PostItemPage setCurrentPage={setCurrentPage} />;
  } else if (currentPage === 'badges') {
    PageContent = <BadgesPage />;
  } else {
    // Default to a 404/Not Found or back to dashboard
    PageContent = <div className="p-10 text-center text-xl text-red-500">404 - Page Not Found.</div>;
  }

  // Hide header/footer for the full-screen sign-in/sign-up pages
  const showChrome = currentPage !== 'signin' && currentPage !== 'signup';

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      
      {showChrome && (
        <Header 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn} 
        />
      )}

      <main className={!showChrome ? "m-0 p-0" : "flex-grow"}>
        {PageContent}
      </main>

      {showChrome && (
        <footer className="bg-gray-800 text-white py-6 mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; {new Date().getFullYear()} Open Waste Exchange. A community-driven initiative.</p>
          </div>
        </footer>
      )}
    </div>
  );
}
