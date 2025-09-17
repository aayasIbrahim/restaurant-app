"use client";

import { useEffect, useState } from "react";
import UserLoadingSkeleton from "../components/UI/loading/UserLoadingSkeleton";

// --- Type Definition ---
interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  role: "super-admin" | "admin" | "user";
}

export default function SuperAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/users")
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  const changeRole = async (id: string, role: User["role"]) => {
    await fetch(`/api/users/${id}/role`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    setUsers(users.map((u) => (u._id === id ? { ...u, role } : u)));
  };

  const deleteUser = async (id: string) => {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    setUsers(users.filter((u) => u._id !== id));
  };

  return (
    <section className="min-h-screen bg-gray-900 text-gray-100">
      <div className="p-6 container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Admin Panel
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg shadow-lg divide-y divide-gray-700">
            <thead className="bg-gray-800 text-left text-gray-300">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {loading ? (
                <UserLoadingSkeleton rows={5} />
              ) : (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-800 transition-colors duration-200"
                  >
                    <td className="p-3 break-words">
                      {user.firstName && user.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : user.name}
                    </td>
                    <td className="p-3 break-words">{user.email}</td>
                    <td
                      className={`p-3 font-semibold ${
                        user.role === "super-admin"
                          ? "text-purple-400"
                          : user.role === "admin"
                          ? "text-blue-400"
                          : "text-gray-300"
                      }`}
                    >
                      {user.role}
                    </td>
                    <td className="p-3 flex flex-wrap justify-center gap-2">
                      {user.role !== "super-admin" && (
                        <>
                          {user.role !== "admin" && (
                            <button
                              onClick={() => changeRole(user._id, "admin")}
                              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                              Make Admin
                            </button>
                          )}
                          {user.role === "admin" && (
                            <button
                              onClick={() => changeRole(user._id, "user")}
                              className="px-3 py-1 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-600 transition-colors"
                            >
                              Make User
                            </button>
                          )}
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {!loading && users.length === 0 && (
            <p className="text-center text-gray-400 mt-6">No users found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
