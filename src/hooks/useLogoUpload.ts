import { useState, useRef, useCallback, useEffect } from 'react';
import { config } from '../config';

interface UseLogoUploadResult {
  uploading: boolean;
  error: string | null;
  uploadedUrl: string | null;
  triggerUpload: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export function useLogoUpload(): UseLogoUploadResult {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelect = useCallback(async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    console.log('[useLogoUpload] File selected:', file?.name, file?.type, file?.size);

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.error('[useLogoUpload] Invalid file type:', file.type);
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      console.error('[useLogoUpload] File too large:', file.size);
      setError('File size must be less than 5MB');
      return;
    }

    console.log('[useLogoUpload] Starting upload...');
    setUploading(true);
    setError(null);

    try {
      // Upload file to Parse Server
      // Parse Server file upload endpoint is /parse/files/ not /apiV1/files/
      const parseServerUrl = config.api.baseUrl.replace(/\/apiV1$/, '/parse');
      const uploadUrl = `${parseServerUrl}/files/${file.name}`;

      console.log('[useLogoUpload] Upload URL:', uploadUrl);

      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'X-Parse-Application-Id': 'backAlto',
          'Content-Type': file.type,
        },
        body: file, // Parse Server expects raw file, not FormData
      });

      console.log('[useLogoUpload] Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[useLogoUpload] Upload failed:', response.statusText, errorText);
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('[useLogoUpload] Upload response:', data);

      // Parse Server returns: { name: "filename.ext", url: "https://..." }
      const fileUrl = data.url;

      console.log('[useLogoUpload] File URL:', fileUrl);
      setUploadedUrl(fileUrl);

      // Reset file input
      if (input) {
        input.value = '';
      }
    } catch (err) {
      console.error('[useLogoUpload] Error:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
      setUploadedUrl(null);
    } finally {
      setUploading(false);
    }
  }, []);

  // Attach event listener to file input
  useEffect(() => {
    const input = fileInputRef.current;
    if (input) {
      input.addEventListener('change', handleFileSelect);
      return () => {
        input.removeEventListener('change', handleFileSelect);
      };
    }
  }, [handleFileSelect]);

  return {
    uploading,
    error,
    uploadedUrl,
    triggerUpload,
    fileInputRef,
  };
}
