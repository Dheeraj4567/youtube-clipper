import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, startTime, endTime } = body;

    // Validate inputs
    if (!url || !startTime || !endTime) {
      return NextResponse.json({
        error: "url, startTime, and endTime are required",
      }, { status: 400 });
    }

    // Get backend URL from environment
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL;
    
    if (!backendUrl) {
      return NextResponse.json({
        error: "Backend not configured. Please set up the Railway backend.",
        instructions: "1. Deploy backend to Railway\n2. Set NEXT_PUBLIC_BACKEND_URL environment variable\n3. Redeploy frontend",
        setup: {
          railway: "https://railway.app",
          repository: "https://github.com/your-username/youtube-clipper"
        }
      }, { status: 503 });
    }

    // Forward request to Railway backend
    const response = await fetch(`${backendUrl}/api/clip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, startTime, endTime }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json({
        error: errorData.error || "Backend processing failed",
        details: errorData.details || "Unknown error from backend"
      }, { status: response.status });
    }

    // Get the video file from backend
    const arrayBuffer = await response.arrayBuffer();
    
    // Return the video file as download
    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": "attachment; filename=clip.mp4",
        "Content-Length": arrayBuffer.byteLength.toString(),
      },
    });

  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL;
  
  return NextResponse.json({
    status: "YouTube Clipper API (Frontend)",
    backend: backendUrl ? "Connected" : "Not configured",
    backendUrl: backendUrl || "Not set",
    message: backendUrl 
      ? "Ready to process videos via Railway backend" 
      : "Please configure NEXT_PUBLIC_BACKEND_URL environment variable"
  });
}
