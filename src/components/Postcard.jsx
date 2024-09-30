import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import Spline from "@splinetool/react-spline";

export default function PostCard() {
  return (
    <div className="relative min-h-screen flex justify-center">
      
      {/* Spline 3D Model Background */}
      <div className="absolute inset-0 z-0">
        <Spline
           scene="https://prod.spline.design/S2ym3-vPlueq5Ekr/scene.splinecode" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center p-10  text-center min-h-screen w-100 bg-transparent border ">
        
        {/* Event Image Section */}
        <div className="flex justify-center relative w-full max-w-[380px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[600px] text-center ">
          <img 
            src="https://www.shutterstock.com/image-photo/blockchain-technology-concept-revolutionizing-industries-600nw-2481711293.jpg" 
            alt="BlockMania" 
            className="w-1/2 md:w-2/3 lg:w-4/4 h-auto"
          />
          <div className="absolute bottom-3 right-3 bg-green rounded-md px-3 py-1 font-bold text-sm">
            09/28
          </div>
        </div>

        {/* Event Information Section */}
        <Card className="mt-6 w-full max-w-[380px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] text-center bg-transparent text-white ">
          <CardHeader>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Web3 MeetUp</h1>
          </CardHeader>
          <CardContent>
            <div className="text-left space-y-2">
              <p><strong>Date:</strong> Sunday, September 29</p>
              <p><strong>Time:</strong> 5:00 PM - 7:00 PM</p>
              <p><strong>Venue:</strong> Kisan Nagar, Mumbai, Maharashtra</p>
              <p className="text-gray-500">Past Event – This event ended yesterday.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gray-600">Request to Join</Button>
          </CardFooter>
        </Card>

        {/* About Event */}
        <Card className="mt-4 w-full max-w-[380px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] text-left">
          <CardHeader>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">About Event</h2>
          </CardHeader>
          <CardContent>
            <p><strong>Topic:</strong> Blockchain and CryptoCurrencies</p>
            <p><strong>Hosted by:</strong> Siddesh Pansare</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
