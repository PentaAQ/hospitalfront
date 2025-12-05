// Login donde se pediran el dni y contraseña del usuario

import { Icon } from "@iconify/react";
import Hospital from "../assets/foto-hospital.jpg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useLoginMutate } from "../stack/LoginStack";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useLoginMutate();

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <main className="grid lg:grid-cols-2 h-screen">
      <div className="flex items-center justify-center flex-col gap-4">
        <Icon icon="openmoji:hospital" width="72" height="72" />
        <h1 className="text-2xl font-semibold">Hospital Santa Catalina</h1>
        <h2 className="text-2xl font-semibold text-center">Iniciar Sesion</h2>
        <p className="text-center">Introduzca su DNI y Contraseña</p>
        <form
          className="mx-auto w-full max-w-xs p-3 space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="dni" className="text-lg">
              DNI
            </label>
            <input
              type="text"
              id="dni"
              className="border border-gray-300 rounded-lg p-2 w-full"
              placeholder="12345678"
              {...register("dni", { required: "El DNI es requerido" })}
            />
            <p className="text-red-500">{errors.dni?.message}</p>
          </div>
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="password" className="text-lg">
              Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="border border-gray-300 rounded-lg p-2 w-full"
              placeholder="admin123"
              {...register("password", {
                required: "La contraseña es requerida",
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=" absolute right-3 top-11"
            >
              {showPassword ? (
                <Icon icon="weui:eyes-on-outlined" width="24" height="24" />
              ) : (
                <Icon icon="weui:eyes-off-outlined" width="24" height="24" />
              )}
            </button>
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className={`bg-blue-500 transition-colors duration-300 w-full text-white p-2 rounded-lg cursor-pointer ${
              isPending
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-blue-300"
            }`}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Icon
                  icon="line-md:loading-twotone-loop"
                  width="20"
                  height="20"
                />
                Cargando...
              </span>
            ) : (
              "Iniciar Sesion"
            )}
          </button>
        </form>
      </div>
      <img src={Hospital} alt="" className="w-full h-full max-lg:hidden" />
    </main>
  );
};
