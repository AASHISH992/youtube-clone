import { useState } from 'react';
import { uploadApi, editApi } from "../api/upload.api.js";

function useUpload() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function upload(formData) {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await uploadApi(formData);

      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || "Publishing failed.";
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    isSubmitting,
    error,
    upload,
  };
}

export { useUpload };
