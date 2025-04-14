"use client"

import { useLanguage } from "./language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X } from "lucide-react"

export function FeaturesComparison() {
  const { t } = useLanguage()

  // Sample insurance plans data
  const insurancePlans = [
    {
      category: "basic",
      plans: [
        {
          name: "Basic Health Plan",
          provider: "ABC Insurance",
          premium: "₹5,000/year",
          coverage: "₹3 Lakhs",
          features: [
            { name: "Hospitalization", available: true },
            { name: "Pre & Post Hospitalization", available: true },
            { name: "Day Care Procedures", available: true },
            { name: "Ambulance Cover", available: true },
            { name: "Maternity Benefits", available: false },
            { name: "Critical Illness Cover", available: false },
            { name: "No Claim Bonus", available: true },
            { name: "Ayurvedic Treatment", available: false },
          ],
        },
        {
          name: "Essential Care",
          provider: "XYZ Health",
          premium: "₹6,500/year",
          coverage: "₹5 Lakhs",
          features: [
            { name: "Hospitalization", available: true },
            { name: "Pre & Post Hospitalization", available: true },
            { name: "Day Care Procedures", available: true },
            { name: "Ambulance Cover", available: true },
            { name: "Maternity Benefits", available: false },
            { name: "Critical Illness Cover", available: false },
            { name: "No Claim Bonus", available: true },
            { name: "Ayurvedic Treatment", available: true },
          ],
        },
      ],
    },
    {
      category: "family",
      plans: [
        {
          name: "Family Floater",
          provider: "PQR Insurance",
          premium: "₹12,000/year",
          coverage: "₹10 Lakhs",
          features: [
            { name: "Hospitalization", available: true },
            { name: "Pre & Post Hospitalization", available: true },
            { name: "Day Care Procedures", available: true },
            { name: "Ambulance Cover", available: true },
            { name: "Maternity Benefits", available: true },
            { name: "Critical Illness Cover", available: false },
            { name: "No Claim Bonus", available: true },
            { name: "Ayurvedic Treatment", available: true },
          ],
        },
        {
          name: "Complete Family Shield",
          provider: "LMN Health",
          premium: "₹15,000/year",
          coverage: "₹15 Lakhs",
          features: [
            { name: "Hospitalization", available: true },
            { name: "Pre & Post Hospitalization", available: true },
            { name: "Day Care Procedures", available: true },
            { name: "Ambulance Cover", available: true },
            { name: "Maternity Benefits", available: true },
            { name: "Critical Illness Cover", available: true },
            { name: "No Claim Bonus", available: true },
            { name: "Ayurvedic Treatment", available: true },
          ],
        },
      ],
    },
    {
      category: "senior",
      plans: [
        {
          name: "Senior Care",
          provider: "DEF Insurance",
          premium: "₹9,000/year",
          coverage: "₹5 Lakhs",
          features: [
            { name: "Hospitalization", available: true },
            { name: "Pre & Post Hospitalization", available: true },
            { name: "Day Care Procedures", available: true },
            { name: "Ambulance Cover", available: true },
            { name: "Maternity Benefits", available: false },
            { name: "Critical Illness Cover", available: true },
            { name: "No Claim Bonus", available: true },
            { name: "Ayurvedic Treatment", available: true },
          ],
        },
        {
          name: "Golden Years Plus",
          provider: "GHI Health",
          premium: "₹12,500/year",
          coverage: "₹10 Lakhs",
          features: [
            { name: "Hospitalization", available: true },
            { name: "Pre & Post Hospitalization", available: true },
            { name: "Day Care Procedures", available: true },
            { name: "Ambulance Cover", available: true },
            { name: "Maternity Benefits", available: false },
            { name: "Critical Illness Cover", available: true },
            { name: "No Claim Bonus", available: true },
            { name: "Ayurvedic Treatment", available: true },
            { name: "Domiciliary Treatment", available: true },
            { name: "Annual Health Check-up", available: true },
          ],
        },
      ],
    },
  ]

  return (
    <section id="features" className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("features.title")}</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Compare different health insurance plans to find the one that best suits your needs
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-5xl">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Individual Plans</TabsTrigger>
              <TabsTrigger value="family">Family Plans</TabsTrigger>
              <TabsTrigger value="senior">Senior Citizen Plans</TabsTrigger>
            </TabsList>
            {insurancePlans.map((category) => (
              <TabsContent key={category.category} value={category.category} className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {category.plans.map((plan, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="bg-muted/50">
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription>{plan.provider}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-500">Premium</span>
                              <span className="text-lg font-bold">{plan.premium}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-500">Coverage</span>
                              <span className="text-lg font-bold">{plan.coverage}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-500">Features</h4>
                            <ul className="space-y-2">
                              {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center justify-between">
                                  <span className="text-sm">{feature.name}</span>
                                  {feature.available ? (
                                    <Check className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <X className="h-5 w-5 text-red-500" />
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
