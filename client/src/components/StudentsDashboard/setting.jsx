import { useState } from "react";

const SettingsPage = () => {
  const [expanded, setExpanded] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleExpand = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-600">Settings</h2>

      <div className="border rounded-lg p-4 mb-4  bg-gray-800 shadow-md">
        <button
          onClick={() => toggleExpand("password")}
          className="w-full text-white text-left font-medium"
        >
          Change Password
        </button>
        {expanded === "password" && (
          <div className="mt-4 space-y-2">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border rounded"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-2 hover:bg-blue-600">
              Update Password
            </button>
          </div>
        )}
      </div>

      <div className="border rounded-lg p-4 bg-gray-800 shadow-md">
        <button
          onClick={() => toggleExpand("delete")}
          className="w-full text-left font-medium"
        >
          Delete Account
        </button>
        {expanded === "delete" && (
          <div className="mt-4">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-600"
            >
              Delete Account
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            <p className="text-sm text-gray-600 my-2">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;