import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TbRefresh } from "react-icons/tb";

interface NewsItem {
  source: string;
  title: string;
  title_amharic?: string;
  link?: string;
  published_at?: string;
}

export default function NewsSection() {
  const [limit, setLimit] = useState(5);
  
  // Fetch news data
  const { data: newsData, isLoading, isError, refetch } = useQuery({
    queryKey: [`/api/news?limit=${limit}`],
  });
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Latest News Headlines</h2>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <TbRefresh className="mr-2" />
          Refresh
        </Button>
      </div>
      
      {isLoading ? (
        // Loading skeleton
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-3 w-1/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </CardContent>
            </Card>
          ))}
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
              <h3 className="text-lg font-medium text-red-800">Unable to fetch news</h3>
              <p className="text-red-600 mt-1">There was a problem connecting to the news sources.</p>
              <Button variant="outline" className="mt-4" onClick={() => refetch()}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        // News content
        <div className="space-y-4">
          {newsData?.data?.map((news: NewsItem, index: number) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{news.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-between text-sm text-neutral-500 mb-2">
                  <Badge variant="outline">{news.source}</Badge>
                  {news.published_at && <span>{news.published_at}</span>}
                </div>
                
                {news.title_amharic && (
                  <div className="mt-2 text-sm italic border-l-2 border-primary pl-2">
                    {news.title_amharic}
                  </div>
                )}
                
                {news.link && (
                  <div className="mt-2">
                    <a 
                      href={news.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      Read more
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          {/* Show more/less buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            {limit > 5 && (
              <Button variant="outline" onClick={() => setLimit(5)}>
                Show Less
              </Button>
            )}
            {(newsData?.data?.length >= limit) && (
              <Button variant="outline" onClick={() => setLimit(limit + 5)}>
                Show More
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
