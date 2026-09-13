import { useEffect, useState } from "react";
import api from "../api/axios";
import ViewEnquiry from "./ViewEnquiry";

export type Enquiry = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  userType: string;
  interest: string;
  message: string;
  status: string;
  createdAt: string;
};

export default function Admin() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState(true);

  // Get all enquiries
  const loadEnquiries = async () => {
    try {
      setLoading(true);

      const response = await api.get("/enquiries");

      setEnquiries(response.data.enquiries);
    } catch (error) {
      console.error("Failed to fetch enquiries:", error);
      alert("Failed to load enquiries.");
    } finally {
      setLoading(false);
    }
  };

  // Load enquiries when page loads and check for admin token
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      window.location.href = "/admin-login";
      return;
    }

    loadEnquiries();
  }, []);

  // Search + filter
  const filteredEnquiries = enquiries.filter((enquiry) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      enquiry.name.toLowerCase().includes(searchText) ||
      enquiry.email.toLowerCase().includes(searchText) ||
      enquiry.phone.includes(search);

    const matchesFilter = filter === "All" || enquiry.userType === filter;

    return matchesSearch && matchesFilter;
  });

  // Change enquiry status
  const changeStatus = async (status: string) => {
    if (!selected) return;

    try {
      await api.patch(`/enquiries/${selected._id}`, {
        status: status,
      });

      setEnquiries((oldEnquiries) =>
        oldEnquiries.map((enquiry) =>
          enquiry._id === selected._id
            ? { ...enquiry, status: status }
            : enquiry,
        ),
      );

      setSelected({
        ...selected,
        status: status,
      });
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update enquiry status.");
    }
  };

  // Delete enquiry
  const deleteEnquiry = async () => {
    if (!selected) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this enquiry?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/enquiries/${selected._id}`);

      setEnquiries((oldEnquiries) =>
        oldEnquiries.filter((enquiry) => enquiry._id !== selected._id),
      );

      setSelected(null);
    } catch (error) {
      console.error("Failed to delete enquiry:", error);
      alert("Failed to delete enquiry.");
    }
  };

  const logoutAdmin = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    }

    window.location.href = "/admin-login";
  };

  return (
    <main className="min-h-[80vh] bg-black px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <p className="mt-2 text-gray-400">Manage enquiries</p>
          </div>

          <div className="flex gap-3">
            {/* Refresh */}
            <button
              onClick={loadEnquiries}
              disabled={loading}
              className="cursor-pointer rounded-lg border border-zinc-700 px-4 py-2 text-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>

            {/* Logout */}
            <button
              onClick={logoutAdmin}
              className="cursor-pointer rounded-lg border border-red-500 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {/* Total */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-sm text-gray-500">Total Enquiries</p>

            <p className="mt-2 text-3xl font-bold">{enquiries.length}</p>
          </div>

          {/* New */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-sm text-gray-500">New</p>

            <p className="mt-2 text-3xl font-bold text-blue-400">
              {enquiries.filter((enquiry) => enquiry.status === "New").length}
            </p>
          </div>

          {/* In Progress */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-sm text-gray-500">In Progress</p>

            <p className="mt-2 text-3xl font-bold text-purple-400">
              {
                enquiries.filter((enquiry) => enquiry.status === "In Progress")
                  .length
              }
            </p>
          </div>

          {/* Closed */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-sm text-gray-500">Closed</p>

            <p className="mt-2 text-3xl font-bold text-green-400">
              {
                enquiries.filter((enquiry) => enquiry.status === "Closed")
                  .length
              }
            </p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-yellow-400"
          />

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-yellow-400"
          >
            <option value="All">All Users</option>
            <option value="Student">Student</option>
            <option value="Customer">Customer</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <p className="py-10 text-center text-gray-400">
            Loading enquiries...
          </p>
        )}

        {/* Empty */}
        {!loading && filteredEnquiries.length === 0 && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-10 text-center">
            <p className="text-gray-400">No enquiries found.</p>
          </div>
        )}

        {/* Table */}
        {!loading && filteredEnquiries.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-zinc-800">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-950">
                  <tr className="border-b border-zinc-800 text-left">
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">User Type</th>
                    <th className="px-5 py-4">Interest</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEnquiries.map((enquiry) => (
                    <tr
                      key={enquiry._id}
                      className="border-b border-zinc-800 bg-black hover:bg-zinc-950"
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium">{enquiry.name}</p>

                        <p className="text-sm text-gray-500">{enquiry.email}</p>
                      </td>

                      <td className="px-5 py-4 text-sm">{enquiry.userType}</td>

                      <td className="px-5 py-4 text-sm">{enquiry.interest}</td>

                      <td className="px-5 py-4">
                        <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs">
                          {enquiry.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <button
                          onClick={() => setSelected(enquiry)}
                          className="cursor-pointer rounded-lg bg-yellow-400 px-4 py-2 text-sm font-medium text-black transition hover:bg-yellow-300"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* View Enquiry */}
      {selected && (
        <ViewEnquiry
          enquiry={selected}
          onClose={() => setSelected(null)}
          onStatusChange={changeStatus}
          onDelete={deleteEnquiry}
        />
      )}
    </main>
  );
}
