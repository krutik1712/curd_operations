import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            navigate("/login");
            return;
        }

        axios
            .get(`http://localhost:5000/profile/${email}`)
            .then((res) => {
                setUser(res.data.result[0]);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        navigate("/login");
    };

    if (!user)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h3 className="text-xl font-semibold">Loading...</h3>
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-100 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center relative">
                
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="absolute top-4 right-4 bg-red-500 text-white px-4 py-1 rounded-md text-sm hover:bg-red-600 transition"
                >
                    Logout
                </button>

                <img
                    src={`http://localhost:5000/uploads/${user.photo}`}
                    alt="Profile"
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-indigo-500 mb-4"
                />

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {user.first_name} {user.last_name}
                </h2>

                <p className="text-gray-600 mb-1">
                    <span className="font-semibold">Email:</span> {user.email}
                </p>

                <p className="text-gray-600">
                    <span className="font-semibold">Phone:</span> {user.phone}
                </p>
            </div>
        </div>
    );
};

export default Profile;
