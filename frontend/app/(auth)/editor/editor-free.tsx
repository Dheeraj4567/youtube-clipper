"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Download, AlertCircle } from "lucide-react";

export default function Editor() {
  const [url, setUrl] = useState("");
  const [startTime, setStartTime] = useState("00:00:00");
  const [endTime, setEndTime] = useState("00:00:00");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/clip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          startTime,
          endTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 501) {
          // Show instructions for local setup
          setShowInstructions(true);
          setError(data.error);
        } else {
          setError(data.error || "Failed to process video");
        }
        return;
      }

      // If successful, handle the file download
      // Note: This won't work in the Vercel version, but shows the intended flow
      
    } catch {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">YouTube Clipper</h1>
          <p className="text-muted-foreground">
            Extract clips from YouTube videos (Free Version)
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="url">YouTube URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start">Start Time (HH:MM:SS)</Label>
                <Input
                  id="start"
                  type="text"
                  placeholder="00:00:00"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end">End Time (HH:MM:SS)</Label>
                <Input
                  id="end"
                  type="text"
                  placeholder="00:00:30"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Create Clip
                </>
              )}
            </Button>
          </form>

          {error && (
            <div className="mt-6 p-4 border border-red-200 rounded-lg bg-red-50">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-red-800">Notice</h3>
                  <p className="text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {showInstructions && (
            <div className="mt-6 p-6 border border-blue-200 rounded-lg bg-blue-50">
              <h3 className="font-medium text-blue-800 mb-3">
                How to use the full version locally:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-blue-700">
                <li>Clone the repository from GitHub</li>
                <li>Install yt-dlp: <code className="bg-blue-100 px-1 rounded">pip install yt-dlp</code></li>
                <li>Install ffmpeg: <code className="bg-blue-100 px-1 rounded">brew install ffmpeg</code> (macOS) or equivalent</li>
                <li>Run the backend: <code className="bg-blue-100 px-1 rounded">cd backend && bun run dev</code></li>
                <li>Run the frontend: <code className="bg-blue-100 px-1 rounded">cd frontend && npm run dev</code></li>
              </ol>
              <p className="mt-3 text-sm text-blue-600">
                The Vercel hosted version is a demo only. Full functionality requires local installation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
