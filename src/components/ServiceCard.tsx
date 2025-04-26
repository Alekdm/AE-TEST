import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Laptop,
  Wifi,
  Shield,
  Home,
  Server,
  Monitor,
  Tv,
  HardDrive,
  Phone,
  Bug,
  Printer,
} from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  priceRange: string;
  icon: string;
  onClick?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  laptop: <Laptop className="h-8 w-8" />,
  wifi: <Wifi className="h-8 w-8" />,
  shield: <Shield className="h-8 w-8" />,
  home: <Home className="h-8 w-8" />,
  server: <Server className="h-8 w-8" />,
  monitor: <Monitor className="h-8 w-8" />,
  tv: <Tv className="h-8 w-8" />,
  hardDrive: <HardDrive className="h-8 w-8" />,
  phone: <Phone className="h-8 w-8" />,
  bug: <Bug className="h-8 w-8" />,
  printer: <Printer className="h-8 w-8" />,
};

const ServiceCard = ({
  title = "Computer Setup",
  description = "Complete setup and optimization of new computers and laptops for optimal performance.",
  priceRange = "$100-$150",
  icon = "laptop",
  onClick = () => {
    // Find the booking section and scroll to it
    const bookingSection = document.querySelector(
      ".bg-blue-600.text-white.py-16",
    );
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
      // Find and click the booking button after scrolling
      setTimeout(() => {
        const bookingButton = document.querySelector(
          ".bg-blue-600.hover\\:bg-blue-700",
        );
        if (bookingButton instanceof HTMLButtonElement) {
          bookingButton.click();
        }
      }, 800);
    }
  },
}: ServiceCardProps) => {
  return (
    <Card className="w-[350px] h-[280px] flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-100 text-blue-600">
            {iconMap[icon] || <Laptop className="h-8 w-8" />}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm text-gray-600">
          {description}
        </CardDescription>
        <Badge
          variant="outline"
          className="mt-4 bg-blue-50 text-blue-700 border-blue-200"
        >
          {priceRange}
        </Badge>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          onClick={onClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Request Quote
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
