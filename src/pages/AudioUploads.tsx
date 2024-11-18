import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import api from '../apis/apis.js'
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

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

const AudioPrediction = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [predictionLabel, setPredictionLabel] = useState<string | null>(null);
  const [is_loading, setIsLoading] = useState<boolean | null>(false);

  const [todayPredictions, setTodayPredictions] = useState<Prediction[] | null>(null);
  let userData = localStorage.getItem('user'); // Rename the variable for clarity


  const navigate = useNavigate();


  useEffect(() => {
    const fetchPredictions = async () => {
      try {

        if (userData) {
          const user = JSON.parse(userData); // Parse user data into an object
          let respond = await api.all_predictions();
          console.log(respond.data);

          const userPredictions = respond.data.filter((e: Prediction) => e.username === user?.access_token.username);
          const today = new Date().toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'

          if (user && !user.access_token.is_pro) {
            const todayPredictions = userPredictions.filter((e: Prediction) => e.created_at === today);
            console.log('ava', todayPredictions, today)
            setTodayPredictions(todayPredictions)
          } else {
            setTodayPredictions(null)
          }

          console.log(respond)
        }

      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    };

    fetchPredictions();
  }, [predictionLabel]);

  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select an audio file first.");
      return;
    }

    // await fetchPredictions()

    if (todayPredictions?.length>4) {
      alert("Please upgrade your account to pro");
      return;
    }

    if (userData) {
      setIsLoading(true)
      const user = JSON.parse(userData); // Parse user data into an object
      console.log(user.access_token)
      const formData = new FormData();
      formData.append('file', selectedFile); // Attach the file
      formData.append('username', user.access_token.username); // Attach the username
      formData.append('fullname', user.access_token.fullname); // Attach the username

      try {
        const response = await axios.post('http://127.0.0.1:5000/predict', formData);
        setPredictionLabel(response.data.label); // Update state with the prediction label
      } catch (error) {
        console.error("Error uploading file or fetching prediction:", error);
        alert("There was an error processing your request.");
      } finally {
        setIsLoading(false)

      }
    } else {
      alert("Un authenticated");
      navigate('/')
    }

  };

  const getPrediction =()=>{
    if(predictionLabel === 'Original'){
      return 'You Uploaded Voice is Original'
    }else if (predictionLabel === 'AudioDeepFake'){
      return 'You Uploaded Voice is Audio Deep Fake'
    }else{
      'You Uploaded Voice is Transcript Deep Fake'
    }
    return predictionLabel
  }

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      {/* {todayPredictions?.length} */}
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Card>
          <CardHeader>
            {
              todayPredictions?.length >= 5 && (
                <Alert variant="destructive">
                  {/* <AlertTitle>Error</AlertTitle> */}
                  <AlertDescription>You're almost at your upload limit! Upgrade to Pro for unlimited audio uploads and unlock more features.</AlertDescription>
                  <Button onClick={()=>navigate('/home/promo')} className="mt-4">
                    Get Pro
                  </Button>
                </Alert>
              )
            }

            <CardTitle>Audio Prediction</CardTitle>
            <CardDescription>
              Upload an audio file to predict its label using a CNN model.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <Input type="file" accept="audio/*" onChange={handleFileChange} className="mb-4" />
              <Button onClick={handleSubmit} disabled={!selectedFile || todayPredictions?.length>4}>
                {is_loading ? 'Uploading...' : 'Upload and Predict'}
              </Button>
            </div>
          </CardContent>
          {predictionLabel && (
            <CardFooter>
              <div className="flex flex-col items-center">
                <h2 className="text-2xl items-center font-bold text-green-600 bg-green-100 px-4 py-2 rounded-lg shadow-lg">
                 {getPrediction()}
                </h2>
              </div>
            </CardFooter>
          )}
        </Card>
      </main>
    </div>
  );
};

export default AudioPrediction;
