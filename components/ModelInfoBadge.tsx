import { useTrainingRecords } from "@/hooks/useTrainingRecords";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Brain } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function ModelInfoBadge() {
  const { modelInfo, isModelLoading, modelError } = useTrainingRecords();

  if (isModelLoading) {
    return (
      <Badge
        variant='outline'
        className='bg-blue-50 text-blue-700 flex items-center gap-1'>
        <Brain className='h-3 w-3' />
        <span>Loading model...</span>
      </Badge>
    );
  }

  if (modelError || !modelInfo) {
    return (
      <Badge
        variant='outline'
        className='bg-red-50 text-red-700 flex items-center gap-1'>
        <Brain className='h-3 w-3' />
        <span>Model info unavailable</span>
      </Badge>
    );
  }

  // Format the training date
  const trainingDate = parseISO(modelInfo.model.training_date);
  const timeAgo = formatDistanceToNow(trainingDate, { addSuffix: true });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant='outline'
            className='bg-green-50 text-green-700 cursor-help flex items-center gap-1 px-2 py-1'>
            <Brain className='h-3 w-3' />
            <span>ML Model: {modelInfo.model.name}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent className='p-4 w-80 space-y-3'>
          <div className='space-y-1'>
            <h4 className='font-semibold text-sm'>{modelInfo.model.name}</h4>
            <div className='flex items-center justify-between'>
              <p className='text-xs text-muted-foreground'>Trained {timeAgo}</p>
              <Badge variant='secondary' className='text-xs'>
                {modelInfo.model.version}
              </Badge>
            </div>
          </div>

          <div className='space-y-1'>
            <h5 className='text-xs font-medium'>Performance Metrics:</h5>
            <div className='grid grid-cols-2 gap-2 text-xs'>
              <div>
                <span className='text-muted-foreground'>MAE:</span>{" "}
                {modelInfo.performance.mae.toFixed(2)}
              </div>
              <div>
                <span className='text-muted-foreground'>RMSE:</span>{" "}
                {modelInfo.performance.rmse.toFixed(2)}
              </div>
              <div className='col-span-2'>
                <span className='text-muted-foreground'>R²:</span>{" "}
                <span className='font-medium text-green-600'>
                  {modelInfo.performance.r2_score.toFixed(4)}
                </span>
              </div>
            </div>
          </div>

          <div className='space-y-2 text-xs'>
            <h5 className='font-medium'>Top Features:</h5>
            <div className='grid grid-cols-1 gap-1'>
              {modelInfo.specs.top_features.map((feature, index) => (
                <div key={index} className='flex items-center'>
                  <span className='text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded mr-1'>
                    {index + 1}
                  </span>
                  <span className='text-muted-foreground'>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='flex justify-between text-xs'>
            <div>
              <span className='text-muted-foreground'>Features:</span>{" "}
              {modelInfo.specs.features_count}
            </div>
            <div>
              <span className='text-muted-foreground'>Encoders:</span>{" "}
              {modelInfo.specs.encoders_count}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
