"use client";

import { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useTrainingRecords } from "@/hooks/useTrainingRecords";
import type { TrainingRecord } from "@/interfaces/motorcycle";
import { flexRender } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Upload,
  Trash2,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Brain,
  // LogOut,
} from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { MotorcycleCategory, TransmissionType } from "@/interfaces/motorcycle";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motorcycleBrands } from "@/constants/motorcycleBrands";
import ModelInfoBadge from "@/components/ModelInfoBadge";
import AdminLogin from "@/components/AdminLogin";
import CsvTemplateButton from "@/components/CsvTemplateButton";

// Form Schema
const formSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  specifications: z.object({
    category: z.nativeEnum(MotorcycleCategory, {
      required_error: "Category is required",
    }),
    displacement: z.number().min(0, "Displacement must be positive"),
    transmission: z.nativeEnum(TransmissionType, {
      required_error: "Transmission type is required",
    }),
    yearRange: z.string().min(1, "Year range is required"),
    priceRange: z.object({
      min: z.number().min(0, "Minimum price must be positive"),
      max: z.number().min(0, "Maximum price must be positive"),
    }),
  }),
  condition: z.object({
    year: z.number().min(1900, "Invalid year"),
    mileage: z.number().min(0, "Mileage must be positive"),
    sellerType: z.string().min(1, "Seller type is required"),
    owner: z.string().min(1, "Owner is required"),
    knownIssues: z.string(),
  }),
  predictedPrice: z.number().optional(),
});

// Add type for the form data
type FormData = z.infer<typeof formSchema>;

// Define filter types
interface FilterState {
  brand: string;
  model: string;
  category: MotorcycleCategory | undefined;
  categories: MotorcycleCategory[];
}

// Update the custom hook to be more reusable
function useClientLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Load from localStorage on client-side only - this effect runs once on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const item = window.localStorage.getItem(key);
        // If value exists in localStorage, use it, otherwise use initialValue
        const value = item ? JSON.parse(item) : initialValue;
        setStoredValue(value);
      } catch (error) {
        console.log(error);
        setStoredValue(initialValue);
      }
    }
  }, [key, initialValue]);

  // Define setter function
  const setValue = (value: T) => {
    try {
      // Save state
      setStoredValue(value);
      // Save to localStorage
      if (typeof window !== "undefined") {
        if (value === null) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, JSON.stringify(value));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default function AdminPage() {
  // Add authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Check if user is authenticated on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("adminAuthenticated");
      setIsAuthenticated(auth === "true");
      setAuthChecked(true);
    }
  }, []);

  // Handle logout
  // const handleLogout = () => {
  //   if (typeof window !== "undefined") {
  //     localStorage.removeItem("adminAuthenticated");
  //     setIsAuthenticated(false);
  //     toast.success("Logged out successfully");
  //   }
  // };

  const [sorting, setSorting] = useState<SortingState>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<
    TrainingRecord | undefined
  >();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [filters, setFilters] = useState<FilterState>({
    brand: "",
    model: "",
    category: undefined,
    categories: [],
  });

  // Use our custom hook for localStorage
  const [lastTrainingTimeStr, setLastTrainingTimeStr] = useClientLocalStorage<
    string | null
  >("lastModelTrainingTime", null);
  const [trainingCooldown, setTrainingCooldown] = useState<boolean>(false);

  const {
    records,
    total,
    hasMore,
    isLoading,
    isFetching,
    updateRecord,
    deleteRecord,
    uploadCsv,
    bulkDelete,
    trainModel,
  } = useTrainingRecords({
    limit: pageSize,
    offset: currentPage * pageSize,
    ...filters,
  });
  const [isJsonViewOpen, setIsJsonViewOpen] = useState(false);
  const [selectedJsonRecord, setSelectedJsonRecord] = useState<
    TrainingRecord | undefined
  >();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({});

  const handleSelectAll = (checked: boolean) => {
    const newSelected: Record<number, boolean> = {};
    if (checked) {
      records.forEach((record) => {
        if (record.id) newSelected[record.id] = true;
      });
    }
    setSelectedRows(newSelected);
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleBulkDelete = () => {
    const selectedIds = Object.entries(selectedRows)
      .filter(([, selected]) => selected)
      .map(([id]) => parseInt(id));

    if (selectedIds.length === 0) {
      toast.error("No records selected");
      return;
    }

    toast.promise(bulkDelete.mutateAsync(selectedIds), {
      loading: "Deleting selected records...",
      success: (response) => {
        setSelectedRows({});
        return `Deleted ${response.deleted_count} of ${response.total_requested} records`;
      },
      error: (error: Error) => error.message || "Failed to delete records",
    });
  };

  const columns: ColumnDef<TrainingRecord>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getRowCount() > 0 &&
            Object.keys(selectedRows).length === records.length
          }
          onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.original.id ? selectedRows[row.original.id] : false}
          onCheckedChange={(checked) =>
            row.original.id &&
            handleSelectRow(row.original.id, checked as boolean)
          }
          aria-label='Select row'
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "brand",
      header: "Brand",
    },
    {
      accessorKey: "model",
      header: "Model",
    },
    {
      accessorKey: "specifications.category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant='secondary'>
          {row.original.specifications.category as MotorcycleCategory}
        </Badge>
      ),
    },
    {
      accessorKey: "specifications.transmission",
      header: "Transmission",
      cell: ({ row }) => (
        <Badge variant='outline'>
          {row.original.specifications.transmission as TransmissionType}
        </Badge>
      ),
    },
    {
      accessorKey: "condition.mileage",
      header: "Mileage",
      cell: ({ row }) => {
        const mileage = row.original.condition.mileage;
        return mileage ? `${mileage.toLocaleString()} km` : "-";
      },
    },
    {
      accessorKey: "specifications.displacement",
      header: "Displacement",
      cell: ({ row }) => `${row.original.specifications.displacement} cc`,
    },
    {
      accessorKey: "condition.year",
      header: "Year",
    },
    {
      accessorKey: "predictedPrice",
      header: "Predicted Price",
      cell: ({ row }) => {
        const price = row.original.predictedPrice;
        return price ? (
          <span className='font-medium text-green-600 dark:text-green-500'>
            ₱{price.toLocaleString("en-PH")}
          </span>
        ) : (
          "-"
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        const date = row.original.created_at;
        return date
          ? new Date(date).toLocaleDateString("en-PH", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "-";
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => handleViewJson(row.original)}>
              View JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className='text-red-600'
              onClick={() => handleDelete(row.original.id!)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: records,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(total / pageSize),
  });

  const handleSubmit = (data: FormData) => {
    if (selectedRecord?.id) {
      toast.promise(
        updateRecord.mutateAsync({ ...data, id: selectedRecord.id }),
        {
          loading: "Updating record...",
          success: () => {
            handleCloseDialog();
            return "Record updated successfully";
          },
          error: "Failed to update record",
        }
      );
    }
  };

  const handleEdit = (record: TrainingRecord) => {
    setSelectedRecord(record);
    form.reset(record as FormData);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    toast.promise(deleteRecord.mutateAsync(id), {
      loading: "Deleting record...",
      success: "Record deleted successfully",
      error: (error: Error) => error.message || "Failed to delete record",
    });
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setSelectedRecord(undefined);
    form.reset();
  };

  const handleViewJson = (record: TrainingRecord) => {
    setSelectedJsonRecord(record);
    setIsJsonViewOpen(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      toast.error("Please upload a CSV file");
      return;
    }

    toast.promise(uploadCsv.mutateAsync(file), {
      loading: "Uploading CSV...",
      success: (data: { message: string; errors: string[] }) => {
        event.target.value = "";
        return `${data.message}${
          data.errors.length ? `. ${data.errors.length} errors found.` : ""
        }`;
      },
      error: (error: Error) => error.message || "Failed to upload CSV",
    });
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Type the filter handlers
  const handleFilterChange = (
    key: keyof FilterState,
    value: FilterState[keyof FilterState]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(0);
  };

  // Add these helper functions
  const getAllBrands = (): string[] => {
    return motorcycleBrands.map((brand) => brand.name);
  };

  const getModelsByBrand = (brandName: string): string[] => {
    const brand = motorcycleBrands.find((b) => b.name === brandName);
    return brand ? brand.models.map((model) => model.name) : [];
  };

  // Update the FilterBar component
  const FilterBar: React.FC = () => {
    const brands = getAllBrands();
    const models = filters.brand ? getModelsByBrand(filters.brand) : [];

    return (
      <div className='mb-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Brand</label>
          <Select
            value={filters.brand || "all"}
            onValueChange={(value) => {
              // Reset model when brand changes
              handleFilterChange("model", "");
              handleFilterChange("brand", value === "all" ? "" : value);
            }}>
            <SelectTrigger>
              <SelectValue placeholder='Select brand' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Model</label>
          <Select
            value={filters.model || "all"}
            onValueChange={(value) => {
              handleFilterChange("model", value === "all" ? "" : value);
            }}
            disabled={!filters.brand} // Disable if no brand is selected
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  filters.brand ? "Select model" : "Select brand first"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Models</SelectItem>
              {models.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Category</label>
          <Select
            value={filters.category || "all"}
            onValueChange={(value) => {
              handleFilterChange(
                "category",
                value === "all" ? undefined : (value as MotorcycleCategory)
              );
            }}>
            <SelectTrigger>
              <SelectValue placeholder='Select category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Categories</SelectItem>
              {Object.values(MotorcycleCategory).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Records per page</label>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              setPageSize(Number(value));
              setCurrentPage(0);
            }}>
            <SelectTrigger>
              <SelectValue placeholder='Select page size' />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50, 100].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size} records
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  // Handle cooldown effect - this checks if we're in a cooldown period
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const checkCooldown = () => {
      if (!lastTrainingTimeStr) {
        setTrainingCooldown(false);
        return;
      }

      const lastTrainingTime = new Date(lastTrainingTimeStr);
      const now = new Date();
      const timeDiffMs = now.getTime() - lastTrainingTime.getTime();
      const cooldownTimeMs = 3 * 60 * 1000; // 3 minutes in milliseconds

      if (timeDiffMs < cooldownTimeMs) {
        setTrainingCooldown(true);
        // Set another timeout to check again when cooldown should be over
        timer = setTimeout(
          checkCooldown,
          Math.min(1000, cooldownTimeMs - timeDiffMs + 100)
        );
      } else {
        setTrainingCooldown(false);
        // Clear localStorage when cooldown is over
        setLastTrainingTimeStr(null);
      }
    };

    checkCooldown();

    return () => {
      clearTimeout(timer);
    };
  }, [lastTrainingTimeStr, setLastTrainingTimeStr]);

  // Helper function for handling model training
  const handleTrainModel = () => {
    if (
      window.confirm(
        "Are you sure you want to train a new model? This process may take several minutes."
      )
    ) {
      // Set current time as the last training time
      setLastTrainingTimeStr(new Date().toISOString());

      toast.promise(trainModel.mutateAsync(), {
        loading: "Starting model training...",
        success: (data) => {
          return `${data.message}. ${data.training_status.message}`;
        },
        error: (error: Error) => {
          // If there's an error, we should reset the cooldown
          setLastTrainingTimeStr(null);
          return error.message || "Failed to start training";
        },
      });
    }
  };

  // Calculate remaining cooldown time for display
  const getRemainingCooldownText = () => {
    if (!lastTrainingTimeStr || !trainingCooldown) return "";

    const lastTrainingTime = new Date(lastTrainingTimeStr);
    const now = new Date();
    const elapsed = now.getTime() - lastTrainingTime.getTime();
    const remainingMs = Math.max(0, 3 * 60 * 1000 - elapsed); // 3 minutes in ms
    const remainingMinutes = Math.floor(remainingMs / 60000);
    const remainingSeconds = Math.floor((remainingMs % 60000) / 1000);

    return `(${remainingMinutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")})`;
  };

  // Update the countdown display every second
  useEffect(() => {
    if (!trainingCooldown) return;

    const interval = setInterval(() => {
      // Force a re-render to update the countdown
      setTrainingCooldown(true);
    }, 1000);

    return () => clearInterval(interval);
  }, [trainingCooldown]);

  // If authentication hasn't been checked yet (to prevent flash of login screen)
  if (!authChecked) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
      </div>
    );
  }

  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  // If authenticated but still loading records
  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='flex flex-col items-center gap-2'>
          <div className='h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent' />
          <p className='text-sm text-muted-foreground'>Loading records...</p>
        </div>
      </div>
    );
  }

  // Authenticated and loaded
  return (
    <div className='container mx-auto py-10'>
      <div className='flex flex-col mb-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl font-bold'>Training Records</h1>
          <div className='flex gap-2'>
            {/* <Button
              variant='outline'
              className='flex items-center gap-2'
              onClick={handleLogout}>
              <LogOut className='h-4 w-4' />
              Logout
            </Button> */}
            {Object.keys(selectedRows).length > 0 && (
              <Button
                variant='destructive'
                className='flex items-center gap-2'
                onClick={handleBulkDelete}
                disabled={bulkDelete.isPending}>
                <Trash2 className='h-4 w-4' />
                Delete Selected ({Object.keys(selectedRows).length})
              </Button>
            )}
            <CsvTemplateButton />
            <Button
              variant='outline'
              className='flex items-center gap-2'
              asChild>
              <label>
                <Upload className='h-4 w-4' />
                Upload CSV
                <input
                  type='file'
                  accept='.csv'
                  className='hidden'
                  onChange={handleFileUpload}
                />
              </label>
            </Button>
            <Button
              variant='default'
              className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700'
              onClick={handleTrainModel}
              disabled={trainModel.isPending || trainingCooldown}
              title={
                trainingCooldown
                  ? `Training available in ${getRemainingCooldownText()}`
                  : "Train a new model"
              }>
              <Brain className='h-4 w-4' />
              {trainModel.isPending
                ? "Training..."
                : trainingCooldown
                ? `Train Model ${getRemainingCooldownText()}`
                : "Train Model"}
            </Button>
          </div>
        </div>
        <div className='mt-2'>
          <ModelInfoBadge />
        </div>
      </div>

      <FilterBar />

      <div className='rounded-md border shadow-sm'>
        <div className='relative'>
          {(isLoading || isFetching) && (
            <div className='absolute inset-0 z-10 bg-background/50 backdrop-blur-sm flex items-center justify-center'>
              <div className='h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent' />
            </div>
          )}
          <table className='w-full text-sm divide-y divide-border'>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className='border-x first:border-l-0 last:border-r-0 p-2 text-left font-medium text-muted-foreground hover:bg-muted/50 transition-colors'
                      onClick={header.column.getToggleSortingHandler()}>
                      <div className='flex items-center gap-2'>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.getIsSorted() && (
                          <span className='text-xs'>
                            {header.column.getIsSorted() === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className='divide-y divide-border'>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className='hover:bg-muted/50 transition-colors'>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className='border-x first:border-l-0 last:border-r-0 p-2 text-muted-foreground'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex items-center justify-between px-4 py-3 border-t'>
          <div className='text-xs text-muted-foreground'>
            Showing {currentPage * pageSize + 1} to{" "}
            {Math.min((currentPage + 1) * pageSize, total)} of {total} records
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage(0)}
              disabled={currentPage === 0}
              className='gap-1'>
              <ChevronFirst className='h-4 w-4' />
              First
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className='gap-1'>
              <ChevronLeft className='h-4 w-4' />
              Previous
            </Button>
            <div className='text-xs text-muted-foreground'>
              Page {currentPage + 1} of{" "}
              {Math.max(1, Math.ceil(total / pageSize))}
            </div>
            <Button
              variant='outline'
              size='sm'
              onClick={handleNextPage}
              disabled={!hasMore}
              className='gap-1'>
              Next
              <ChevronRight className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() =>
                setCurrentPage(Math.max(0, Math.ceil(total / pageSize) - 1))
              }
              disabled={!hasMore}
              className='gap-1'>
              Last
              <ChevronLast className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Record</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-6'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label>Brand</label>
                <Input {...form.register("brand")} />
                {form.formState.errors.brand && (
                  <p className='text-sm text-red-500'>
                    {form.formState.errors.brand.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <label>Model</label>
                <Input {...form.register("model")} />
                {form.formState.errors.model && (
                  <p className='text-sm text-red-500'>
                    {form.formState.errors.model.message}
                  </p>
                )}
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Specifications</h3>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label>Category</label>
                  <Select
                    value={form.watch("specifications.category")}
                    onValueChange={(value) => {
                      form.setValue(
                        "specifications.category",
                        value as MotorcycleCategory
                      );
                    }}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(MotorcycleCategory).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <label>Transmission</label>
                  <Select
                    value={form.watch("specifications.transmission")}
                    onValueChange={(value) => {
                      form.setValue(
                        "specifications.transmission",
                        value as TransmissionType
                      );
                    }}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select transmission' />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(TransmissionType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <label>Displacement (cc)</label>
                  <Input
                    type='number'
                    {...form.register("specifications.displacement", {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className='space-y-2'>
                  <label>Year Range</label>
                  <Input {...form.register("specifications.yearRange")} />
                </div>
                <div className='space-y-2'>
                  <label>Minimum Price</label>
                  <Input
                    type='number'
                    {...form.register("specifications.priceRange.min", {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className='space-y-2'>
                  <label>Maximum Price</label>
                  <Input
                    type='number'
                    {...form.register("specifications.priceRange.max", {
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Condition</h3>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label>Year</label>
                  <Input
                    type='number'
                    {...form.register("condition.year", {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className='space-y-2'>
                  <label>Mileage</label>
                  <Input
                    type='number'
                    {...form.register("condition.mileage", {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className='space-y-2'>
                  <label>Seller Type</label>
                  <Select
                    value={form.watch("condition.sellerType")}
                    onValueChange={(value) => {
                      form.setValue("condition.sellerType", value);
                    }}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select seller type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Private'>Private</SelectItem>
                      <SelectItem value='Dealer'>Dealer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <label>Owner</label>
                  <Input {...form.register("condition.owner")} />
                </div>
              </div>
              <div className='space-y-2'>
                <label>Known Issues</label>
                <Input {...form.register("condition.knownIssues")} />
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Price Information</h3>
              <div className='space-y-2'>
                <label>Predicted Price</label>
                <Input
                  type='number'
                  {...form.register("predictedPrice", {
                    valueAsNumber: true,
                    setValueAs: (value) =>
                      value === "" ? null : parseFloat(value),
                  })}
                  placeholder='Enter predicted price'
                />
              </div>
            </div>

            <div className='flex justify-end space-x-4'>
              <Button
                type='button'
                variant='outline'
                onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type='submit'>Update Record</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isJsonViewOpen} onOpenChange={setIsJsonViewOpen}>
        <DialogContent className='max-w-xl sm:max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Record JSON Data</DialogTitle>
          </DialogHeader>
          <div className='bg-muted rounded-md overflow-auto max-h-[50vh]'>
            <Highlight
              theme={themes.vsDark}
              code={JSON.stringify(selectedJsonRecord, null, 2)}
              language='json'>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={className + " p-4 text-xs sm:text-sm"}
                  style={style}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
