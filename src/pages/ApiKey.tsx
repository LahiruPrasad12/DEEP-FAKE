import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import api from '../apis/apis.js'
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Copy, Check } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Prediction {
    username: string;
    fullname: string;
    created_at: string;
    label: string;
}

const ApiKey = () => {
    let userData = localStorage.getItem('user'); // Rename the variable for clarity
    const user = JSON.parse(userData)

    const [isCopied, setIsCopied] = useState(false);
    const apiKey = "http://localhost:5000/predict";

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        });
    };

    const navigate = useNavigate();

    return (
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            {/* {todayPredictions?.length} */}
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>API Key</CardTitle>
                        <CardDescription>
                            Upload an audio file to predict its label using a CNN model.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {
                            !user?.access_token?.is_pro ? (
                                <Alert variant="destructive">
                                    {/* <AlertTitle>Error</AlertTitle> */}
                                    <AlertDescription>Upgrade to Pro for access the Api Key.</AlertDescription>
                                    <Button onClick={() => navigate('/home/promo')} className="mt-4">
                                        Get Pro
                                    </Button>
                                </Alert>
                            ) : (
                                <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-sm bg-white">
                                    <h2 className="text-lg font-semibold text-gray-800">Your API Key</h2>
                                    <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md border w-full max-w-md">
                                        <span className="truncate text-gray-600">{apiKey}</span>
                                        <button
                                            onClick={handleCopy}
                                            className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-md"
                                        >
                                            {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                            {isCopied ? "Copied!" : "Copy"}
                                        </button>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Payload should be: <code className="bg-gray-100 px-2 py-1 rounded-md">file: 'your audio file'</code>
                                    </div>
                                </div>
                            )
                        }


                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default ApiKey;
