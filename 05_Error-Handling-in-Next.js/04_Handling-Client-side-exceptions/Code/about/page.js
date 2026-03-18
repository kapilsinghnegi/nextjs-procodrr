"use client";

import { useState } from "react";

const About = () => {
  const [data, setData] = useState([1, 2]);
  return (
    <div>
      <h1>About Us</h1>
      <p>We are a company dedicated to providing quality services.</p>
      <button
        onClick={() => {
          setData(null);
        }}
      >
        Click me
      </button>
      {data.map(i => (
        <p key={i}>{i}</p>
      ))}
    </div>
  );
};

export default About;
