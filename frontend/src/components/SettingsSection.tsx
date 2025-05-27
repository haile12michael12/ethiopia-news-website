import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TbInfoCircle } from "react-icons/tb";

export default function SettingsSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bot Settings</h2>
      
      <Alert className="mb-6">
        <TbInfoCircle className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          Settings are configured directly through the Telegram bot interface. 
          Use the /settings command in the bot to customize your experience.
        </AlertDescription>
      </Alert>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Settings in Telegram Bot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Default City</h3>
                <p className="text-sm text-neutral-600">
                  Choose your default city for weather forecasts from available Ethiopian cities 
                  including Addis Ababa, Dire Dawa, Bahir Dar, Hawassa, Mekelle, and Adama.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Daily Updates</h3>
                <p className="text-sm text-neutral-600">
                  Enable or disable daily updates sent at 8:00 AM (Ethiopian time).
                  You can also choose to include only news, only weather, or both.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Language Preference</h3>
                <p className="text-sm text-neutral-600">
                  Select between English, Amharic, or dual language mode to receive content in 
                  your preferred language(s).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>How to Configure</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm text-neutral-600">
              <li>Open the Ethiopia News & Weather bot in Telegram</li>
              <li>Send the command: <code className="bg-neutral-100 px-1 rounded">/settings</code></li>
              <li>Use the interactive buttons to adjust your preferences</li>
              <li>Changes take effect immediately</li>
            </ol>
            
            <div className="mt-6 p-4 bg-neutral-100 rounded-lg">
              <p className="text-sm text-neutral-500 italic">
                "All user preferences are securely stored and used only to customize your experience with the bot."
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
