import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


const MyDashboard = () => {
    const [predictions, setPredictions] = useState<Prediction[] | null>(null);
    let userData = localStorage.getItem('user'); // Rename the variable for clarity
    const navigate = useNavigate();

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
            if (userData) {
                try {
                    const user = JSON.parse(userData); // Parse user data into an object
                    let respond = await api.all_predictions();
                    console.log(respond.data);
                    const myPredictions = respond.data.filter((e: Prediction) => e.username === user?.access_token.username);
                    setPredictions(myPredictions)
                }

                catch (error) {
                    console.error("Error fetching predictions:", error);
                }
            } else {
                navigate('/')
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
                    {
                        predictions && predictions.length > 0 ? (
                            <CardContent>
                                <div className="text-2xl font-bold">Prediction Data</div>
                                <div className="h-48">
                                    <Bar data={chartData} />
                                </div>
                            </CardContent>
                        ) : (
                            <div className="flex justify-center items-center text-gray-500 mb-5">
                                There's no data available
                            </div>
                        )
                    }

                </Card>

                <Card x-chunk="dashboard-01-chunk-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Predictions by Label (Pie Chart)
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    {
                        predictions && predictions.length > 0 ? (
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
                        ) : (
                            <div className="flex justify-center items-center text-gray-500 mb-5">
                                There's no data available
                            </div>
                        )
                    }

                </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-1">
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
                        {/* <Button asChild size="sm" className="ml-auto gap-1">
                            <Link to="#">
                                View All
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </Button> */}
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-auto max-h-64 border border-gray-200 rounded">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Label</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {predictions && predictions.length > 0 ? (
                                        predictions.slice(0, 6).map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <div className="font-medium">{item.fullname}</div>
                                                    {/* <div className="hidden text-sm text-muted-foreground md:inline">
                                                        {item.username}
                                                    </div> */}
                                                </TableCell>
                                                <TableCell>
                                                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-semibold">
                                                        {item.created_at}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-semibold">
                                                        {item.label}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center py-4">
                                                <div className="text-gray-500">There's no data available</div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>

                            </Table>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default MyDashboard;