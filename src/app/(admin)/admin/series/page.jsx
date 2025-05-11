'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const AdminSeriesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [animeList, setAnimeList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const status = searchParams.get('status') || 'all';
  const page = parseInt(searchParams.get('page') || '1', 10);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`/api/admin/series?status=${status}&page=${page}&search=${searchQuery}`);
      const json = await res.json();
      setAnimeList(json.data || []);
      setTotalPages(json.totalPages || 1);
      setLoading(false);
    };

    fetchData();
  }, [status, page, searchQuery]);

  const handleStatusChange = (e) => {
    router.push(`/admin/series?status=${e.target.value}&search=${searchQuery}&page=1`);
  };

  const handlePageChange = (newPage) => {
    router.push(`/admin/series?status=${status}&search=${searchQuery}&page=${newPage}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.search.value.trim();
    router.push(`/api/admin/series?status=${status}&search=${input}&page=1`);
  };

  return (
    <main className="p-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Manajemen Anime</h1>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="Cari judul anime..."
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={status}
            onChange={handleStatusChange}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="all">Semua</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            Cari
          </button>
        </form>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="px-4 py-2 text-left">Judul</th>
              <th className="px-4 py-2 text-left">Slug</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {animeList.map((anime) => (
              <tr key={anime.id} className="even:bg-gray-50">
                <td className="px-4 py-2">{anime.judul || '-'}</td>
                <td className="px-4 py-2">{anime.urlLinkSlug}</td>
                <td className="px-4 py-2">{anime.status}</td>
                <td className="px-4 py-2">
                  <Link
                    href={`/admin/series/edit/${anime.urlLinkSlug}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {animeList.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  Tidak ada data yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded-md border ${
              i + 1 === page
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </main>
  );
};

export default AdminSeriesPage;


/*

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const AdminSeriesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [animeList, setAnimeList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const status = searchParams.get('status') || 'all';
  const page = parseInt(searchParams.get('page') || '1', 10);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`/api/admin/series?status=${status}&page=${page}`);
      const json = await res.json();
      setAnimeList(json.data || []);
      setTotalPages(json.totalPages || 1);
      setLoading(false);
    };

    fetchData();
  }, [status, page]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    router.push(`/admin/series?status=${newStatus}&page=1`);
  };

  const handlePageChange = (newPage) => {
    router.push(`/admin/series?status=${status}&page=${newPage}`);
  };

  return (
    <main className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Daftar Anime</h1>
        <select value={status} onChange={handleStatusChange} className="border rounded px-2 py-1">
          <option value="all">Semua</option>
          <option value="ONGOING">Ongoing</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Judul</th>
                <th className="px-4 py-2 border">Slug</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {animeList.map((anime) => (
                <tr key={anime.id}>
                  <td className="px-4 py-2 border">{anime.judul || '-'}</td>
                  <td className="px-4 py-2 border">{anime.urlLinkSlug}</td>
                  <td className="px-4 py-2 border">{anime.status}</td>
                  <td className="px-4 py-2 border">
                    <Link href={`/admin/series/edit/${anime.urlLinkSlug}`} className="text-blue-500 underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {animeList.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 border">
                    Tidak ada data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded ${
              i + 1 === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </main>
  );
};

export default AdminSeriesPage;
*/

/*"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";


const AdminSeriesPage = () => {
  const searchParams = useSearchParams();
  const [currentStatus, setCurrentStatus] = useState(searchParams.get("status") || "all");
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || "1");

  useEffect(() => {
    const status = searchParams.get("status");
    const page = searchParams.get("page");
    
    if (status && status !== currentStatus) {
      setCurrentStatus(status);
    }
    if (page && page !== currentPage) {
      setCurrentPage(page);
    }
  }, [searchParams, currentPage, currentStatus]);

  

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      ini halaman series
    </main>
  );
};

export default AdminSeriesPage;
*/