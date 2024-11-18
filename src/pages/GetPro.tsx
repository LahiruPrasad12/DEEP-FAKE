import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';


const GetPro = () => {

  const [selectedPackage, setSelectedPackage] = useState(''); // Track selected package

  const navigate = useNavigate();

  useEffect(() => {
    let userData = localStorage.getItem('user');

    if (userData) {
      const user = JSON.parse(userData)
      setSelectedPackage(user.access_token.is_pro ? 'pro' : 'normal')
    }
  }, [])


  // Function to handle package selection
  const handlePackageSelect = (packageType: React.SetStateAction<string>) => {
    setSelectedPackage(packageType);
  };
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Get Pro</CardTitle>
            <CardDescription>
              Get Pro version to unlimited access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6 flex-wrap justify-center">
              {/* Normal Package Card */}
              <Card
                className={`transition-all duration-300 transform ${selectedPackage === 'normal' ? 'shadow-2xl border-blue-500' : 'shadow-lg border-gray-300'} rounded-lg hover:scale-105 w-72 h-100 bg-white`}
              >
                <CardHeader className="text-center py-4">
                  <CardTitle className="text-3xl font-bold text-blue-600">Normal Plan</CardTitle>
                  <CardDescription className="text-lg text-gray-600 mt-2">
                    limited uploads with a daily prediction view.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center px-6 py-4">
                  <p className="text-lg text-gray-800 font-semibold mb-4">Features:</p>
                  <ul className="list-disc pl-8 text-gray-600">
                    <li className="text-lg mb-2">5 Audios Upload per Day</li>
                    <li className="text-lg mb-2">View Today's Prediction</li>
                  </ul>
                  <p className="mt-4 text-xl font-semibold text-gray-700">Free</p>
                </CardContent>
                <CardFooter className="text-center py-4" >
                  <Button
                    disabled={true}
                    className={`w-full ${selectedPackage === 'normal' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'} hover:bg-blue-500 transition duration-300`}
                    onClick={() => handlePackageSelect('normal')}
                  >
                    {selectedPackage === 'normal' ? 'Selected' : selectedPackage === "pro" ? "You have selected Pro" : "You have selected Normal"}
                  </Button>
                </CardFooter>
              </Card>

              {/* Pro Package Card */}
              <Card
                className={`transition-all duration-300 transform ${selectedPackage === 'pro' ? 'shadow-2xl border-blue-500' : 'shadow-lg border-gray-300'} rounded-lg hover:scale-105 w-72 h-100 bg-white`}
              >
                <CardHeader className="text-center py-4">
                  <CardTitle className="text-3xl font-bold text-blue-600">Pro Plan</CardTitle>
                  <CardDescription className="text-lg text-gray-600 mt-2">
                    unlimited uploads & prediction view.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center px-6 py-4">
                  <p className="text-lg text-gray-800 font-semibold mb-4">Features:</p>
                  <ul className="list-disc pl-8 text-gray-600">
                    <li className="text-lg mb-2">Unlimited Audio Uploads</li>
                    <li className="text-lg mb-2">View Historical Predictions</li>
                    <li className="text-lg mb-2">Priority Support</li>
                  </ul>
                  <p className="mt-4 text-xl font-semibold text-gray-700">$29.99 / Month</p>
                </CardContent>
                <CardFooter className="text-center py-4">
                  <Button
                    disabled={selectedPackage === 'pro'}
                    className={`w-full ${selectedPackage !== 'pro' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'} hover:bg-blue-500 transition duration-300`}
                    onClick={() => navigate('/home/pay')}
                  >
                    {selectedPackage === 'pro' ? 'Selected' : 'Select Pro Plan'}
                  </Button>
                </CardFooter>


              </Card>

            </div>
            {/* <div className="mt-8 p-6 bg-gray-100 items-center justify-center rounded-lg text-center shadow-xl max-w-md w-full">
              <h2 className="text-2xl font-bold text-gray-700">You have selected the {selectedPackage === 'normal' ? 'Normal' : 'Pro'} Plan</h2>
              <p className="mt-2 text-lg text-gray-600">
                {selectedPackage === 'normal'
                  ? 'You can upload 5 audios per day and view today’s prediction.'
                  : 'You can upload unlimited audios and view historical data.'}
              </p>
            </div> */}

          </CardContent>

        </Card>
      </main>
    </div>
  );
};

export default GetPro;
