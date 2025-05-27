import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { TbRefresh } from "react-icons/tb";
import { Badge } from "@/components/ui/badge";

interface LogEntry {
  id: number;
  telegram_id: string;
  command: string;
  message: string;
  timestamp: number;
}

export default function BotLogsSection() {
  const [limit, setLimit] = useState(50);
  
  // Fetch logs data
  const { data: logsData, isLoading, isError, refetch } = useQuery({
    queryKey: [`/api/logs?limit=${limit}`],
    refetchInterval: 30000, // Refresh every 30 seconds
  });
  
  // Format timestamp
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };
  
  // Get badge variant based on command
  const getBadgeVariant = (command: string) => {
    const lowerCommand = command.toLowerCase();
    if (lowerCommand === 'error') return 'destructive';
    if (lowerCommand.includes('daily_update')) return 'default';
    if (lowerCommand === '/start') return 'secondary';
    if (lowerCommand === '/news') return 'outline';
    if (lowerCommand === '/weather') return 'outline';
    if (lowerCommand === '/settings') return 'outline';
    return 'secondary';
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Bot Activity Logs</h2>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <TbRefresh className="mr-2" />
          Refresh
        </Button>
      </div>
      
      {isLoading ? (
        // Loading skeleton
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex">
                  <Skeleton className="h-4 w-24 mr-4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
              <h3 className="text-lg font-medium text-red-800">Unable to fetch logs</h3>
              <p className="text-red-600 mt-1">There was a problem retrieving bot activity logs.</p>
              <Button variant="outline" className="mt-4" onClick={() => refetch()}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Logs content
        <Card>
          <CardContent className="pt-6">
            {logsData?.data?.length === 0 ? (
              <div className="text-center text-neutral-500 py-8">
                <p>No logs available yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium p-2">Time</th>
                        <th className="text-left font-medium p-2">User ID</th>
                        <th className="text-left font-medium p-2">Command</th>
                        <th className="text-left font-medium p-2">Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logsData?.data?.map((log: LogEntry) => (
                        <tr key={log.id} className="border-b hover:bg-neutral-50">
                          <td className="p-2 whitespace-nowrap text-neutral-500">
                            {formatTimestamp(log.timestamp)}
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            {log.telegram_id === 'SYSTEM' ? (
                              <Badge variant="secondary">SYSTEM</Badge>
                            ) : (
                              log.telegram_id
                            )}
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <Badge variant={getBadgeVariant(log.command)}>
                              {log.command}
                            </Badge>
                          </td>
                          <td className="p-2">{log.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Show more/less buttons */}
                <div className="flex justify-center space-x-4 mt-6">
                  {limit > 50 && (
                    <Button variant="outline" onClick={() => setLimit(50)}>
                      Show Less
                    </Button>
                  )}
                  {logsData?.data?.length >= limit && (
                    <Button variant="outline" onClick={() => setLimit(limit + 50)}>
                      Show More
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
