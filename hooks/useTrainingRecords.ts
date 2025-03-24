import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_CONFIG } from "@/lib/config";
import { TrainingRecord, MotorcycleCategory } from "@/interfaces/motorcycle";

export interface PriceRange {
  min: number;
  max: number;
}

interface FetchTrainingRecordsParams {
  limit?: number;
  offset?: number;
  brand?: string;
  model?: string;
  category?: MotorcycleCategory;
  categories?: MotorcycleCategory[];
}

interface PaginatedResponse {
  records: TrainingRecord[];
  total: number;
  hasMore: boolean;
}

// Updated model info interface based on the simplified API response
export interface ModelInfo {
  status: string;
  model: {
    name: string;
    version: string;
    training_date: string;
    training_file: string;
  };
  performance: {
    r2_score: number;
    mae: number;
    rmse: number;
  };
  specs: {
    features_count: number;
    encoders_count: number;
    top_features: string[];
  };
  status_details: {
    model_loaded: boolean;
  };
}

// Interface for training response
export interface TrainingResponse {
  status: string;
  message: string;
  training_status: {
    is_training: boolean;
    last_training: string | null;
    status: string;
    message: string;
  };
}

// Add interface for bulk delete response
interface BulkDeleteResponse {
  status: string;
  message: string;
  total_requested: number;
  deleted_count: number;
  not_found: number[];
  errors: string[];
}

// Function to fetch the latest ML model info
const fetchModelInfo = async (): Promise<ModelInfo> => {
  const response = await fetch(`${API_CONFIG.baseUrl}/model`);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch model info: ${error}`);
  }

  return response.json();
};

// Function to trigger model training
const trainModel = async (): Promise<TrainingResponse> => {
  const response = await fetch(`${API_CONFIG.baseUrl}/train`, {
    method: "POST",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to start training: ${error}`);
  }

  return response.json();
};

const fetchTrainingRecords = async ({
  limit = 10,
  offset = 0,
  brand,
  model,
  category,
  categories,
}: FetchTrainingRecordsParams = {}): Promise<PaginatedResponse> => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  if (brand) params.set("brand", brand);
  if (model) params.set("model", model);
  if (category) params.set("category", category);
  if (categories?.length) params.set("categories", categories.join(","));

  const recordsUrl = `${API_CONFIG.baseUrl}/api/training?${params.toString()}`;
  const countUrl = `${
    API_CONFIG.baseUrl
  }/api/training-count?${params.toString()}`;

  console.log("Fetching records:", recordsUrl);
  console.log("Fetching count:", countUrl);

  const [recordsResponse, countResponse] = await Promise.all([
    fetch(recordsUrl),
    fetch(countUrl),
  ]);

  if (!recordsResponse.ok) {
    const recordsError = await recordsResponse.text();
    console.error("Records response error:", recordsError);
    throw new Error(`Failed to fetch training records: ${recordsError}`);
  }

  if (!countResponse.ok) {
    const countError = await countResponse.text();
    console.error("Count response error:", countError);
    throw new Error(`Failed to fetch count: ${countError}`);
  }

  const records = await recordsResponse.json();
  const { total } = await countResponse.json();

  return {
    records,
    total,
    hasMore: offset + records.length < total,
  };
};

async function updateTrainingRecord(
  record: TrainingRecord
): Promise<TrainingRecord> {
  const response = await fetch(
    `${API_CONFIG.baseUrl}/api/training/${record.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...record,
        predictedPrice: record.predictedPrice || null,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update training record");
  }
  return response.json();
}

async function deleteTrainingRecord(id: number): Promise<void> {
  const response = await fetch(`${API_CONFIG.baseUrl}/api/training/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete training record");
  }
}

async function bulkDeleteTrainingRecords(
  ids: number[]
): Promise<BulkDeleteResponse> {
  const response = await fetch(
    `${API_CONFIG.baseUrl}/api/training/delete-bulk`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.detail || errorData.message || "Failed to delete records"
    );
  }
  return response.json();
}

export function useTrainingRecords(params: FetchTrainingRecordsParams = {}) {
  const queryClient = useQueryClient();

  const {
    data = { records: [], total: 0, hasMore: false },
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["trainingRecords", params],
    queryFn: () => fetchTrainingRecords(params),
    placeholderData: (previousData) => previousData,
  });

  // Add query for model info
  const {
    data: modelInfo,
    isLoading: isModelLoading,
    error: modelError,
  } = useQuery({
    queryKey: ["modelInfo"],
    queryFn: fetchModelInfo,
  });

  // Add mutation for model training
  const trainModelMutation = useMutation({
    mutationFn: trainModel,
    onSuccess: () => {
      // Invalidate both model info and training records after training starts
      queryClient.invalidateQueries({ queryKey: ["modelInfo"] });
      queryClient.invalidateQueries({ queryKey: ["trainingRecords"] });
    },
  });

  const updateRecord = useMutation({
    mutationFn: updateTrainingRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainingRecords"] });
    },
  });

  const deleteRecord = useMutation({
    mutationFn: deleteTrainingRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainingRecords"] });
    },
  });

  const bulkDelete = useMutation({
    mutationFn: bulkDeleteTrainingRecords,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["trainingRecords"] });
      // You can handle the detailed response here if needed
      if (data.not_found.length > 0 || data.errors.length > 0) {
        console.warn("Some records were not deleted:", {
          notFound: data.not_found,
          errors: data.errors,
        });
      }
    },
  });

  const uploadCsv = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`${API_CONFIG.baseUrl}/api/training/bulk`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainingRecords"] });
    },
  });

  return {
    records: data.records,
    total: data.total,
    hasMore: data.hasMore,
    isLoading,
    isFetching,
    modelInfo,
    isModelLoading,
    modelError,
    updateRecord,
    deleteRecord,
    bulkDelete,
    uploadCsv,
    trainModel: trainModelMutation,
  };
}
