"use client";

import { useEffect, useState } from "react";

export default function SuperAdminPage() {
  const [users, setUsers] = useState<any[]>([]);

  // সব user আনো
  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const changeRole = async (id: string, role: string) => {
    await fetch(`/api/users/${id}/role`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    setUsers(users.map(u => (u._id === id ? { ...u, role } : u)));
  };

  const deleteUser = async (id: string) => {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    setUsers(users.filter(u => u._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        👑 Super Admin Panel
      </h1>

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-700">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-3">{user.firstName && user.lastName
  ? `${user.firstName} ${user.lastName}`
  : user.name}
</td>
              <td className="p-3">{user.email}</td>
              <td
                className={`p-3 font-semibold ${
                  user.role === "super-admin"
                    ? "text-purple-600"
                    : user.role === "admin"
                    ? "text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {user.role}
              </td>
              <td className="p-3 flex gap-2">
                {/* সুপার-অ্যাডমিন এর জন্য কোন বাটন থাকবে না */}
                {user.role !== "super-admin" && (
                  <>
                    {user.role !== "admin" && (
                      <button
                        onClick={() => changeRole(user._id, "admin")}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Make Admin
                      </button>
                    )}
                    {user.role === "admin" && (
                      <button
                        onClick={() => changeRole(user._id, "user")}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Make User
                      </button>
                    )}
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
