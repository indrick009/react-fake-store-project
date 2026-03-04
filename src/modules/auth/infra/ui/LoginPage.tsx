import LoginForm from "./components/LoginForm";
import HeroSection from "./components/HeroSection";
import ImageStack from "./components/ImageStack";
import { useAuth } from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ProductRoutes } from "../../../../routes/routes";

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ProductRoutes.list, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen relative">
      <HeroSection />

      <div className="min-h-screen flex flex-1 justify-center items-center bg-gray-100 p-6">
        <LoginForm />
      </div>

      <div className="absolute bottom-0 right-0 z-10">
        <ImageStack />
      </div>
    </div>
  );
};

export default LoginPage;
