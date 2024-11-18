import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import AudioUploads from '../pages/AudioUploads';
import GetPro from '../pages/GetPro';
import Payment from '../pages/Payment';
import History from '../pages/History';
import MyDashboard from '../pages/MyDashboard';
import ApiKey from '../pages/ApiKey';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="audio" element={<AudioUploads />} />
        <Route path="promo" element={<GetPro />} />
        <Route path="pay" element={<Payment />} />
        <Route path="history" element={<History />} />
        <Route path="my-dashboard" element={<MyDashboard />} />
        <Route path="api-key" element={<ApiKey />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;