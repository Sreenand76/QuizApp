import React, { useContext, useEffect, useState } from "react";
import { deleteUser, getUserDetail, getUserPreviousAttemptsDetail } from "../../utils/ApiFunction";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { AuthContext } from "./AuthProvider";

// Register the chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [quizDetails, setQuizDetails] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal visibility state
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetchUserDetailsAndActivity();
  }, []);

  const fetchUserDetailsAndActivity = async () => {
    const email = localStorage.getItem("email");
    try {
      const userDetailsResponse = await getUserDetail(email);
      setUserDetails(userDetailsResponse);

      const quizDetailsResponse = await getUserPreviousAttemptsDetail(email);
      // Sort quiz attempts by 'attemptDate' (most recent first)
      const sortedQuizDetails = quizDetailsResponse.sort((a, b) => {
        const dateA = new Date(a.attemptDate);
        const dateB = new Date(b.attemptDate);
        return dateB - dateA;  // Ensure recent quiz attempts come first
      });

      setQuizDetails(sortedQuizDetails);

      // Prepare the chart data
      const subjects = {};
      quizDetailsResponse.forEach((quiz) => {
        const percentage = Math.round((quiz.correctAnswer / quiz.totalQns) * 100);
        if (!subjects[quiz.subject]) {
          subjects[quiz.subject] = [];
        }
        subjects[quiz.subject].push(percentage);
      });

      const chartData = {
        labels: Object.keys(subjects),
        datasets: [
          {
            label: 'Average Performance',
            data: Object.values(subjects).map((subject) => {
              const average = subject.reduce((sum, current) => sum + current, 0) / subject.length;
              return average;
            }),
            backgroundColor: '#3b82f6',
            borderColor: '#1d4ed8',
            borderWidth: 1,
            fill: false,
          },
        ],
      };

      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching user details or quiz attempts:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const isoDateString = new Date(dateString).toISOString();
    const date = new Date(isoDateString);

    if (isNaN(date)) {
      return "Invalid Date";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handleDeleteUser = async () => {
    const userId = userDetails?.email;
    if (!userId) return;
    try {
      const response = await deleteUser(userId);
      toast.success("Account deleted successfully!");
      setUserDetails(null); // Clear the UI
      setQuizDetails([]);

      if (response === "User deleted successfully") {
        auth.handleLogout();
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  const handleConfirmDelete = () => {
    handleDeleteUser();
    setShowDeleteModal(false); // Close the modal after confirmation
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false); // Close the modal if user cancels
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center mb-10 mt-20">
        <div className="relative mb-6">
          <div className="w-40 h-40 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
        <div>Loading User Details...</div>
        <div className="text-center">
          <div className="w-32 h-6 bg-gray-300 mb-2 animate-pulse"></div>
          <div className="w-48 h-5 bg-gray-300 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto p-6 bg-gradient-to-r from-blue-50 via-white to-blue-100 rounded-lg shadow-xl mt-5 md:mt-10">
      {/* Profile Header */}
      <div className="text-start text-3xl md:text-4xl mb-5 font-bold text-gray-700">Profile</div>

      {/* User Details Section */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative mb-6">
          <img
            src="https://media.istockphoto.com/id/1500661733/vector/user-profile-icon-avatar-or-person-icon-profile-symbol-neutral-gender-silhouette-circle.jpg?s=612x612&w=0&k=20&c=iBw_26_FRDEhaSqdTvjjZThsVFFiT32IZnHoxkOsl1M="
            alt="Profile"
            className="w-40 h-40 rounded-full shadow-lg border-4 border-blue-400"
          />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-1 text-gray-800">
            {userDetails.firstName} {userDetails.lastName}
          </h3>
          <p className="text-lg text-gray-600">{userDetails.email}</p>
        </div>
      </div>

      <hr className="border-t border-gray-300" />

      {/* Chart for Subjects Performance */}
      <div className="w-full mb-10 mt-10 ">
        <h3 className="text-lg md:text-2xl font-normal text-gray-500 mb-4 text-center">Subject-wise Performance</h3>
        {quizDetails.length > 0 ? (
          <div className=" sm:h-30 md:h-96 lg:h-112 xl:h-128 flex flex-col items-center">
          <Bar
            data={chartData}
            options={{
              scales: {
                y: {
                  ticks: {
                    stepSize: 20,
                    min: 0,
                    max: 100,
                  },
                },
              },
            }}
          />
          </div>
        ) : (
          <p className="text-gray-500">No quiz attempts data available for chart.</p>
        )}
      </div>

      <div className="relative w-full my-6">
        <hr className="border-t border-gray-300" />
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gray-500">
          Quiz Attempts
        </span>
      </div>

      {/* Responsive Quiz Details */}
      {quizDetails.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizDetails.map((quiz, index) => {
              const percentage = Math.round((quiz.correctAnswer / quiz.totalQns) * 100);

              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-5 hover:shadow-xl transition-shadow relative flex flex-col"
                >
                  <div className="text-lg font-semibold text-gray-700 mb-2">
                    <span className="block">Subject: {quiz.subject}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="font-bold">Date:</span> {formatDate(quiz.attemptDate)}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="font-bold">Correct Answers:</span> {quiz.correctAnswer}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-bold">Total Questions:</span> {quiz.totalQns}
                  </div>

                  {/* Progress Wheel */}
                  <div className="absolute top-1/2 right-5 transform -translate-y-1/2 w-20 h-20">
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                      styles={buildStyles({
                        textSize: "16px",
                        pathColor: percentage > 50 ? "#4caf50" : "#f44336",
                        textColor: "#000",
                        trailColor: "#f4f4f4",
                      })}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-600">No quiz data available.</div>
      )}

      {/* Delete Account Button */}
      <div className="text-center mt-10">
        <button
          className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-colors"
          onClick={() => setShowDeleteModal(true)} // Show modal on click
        >
          Delete Account
        </button>
      </div>

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-5">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">Are you sure you want to delete your account?</h4>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;





