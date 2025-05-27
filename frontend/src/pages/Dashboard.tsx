import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewsSection from "@/components/NewsSection";
import WeatherSection from "@/components/WeatherSection";
import SettingsSection from "@/components/SettingsSection";
import BotLogsSection from "@/components/BotLogsSection";
import { useQuery } from "@tanstack/react-query";
import { TbUsers, TbUserCheck, TbBrandTelegram } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("news");
  const { toast } = useToast();
  
  // Fetch bot stats
  const { data: statsData, isLoading: statsLoading, refetch: refetchStats } = useQuery({
    queryKey: ['/api/stats'],
    refetchInterval: 60000, // Refresh every minute
  });
  
  // Handle trigger daily updates
  const handleTriggerDailyUpdates = async () => {
    try {
      const res = await apiRequest('POST', '/api/trigger-daily-updates');
      const data = await res.json();
      
      toast({
        title: "Success",
        description: data.message,
      });
      
      // Refresh the stats and logs
      refetchStats();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to trigger daily updates",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Bot Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <TbUsers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? (
                <div className="h-8 w-16 bg-neutral-200 animate-pulse rounded"></div>
              ) : (
                statsData?.stats?.totalUsers || 0
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Registered bot users
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <TbUserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? (
                <div className="h-8 w-16 bg-neutral-200 animate-pulse rounded"></div>
              ) : (
                statsData?.stats?.activeUsers || 0
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Users with daily updates enabled
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Actions</CardTitle>
            <TbBrandTelegram className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={handleTriggerDailyUpdates}
            >
              Trigger Daily Updates
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Manually send daily updates to all users
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="logs">Bot Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="news" className="space-y-4">
          <NewsSection />
        </TabsContent>
        
        <TabsContent value="weather" className="space-y-4">
          <WeatherSection />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <SettingsSection />
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-4">
          <BotLogsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
