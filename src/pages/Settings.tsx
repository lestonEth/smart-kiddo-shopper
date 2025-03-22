import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import ParentalControls from '@/components/ParentalControls';
import ElevenLabsSettings from '@/components/ElevenLabsSettings';

const Settings = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-gray-600">Configure your shopping assistant preferences</p>
            </div>
            
            <Tabs defaultValue="account" className="space-y-8">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="voice">Voice</TabsTrigger>
                <TabsTrigger value="parental">Parental Controls</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account" className="space-y-6">
                <div className="grid gap-6">
                  {/* Account settings would go here */}
                  <div className="p-8 text-center text-gray-500 bg-gray-100 rounded-xl">
                    Account settings coming soon
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="voice" className="space-y-6">
                <ElevenLabsSettings />
              </TabsContent>
              
              <TabsContent value="parental" className="space-y-6">
                <ParentalControls />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Settings;
