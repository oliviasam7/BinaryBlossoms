"use client";
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// --- Header Component ---
const Header = ({ currentPage, setCurrentPage, isLoggedIn, setIsLoggedIn }) => (
  <header className="sticky top-0 z-50 bg-white shadow-lg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('landing')}>
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.836 4.582a48.7 48.7 0 00-2.31 3.376c1.17 1.258 1.578 2.875 1.45 4.354l-1.396 1.396M12 4.048V20m4-4l-4 4-4-4m4-12v.048M6.594 18l-1.99 1.99L2 20m2-2h2.594m-2.594 0l1.99 1.99M16 18l1.99 1.99L22 20m-2-2h-2.594m2.594 0l-1.99 1.99"></path></svg>
        <span className="text-xl font-bold text-gray-800">Open Waste Exchange</span>
      </div>
      <nav className="hidden md:flex space-x-6">
        {isLoggedIn ? (
          <>
            <a href="#" onClick={() => setCurrentPage('dashboard')} className="text-gray-600 hover:text-green-600 font-medium">Dashboard</a>
            <a href="#" onClick={() => setCurrentPage('map')} className="text-gray-600 hover:text-green-600 font-medium">Map View</a>
            <a href="#" onClick={() => setCurrentPage('postings')} className="text-gray-600 hover:text-green-600 font-medium">Postings</a>
            <a href="#" onClick={() => setCurrentPage('badges')} className="text-gray-600 hover:text-green-600 font-medium">Badges</a>
            <button onClick={() => setCurrentPage('postitem')} className="px-4 py-2 text-white bg-green-600 rounded-full hover:bg-green-700">Post Item</button>
            <button onClick={() => { setIsLoggedIn(false); setCurrentPage('landing'); }} className="text-red-500 hover:text-red-700 font-medium">Logout</button>
          </>
        ) : (
          <>
            <a href="#" onClick={() => setCurrentPage('signin')} className="text-gray-600 hover:text-green-600 font-medium">Sign In</a>
            <a href="#" onClick={() => setCurrentPage('signup')} className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium">Sign Up</a>
          </>
        )}
      </nav>
    </div>
  </header>
);

// --- Landing Page ---
const LandingPage = ({ setCurrentPage }) => (
  <section className="bg-gray-50 py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Recycle Smarter. <span className="text-green-600">Impact Faster.</span></h1>
      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">The community-driven digital marketplace connecting your recyclable waste directly to recyclers and NGOs.</p>
      <div className="space-x-4">
        <button onClick={() => setCurrentPage('signup')} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg">Join The Exchange</button>
        <button onClick={() => setCurrentPage('postings')} className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-8 rounded-full shadow-lg">View Postings</button>
      </div>
    </div>
  </section>
);

// --- Auth Form ---
const AuthForm = ({ type, setCurrentPage, setIsLoggedIn }) => {
  const isSignIn = type === 'signin';
  const title = isSignIn ? 'Welcome Back' : 'Join Open Waste Exchange';

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl relative">
        <button onClick={() => setCurrentPage('landing')} className="absolute top-4 left-4 text-gray-500 hover:text-gray-700">
          ←
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-900">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {!isSignIn && <input type="text" id="name" placeholder="Name / Organization" className="w-full px-3 py-2 border rounded-md" required />}
          <input type="email" id="email" placeholder="Email" className="w-full px-3 py-2 border rounded-md" required />
          <input type="password" id="password" placeholder="Password" className="w-full px-3 py-2 border rounded-md" required />
          <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-md">{isSignIn ? 'Sign In' : 'Sign Up'}</button>
        </form>
      </div>
    </div>
  );
};

// --- Dashboard ---
const Dashboard = () => {
  const stats = [
    { label: 'Items Contributed', value: '42', icon: '📦' },
    { label: 'Plastic Saved (kg)', value: '150', icon: '♻️' },
    { label: 'E-Waste Picked Up', value: '7', icon: '📱' },
    { label: 'Leaderboard Rank', value: '#3', icon: '🥇' },
  ];
  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Your Impact Dashboard 🚀</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{stat.icon}</span>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- Posting Card ---
const PostingCard = ({ post }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <div className={`p-4 text-white font-bold ${post.color || 'bg-gray-500'}`}>
      {post.type}
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-4">{post.location}</p>
      <div className="flex justify-between items-center">
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${post.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{post.status}</span>
      </div>
    </div>
  </div>
);

// --- Postings Page ---
const PostingsPage = ({ setCurrentPage }) => {
  const [postings, setPostings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/postings');
        setPostings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPostings();
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Current Waste Postings 🌍</h2>
        <button onClick={() => setCurrentPage('postitem')} className="px-6 py-2 text-white bg-green-600 rounded-full hover:bg-green-700">+ Post New Item</button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading postings...</p>
      ) : postings.length === 0 ? (
        <p className="text-gray-500">No postings yet. Be the first to post!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {postings.map((post) => <PostingCard key={post._id} post={post} />)}
        </div>
      )}
    </section>
  );
};

// --- Post Item Page ---
const PostItemPage = ({ setCurrentPage }) => {
  const [form, setForm] = useState({ title: '', category: '', description: '', location: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/postings', form);
      setCurrentPage('postings');
    } catch (err) {
      console.error(err);
      alert('Failed to post item.');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Contribute Recyclable Item ♻️</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl space-y-6">
        <input type="text" id="title" placeholder="Title" value={form.title} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
        <select id="category" value={form.category} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg">
          <option value="">Select Category</option>
          <option value="plastic">Plastic</option>
          <option value="ewaste">E-Waste</option>
          <option value="clothes">Clothes/Textiles</option>
          <option value="paper">Paper/Cardboard</option>
        </select>
        <textarea id="description" rows="4" placeholder="Description" value={form.description} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg"></textarea>
        <input type="text" id="location" placeholder="Pickup Location" value={form.location} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
        <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg">Post Item</button>
      </form>
    </div>
  );
};

// --- Map View ---
const MapView = () => {
  const [postings, setPostings] = useState([]);
  useEffect(() => {
    const fetchPostings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/postings');
        setPostings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPostings();
  }, []);

  const center = [34.0522, -118.2437];

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Waste Pickup Map 🗺️</h2>
      <div className="rounded-xl shadow-2xl overflow-hidden" style={{ height: '600px' }}>
        <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
          {postings.map((p) => (
            <Marker key={p._id} position={[p.lat || 34.05, p.lng || -118.24]}>
              <Popup>
                <div className="font-bold">{p.title}</div>
                <div className={`text-sm ${p.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>Status: {p.status}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

// --- Main SPA ---
export default function OpenWasteExchangeSPA() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let PageContent;
  if (currentPage === 'landing') PageContent = <LandingPage setCurrentPage={setCurrentPage} />;
  else if (currentPage === 'signin') PageContent = <AuthForm type="signin" setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} />;
  else if (currentPage === 'signup') PageContent = <AuthForm type="signup" setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} />;
  else if (!isLoggedIn) { setCurrentPage('signin'); PageContent = <AuthForm type="signin" setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} />; }
  else if (currentPage === 'dashboard') PageContent = <Dashboard />;
  else if (currentPage === 'map') PageContent = <MapView />;
  else if (currentPage === 'postings') PageContent = <PostingsPage setCurrentPage={setCurrentPage} />;
  else if (currentPage === 'postitem') PageContent = <PostItemPage setCurrentPage={setCurrentPage} />;

  const showChrome = currentPage !== 'signin' && currentPage !== 'signup';

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {showChrome && <Header currentPage={currentPage} setCurrentPage={setCurrentPage} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      <main>{PageContent}</main>
      {showChrome && <footer className="bg-gray-800 text-white py-6 text-center">&copy; {new Date().getFullYear()} Open Waste Exchange</footer>}
    </div>
  );
}
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");