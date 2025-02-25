"use client"

import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]

interface CarouselProps {
  opts?: CarouselOptions
  plugins?: UseCarouselParameters[1]
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
  children: React.ReactNode
  className?: string
}

export function Carousel({
  opts = {},
  plugins,
  orientation = "horizontal",
  setApi,
  className,
  children,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  )

  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true)

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return

    setPrevBtnDisabled(!api.canScrollPrev())
    setNextBtnDisabled(!api.canScrollNext())
  }, [])

  React.useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    if (setApi) {
      setApi(emblaApi)
    }
  }, [emblaApi, onSelect, setApi])

  return (
    <div className={cn("relative", className)}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", "touch-pan-y")}>
          {React.Children.map(children, (child) => (
            <div className={cn("min-w-0 flex-[0_0_100%]", orientation === "horizontal" ? "pl-4" : "pt-4")}>{child}</div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal" ? "top-1/2 -translate-y-1/2" : "left-1/2 -translate-x-1/2",
          "left-4",
        )}
        // disabled={prevBtnDisabled}
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal" ? "top-1/2 -translate-y-1/2" : "left-1/2 -translate-x-1/2",
          "right-4",
        )}
        // disabled={nextBtnDisabled}
        onClick={scrollNext}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    </div>
  )
}

