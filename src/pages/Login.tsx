import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import loginImg from '../assets/login.jpg';
import api from '../apis/apis.js'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [is_loading, setIdLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIdLoading(true)
    let payload = {
      username: email,
      password: password
    }

    try {
      const response = await api.login(payload);
      console.log(response.data)
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate("/home/dashboard")
    } catch (error) {
      console.error('Error:', error);
      setError('Your email or password is incorrect! Please try again.');
      setShowAlert(true);
    } finally {
      setIdLoading(false)
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen">
      <div className="hidden bg-muted lg:block relative">
        <img src={loginImg} className="h-screen w-full object-cover" alt="login" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          {showAlert && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
              <Button onClick={() => setShowAlert(false)} className="mt-4 w-full">
                Close
              </Button>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {is_loading?'Signing...':'Sign In'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;