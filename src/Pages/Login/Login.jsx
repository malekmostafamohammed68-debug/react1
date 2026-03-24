import { Button, Input } from "@heroui/react"; 
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onLogin = (data) => {
    localStorage.setItem('userToken', 'fake-token-123');
    toast.success("Welcome back!");
    navigate('/');
  };

  const isLoading = false; // Mocking isLoading state

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-[calc(100vh-64px)] px-4 bg-[#F0F2F5] dark:bg-[#18191A] gap-10 md:gap-20 transition-colors">
      <div className="text-center md:text-left max-w-lg mb-10 md:mb-0">
         <h1 className="text-6xl font-black text-[#1877F2] mb-4">facebook</h1>
         <p className="text-2xl font-medium text-gray-800 dark:text-gray-200 leading-tight">
            Facebook helps you connect and share with the people in your life.
         </p>
      </div>

      <div className="w-full max-w-[400px]">
        <form
          onSubmit={handleSubmit(onLogin)}
          className="flex flex-col gap-4 bg-white dark:bg-[#242526] p-6 rounded-xl shadow-xl border-none transition-colors"
        >
          <Input
            {...register("email", { required: "Email is required" })}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            placeholder="Email address or phone number"
            type="email"
            variant="bordered"
            size="lg"
            radius="md"
          />
          <Input
            {...register("password", { required: "Password is required" })}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            placeholder="Password"
            type="password"
            variant="bordered"
            size="lg"
            radius="md"
          />
          <Button
            color="primary"
            type="submit"
            className="w-full h-12 text-xl font-bold mt-2"
            isLoading={isLoading}
            radius="md"
          >
            Log In
          </Button>
          <Button variant="light" size="sm" color="primary" className="font-semibold -mt-2">
            Forgotten password?
          </Button>
          <div className="border-t border-gray-200 my-2"></div>
          <div className="flex justify-center pt-2">
            <Button 
                color="success" 
                size="lg" 
                className="font-bold text-white px-8 h-12"
                onPress={() => navigate('/register')}
                radius="md"
            >
              Create new account
            </Button>
          </div>
        </form>
        <p className="text-sm text-gray-600 mt-6 text-center">
            <b>Create a Page</b> for a celebrity, brand or business.
        </p>
      </div>
    </div>
  );
}
