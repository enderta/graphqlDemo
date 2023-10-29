import React from "react";
import { Routes, Route } from "react-router";
import Cities from "./Cities";
import AddCity from "./AddCity";
import EditCity from "./EditCity";

function Pages() {
  return (
    <div >
      <Routes>
        <Route path="/*" element={<Cities />} />
        <Route path="/addcity" element={<AddCity />} />
        <Route path="/editcity/:id" element={<EditCity />} />
      </Routes>
    </div>
  );
}

export default Pages;
