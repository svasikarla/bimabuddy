"use client"

import { useState } from "react"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Info, Shield, Star } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type FormData = {
  age: string
  gender: string
  location: string
  familySize: string
  preExistingConditions: boolean
  budget: number
  coverageAmount: string
}

type PlanRecommendationProps = {
  formData: FormData
  onReset: () => void
}

export function PlanRecommendation({ formData, onReset }: PlanRecommendationProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("recommended")

  // Logic to determine the best plan based on user inputs
  const getRecommendedPlan = () => {
    const age = Number.parseInt(formData.age)
    const isSenior = age >= 60
    const hasFamily = formData.familySize !== "1"
    const hasPEC = formData.preExistingConditions
    const budget = formData.budget
    const coverageAmount = Number.parseInt(formData.coverageAmount)

    // Simple recommendation logic
    if (isSenior) {
      return {
        name: "Senior Care Plus",
        provider: "ABC Health Insurance",
        premium: "₹" + Math.min(budget, 12000).toLocaleString() + "/year",
        coverage: "₹" + formData.coverageAmount + " Lakhs",
        suitabilityScore: 95,
        keyFeatures: [
          "Specialized coverage for senior citizens",
          "No medical check-up required up to age 65",
          "Coverage for pre-existing diseases after 1 year",
          "Covers 30+ critical illnesses",
          "Free health check-up every year",
        ],
        whyRecommended: [
          "Tailored for seniors with comprehensive coverage",
          "Includes coverage for age-related conditions",
          "Affordable premium within your budget",
          "Cashless treatment at 5000+ network hospitals",
        ],
        educationalContent: [
          {
            title: "What is Senior Care Insurance?",
            content:
              "Senior Care insurance is specifically designed for individuals aged 60 and above. It provides coverage for hospitalization expenses, pre and post hospitalization care, and often includes benefits like domiciliary treatment and regular health check-ups.",
          },
          {
            title: "Pre-Existing Conditions Coverage",
            content:
              "Most senior care policies cover pre-existing conditions after a waiting period of 1-2 years. This means conditions you already have will be covered after this initial waiting period.",
          },
          {
            title: "Co-Payment Clause",
            content:
              "Many senior citizen health policies have a co-payment clause, which means you pay a percentage of the claim amount (usually 10-20%). This helps keep the premium affordable.",
          },
        ],
      }
    } else if (hasFamily) {
      return {
        name: "Family Floater Gold",
        provider: "XYZ Insurance",
        premium: "₹" + Math.min(budget, 15000).toLocaleString() + "/year",
        coverage: "₹" + formData.coverageAmount + " Lakhs",
        suitabilityScore: 92,
        keyFeatures: [
          "Coverage for entire family under single sum insured",
          "Maternity benefits included",
          "Coverage for 30+ critical illnesses",
          "Free health check-up every year",
          "No claim bonus up to 50%",
        ],
        whyRecommended: [
          "Perfect for families with comprehensive coverage",
          "Includes child care benefits",
          "Maternity coverage with newborn baby expenses",
          "Cashless treatment at 6000+ network hospitals",
        ],
        educationalContent: [
          {
            title: "What is a Family Floater Policy?",
            content:
              "A family floater health insurance policy covers your entire family under a single sum insured. The premium is based on the age of the oldest member. This is usually more cost-effective than individual policies for each family member.",
          },
          {
            title: "How Sum Insured Works in Family Floater",
            content:
              "The sum insured is shared among all family members. For example, if you have a ₹10 lakh policy, any family member can claim up to ₹10 lakhs, but the total claims by all members cannot exceed ₹10 lakhs in a policy year.",
          },
          {
            title: "No Claim Bonus Benefit",
            content:
              "If no claims are made during a policy year, you receive a No Claim Bonus, which increases your sum insured for the next year (typically by 5-50%) without any increase in premium.",
          },
        ],
      }
    } else {
      return {
        name: "Individual Health Shield",
        provider: "PQR General Insurance",
        premium: "₹" + Math.min(budget, 8000).toLocaleString() + "/year",
        coverage: "₹" + formData.coverageAmount + " Lakhs",
        suitabilityScore: 90,
        keyFeatures: [
          "Comprehensive individual coverage",
          "Day care procedures covered",
          "Coverage for pre and post hospitalization expenses",
          "Free annual health check-up",
          "No claim bonus up to 50%",
        ],
        whyRecommended: [
          "Tailored for individual needs with comprehensive coverage",
          "Affordable premium within your budget",
          "Excellent for young professionals",
          "Cashless treatment at 4500+ network hospitals",
        ],
        educationalContent: [
          {
            title: "What is Individual Health Insurance?",
            content:
              "Individual health insurance provides coverage for a single person. The premium is based on your age, health condition, and the sum insured you choose. It's ideal for single individuals or those who want personalized coverage.",
          },
          {
            title: "Waiting Period Explained",
            content:
              "Most health insurance policies have waiting periods for specific conditions. Typically, there's a 30-day initial waiting period for all illnesses except accidents, and a 2-4 year waiting period for pre-existing conditions.",
          },
          {
            title: "Claim Process Simplified",
            content:
              "For cashless claims, you need to get admitted to a network hospital and inform the insurance company. For reimbursement claims, you pay the hospital bills first and then submit the documents to the insurer for reimbursement.",
          },
        ],
      }
    }
  }

  const recommendedPlan = getRecommendedPlan()

  // Alternative plans based on the recommended plan
  const alternativePlans = [
    {
      name: "Value Health Plan",
      provider: "LMN Insurance",
      premium: "₹" + Math.max(formData.budget - 3000, 5000).toLocaleString() + "/year",
      coverage: "₹" + (Number.parseInt(formData.coverageAmount) - 2) + " Lakhs",
      suitabilityScore: 85,
      keyFeatures: [
        "Basic hospitalization coverage",
        "Day care procedures covered",
        "Ambulance charges covered",
        "Tax benefits under Section 80D",
      ],
    },
    {
      name: "Premium Health Max",
      provider: "DEF Health Insurance",
      premium: "₹" + Math.min(formData.budget + 5000, 50000).toLocaleString() + "/year",
      coverage: "₹" + (Number.parseInt(formData.coverageAmount) + 5) + " Lakhs",
      suitabilityScore: 88,
      keyFeatures: [
        "Enhanced coverage with premium benefits",
        "International emergency coverage",
        "Alternative treatments covered (Ayurveda, Homeopathy)",
        "Restoration of sum insured benefit",
      ],
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Your Personalized Recommendation
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Based on your information, we've found the perfect health insurance plan for you
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-4xl">
          <Tabs defaultValue="recommended" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recommended">Recommended Plan</TabsTrigger>
              <TabsTrigger value="alternatives">Alternative Plans</TabsTrigger>
              <TabsTrigger value="learn">Learn More</TabsTrigger>
            </TabsList>

            <TabsContent value="recommended" className="mt-6">
              <Card className="border-2 border-primary">
                <CardHeader className="bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center">
                        <Star className="h-6 w-6 text-yellow-500 mr-2 inline" />
                        {recommendedPlan.name}
                      </CardTitle>
                      <CardDescription className="text-base mt-1">{recommendedPlan.provider}</CardDescription>
                    </div>
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {recommendedPlan.suitabilityScore}% Match
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Plan Details</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Premium:</span>
                          <span className="font-bold">{recommendedPlan.premium}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Coverage:</span>
                          <span className="font-bold">{recommendedPlan.coverage}</span>
                        </div>
                        <div className="pt-4">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Key Features</h4>
                          <ul className="space-y-2">
                            {recommendedPlan.keyFeatures.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Why We Recommend This</h3>
                      <ul className="space-y-2">
                        {recommendedPlan.whyRecommended.map((reason, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-muted/50 px-6 py-4">
                  <Button variant="outline" onClick={onReset}>
                    Start Over
                  </Button>
                  <Button>Apply Now</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="alternatives" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {alternativePlans.map((plan, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>{plan.provider}</CardDescription>
                        </div>
                        <div className="bg-muted px-3 py-1 rounded-full text-sm font-medium">
                          {plan.suitabilityScore}% Match
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Premium:</span>
                          <span className="font-bold">{plan.premium}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Coverage:</span>
                          <span className="font-bold">{plan.coverage}</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Key Features</h4>
                          <ul className="space-y-2">
                            {plan.keyFeatures.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline">Compare</Button>
                      <Button>Apply Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" onClick={onReset}>
                  Start Over
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="learn" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="h-5 w-5 mr-2" />
                    Understanding Your Recommended Plan
                  </CardTitle>
                  <CardDescription>
                    Learn more about health insurance concepts related to your recommended plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {recommendedPlan.educationalContent.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{item.title}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-600">{item.content}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                    <AccordionItem value="item-tax">
                      <AccordionTrigger>Tax Benefits of Health Insurance</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Under Section 80D of the Income Tax Act, you can claim tax deductions for health insurance
                          premiums. Individuals below 60 years can claim up to ₹25,000, and senior citizens can claim up
                          to ₹50,000. Additional deductions are available for policies covering parents.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-claim">
                      <AccordionTrigger>How to Make a Claim</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-gray-600">
                          <p>There are two types of claims in health insurance:</p>
                          <ol className="list-decimal list-inside space-y-2 pl-4">
                            <li>
                              <span className="font-medium">Cashless Claims:</span> Get treated at a network hospital.
                              Show your health card and ID proof. The hospital will send the bill directly to the
                              insurance company.
                            </li>
                            <li>
                              <span className="font-medium">Reimbursement Claims:</span> Pay the hospital bills first.
                              Submit claim form, original bills, and medical reports to the insurance company. The
                              insurer will reimburse the approved amount.
                            </li>
                          </ol>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={onReset}>
                    Start Over
                  </Button>
                  <Button onClick={() => setActiveTab("recommended")}>Back to Recommendation</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
