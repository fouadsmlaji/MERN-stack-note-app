import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/notes/getNote/${id}`
        );
        if (response.data.success) {
          setNote(response.data.data);
        } else {
          toast.error("Note not found");
          navigate("/");
        }
      } catch (error) {
        if (error.response?.status === 404) {
          toast.error("Note not found");
        } else {
          toast.error("Failed to load note");
        }
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/notes/deleteNote/${id}`
      );
      if (response.data.success) {
        toast.success("Note deleted successfully");
        navigate("/");
      } else {
        toast.error(response.data.message || "Failed to delete note");
      }
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please try again later.");
      } else {
        toast.error("Failed to delete note");
      }
    }
  };

  const handleUpdate = async () => {
    if (!note?.title?.trim() || !note?.content?.trim()) {
      toast.error("Title and content are required");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/notes/updateNote/${id}`,
        {
          title: note.title.trim(),
          content: note.content.trim(),
        }
      );
      if (response.data.success) {
        toast.success("Note updated successfully");
        navigate("/");
      } else {
        toast.error(response.data.message || "Failed to update note");
      }
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please try again later.");
      } else {
        toast.error("Failed to update note");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-white text-xl">Note not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-start pt-24 justify-start bg-gray-950">
      <div className="container mx-auto justify-center items-center flex flex-col gap-6 w-full max-w-4xl px-4">
        <h1 className="text-9xl font-extrabold text-center max-w-[800px] bg-gradient-to-r from-white via-gray-100 to-blue-600 text-transparent bg-clip-text inline-block drop-shadow-[0_0_100px_rgba(59,130,246,0.6)]">
          Note Detail
        </h1>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6 rounded-xl shadow-lg w-full">
          <div className="mb-4">
            <label htmlFor="title" className="text-white text-sm font-medium mb-2 block">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="text-2xl w-full font-bold text-white bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-4 rounded-xl transition-all duration-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20"
              value={note.title || ""}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="content" className="text-white text-sm font-medium mb-2 block">
              Content
            </label>
            <textarea
              id="content"
              rows={12}
              className="w-full text-gray-300 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-4 rounded-xl transition-all duration-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
              value={note.content || ""}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
            />
          </div>
          <div className="flex gap-4">
            <button
              className="btn btn-primary flex-1"
              onClick={handleUpdate}
            >
              Update Note
            </button>
            <button
              className="btn bg-red-800 hover:bg-red-900 text-white flex-1"
              onClick={handleDelete}
            >
              Delete Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
