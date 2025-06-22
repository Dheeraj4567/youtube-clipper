"use client";
import EditorFree from "./(auth)/editor/editor-free";

export default function App() {
  // For the free version, we'll skip authentication
  // and go straight to the free editor
  return <EditorFree />;
}
