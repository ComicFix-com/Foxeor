import React, { useState } from 'react';
import { Upload, Link, File } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const API_KEY = 'c831986e7b6870185e1dac3788461d3e';

const encryptData = async (data) => {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(data);
  const key = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    encodedData
  );
  return { encryptedData, key, iv };
};

const uploadFile = async (file) => {
  const formData = new FormData();
  
  if (file.type.startsWith('image/')) {
    formData.append('image', file);
  } else {
    const fileContent = await file.text();
    const { encryptedData, key, iv } = await encryptData(fileContent);
    const encryptedFile = new Blob([encryptedData], { type: 'application/octet-stream' });
    formData.append('image', encryptedFile, file.name + '.encrypted');
  }

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }

  const data = await response.json();
  return data.data;
};

const FileUploader = ({ onFileUploaded, onFileUploadStart }) => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [showDonateDialog, setShowDonateDialog] = useState(false);

  const { refetch: uploadFileMutation, isLoading } = useQuery({
    queryKey: ['uploadFile', file],
    queryFn: () => uploadFile(file),
    enabled: false,
    onSuccess: (data) => {
      setFileUrl(data.url);
      toast.success('File uploaded successfully!');
      onFileUploaded({ name: file.name, url: data.url });
      setShowDonateDialog(true);
    },
    onError: (error) => {
      toast.error(`Upload failed: ${error.message}`);
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size exceeds 10MB limit');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      onFileUploadStart(file.name);
      uploadFileMutation();
    } else {
      toast.error('Please select a file to upload');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fileUrl);
    toast.success('Link copied to clipboard!');
  };

  const handleDonate = () => {
    window.location.href = 'upi://pay?pa=adnanmuhammad4393@okicici&pn=Adnan+Muhammad&am=89&tn=donating for Foxeor';
    setShowDonateDialog(false);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          accept="image/*,.txt,.pdf,.doc,.docx"
        />
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center w-full h-24 sm:h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
        >
          <span className="flex items-center space-x-2">
            <File className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            <span className="font-medium text-sm sm:text-base text-gray-600">
              {file ? file.name : 'Click or drag file to upload (max 10MB)'}
            </span>
          </span>
        </label>
      </div>
      <Button
        onClick={handleUpload}
        disabled={isLoading || !file}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
      >
        {isLoading ? 'Uploading...' : 'Upload File'}
        <Upload className="ml-2 h-4 w-4" />
      </Button>
      {fileUrl && (
        <div className="mt-4 space-y-3">
          <p className="font-semibold text-gray-700">File Link:</p>
          <div className="flex items-center space-x-2">
            <Input value={fileUrl} readOnly className="flex-grow bg-gray-50 text-sm" />
            <Button onClick={handleCopyLink} variant="outline" size="icon">
              <Link className="h-4 w-4" />
            </Button>
          </div>
          {file && file.type.startsWith('image/') && (
            <img src={fileUrl} alt="Uploaded" className="mt-3 w-full rounded-lg shadow-md" />
          )}
        </div>
      )}
      <Dialog open={showDonateDialog} onOpenChange={setShowDonateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Support Foxeor</DialogTitle>
            <DialogDescription>
              Thank you for using Foxeor! Would you like to support our app with a one-time donation of 89 Rs?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowDonateDialog(false)} variant="outline">
              Maybe Later
            </Button>
            <Button onClick={handleDonate} className="bg-green-500 hover:bg-green-600">
              Donate 89 Rs
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileUploader;