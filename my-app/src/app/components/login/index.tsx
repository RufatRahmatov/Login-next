import React, { useState } from "react";
import Loading from "../loading";

interface LoginProps {
  onLogin?: React.Dispatch<React.SetStateAction<string>>;
}

//  username: emilys
// password: emilyspass

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      username,
      password,
      expiresInMins: 30,
    };

    console.log("Payload:", JSON.stringify(payload));

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = {
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          image: data.image,
          token: data.token,
        };
        setMessage("Login successful!");
        setUser(userData);
        setToken(data.token);
        onLogin && onLogin(data.token);
        console.log("Success:", data);
      } else {
        setMessage(`Login failed: ${data.message}`);
        console.error("Error:", data);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Network Error:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User data:", data);
      } else {
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="flex font-poppins items-center justify-center h-screen w-screen dark:bg-gray-900">
        <div className="grid gap-8">
          <div
            id="back-div"
            className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4"
          >
            <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
              <h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-blue-600 text-5xl text-center cursor-default">
                Log in
              </h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 dark:text-gray-400 text-lg"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    className="border p-3 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 dark:text-gray-400 text-lg"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <a
                  className="group text-blue-400 transition-all duration-100 ease-in-out"
                  href="#"
                >
                  <span className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Forget your password?
                  </span>
                </a>
                <button
                  className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out flex justify-center gap-4"
                  type="submit"
                >
                  LOG IN <Loading />
                </button>
              </form>
              {loading && (
                <div className="flex justify-center mt-4">
                  <Loading />
                </div>
              )}
              {message && (
                <div className="mt-4 text-center text-red-500">{message}</div>
              )}
              {user && (
                <div className="mt-4 text-center text-green-500">
                  <p>
                    Welcome, {user.firstName} {user.lastName}!
                  </p>
                  <img
                    src={user.image}
                    alt={user.username}
                    className="mx-auto rounded-full mt-2"
                  />
                  <button
                    onClick={fetchUserData}
                    className="bg-blue-600 text-white rounded-lg mt-4 p-2 hover:scale-105 transition duration-300"
                  >
                    Fetch User Data
                  </button>
                </div>
              )}
              <div className="flex flex-col mt-4 items-center justify-center text-sm">
                <h3 className="dark:text-gray-300">
                  Dont have an account?
                  <a
                    className="group text-blue-400 transition-all duration-100 ease-in-out"
                    href="#"
                  >
                    <span className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                      Sign Up
                    </span>
                  </a>
                </h3>
              </div>
              <div
                id="third-party-auth"
                className="flex items-center justify-center mt-5 flex-wrap"
              >
                <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
                  <img
                    className="max-w-[25px]"
                    src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                    alt="Google"
                  />
                </button>
                <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
                  <img
                    className="max-w-[25px]"
                    src="https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/"
                    alt="Linkedin"
                  />
                </button>
                <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
                  <img
                    className="max-w-[25px] filter dark:invert"
                    src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
                    alt="Github"
                  />
                </button>
                <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
                  <img
                    className="max-w-[25px]"
                    src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
                    alt="Facebook"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
