'use client'

import { LucideArrowUpRightFromSquare } from "lucide-react";
import Dashboard from "./components/dashboard";
import HeroSection from "./components/marketing/Hero";
import NavBar from "./components/marketing/NavBar";
import { useUser } from '@clerk/nextjs'
import {useRouter} from "next/navigation"

import { useState, useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const{isSignedIn} = useUser()

  useEffect(() => {
    if (typeof window!== "undefined" && isSignedIn) {
      router.push('/dashboard')
    }
  }, [isSignedIn, router])

  return (
    <main>
      <div>
      <NavBar />
      <HeroSection />
    </div>
    </main>
    
  );
}
