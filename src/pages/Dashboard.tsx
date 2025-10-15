import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Wrench, BookOpen, User, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800">
      <Navbar />

      <motion.div
        className="container mx-auto px-4 pt-28 pb-20"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
          <p className="text-slate-500">We’re still working on something awesome 🚀</p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="flex items-center space-x-2">
                <Home className="text-blue-500" />
                <CardTitle className="text-lg font-semibold">Overview</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                Get a quick glance of your upcoming courses and progress here.
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="flex items-center space-x-2">
                <BookOpen className="text-emerald-500" />
                <CardTitle className="text-lg font-semibold">Learning Hub</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                Browse and manage your enrolled subjects, lessons, and tasks.
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="flex items-center space-x-2">
                <User className="text-purple-500" />
                <CardTitle className="text-lg font-semibold">Profile</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                View and edit your personal details and preferences.
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Under Development Section */}
        <motion.div
          className="mt-16 text-center py-10 rounded-xl border border-dashed border-slate-300 bg-white/70 backdrop-blur-xl shadow-inner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Wrench className="mx-auto mb-4 h-10 w-10 text-slate-400" />
          <h2 className="text-xl font-semibold mb-2">Under Development</h2>
          <p className="text-slate-500 mb-6">
            This section is currently under construction. New features are coming soon!
          </p>
          <Button
            variant="outline"
            onClick={() => alert("Stay tuned! 🚀")}
            className="hover:bg-blue-50 transition-colors"
          >
            Notify Me
          </Button>
        </motion.div>

        {/* Logout Button */}
        <div className="mt-10 flex justify-center">
          <Button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
