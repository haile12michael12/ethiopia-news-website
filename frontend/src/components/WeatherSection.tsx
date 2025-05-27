import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { TbRefresh, TbTemperature, TbWind, TbDroplet } from "react-icons/tb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WiDaySunny, WiCloudy, WiRain, WiThunderstorm, WiFog, WiSnow } from "react-icons/wi";

interface WeatherIconProps {
  condition: string;
  className?: string;
}

function WeatherIcon({ condition, className = "w-8 h-8" }: WeatherIconProps) {
  switch (condition.toLowerCase()) {
    case 'clear':
    case 'sunny':
      return <WiDaySunny className={className} />;
    case 'clouds':
    case 'cloudy':
    case 'partly cloudy':
      return <WiCloudy className={className} />;
    case 'rain':
    case 'drizzle':
      return <WiRain className={className} />;
    case 'thunderstorm':
      return <WiThunderstorm className={className} />;
    case 'fog':
    case 'mist':
      return <WiFog className={className} />;
    case 'snow':
      return <WiSnow className={className} />;
    default:
      return <WiDaySunny className={className} />;
  }
}

export default function WeatherSection() {
  const [city, setCity] = useState("addis_ababa");
  
  // Fetch reference data (cities)
  const { data: referenceData } = useQuery({
    queryKey: ['/api/reference-data'],
  });
  
  // Fetch weather data
  const { data: weatherData, isLoading, isError, refetch } = useQuery({
    queryKey: [`/api/weather/${city}`],
  });
  
  // Format date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };
  
  // Get day name from timestamp
  const getDayName = (timestamp: number, index: number) => {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';
    
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold">Weather Forecast</h2>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {referenceData?.data?.cities?.map((city: any) => (
                <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <TbRefresh className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        // Loading skeleton
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="ml-4 space-y-2 flex-1">
                  <Skeleton className="h-8 w-1/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <Skeleton className="h-4 w-1/3 mx-auto mb-2" />
                  <Skeleton className="h-10 w-10 rounded-full mx-auto mb-2" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : isError ? (
        // Error state
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="text-red-500 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-red-800">Unable to fetch weather</h3>
              <p className="text-red-600 mt-1">There was a problem connecting to the weather service.</p>
              <Button variant="outline" className="mt-4" onClick={() => refetch()}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Weather content
        <div className="space-y-6">
          {/* Current Weather */}
          <Card>
            <CardHeader>
              <CardTitle>
                Current Weather in {referenceData?.data?.cities?.find((c: any) => c.id === city)?.name || 'Addis Ababa'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex flex-col items-center">
                  <WeatherIcon condition={weatherData?.data?.current?.weather[0]?.main} className="w-20 h-20 text-primary" />
                  <span className="text-lg mt-2">{weatherData?.data?.current?.weather[0]?.description}</span>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex items-end">
                    <span className="text-5xl font-bold">{Math.round(weatherData?.data?.current?.temp)}°C</span>
                    <span className="text-lg ml-2 text-neutral-500">Feels like {Math.round(weatherData?.data?.current?.feels_like)}°C</span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <TbDroplet className="text-blue-500 mr-2" />
                      <span>Humidity: {weatherData?.data?.current?.humidity}%</span>
                    </div>
                    <div className="flex items-center">
                      <TbWind className="text-blue-500 mr-2" />
                      <span>Wind: {weatherData?.data?.current?.wind_speed} km/h</span>
                    </div>
                    <div className="flex items-center">
                      <TbTemperature className="text-blue-500 mr-2" />
                      <span>Last updated: {new Date(weatherData?.data?.current?.dt * 1000).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* 3-Day Forecast */}
          <div>
            <h3 className="text-xl font-semibold mb-4">3-Day Forecast</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {weatherData?.data?.daily?.slice(0, 3).map((day: any, index: number) => (
                <Card key={index}>
                  <CardContent className="pt-6 text-center">
                    <h4 className="text-lg font-medium mb-2">{getDayName(day.dt, index)}</h4>
                    <div className="flex justify-center mb-2">
                      <WeatherIcon condition={day.weather[0].main} className="w-12 h-12 text-primary" />
                    </div>
                    <div className="mb-1">
                      <span className="text-xl font-semibold">{Math.round(day.temp.max)}°</span>
                      <span className="text-neutral-500 mx-1">/</span>
                      <span className="text-lg">{Math.round(day.temp.min)}°</span>
                    </div>
                    <p className="text-sm text-neutral-600">{day.weather[0].description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
