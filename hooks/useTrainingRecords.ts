import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_CONFIG } from "@/lib/config";

export interface PriceRange {
  min: number;
  max: number;
}

export interface Specifications {
  category: string;
  displacement: number;
  transmission: string;
  yearRange: string;
  priceRange: PriceRange;
}

export interface Condition {
  year: number;
  mileage: number;
  sellerType: string;
  owner: string;
  knownIssues: string;
}

export interface TrainingRecord {
  id?: number;
  brand: string;
  model: string;
  specifications: Specifications;
  condition: Condition;
  predictedPrice?: number;
  created_at?: string;
}

const fetchTrainingRecords = async (): Promise<TrainingRecord[]> => {
  const response = await fetch(`${API_CONFIG.baseUrl}/api/training`);
  if (!response.ok) {
    throw new Error("Failed to fetch training records");
  }
  return response.json();
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
      body: JSON.stringify(record),
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

export function useTrainingRecords() {
  const queryClient = useQueryClient();

  const { data: records = [], isLoading } = useQuery({
    queryKey: ["trainingRecords"],
    queryFn: fetchTrainingRecords,
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

  return {
    records,
    isLoading,
    updateRecord,
    deleteRecord,
  };
}
