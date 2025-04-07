"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { CategoryFormModal } from "@/components/admin/category-form-modal";
import { CategoryCard } from "@/components/admin/category-card";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  description: string;
  visibility: "SHOW" | "HIDE";
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const fetchCategories = async (page: number) => {
    try {
      console.log("[ADMIN] Fetching categories...");
      const response = await fetch(`/api/categories?page=${page}&limit=9`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      console.log("[ADMIN] Fetched categories:", data.categories.length);
      setCategories(data.categories);
      setTotalPages(data.pagination.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("[ADMIN] Error in fetchCategories:", error);
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchCategories(newPage);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    // TODO: Implement search API endpoint
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    fetchCategories(currentPage);
  };

  const handleEdit = () => {
    fetchCategories(currentPage);
  };

  const handleVisibilityChange = () => {
    fetchCategories(currentPage);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onVisibilityChange={handleVisibilityChange}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}

      <CategoryFormModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSuccess={() => {
          setIsCreateModalOpen(false);
          fetchCategories(currentPage);
        }}
      />
    </div>
  );
} 