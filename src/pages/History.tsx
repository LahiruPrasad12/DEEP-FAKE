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

import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


const Dashboard = () => {
    const [predictions, setPredictions] = useState<Prediction[] | null>(null);

    useEffect(() => {
        const fetchPredictions = async () => {
            try {

                let respond = await api.all_predictions();
                console.log(respond.data);
                setPredictions(respond.data)
            }

            catch (error) {
                console.error("Error fetching predictions:", error);
            }

        }
        fetchPredictions();
    }, []);

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Card
                    className="xl:col-span-4" x-chunk="dashboard-01-chunk-4"
                >
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Checked Audio</CardTitle>
                            <CardDescription>
                                Recent audio from your store.
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-auto max-h-80 border border-gray-200 rounded">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Label</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        predictions?.map((item, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <div className="font-medium">{item.fullname}</div>
                                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                                            {item.username}
                                                        </div>
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
                                            );
                                        })
                                    }

                                </TableBody>
                            </Table>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default Dashboard;