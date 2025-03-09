"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
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
import {
  useTrainingRecords,
  type TrainingRecord,
} from "@/hooks/useTrainingRecords";
import { flexRender } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";

// Form Schema
const formSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  specifications: z.object({
    category: z.string().min(1, "Category is required"),
    displacement: z.number().min(0, "Displacement must be positive"),
    transmission: z.string().min(1, "Transmission is required"),
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

export default function AdminPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<
    TrainingRecord | undefined
  >();
  const { records, isLoading, updateRecord, deleteRecord } =
    useTrainingRecords();
  const [isJsonViewOpen, setIsJsonViewOpen] = useState(false);
  const [selectedJsonRecord, setSelectedJsonRecord] = useState<
    TrainingRecord | undefined
  >();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const columns: ColumnDef<TrainingRecord>[] = [
    {
      accessorKey: "brand",
      header: "Brand",
    },
    {
      accessorKey: "model",
      header: "Model",
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
        return price ? `₱${price.toLocaleString("en-PH")}` : "-";
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
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    if (selectedRecord) {
      toast.promise(
        updateRecord.mutateAsync({ ...data, id: selectedRecord.id! }),
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
    form.reset(record);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    toast.promise(deleteRecord.mutateAsync(id), {
      loading: "Deleting record...",
      success: "Record deleted successfully",
      error: "Failed to delete record",
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

  return (
    <div className='container mx-auto py-10'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Training Records</h1>
      </div>

      <div className='rounded-md border shadow-sm'>
        <div className='relative'>
          {isLoading && (
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
            {table.getFilteredRowModel().rows.length} records total
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              Previous
            </Button>
            <div className='text-xs text-muted-foreground'>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              Next
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
                  <Input {...form.register("specifications.category")} />
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
                  <label>Transmission</label>
                  <Input {...form.register("specifications.transmission")} />
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
                  <Input {...form.register("condition.sellerType")} />
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
