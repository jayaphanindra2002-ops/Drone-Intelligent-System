import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import ChatPage from "./pages/ChatPage";
import UploadPage from "./pages/UploadPage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </DashboardLayout>
  );
}

export default App;