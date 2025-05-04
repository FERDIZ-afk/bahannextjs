"use client";

import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetSeries } from "@/services/series/queries";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SeriesTable from "@/components/admin/tables/SeriesTable";

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
