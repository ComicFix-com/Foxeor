import React, { useState } from 'react';
import { Upload, Link } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import imgbbUploader from 'imgbb-uploader';

const API_KEY = 'YOUR_IMGBB_API_KEY'; // Replace with your actual imgBB API key

const uploadImage = async (file) => {
  try {
    const base64string = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });

    const response = await imgbbUploader({
      apiKey: API_KEY,
      base64string,
      name: file.name,
    });

    return response;
  } catch (error) {
    throw new Error('Failed to upload image: ' + error.message);
  }
};

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const { refetch: uploadImageMutation, isLoading } = useQuery({
    queryKey: ['uploadImage', file],
    queryFn: () => uploadImage(file),
    enabled: false,
    onSuccess: (data) => {
      setImageUrl(data.url);
      toast.success('Image uploaded successfully!');
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <div className="mb-4">
        <Input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
      </div>
      <Button
        onClick={handleUpload}
        disabled={isLoading || !file}
        className="w-full mb-4"
      >
        {isLoading ? 'Uploading...' : 'Upload Image'}
        <Upload className="ml-2 h-4 w-4" />
      </Button>
      {imageUrl && (
        <div className="mt-4">
          <p className="mb-2 font-semibold">Image Link:</p>
          <div className="flex items-center">
            <Input value={imageUrl} readOnly className="flex-grow mr-2" />
            <Button onClick={handleCopyLink} size="icon">
              <Link className="h-4 w-4" />
            </Button>
          </div>
          <img src={imageUrl} alt="Uploaded" className="mt-4 w-full rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;