"use client"

import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("hero.subtitle")}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="px-8" onClick={() => (window.location.href = "#features")}>
                Compare Plans
              </Button>
              <Button
                variant="secondary"
                className="px-8"
                onClick={() => (window.location.href = "#recommendation-form")}
              >
                Find Best Plan
              </Button>
              <Button variant="outline" className="px-8" onClick={() => (window.location.href = "#ayushman")}>
                Learn About Ayushman Bharat
              </Button>
            </div>
          </div>
          <div className="mx-auto lg:ml-auto flex justify-center">
            <img
              alt="Health Insurance"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="310"
              src="/placeholder.svg?height=310&width=550"
              width="550"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
