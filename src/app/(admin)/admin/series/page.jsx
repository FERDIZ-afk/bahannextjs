



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
      const res = await fetch(`/api/anime?status=${status}&page=${page}`);
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