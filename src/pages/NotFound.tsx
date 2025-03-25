
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { coffee } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4 mt-16">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 rounded-full bg-pergamino-darkTeal/10 flex items-center justify-center mx-auto mb-6">
            <coffee className="h-12 w-12 text-pergamino-darkTeal" />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-pergamino-darkTeal font-sumana">404</h1>
          <p className="text-xl text-pergamino-darkTeal/80 mb-8">
            Oops! The page you're looking for isn't on our menu.
          </p>
          <Button asChild className="bg-pergamino-darkTeal hover:bg-pergamino-teal text-white">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
