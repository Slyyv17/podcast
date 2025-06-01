'use client';

import { useEffect, useState } from "react";
import { User } from "lucide-react";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("No token found, please login again");
          console.error("No token found");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        alert("Error fetching user data, please try again");
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };
    fetchUser();
  }, []); // <- Add empty dependency array

  return (
    <section className="w-full h-fit p-6 bg-transparent flex items-center justify-between">
      <h1 className="text-2xl font-semibold capitalize text-left text-[var(--txt-clr)] pry-ff">
        Dashboard
      </h1>

      {/* Avatar */}
      <div className="p-4 flex justify-left items-center gap-2">
        <div className="p-2 rounded-full bg-gray-700 flex items-center justify-center text-[var(--txt-clr)]">
          <User size={17} />
        </div>
        <p className="text-[var(--txt-clr)] text-sm pry-ff">{user ? `Hi, ${user.fullname}` : "Loading..."}</p>
      </div>
    </section>
  );
}
