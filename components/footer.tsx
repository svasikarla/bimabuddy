"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="w-full py-6 bg-gray-100">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">HealthInsure</h3>
            <p className="text-sm text-gray-500">Helping you find the best health insurance plans in India.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-gray-500 hover:text-gray-900">
                  Compare Plans
                </Link>
              </li>
              <li>
                <Link href="#ayushman" className="text-gray-500 hover:text-gray-900">
                  Ayushman Bharat
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-gray-500 hover:text-gray-900">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-900">
                  Insurance Glossary
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-900">
                  Claim Process
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-900">
                  Tax Benefits
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-gray-900">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-500">Email: support@healthinsure.com</li>
              <li className="text-gray-500">Phone: +91 1234567890</li>
              <li className="text-gray-500">Address: 123 Insurance Street, Mumbai, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} HealthInsure. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
