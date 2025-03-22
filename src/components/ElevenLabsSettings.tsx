
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle, X } from "lucide-react";
import { setElevenLabsApiKey, getElevenLabsApiKey } from '@/services/elevenlabs';

const ElevenLabsSettings = () => {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    const savedKey = getElevenLabsApiKey();
    if (savedKey) {
      setApiKey(savedKey);
      setIsSaved(true);
    }
  }, []);
  
  const handleSave = () => {
    if (apiKey.trim()) {
      setElevenLabsApiKey(apiKey.trim());
      setIsSaved(true);
      toast({
        title: "API Key Saved",
        description: "Your ElevenLabs API key has been saved successfully.",
      });
    } else {
      toast({
        title: "API Key Required",
        description: "Please enter a valid ElevenLabs API key.",
        variant: "destructive",
      });
    }
  };
  
  const handleClear = () => {
    setApiKey('');
    setElevenLabsApiKey('');
    setIsSaved(false);
    toast({
      title: "API Key Removed",
      description: "Your ElevenLabs API key has been removed.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>ElevenLabs Voice Settings</CardTitle>
        <CardDescription>
          Configure your ElevenLabs API key to enable advanced voice features.
          Get your API key from <a href="https://elevenlabs.io/app" target="_blank" rel="noopener noreferrer" className="text-brand-blue underline">ElevenLabs</a>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">ElevenLabs API Key</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your ElevenLabs API key"
                className="flex-1"
              />
              {isSaved && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-1" />
                  <span className="text-sm">Saved</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleClear}>
          <X className="h-4 w-4 mr-2" />
          Clear
        </Button>
        <Button onClick={handleSave}>Save API Key</Button>
      </CardFooter>
    </Card>
  );
};

export default ElevenLabsSettings;
