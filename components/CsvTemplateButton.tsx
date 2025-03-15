"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  MotorcycleCategory,
  TransmissionType,
  commonIssues,
} from "@/interfaces/motorcycle";
import { motorcycleBrands } from "@/constants/motorcycleBrands";

export default function CsvTemplateButton() {
  const handleDownloadTemplate = () => {
    // CSV header and sample data first
    const csvContent = `brand,model,category,displacement,transmission,yearRange,priceRangeMin,priceRangeMax,year,mileage,sellerType,owner,knownIssues,predictedPrice
Honda,Click 125i,Scooter,125,Automatic,2018-2025,81400,81400,2021,12000,Private,2,Cosmetic damage,68000
Yamaha,NMAX,Scooter,155,Automatic,2020-2025,119900,119900,2022,5000,Dealer,1,None,105000
Suzuki,Raider R150,Underbone,150,Manual,2016-2024,97900,97900,2023,3500,Private,1,Oil leaks,89500

# ============================================================
# GUIDE INFORMATION - DELETE EVERYTHING BELOW THIS LINE BEFORE UPLOADING
# ============================================================
#
# VALID CATEGORY VALUES:
${Object.values(MotorcycleCategory)
  .map((cat) => `# - ${cat}`)
  .join("\n")}
#
# VALID TRANSMISSION VALUES:
${Object.values(TransmissionType)
  .map((trans) => `# - ${trans}`)
  .join("\n")}
#
# VALID SELLER TYPES:
# - Private
# - Dealer
#
# VALID KNOWN ISSUES:
${Object.keys(commonIssues)
  .map((issue) => `# - ${issue}`)
  .join("\n")}
# - None
#
# FORMAT GUIDE:
# - yearRange: Format as "YYYY-YYYY" (start year-end year)
# - priceRangeMin/Max: Minimum and maximum price in currency units
# - owner: Can be "1", "2", "3", "4+", etc.
# - displacement: Engine displacement in cc (numeric value only)
# - mileage: Total distance traveled in kilometers (numeric value only)
# - All numeric fields should not include commas or currency symbols
#
# ============================================================
# AVAILABLE MOTORCYCLE BRANDS AND MODELS (REFERENCE ONLY)
# ============================================================
#
# This section contains all available motorcycle brands and models
# for reference when filling out the template above
#
`;

    // Generate motorcycle brands data
    const brandsData = [];
    brandsData.push(
      "# brand,model,category,displacement,transmission,yearRange,priceRangeMin,priceRangeMax"
    );

    motorcycleBrands.forEach((brand) => {
      brand.models.forEach((model) => {
        brandsData.push(
          `# ${brand.name},${model.name},${model.category},${model.displacement},${model.transmission},${model.yearRange},${model.priceRange.min},${model.priceRange.max}`
        );
      });
    });

    // Combine everything
    const finalCsvContent = csvContent + brandsData.join("\n");

    // Create blob and download link
    const blob = new Blob([finalCsvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "motorcycle_template.csv");
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("CSV template downloaded successfully");
  };

  return (
    <Button
      variant='default'
      className='flex items-center gap-2 bg-green-800 text-white hover:bg-green-900'
      onClick={handleDownloadTemplate}>
      <Download className='h-4 w-4' />
      CSV Template
    </Button>
  );
}
