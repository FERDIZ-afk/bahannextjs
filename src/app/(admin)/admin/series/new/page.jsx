



'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewSeriesPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    alternative: '',
    author: '',
    artist: '',
    serialization: '',
    released: '',
    rating: '',
    genres: '',
    status: 'ONGOING',
    publishState: 'PUBLISHED',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/series', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        alert('Series created!');
        router.push(`/series/${data.slug}`);
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to create series.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-3xl font-bold sm:order-1">Create New Series</h1>
          <div className="flex gap-2 sm:order-2">
            <button
              type="button"
              className="px-4 py-2 border border-gray-500 text-gray-300 rounded-md hover:bg-gray-700"
            >
              Discard
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Series Info */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-300">Series Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm text-gray-300">Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-300">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Series Details */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-300">Series Details</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {['alternative', 'author', 'artist', 'serialization', 'released', 'rating'].map((field) => (
                <div key={field}>
                  <label className="block mb-1 text-sm text-gray-300 capitalize">{field}</label>
                  <input
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Genres */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-300">Genres</h2>
            <label className="block mb-1 text-sm text-gray-300">Genres (comma-separated)</label>
            <textarea
              name="genres"
              value={formData.genres}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Status & Publish */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-2 text-indigo-300">Publish State</h2>
              <select
                name="publishState"
                value={formData.publishState}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-2 text-indigo-300">Status</h2>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          {/* Mobile Button (di bawah form, hanya saat sm:hidden) */}
          <div className="flex sm:hidden justify-end gap-2 pt-4">
            <button
              type="button"
              className="w-1/2 px-4 py-2 border border-gray-500 text-gray-300 rounded-md hover:bg-gray-700"
            >
              Discard
            </button>
            <button
              type="submit"
              className="w-1/2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default NewSeriesPage;


/*
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewSeriesPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    alternative: '',
    author: '',
    artist: '',
    serialization: '',
    released: '',
    rating: '',
    genres: '',
    status: 'ONGOING',
    publishState: 'PUBLISHED',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/series', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        alert('Series created!');
        router.push(`/series/${data.slug}`);
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to create series.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex gap-2 sm:order-2 hidden sm:flex">
            <button
              type="button"
              className="px-4 py-2 border border-gray-500 text-gray-300 rounded-md hover:bg-gray-700"
            >
              Discard
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
          <h1 className="text-3xl font-bold sm:order-1">Create New Series</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
        
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-300">Series Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm text-gray-300">Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-300">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

      
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-300">Series Details</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {['alternative', 'author', 'artist', 'serialization', 'released', 'rating'].map((field) => (
                <div key={field}>
                  <label className="block mb-1 text-sm text-gray-300 capitalize">{field}</label>
                  <input
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>

      
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-300">Genres</h2>
            <label className="block mb-1 text-sm text-gray-300">Genres (comma-separated)</label>
            <textarea
              name="genres"
              value={formData.genres}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

        
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-2 text-indigo-300">Publish State</h2>
              <select
                name="publishState"
                value={formData.publishState}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-2 text-indigo-300">Status</h2>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          
          <div className="flex sm:hidden justify-end gap-2 pt-4">
            <button
              type="button"
              className="w-1/2 px-4 py-2 border border-gray-500 text-gray-300 rounded-md hover:bg-gray-700"
            >
              Discard
            </button>
            <button
              type="submit"
              className="w-1/2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default NewSeriesPage;





return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
new series
    </main>
  );
  */