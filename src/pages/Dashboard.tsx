import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import api from '../apis/apis.js'

interface Prediction {
  username: string;
  fullname: string;
  created_at: string;
  label: string;
}

interface User {
  username: string;
  fullname: string;
  created_at: string;
}


import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


const Dashboard = () => {
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);

  const [chartData, setChartData] = useState({
    labels: ['AudioDeepFake', 'Original', 'TranscriptDeepFake'],
    datasets: [
      {
        label: 'Prediction Count',
        data: [0, 0, 0],  // Default counts for the 3 labels
        backgroundColor: 'rgba(54, 162, 235, 0.6)',  // Bar color
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  });

  const [pieChart, setPieChart] = useState({
    labels: ['AudioDeepFake', 'Original', 'TranscriptDeepFake'],
    datasets: [
      {
        label: 'Prediction Count',
        data: [0, 0, 0],  // Default counts for the 3 labels
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',  // Blue for AudioDeepFake
          'rgba(255, 99, 132, 0.6)',  // Red for Original
          'rgba(75, 192, 192, 0.6)',  // Green for TranscriptDeepFake
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',  // Blue border
          'rgba(255, 99, 132, 1)',  // Red border
          'rgba(75, 192, 192, 1)',  // Green border
        ],
        borderWidth: 1
      }
    ]
  });

  useEffect(() => {
    const fetchPredictions = async () => {
      try {

        let respond = await api.all_predictions();
        let respon2 = await api.all_users();
        console.log(respond.data);
        const sortedData = respond.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setPredictions(sortedData)
        setUsers(respon2.data)
      }

      catch (error) {
        console.error("Error fetching predictions:", error);
      }

    }
    fetchPredictions();
  }, []);

  useEffect(() => {
    if (predictions) {
      console.log('ava', predictions)
      const chartData = { 'AudioDeepFake': 0, 'Original': 0, 'TranscriptDeepFake': 0 };

      predictions.forEach((prediction) => {
        console.log(prediction.label)

        console.log(chartData[prediction.label])
        if (chartData[prediction.label] !== undefined) {
          chartData[prediction.label] += 1;
        }
      });

      console.log(chartData, 'q')

      setChartData({
        labels: ['AudioDeepFake', 'Original', 'TranscriptDeepFake'],
        datasets: [
          {
            label: 'Prediction Count',
            data: [chartData.AudioDeepFake, chartData.Original, chartData.TranscriptDeepFake],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      });

      setPieChart({
        labels: ['AudioDeepFake', 'Original', 'TranscriptDeepFake'],
        datasets: [
          {
            label: 'Prediction Count',
            data: [chartData.AudioDeepFake, chartData.Original, chartData.TranscriptDeepFake],
            backgroundColor: [
              'rgba(54, 162, 235, 0.6)',  // Blue for AudioDeepFake
              'rgba(255, 99, 132, 0.6)',  // Red for Original
              'rgba(75, 192, 192, 0.6)',  // Green for TranscriptDeepFake
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',  // Blue border
              'rgba(255, 99, 132, 1)',  // Red border
              'rgba(75, 192, 192, 1)',  // Green border
            ],
            borderWidth: 1
          }
        ]
      });
    }
  }, [predictions]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Predictions by Label (Bar Chart)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Prediction Data</div>
            <div className="h-48">
              <Bar data={chartData} />
            </div>
          </CardContent>
        </Card>

        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Predictions by Label (Pie Chart)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Prediction Data</div>
            <div className="flex items-center space-x-4">
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <span style={{ color: 'rgba(54, 162, 235, 1)' }}>•</span>
                  <span>AudioDeepFake</span>
                </div>
                <div className="flex space-x-2">
                  <span style={{ color: 'rgba(255, 99, 132, 1)' }}>•</span>
                  <span>Original</span>
                </div>
                <div className="flex space-x-2">
                  <span style={{ color: 'rgba(75, 192, 192, 1)' }}>•</span>
                  <span>TranscriptDeepFake</span>
                </div>
              </div>
              <div className="h-48 w-48">
                <Pie data={pieChart} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <Card
          className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
        >
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Audio</CardTitle>
              <CardDescription>
                Recent audio from your store.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link to="/home/history">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden xl:table-column">
                    Type
                  </TableHead>
                  <TableHead className="hidden xl:table-column">
                    Status
                  </TableHead>
                  <TableHead className="hidden xl:table-column">
                    Date
                  </TableHead>
                  <TableHead className="text-right">Label</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  predictions?.slice(0, 6).map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="font-medium">{item.fullname}</div>
                          {/* <div className="hidden text-sm text-muted-foreground md:inline">
                            {item.username}
                          </div> */}
                        </TableCell>
                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                          {item.created_at}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-semibold">
                            {item.label}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })
                }

              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {/* <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {
              users?.map((item) => {
                return (
                  <div className="flex items-center gap-4" key={item.username}>
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>
                        {item.fullname.split(" ").map(name => name[0]).join("").slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {item.fullname}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.username}
                      </p>
                    </div>
                  </div>
                );
              })
            }


          </CardContent>
        </Card> */}
      </div>
    </main>
  );
};

export default Dashboard;