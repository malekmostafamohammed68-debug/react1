import { Button, Input, Select, SelectItem } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";


export default function Register() {
  const navigate = useNavigate();
  const { handleSubmit, register, control, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
      phone: ""
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  function onRegister(data) {
    localStorage.setItem('userToken', 'fake-token-123');
    toast.success("Account created successfully!");
    navigate('/');
  }

  return (
    <div className="flex justify-center items-center py-10 min-h-[calc(100vh-64px)] px-4">
      <form
        onSubmit={handleSubmit(onRegister)}
        className="w-full max-w-xl flex flex-col gap-4 bg-white dark:bg-[#242526] p-8 rounded-2xl shadow-xl transition-colors"
      >
        <h1 className="text-3xl font-bold text-center mb-4">Register</h1>

        <Input
          {...register("name")}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
          label="Name"
          placeholder="Enter your name"
          variant="bordered"
        />

        <Input
          {...register("email")}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          label="Email"
          placeholder="Enter your email"
          type="email"
          variant="bordered"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Input
            {...register("password")}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            label="Password"
            placeholder="Enter password"
            type="password"
            variant="bordered"
          />

          <Input
            {...register("rePassword")}
            isInvalid={!!errors.rePassword}
            errorMessage={errors.rePassword?.message}
            label="Confirm Password"
            placeholder="Confirm password"
            type="password"
            variant="bordered"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Input
            {...register("phone")}
            isInvalid={!!errors.phone}
            errorMessage={errors.phone?.message}
            label="Phone"
            placeholder="Enter phone number"
            variant="bordered"
          />

          <Input
            {...register("dateOfBirth")}
            isInvalid={!!errors.dateOfBirth}
            errorMessage={errors.dateOfBirth?.message}
            label="Date of Birth"
            type="date"
            variant="bordered"
            placeholder=" "
          />
        </div>

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              isInvalid={!!errors.gender}
              errorMessage={errors.gender?.message}
              label="Gender"
              placeholder="Select gender"
              variant="bordered"
              onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
              selectedKeys={field.value ? [field.value] : []}
            >
              <SelectItem key="male" value="male">Male</SelectItem>
              <SelectItem key="female" value="female">Female</SelectItem>
            </Select>
          )}
        />

        <Button 
          color="primary" 
          type="submit" 
          className="w-full mt-4 font-semibold" 
          isLoading={isLoading}
        >
          Create Account
        </Button>
        <p className="text-center text-sm text-gray-500 mt-2">
          Already have an account? 
          <Button variant="light" size="sm" className="ml-1 text-primary p-0 h-auto min-w-0" onPress={() => navigate('/login')}>
            Login
          </Button>
        </p>
      </form>
    </div>
  );
}
