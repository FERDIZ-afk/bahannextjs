'use client';
import { useState } from 'react';

const NewSeriesPage = () => {
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);

    // Contoh kirim ke API
    // await fetch('/api/series', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <form onSubmit={handleSubmit} className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <button type="button" className="border h-7 w-7 rounded-md">
            {/* Icon Back */}
          </button>
          <h1 className="text-xl font-semibold">New Series</h1>
          <div className="md:ml-auto md:flex gap-2 hidden">
            <button type="button" className="border rounded-md px-3 h-9">Discard</button>
            <button type="submit" className="bg-primary text-white rounded-md px-3 h-9">Save Post</button>
          </div>
        </div>

        {/* Series Information */}
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2 grid gap-4">
            <div className="border rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4">Series Information</h3>
              <div className="space-y-4">
                <div>
                  <label>Title</label>
                  <input name="title" value={formData.title} onChange={handleChange} placeholder="Boruto: Naruto Next Generations" className="input" />
                </div>
                <div>
                  <label>Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} placeholder="lorem" className="input min-h-32" />
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4">Series Details</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {['alternative', 'author', 'artist', 'serialization', 'released', 'rating'].map(field => (
                  <div key={field}>
                    <label>{field[0].toUpperCase() + field.slice(1)}</label>
                    <input name={field} value={formData[field]} onChange={handleChange} className="input" placeholder={field} />
                  </div>
                ))}
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4">Series Genre</h3>
              <div>
                <label>Genres</label>
                <textarea name="genres" value={formData.genres} onChange={handleChange} placeholder="Adventure,Comedy,Horror" className="input min-h-32" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="grid gap-4">
            <div className="border rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4">Save As</h3>
              <select name="publishState" value={formData.publishState} onChange={handleChange} className="input">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Publish</option>
              </select>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4">Series Type</h3>
              <select name="status" value={formData.status} onChange={handleChange} className="input">
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default NewSeriesPage;


/*
return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
new series
    </main>
  );
  */