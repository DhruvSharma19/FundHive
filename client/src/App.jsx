import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile, UpdateCampaign } from './pages';

const App = () => {

  const [q,setQ]=useState("");

  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar q={q} setQ={setQ} />
        <Routes>
          <Route path="/" element={<Home q={q} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createCampaign" element={<CreateCampaign />} />
          <Route path="/campaignUpdate/:id" element={<UpdateCampaign />} />
          <Route path="/campaignDetails/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  
  )
}

export default App
