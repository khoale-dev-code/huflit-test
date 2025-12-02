import React from 'react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/clerk-react';
import { LogIn, UserPlus } from 'lucide-react';

export default function ClerkAuth() {
  return (
    <div className="flex items-center">
      <SignedOut>
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sign In Button */}
          <SignInButton mode="modal">
            <button className="group relative overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 bg-white rounded-xl font-semibold text-sm sm:text-base text-gray-700 transition-all duration-300 shadow-sm hover:shadow-lg border border-orange-200/50 hover:border-orange-300 hover:scale-105">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative flex items-center gap-2">
                <LogIn className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="hidden sm:inline">Đăng Nhập</span>
                <span className="sm:hidden">Đăng Nhập</span>
              </div>
            </button>
          </SignInButton>

          {/* Sign Up Button */}
          <SignUpButton mode="modal">
            <button className="group relative overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-sm sm:text-base text-white transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500"></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              
              <div className="relative flex items-center gap-2">
                <UserPlus className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <span className="hidden sm:inline">Đăng Ký</span>
                <span className="sm:hidden">Đăng Ký</span>
              </div>
            </button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="group relative">
          {/* Decorative glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
          
          {/* User button container */}
          <div className="relative flex items-center gap-3 px-3 sm:px-4 py-2 bg-gradient-to-r from-white to-amber-50 rounded-xl shadow-sm border border-orange-200/50 transition-all duration-300 group-hover:shadow-lg">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: 'w-9 h-9 sm:w-10 sm:h-10 ring-2 ring-orange-200 ring-offset-2 transition-all duration-300 hover:ring-orange-400',
                  userButtonPopoverCard: 'shadow-2xl border-orange-100',
                  userButtonPopoverActionButton: 'hover:bg-orange-50',
                }
              }}
              afterSignOutUrl="/"
            />
            
            {/* Welcome indicator */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 animate-pulse shadow-sm"></div>
              <span className="text-sm font-medium text-gray-700">Profile</span>
            </div>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}