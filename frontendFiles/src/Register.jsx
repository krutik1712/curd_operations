import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        age: "",
        fatherName: "",
        phone: "",
        cityPin: "",
        cityName: "",
        location: "",
        email: "",
        password: ""
    });

    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("SUBMIT CLICKED", form);

        try {
            const data = new FormData();
            Object.keys(form).forEach((key) => {
                data.append(key, form[key]);
            });

            if (photo) data.append("photo", photo);

            await axios.post("http://localhost:5000/register", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            navigate("/login");
        } catch (err) {
            console.error(err);
            setError("Registration failed. Check backend.");
        }
    };

    return (
        <div className="min-h-screen flex items-center bg-gradient-to-br to-indigo-500 from-purple-600 justify-center bg-gray-100 p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-4xl p-8 rounded-xl shadow-lg"
            >
                <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

                {error && (
                    <p className="bg-red-100 text-red-600 p-2 mb-4 rounded text-center">
                        {error}
                    </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        ["firstName", "First Name"],
                        ["middleName", "Middle Name"],
                        ["lastName", "Last Name"],
                        ["age", "Age"],
                        ["fatherName", "Father Name"],
                        ["phone", "Phone"],
                        ["cityName", "City Name"],
                        ["cityPin", "City PIN"],
                        ["location", "Location"],
                        ["email", "Email"],
                        ["password", "Password"]
                    ].map(([name, placeholder]) => (
                        <input
                            key={name}
                            name={name}
                            type={name === "password" ? "password" : "text"}
                            placeholder={placeholder}
                            value={form[name]}
                            onChange={handleChange}
                            required={["firstName", "email", "password"].includes(name)}
                            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    ))}

                    <input
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        className="border p-2 rounded-lg bg-gray-50"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg"
                >
                    Register
                </button>

                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-semibold">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
