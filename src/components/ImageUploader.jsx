import React, { useState } from 'react';
import { Upload, Link, Image as ImageIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const API_KEY = 'c831986e7b6870185e1dac3788461d3e';

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error('Failed to upload image: ' + error.message);
  }
};

const ImageUploader = ({ onDonate }) => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [showDonatePrompt, setShowDonatePrompt] = useState(false);

  const { refetch: uploadImageMutation, isLoading } = useQuery({
    queryKey: ['uploadImage', file],
    queryFn: () => uploadImage(file),
    enabled: false,
    onSuccess: (data) => {
      setImageUrl(data.url);
      toast.success('Image uploaded successfully!');
      setShowDonatePrompt(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      uploadImageMutation();
    } else {
      toast.error('Please select an image to upload');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(imageUrl);
    toast.success('Link copied to clipboard!');
  };

  const handleDonate = () => {
    onDonate();
    setShowDonatePrompt(false);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
        >
          <span className="flex items-center space-x-2">
            <ImageIcon className="w-6 h-6 text-gray-600" />
            <span className="font-medium text-gray-600">
              {file ? file.name : 'Drop files to Attach, or browse'}
            </span>
          </span>
        </label>
      </div>
      <Button
        onClick={handleUpload}
        disabled={isLoading || !file}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        {isLoading ? 'Uploading...' : 'Upload Image'}
        <Upload className="ml-2 h-4 w-4" />
      </Button>
      {imageUrl && (
        <div className="mt-6 space-y-4">
          <p className="font-semibold text-gray-700">Image Link:</p>
          <div className="flex items-center space-x-2">
            <Input value={imageUrl} readOnly className="flex-grow bg-gray-50" />
            <Button onClick={handleCopyLink} variant="outline" size="icon">
              <Link className="h-4 w-4" />
            </Button>
          </div>
          <img src={imageUrl} alt="Uploaded" className="mt-4 w-full rounded-lg shadow-md" />
        </div>
      )}
      <Dialog open={showDonatePrompt} onOpenChange={setShowDonatePrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Support Foxeor</DialogTitle>
            <DialogDescription>
              Thank you for using Foxeor! Would you like to support us with a one-time donation of ₹89?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDonatePrompt(false)}>
              Maybe Later
            </Button>
            <Button onClick={handleDonate}>
              Donate ₹89
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageUploader;