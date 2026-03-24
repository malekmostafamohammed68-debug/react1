import { Button } from "@heroui/react";
import { useNavigate } from "react-router";
import { EmojiSad } from "iconsax-reactjs";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 text-center">
      <EmojiSad size="120" color="#1877F2" variant="Bulk" className="mb-6" />
      <h1 className="text-6xl font-black text-[#1877F2] mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        The link you followed may be broken, or the page may have been removed.
      </p>
      <Button 
        color="primary" 
        size="lg" 
        radius="full" 
        className="font-bold px-10 shadow-lg shadow-blue-500/30"
        onPress={() => navigate('/')}
      >
        Go Back Home
      </Button>
    </div>
  );
}
