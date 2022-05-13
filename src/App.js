import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { MovieReviews, SubmitReview } from "./pages";

function App() {
  return (
    <div>
      <h1>APP</h1>
      <Routes>
        <Route path="/" element={<MovieReviews />} />
        <Route path="/submit" element={<SubmitReview />} />
      </Routes>
    </div>
  );
}

export default App;
