import React, { useState, useEffect } from "react";
import { getAllUser, deleteUser, updateUserRole } from "../../utils/ApiFunction"; // Assuming deleteUser is defined in ApiFunction

const ManageUsers = () => {
  const [users, setUsers] = useState([]); // State to hold the fetched user data
  const [filteredUsers, setFilteredUsers] = useState([]); // State to hold filtered user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [selectedUser, setSelectedUser] = useState(null); // User selected for role management
  const [newRole, setNewRole] = useState(""); // Input for assigning a new role
  const [showPopup, setShowPopup] = useState(false); // Controls the visibility of the pop-up

  // Fetching user data on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUser();
        setUsers(userData);
        setFilteredUsers(userData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = users.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  // Function to open the role management pop-up
  const handleAssignRole = (user) => {
    setSelectedUser(user);
    setShowPopup(true);
  };

  // Function to handle role assignment
  const handleRoleSubmit = async () => {
    try {
      const updatedUser = await updateUserRole(selectedUser.id, newRole);
      console.log(updatedUser);

      // Update the user list immediately
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id
            ? { ...user, roles: [...user.roles, { roleName: newRole }] } // Add new role to the user
            : user
        )
      );

      // Update the filtered users list as well
      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id
            ? { ...user, roles: [{ roleName: newRole }] } // Add new role to the user
            : user
        )
      );

      setShowPopup(false);
      setNewRole("");
    } catch (error) {
      setError("Please enter a valid role");
    }
  };

  // Function to handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.email !== userId));
      setFilteredUsers(filteredUsers.filter((user) => user.email !== userId));
    } catch (error) {
      console.error(error);
      setError("Failed to delete user");
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 ">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          User Management
        </h2>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="text-lg font-semibold text-gray-700">Loading...</div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="text-lg font-semibold text-red-500">{error}</div>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Search input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full md:max-w-[40vw] lg:max-w-[25vw] px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* User list */}
            <div className="space-y-6">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-wrap justify-between bg-gray-50 p-4 rounded-lg shadow-md mb-4 sm:flex-nowrap"
                >
                  <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <div className="w-16 h-16 rounded-full bg-gray-300"></div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-start space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row sm:items-center sm:w-auto">
                    <div className="flex flex-col items-start space-y-2 sm:space-y-1">
                      <h4 className="text-lg font-semibold text-gray-700 mb-2">Role</h4>
                      <ul className="space-y-1">
                        {user.roles && user.roles.length > 0 ? (
                          user.roles.map((role) => (
                            <li key={role.id} className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-800">{role.roleName}</span>
                            </li>
                          ))
                        ) : (
                          <span className="text-sm font-medium text-gray-800">No roles assigned</span>
                        )}
                      </ul>
                    </div>
                    <div className="flex flex-col space-y-2 sm:space-y-0">
                      <button
                        onClick={() => handleAssignRole(user)}
                        className="px-4 py-2 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 md:mb-3"
                      >
                        Manage Role
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.email)}
                        className="px-4 py-2 bg-red-500 text-white text-xs rounded-md hover:bg-red-600"
                      >
                        Delete User
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Role management pop-up */}
        {showPopup && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">
                Manage Role for {selectedUser.firstName} {selectedUser.lastName}
              </h3>
              <p className="mb-4">Email: {selectedUser.email}</p>
              <div className="mb-4">
                <h4 className="text-lg font-semibold">Current Role:</h4>
                <ul className="list-disc pl-5">
                  {selectedUser.roles.length > 0 ? (
                    selectedUser.roles.map((role) => (
                      <li key={role.id}>{role.roleName}</li>
                    ))
                  ) : (
                    <li>No roles assigned</li>
                  )}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold">New Role:</h4>
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="Enter new role"
                  className="w-full px-3 py-2 border rounded mb-4"
                />
                <button
                  onClick={handleRoleSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;




