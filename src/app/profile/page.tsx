"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, update } = useSession();

  const [nameForm, setNameForm] = useState({ firstName: "", lastName: "" });
  const [emailForm, setEmailForm] = useState({ email: "" });
  const [mobileForm, setMobileForm] = useState({ mobile: "" });
  const [passwordForm, setPasswordForm] = useState({ oldPassword: "", newPassword: "" });

  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session?.user) {
      setNameForm({ firstName: session.user.firstName || "", lastName: session.user.lastName || "" });
      setEmailForm({ email: session.user.email || "" });
      setMobileForm({ mobile: session.user.mobile || "" });
    }
  }, []);

  const updateProfile = async (body: any, section: string) => {
    setLoading(section);
    setMessage("");

    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setMessage(`${section} updated successfully ✅`);
      if (section === "Name") setNameForm(body);
      if (section === "Email") setEmailForm(body);
      if (section === "Mobile") setMobileForm(body);
      if (section === "Password") setPasswordForm({ oldPassword: "", newPassword: "" });

      update();
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 space-y-10">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">My Profile</h1>

      {message && (
        <div className={`px-4 py-3 rounded-lg text-center font-medium ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message}
        </div>
      )}

      {/* --- Name Card --- */}
      <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Name</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={nameForm.firstName}
            onChange={(e) => setNameForm({ ...nameForm, firstName: e.target.value })}
            placeholder="First Name"
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
          <input
            type="text"
            value={nameForm.lastName}
            onChange={(e) => setNameForm({ ...nameForm, lastName: e.target.value })}
            placeholder="Last Name"
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
        </div>
        <button
          onClick={() => updateProfile(nameForm, "Name")}
          disabled={loading === "Name"}
          className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-lg shadow hover:from-pink-600 hover:to-pink-700 transition disabled:opacity-50"
        >
          {loading === "Name" ? "Saving..." : "Save"}
        </button>
      </div>

      {/* --- Email Card --- */}
      <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Email</h2>
        <input
          type="email"
          value={emailForm.email}
          onChange={(e) => setEmailForm({ email: e.target.value })}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
        <button
          onClick={() => updateProfile(emailForm, "Email")}
          disabled={loading === "Email"}
          className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-lg shadow hover:from-pink-600 hover:to-pink-700 transition disabled:opacity-50"
        >
          {loading === "Email" ? "Saving..." : "Save"}
        </button>
      </div>

      {/* --- Mobile Card --- */}
      <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Mobile</h2>
        <input
          type="text"
          value={mobileForm.mobile}
          onChange={(e) => setMobileForm({ mobile: e.target.value })}
          placeholder="Mobile"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
        <button
          onClick={() => updateProfile(mobileForm, "Mobile")}
          disabled={loading === "Mobile"}
          className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-lg shadow hover:from-pink-600 hover:to-pink-700 transition disabled:opacity-50"
        >
          {loading === "Mobile" ? "Saving..." : "Save"}
        </button>
      </div>

      {/* --- Password Card --- */}
      <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Password</h2>
        <input
          type="password"
          value={passwordForm.oldPassword}
          onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
          placeholder="Old Password"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
        <input
          type="password"
          value={passwordForm.newPassword}
          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
          placeholder="New Password"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
        <button
          onClick={() => updateProfile(passwordForm, "Password")}
          disabled={loading === "Password"}
          className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-lg shadow hover:from-pink-600 hover:to-pink-700 transition disabled:opacity-50"
        >
          {loading === "Password" ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
