import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MotorcycleModel } from "@/interfaces/motorcycle";

interface SpecificationsContainerProps {
  modelDetails: MotorcycleModel | null;
  selectedBrand: string;
}

export default function SpecificationsContainer({
  modelDetails,
  selectedBrand,
}: SpecificationsContainerProps) {
  return (
    <div className='relative w-full'>
      {modelDetails ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}>
          <Card className='border border-blue-200 shadow-sm overflow-hidden bg-gradient-to-b from-white to-blue-50 w-full'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between mb-6'>
                <div className='space-y-1'>
                  <h2 className='text-base font-semibold text-blue-950'>
                    {modelDetails.name}
                  </h2>
                  <p className='text-xs text-blue-600/70'>{selectedBrand}</p>
                </div>
                <span className='text-[10px] font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200'>
                  {modelDetails.category}
                </span>
              </div>

              <div className='divide-y divide-blue-100'>
                <div className='pb-4'>
                  <p className='text-[10px] font-medium uppercase tracking-wider text-blue-600/70 mb-2'>
                    Price Range
                  </p>
                  <div className='flex items-baseline gap-2'>
                    <span className='text-lg font-semibold text-blue-950'>
                      ₱{modelDetails.priceRange.min.toLocaleString()}
                    </span>
                    <span className='text-blue-300'>—</span>
                    <span className='text-lg font-medium text-blue-700'>
                      ₱{modelDetails.priceRange.max.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className='grid grid-cols-3 gap-6 py-4'>
                  <div>
                    <p className='text-[10px] font-medium uppercase tracking-wider text-blue-600/70 mb-2'>
                      Engine
                    </p>
                    <p className='text-sm font-medium text-blue-950'>
                      {modelDetails.displacement}cc
                    </p>
                  </div>
                  <div>
                    <p className='text-[10px] font-medium uppercase tracking-wider text-blue-600/70 mb-2'>
                      Transmission
                    </p>
                    <p className='text-sm font-medium text-blue-950'>
                      {modelDetails.transmission}
                    </p>
                  </div>
                  <div>
                    <p className='text-[10px] font-medium uppercase tracking-wider text-blue-600/70 mb-2'>
                      Year Range
                    </p>
                    <p className='text-sm font-medium text-blue-950'>
                      {modelDetails.yearRange}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}>
          <Card className='border border-blue-100 border-dashed bg-blue-50/50 w-full'>
            <CardContent className='flex items-center justify-center p-6 text-center'>
              <p className='text-sm text-blue-600/70'>
                Select a motorcycle model to view specifications
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
