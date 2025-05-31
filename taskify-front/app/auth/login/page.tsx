"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Guardar el token en localStorage
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirigir al dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-background">
      <div className="absolute inset-0 z-0">
        <Image
          src="/login.png"
          alt="Login background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-dark-gray/60" />
      </div>
      <div className="max-w-md w-full space-y-8 p-8 bg-card/95 backdrop-blur-sm rounded-lg shadow-2xl relative z-10 border border-primary/30">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary tracking-tight">
            Taskify
          </h1>
          <p className="text-foreground text-lg font-medium">
            ¡Bienvenido de nuevo! Organiza tus tareas de manera eficiente
          </p>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-destructive/20 text-destructive p-3 rounded-md text-sm font-medium">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-foreground">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-background/50 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary text-foreground placeholder-foreground/50"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-semibold text-foreground">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 bg-background/50 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary text-foreground placeholder-foreground/50"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-secondary transition-colors duration-200 ease-in-out hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary hover:cursor-pointer"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-foreground font-medium">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-secondary hover:text-primary transition-colors duration-200"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 