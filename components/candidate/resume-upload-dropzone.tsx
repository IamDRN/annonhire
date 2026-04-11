"use client";

import { useRef, useState, useTransition } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toaster";

export function ResumeUploadDropzone({
  onParsed
}: {
  onParsed?: (parsed: Record<string, unknown>) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const [fileName, setFileName] = useState<string>("");
  const { pushToast } = useToast();

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      const response = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        pushToast({ title: "Upload failed", description: "Please use a PDF, DOC, or DOCX under 5MB." });
        return;
      }

      const data = await response.json();
      setFileName(file.name);
      onParsed?.(data.parsed);
      pushToast({ title: "Resume parsed", description: "Review the extracted profile details before publishing." });
    });
  };

  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 px-6 py-10 text-center"
      onClick={() => inputRef.current?.click()}
    >
      <UploadCloud className="h-10 w-10 text-primary" />
      <h3 className="mt-4 text-lg font-semibold">Upload resume</h3>
      <p className="mt-2 max-w-md text-sm text-muted">Accepts PDF, DOC, and DOCX. Files are validated and parsed into a draft candidate profile.</p>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            handleUpload(file);
          }
        }}
      />
      <Button className="mt-6" disabled={isPending}>
        {isPending ? "Uploading..." : fileName ? `Replace ${fileName}` : "Select file"}
      </Button>
    </div>
  );
}
