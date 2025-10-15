import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { GraduationCap } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import { auth, googleProvider, facebookProvider } from "@/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: formData.fullName });
      alert("Registration successful!");
      navigate("/login");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Registered with Google!");
      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleFacebookRegister = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      alert("Registered with Facebook!");
      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-foreground">
      <Navbar />

      <motion.div
        className="container mx-auto px-4 pt-28 pb-16 flex items-center justify-center"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-xl shadow-xl border border-slate-200 rounded-2xl overflow-hidden">
          <CardHeader className="space-y-1 text-center">
            <motion.div
              className="flex justify-center mb-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="p-3 rounded-full bg-blue-50">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
            </motion.div>
            <CardTitle className="text-2xl font-bold text-slate-800">Create an account</CardTitle>
            <CardDescription className="text-slate-500">
              Start your learning journey with <span className="font-medium text-blue-600">IIESP</span> today
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              {["fullName", "email", "password", "confirmPassword"].map((field) => (
                <div className="space-y-2" key={field}>
                  <Label htmlFor={field} className="text-slate-700 font-medium capitalize">
                    {field === "fullName"
                      ? "Full Name"
                      : field === "confirmPassword"
                      ? "Confirm Password"
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </Label>
                  <motion.div whileFocus={{ scale: 1.01 }}>
                    <Input
                      id={field}
                      type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
                      placeholder={
                        field === "fullName"
                          ? "John Doe"
                          : field === "email"
                          ? "your.email@example.com"
                          : "••••••••"
                      }
                      value={(formData as any)[field]}
                      onChange={handleChange}
                      required
                      className="border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    />
                  </motion.div>
                </div>
              ))}
            </CardContent>

            <CardFooter className="flex flex-col space-y-5">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Account"}
              </Button>

              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  onClick={handleGoogleRegister}
                  className="flex items-center justify-center gap-2 border-slate-300 hover:bg-slate-50 transition-all"
                >
                  <FcGoogle className="h-5 w-5" />
                  Continue with Google
                </Button>

                <Button
                  variant="outline"
                  onClick={handleFacebookRegister}
                  className="flex items-center justify-center gap-2 border-slate-300 hover:bg-slate-50 transition-all"
                >
                  <FaFacebook className="h-5 w-5 text-blue-600" />
                  Continue with Facebook
                </Button>
              </div>

              <div className="text-sm text-center text-slate-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline font-medium">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
