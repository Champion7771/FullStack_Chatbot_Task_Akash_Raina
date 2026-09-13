import type { Enquiry } from "./Admin";

type Props = {
  enquiry: Enquiry;
  onClose: () => void;
  onStatusChange: (status: string) => void;
  onDelete: () => void;
};

export default function ViewEnquiry({
  enquiry,
  onClose,
  onStatusChange,
  onDelete,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Enquiry Details</h2>

          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p>{enquiry.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p>{enquiry.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p>{enquiry.phone}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">User Type</p>
            <p>{enquiry.userType}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Interest</p>
            <p>{enquiry.interest}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Message</p>

            <div className="mt-1 rounded-lg border border-zinc-800 bg-black p-3">
              {enquiry.message}
            </div>
          </div>

          {/* Status */}
          <div>
            <p className="mb-2 text-sm text-gray-500">Status</p>

            <select
              value={enquiry.status}
              onChange={(event) => onStatusChange(event.target.value)}
              className="w-full cursor-pointer rounded-lg border border-zinc-700 bg-black px-3 py-2 outline-none focus:border-yellow-400"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onDelete}
            className="cursor-pointer rounded-lg border border-red-500/30 px-4 py-2 text-red-400 hover:bg-red-500/10"
          >
            Delete
          </button>

          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg bg-yellow-400 px-4 py-2 font-medium text-black hover:bg-yellow-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
