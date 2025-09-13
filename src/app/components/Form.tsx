"use client";

import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  availableData: string;
  phone: string;
  message: string;
}

export default function Form() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    availableData: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert(data.message);
      setFormData({ name: "", email: "", availableData: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 space-y-6 border-4 border-blue-300 rounded-lg bg-white">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="flex-1 p-3 border rounded outline-none focus:border-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="flex-1 p-3 border rounded outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <select
          name="availableData"
          value={formData.availableData}
          onChange={handleChange}
          className="flex-1 p-3 border rounded outline-none focus:border-blue-500"
        >
          <option value="">Select Data</option>
          <option value="data-1">Data A</option>
          <option value="data-2">Data B</option>
          <option value="data-3">Data C</option>
        </select>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="flex-1 p-3 border rounded outline-none focus:border-blue-500"
        />
      </div>

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your message"
        className="w-full p-3 border rounded outline-none focus:border-blue-500"
        rows={5}
      ></textarea>

      <button
        type="submit"
        className={`w-full py-3 text-white rounded bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
