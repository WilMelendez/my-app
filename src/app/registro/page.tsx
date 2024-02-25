
'use client'
import { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Link from 'next/link';
import firebaseConfig from '../utils/firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);

  const handleSignUp = async () => {
    try {
      setError('');
      if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres.');
      }
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      setRegistrationSuccess(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error: any) {
      console.error('Error al registrar usuario:', error);
      setError(error.message as string);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    handleSignUp();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 bg-opacity-70 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Formulario de Registro</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {registrationSuccess && (
          <p className="text-green-500 text-sm mb-4">Registro exitoso. Serás redirigido a la página de inicio de sesión.</p>
        )}
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-200 text-sm font-bold mb-2">Email:</label> 
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico" 
              className="appearance-none bg-gray-800 bg-opacity-50 border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-200 text-sm font-bold mb-2">Contraseña:</label> 
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña" 
              className="appearance-none bg-gray-800 bg-opacity-50 border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Registrarse
            </button>
          </div>
        </form>
        <p className="text-white text-center mt-4">¿Ya tienes una cuenta? <Link href="/" className="text-blue-500">Inicia sesión</Link></p>
      </div>
    </div>
  );
}

