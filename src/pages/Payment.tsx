import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../apis/apis.js'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Payment = () => {
    const [predictionLabel, setPredictionLabel] = useState<string | null>(null);
    const [is_loading, setIsLoading] = useState<boolean | null>(false);

    const navigate = useNavigate();

    const [paymentDetails, setPaymentDetails] = useState({
        cardholderName: '',
        cardNumber: '',
        expDate: '',
        cvv: ''
    });
    const [formErrors, setFormErrors] = useState({
        cardholderName: '',
        cardNumber: '',
        expDate: '',
        cvv: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({
            ...paymentDetails,
            [name]: value
        });
    };

    const validateForm = () => {
        const errors = {
            cardholderName: '',
            cardNumber: '',
            expDate: '',
            cvv: ''
        };

        let isValid = true;

        if (!paymentDetails.cardholderName) {
            errors.cardholderName = 'Cardholder name is required';
            isValid = false;
        }

        if (!paymentDetails.cardNumber || paymentDetails.cardNumber.length !== 16) {
            errors.cardNumber = 'Card number must be 16 digits';
            isValid = false;
        }

        if (!paymentDetails.expDate || !/\d{2}\/\d{2}/.test(paymentDetails.expDate)) {
            errors.expDate = 'Expiration date must be in MM/YY format';
            isValid = false;
        }

        if (!paymentDetails.cvv || paymentDetails.cvv.length !== 3) {
            errors.cvv = 'CVV must be 3 digits';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            let userData = localStorage.getItem('user'); // Rename the variable for clarity
            setIsLoading(true)
            if (userData) {
                const user = JSON.parse(userData); // Parse user data into an object
                console.log(user.access_token)
                let payload = {
                    username: user.access_token.username
                }
                try {
                    const response = await api.get_pro(payload);
                    console.log(response.data)
                    localStorage.setItem('user', JSON.stringify(response.data));
                    navigate("/home/promo")
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


        } else {
            // alert('Please fix the errors in the form.');
        }
    };

    return (
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Make Payment</CardTitle>
                        <CardDescription>
                            Get Pro version to unlimited access
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center gap-4">
                            <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                                {/* Cardholder Name */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                                    <input
                                        type="text"
                                        name="cardholderName"
                                        value={paymentDetails.cardholderName}
                                        onChange={handleInputChange}
                                        className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter cardholder name"
                                    />
                                    <p className="text-red-500 text-xs mt-1">{formErrors.cardholderName}</p>
                                </div>

                                {/* Card Number */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={paymentDetails.cardNumber}
                                        onChange={handleInputChange}
                                        className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter card number"
                                    />
                                    <p className="text-red-500 text-xs mt-1">{formErrors.cardNumber}</p>
                                </div>

                                {/* Expiration Date and CVV */}
                                <div className="flex gap-4 mb-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700">Exp Date (MM/YY)</label>
                                        <input
                                            type="text"
                                            name="expDate"
                                            value={paymentDetails.expDate}
                                            onChange={handleInputChange}
                                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="MM/YY"
                                        />
                                        <p className="text-red-500 text-xs mt-1">{formErrors.expDate}</p>
                                    </div>

                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700">CVV</label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={paymentDetails.cvv}
                                            onChange={handleInputChange}
                                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="CVV"
                                        />
                                        <p className="text-red-500 text-xs mt-1">{formErrors.cvv}</p>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-between mt-6">
                                    <Button
                                        onClick={() => navigate('/home/promo')}
                                        className="w-1/3 py-2 bg-gray-300 text-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-400"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSubmit}
                                        className="w-1/3 py-2 bg-blue-600 text-white rounded-lg transition-all duration-300 hover:bg-blue-700"
                                    >
                                        {is_loading ? 'Processing...' : 'Submit Payment'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </CardContent>
                    {predictionLabel && (
                        <CardFooter>
                            <div className="flex flex-col items-center">
                                <h2 className="text-2xl font-bold text-green-600 bg-green-100 px-4 py-2 rounded-lg shadow-lg">
                                    {predictionLabel}
                                </h2>
                            </div>
                        </CardFooter>
                    )}
                </Card>
            </main>
        </div>
    );
};

export default Payment;
