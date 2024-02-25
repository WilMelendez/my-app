'use client'


import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from '../utils/firebase';
import { FormEvent } from 'react'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailSignIn = async () => {
    try {
      setError('');
      await firebase.auth().signInWithEmailAndPassword(email, password);
      window.location.href = '/dashboard'; // Redirige después de iniciar sesión
    } catch (error) {
      console.error('Error al iniciar sesión con correo electrónico y contraseña:', error);
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      setError('');
      await firebase.auth().signInWithPopup(provider);
      window.location.href = '/dashboard'; // Redirige después de iniciar sesión
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      setError('Error al iniciar sesión con Google. Intenta de nuevo más tarde.');
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEmailSignIn();
  };

  useEffect(() => {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Redirige si el usuario ha iniciado sesión con un enlace de correo electrónico
      window.location.href = '/dashboard';
    }
  }, []);

  return (
    <>
      <div style={{
        zIndex: -1,
        position: "fixed",
        width: "100%",
        height: "100%", 
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden"
      }}>
        <Image
          src="/Fondo1.png"
          alt='Imagen de fondo'
          layout='fill'
          objectFit='cover'
        />
      </div>
      <main className="flex justify-center items-center h-screen">
        <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-white text-center mb-6">Inicia sesión</h1>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form className="flex flex-col space-y-4" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 bg-opacity-50 text-white border border-gray-600 rounded-lg p-3 focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 bg-opacity-50 text-white border border-gray-600 rounded-lg p-3 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Iniciar sesión
            </button>
            <a href="#" className="text-gray-400 text-sm text-center">¿Olvidaste tu contraseña?</a>
            <div className="flex justify-center">
              <button
                onClick={handleGoogleSignIn}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg border border-gray-600"
              >
                Continuar con Google
              </button>
            </div>
          </form>
          <p className="text-white text-center mt-4">¿No tienes una cuenta? <Link href="/registro" className="text-blue-500">Regístrate</Link></p>
        </div>
      </main>
    </>
  );
}

