"use client"

import { useLanguage } from "./language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function AyushmanBharat() {
  const { t } = useLanguage()

  const benefits = [
    "Free treatment up to ₹5 lakhs per family per year",
    "Covers pre and post hospitalization expenses",
    "All pre-existing conditions covered from day one",
    "Cashless and paperless access to quality healthcare services",
    "Covers 3 days of pre-hospitalization and 15 days post-hospitalization expenses",
    "Transportation allowance covered",
    "No restriction on family size, age or gender",
  ]

  const eligibility = [
    "Families identified based on deprivation criteria in rural areas",
    "Occupational criteria for families in urban areas",
    "Automatically covered if included in SECC database",
    "Covers poor and vulnerable families identified through socio-economic caste census",
  ]

  return (
    <section id="ayushman" className="w-full py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("ayushman.title")}</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("ayushman.description")}
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl">
          <Card>
            <CardHeader>
              <CardTitle>Benefits</CardTitle>
              <CardDescription>What PM-JAY offers to beneficiaries</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Eligibility</CardTitle>
              <CardDescription>Who can avail PM-JAY benefits</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {eligibility.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button className="w-full">Check Eligibility</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>How to Apply</CardTitle>
              <CardDescription>Steps to get your Ayushman Bharat card</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Check eligibility on the official PM-JAY website or app</li>
                <li>Visit your nearest Ayushman Bharat Kendra with required documents</li>
                <li>Documents needed: Aadhaar Card, Ration Card, any government ID proof</li>
                <li>Complete the verification process</li>
                <li>Receive your Ayushman Bharat e-card</li>
              </ol>
              <div className="mt-6 flex flex-col gap-2">
                <Button variant="outline" className="w-full">
                  Download PM-JAY App
                </Button>
                <Button className="w-full">Visit Official Website</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            For more information, call the toll-free helpline: <span className="font-bold">14555</span> or{" "}
            <span className="font-bold">1800-111-565</span>
          </p>
        </div>
      </div>
    </section>
  )
}
