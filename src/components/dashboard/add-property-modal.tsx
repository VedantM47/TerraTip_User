"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LocationPickerMap from "@/components/location-picker-map";

import { UploadCloud, Eye } from "lucide-react";
import { useRef, useState } from "react";

interface FileWithPreview extends File {
  previewUrl?: string;
}

export default function AddPropertyModal() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-brand hover:bg-brand/90">Add Property</Button>
      </DialogTrigger>

      <DialogContent className="rounded-lg shadow-xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-brand">
            Add Property Details
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Upload property documents and location.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <LocationPickerMap
            location={location}
            setLocation={setLocation}
            onLocationChange={(lat, lng, addr) => {
              setCoordinates({ lat, lng });
              setAddress(addr);
            }}
          />

          <div className="space-y-2">
            <Label>Upload Documents</Label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-muted p-4 hover:bg-muted/40"
            >
              <UploadCloud className="mr-2 h-5 w-5" />
              <span className="text-sm text-muted-foreground">
                Click to upload documents (PDF, PNG, JPG)
              </span>
              <Input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Files</Label>
              <ul className="max-h-48 space-y-2 overflow-auto rounded-md border p-2">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-md bg-muted px-3 py-2 text-sm"
                  >
                    <span className="w-[75%] truncate">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-brand"
                      onClick={() => alert("Preview in secure viewer")}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button
            className="mt-4 w-full bg-brand hover:bg-brand/90"
            onClick={() => {
              console.log("📨 Submitting Property:");
              console.log("📍 Coordinates:", coordinates);
              console.log("🏡 Address:", address);
              console.log("📝 Files:", files);
            }}
          >
            Submit Property
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
