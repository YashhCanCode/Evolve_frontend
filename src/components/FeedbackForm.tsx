import React, { useState } from "react";

export default function FeedbackForm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");

    try {

      
      const res = await fetch(`https://evolve-backend-nu.vercel.app/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Anonymous",
          email: "anonymous@evolve.com",
          message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 mb-24 px-6 py-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
      <h2 className="text-3xl font-bold text-white text-center mb-2">Feedback</h2>
      <p className="text-sm text-violet-300 text-center mb-6">
        Let us know what you think about Evolve.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your feedback..."
          className="w-full rounded-xl px-4 py-3 text-sm resize-none border border-white/20 bg-white/10 text-white placeholder:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
          rows={4}
        />
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
          >
            Submit
          </button>
        </div>
        {status === "success" && (
          <p className="text-sm text-green-400 text-center">
            ✅ Feedback submitted successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400 text-center">
            ❌ Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}