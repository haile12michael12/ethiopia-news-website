import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TbBrandTelegram, TbNews, TbCloud, TbSettings, TbDeviceDesktop } from "react-icons/tb";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
          <TbBrandTelegram className="text-4xl text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Ethiopia News & Weather Bot</h1>
        <p className="text-xl text-gray-600 mb-8">
          Stay updated with the latest news headlines and weather forecasts from Ethiopia, 
          delivered directly to your Telegram.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="https://t.me/your_bot_username" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            <TbBrandTelegram className="mr-2 text-xl" />
            Open in Telegram
          </a>
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="inline-flex items-center">
              <TbDeviceDesktop className="mr-2 text-xl" />
              View Dashboard
            </Button>
          </Link>
        </div>
      </section>
      
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <TbNews className="text-3xl text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Ethiopian News</h2>
              <p className="text-gray-600">
                Get the latest headlines from top Ethiopian news sources like Fana Broadcasting, 
                Ethiopian News Agency, and Addis Standard.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <TbCloud className="text-3xl text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Weather Forecasts</h2>
              <p className="text-gray-600">
                Check 3-day weather forecasts for major Ethiopian cities including 
                Addis Ababa, Dire Dawa, Bahir Dar, and more.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <TbSettings className="text-3xl text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Personalized Updates</h2>
              <p className="text-gray-600">
                Customize your experience with language preferences, daily update settings,
                and your preferred city for weather information.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-neutral-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-primary font-bold">1</div>
            <h3 className="font-medium mb-2">Start the Bot</h3>
            <p className="text-sm text-gray-600">Visit the bot on Telegram and send the /start command</p>
          </div>
          <div className="text-center">
            <div className="bg-neutral-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-primary font-bold">2</div>
            <h3 className="font-medium mb-2">Use Commands</h3>
            <p className="text-sm text-gray-600">Try /news, /weather or /settings to interact with the bot</p>
          </div>
          <div className="text-center">
            <div className="bg-neutral-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-primary font-bold">3</div>
            <h3 className="font-medium mb-2">Customize</h3>
            <p className="text-sm text-gray-600">Set your preferences for language, city, and daily updates</p>
          </div>
          <div className="text-center">
            <div className="bg-neutral-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-primary font-bold">4</div>
            <h3 className="font-medium mb-2">Daily Updates</h3>
            <p className="text-sm text-gray-600">Receive automatic updates every morning at 8:00 AM</p>
          </div>
        </div>
      </section>
      
      <section className="bg-primary text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Stay Updated?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Get the latest Ethiopian news and weather updates delivered directly to your Telegram. 
          It's free, fast, and customizable to your preferences.
        </p>
        <a 
          href="https://t.me/your_bot_username" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-white text-primary hover:bg-neutral-100 py-3 px-6 rounded-lg font-medium transition-colors"
        >
          <TbBrandTelegram className="mr-2 text-xl" />
          Start Using the Bot
        </a>
      </section>
    </div>
  );
}
