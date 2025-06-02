"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PlayCircle } from "lucide-react";

interface Episode {
  title: string;
  coverImg: string;
  podcastTitle: string;
  duration: number;
  playedAt: string;
}

export default function RecPlayedEp() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchEpisodes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/recent-episodes`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setEpisodes(data);
      } catch (error) {
        alert("Failed to fetch episodes. Please try again later.");
        console.error("Error fetching episodes:", error);
      }
    };

    fetchEpisodes();
  }, []);

  return (
    <main className="bg-black text-[#F4F4F5] p-6">
      <h1 className="text-xl font-semibold mb-4">Recently Played Episodes</h1>

      <section className="grid gap-4">
        {episodes.map((episode, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 rounded-md bg-[#111] hover:bg-[#1c1c1c] transition"
          >
            <div className="relative w-14 h-14 shrink-0">
              <Image
                src={episode.coverImg}
                alt={`Cover image for ${episode.title}`}
                fill
                className="rounded object-cover"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-base font-medium">{episode.title}</h2>
              <p className="text-sm text-gray-400">{episode.podcastTitle}</p>
              <p className="text-sm text-gray-500">
                Duration: {episode.duration} min •{" "}
                {new Date(episode.playedAt).toLocaleDateString()}
              </p>
            </div>

            <button className="text-[var(--acc-clr)] hover:scale-105 transition">
              <PlayCircle size={24} />
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}