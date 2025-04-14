"use client"

import { useState } from "react"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { PlanRecommendation } from "./plan-recommendation"

type FormData = {
  age: string
  gender: string
  location: string
  familySize: string
  preExistingConditions: boolean
  budget: number
  coverageAmount: string
}

const initialFormData: FormData = {
  age: "",
  gender: "male",
  location: "",
  familySize: "1",
  preExistingConditions: false,
  budget: 10000,
  coverageAmount: "5",
}

export function RecommendationForm() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState(1)
  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setCurrentStep(1)
    setShowResults(false)
  }

  if (showResults) {
    return <PlanRecommendation formData={formData} onReset={resetForm} />
  }

  return (
    <section id="recommendation-form" className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Find Your Best Plan</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Answer a few questions to get a personalized health insurance recommendation
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-2xl">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Step {currentStep} of 3</CardTitle>
                <div className="flex space-x-2">
                  <span className={`h-2 w-12 rounded-full ${currentStep >= 1 ? "bg-primary" : "bg-gray-200"}`}></span>
                  <span className={`h-2 w-12 rounded-full ${currentStep >= 2 ? "bg-primary" : "bg-gray-200"}`}></span>
                  <span className={`h-2 w-12 rounded-full ${currentStep >= 3 ? "bg-primary" : "bg-gray-200"}`}></span>
                </div>
              </div>
              <CardDescription>
                {currentStep === 1 && "Tell us about yourself"}
                {currentStep === 2 && "Family and health information"}
                {currentStep === 3 && "Coverage preferences"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="Enter your age"
                          value={formData.age}
                          onChange={(e) => handleInputChange("age", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <RadioGroup
                          value={formData.gender}
                          onValueChange={(value) => handleInputChange("gender", value)}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                          <SelectItem value="bangalore">Bangalore</SelectItem>
                          <SelectItem value="hyderabad">Hyderabad</SelectItem>
                          <SelectItem value="chennai">Chennai</SelectItem>
                          <SelectItem value="kolkata">Kolkata</SelectItem>
                          <SelectItem value="pune">Pune</SelectItem>
                          <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="familySize">Family Size</Label>
                      <Select
                        value={formData.familySize}
                        onValueChange={(value) => handleInputChange("familySize", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select family size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Just me</SelectItem>
                          <SelectItem value="2">Me + Spouse</SelectItem>
                          <SelectItem value="3">Me + Spouse + 1 Child</SelectItem>
                          <SelectItem value="4">Me + Spouse + 2 Children</SelectItem>
                          <SelectItem value="5+">5 or more members</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="preExistingConditions"
                        checked={formData.preExistingConditions}
                        onCheckedChange={(checked) => handleInputChange("preExistingConditions", checked)}
                      />
                      <Label htmlFor="preExistingConditions">
                        Do you or any family member have pre-existing medical conditions?
                      </Label>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Annual Budget (₹)</Label>
                        <span className="font-medium">₹{formData.budget.toLocaleString()}</span>
                      </div>
                      <Slider
                        value={[formData.budget]}
                        min={5000}
                        max={50000}
                        step={1000}
                        onValueChange={(value) => handleInputChange("budget", value[0])}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>₹5,000</span>
                        <span>₹50,000</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coverageAmount">Desired Coverage Amount</Label>
                      <Select
                        value={formData.coverageAmount}
                        onValueChange={(value) => handleInputChange("coverageAmount", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select coverage amount" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">₹3 Lakhs</SelectItem>
                          <SelectItem value="5">₹5 Lakhs</SelectItem>
                          <SelectItem value="10">₹10 Lakhs</SelectItem>
                          <SelectItem value="15">₹15 Lakhs</SelectItem>
                          <SelectItem value="25">₹25 Lakhs</SelectItem>
                          <SelectItem value="50">₹50 Lakhs</SelectItem>
                          <SelectItem value="100">₹1 Crore</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  {currentStep > 1 ? (
                    <Button type="button" variant="outline" onClick={handlePrevStep}>
                      Previous
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  <Button type="button" onClick={handleNextStep}>
                    {currentStep < 3 ? "Next" : "Get Recommendations"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
