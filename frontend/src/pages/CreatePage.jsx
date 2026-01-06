import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Input validation
  const validateForm = () => {
    const newErrors = {};
    
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle) {
      newErrors.title = "Title is required";
    } else if (trimmedTitle.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (trimmedTitle.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!trimmedContent) {
      newErrors.content = "Content is required";
    } else if (trimmedContent.length < 10) {
      newErrors.content = "Content must be at least 10 characters";
    } else if (trimmedContent.length > 5000) {
      newErrors.content = "Content must be less than 5000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post(
        "http://localhost:3000/api/notes/createNote",
        {
          title: title.trim(),
          content: content.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the response indicates success
      if (response.data.success) {
        toast.success(response.data.message || "Note created successfully!");
        setTitle("");
        setContent("");
        setErrors({});
        // Navigate after a short delay to show the success message
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        throw new Error(response.data.message || "Failed to create note");
      }
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.message || "An error occurred";
        
        if (status === 429) {
          toast.error("Too many requests. Please try again later.");
        } else if (status === 400) {
          toast.error(message);
        } else if (status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error(message);
        }
      } else if (error.request) {
        // Request was made but no response received
        toast.error("Network error. Please check your connection.");
      } else {
        // Something else happened
        toast.error(error.message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto justify-center items-center flex flex-col gap-6 ">
        <h1 className="text-9xl font-extrabold text-center max-w-[800px] bg-gradient-to-r from-white via-gray-100 to-blue-600 text-transparent bg-clip-text inline-block drop-shadow-[0_0_100px_rgba(59,130,246,0.6)]">
          Create a New Note
        </h1>
        <form 
          onSubmit={handleSubmit}
          className="bg-gray-800/50 w-full max-w-xl backdrop-blur-sm border border-gray-700/50 p-6 rounded-xl shadow-lg transition-all duration-300 h-full flex flex-col"
        >
          <div className="mb-4">
            <label htmlFor="title" className="text-white text-sm font-medium mb-2 block">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter note title"
              className={`w-full bg-gray-800/50 backdrop-blur-sm border p-4 rounded-xl transition-all duration-300 text-white placeholder-gray-500 ${
                errors.title 
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                  : "border-gray-700/50 focus:border-blue-500 focus:ring-blue-500/20"
              } focus:outline-none focus:ring-2`}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                // Clear error when user starts typing
                if (errors.title) {
                  setErrors({ ...errors, title: "" });
                }
              }}
              disabled={loading}
              maxLength={100}
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="text-white text-sm font-medium mb-2 block">
              Content
            </label>
            <textarea
              id="content"
              placeholder="Enter note content"
              rows={8}
              className={`w-full bg-gray-800/50 backdrop-blur-sm border p-4 rounded-xl transition-all duration-300 text-white placeholder-gray-500 resize-none ${
                errors.content 
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                  : "border-gray-700/50 focus:border-blue-500 focus:ring-blue-500/20"
              } focus:outline-none focus:ring-2`}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                // Clear error when user starts typing
                if (errors.content) {
                  setErrors({ ...errors, content: "" });
                }
              }}
              disabled={loading}
              maxLength={5000}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.content ? (
                <p className="text-red-400 text-xs">{errors.content}</p>
              ) : (
                <span></span>
              )}
              <p className="text-gray-500 text-xs">
                {content.length}/5000
              </p>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
