import React, { useState } from 'react';
import { Upload, Search, File } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const uploadFile = async (file) => {
  // TODO: Implement actual file upload with encryption
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ url: URL.createObjectURL(file), name: file.name });
    }, 1000);
  });
};

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { refetch: uploadFileMutation, isLoading } = useQuery({
    queryKey: ['uploadFile', file],
    queryFn: () => uploadFile(file),
    enabled: false,
    onSuccess: (data) => {
      setUploadedFiles([...uploadedFiles, data]);
      toast.success('File uploaded successfully!');
    },
    onError: (error) => {
      toast.error('Failed to upload file: ' + error.message);
    },
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      uploadFileMutation();
    } else {
      toast.error('Please select a file to upload');
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center w-full h-24 sm:h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
        >
          <span className="flex items-center space-x-2">
            <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            <span className="font-medium text-sm sm:text-base text-gray-600">
              {file ? file.name : 'Click or drag file to upload'}
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
      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-3">
          <h3 className="font-semibold text-gray-700">Uploaded Files:</h3>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
              <File className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">{file.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;