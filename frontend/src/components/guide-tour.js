"use client"

import { useState, useEffect } from "react"
import "./guide-tour.css"

export default function GuideTour({ onClose, isOpen }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [targetElement, setTargetElement] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const steps = [
    {
      target: ".hero-section",
      title: "Welcome to Royal Castle",
      content:
        "Explore our beautiful resort through this interactive carousel. Use the arrows to navigate through images.",
      position: "bottom",
      icon: "✨",
    },
    {
      target: ".welcome-section",
      title: "About Our Resort",
      content: "Learn about what makes Royal Castle Farm Stay a perfect destination for your next vacation.",
      position: "top",
      icon: "🏰",
    },
    {
      target: ".features-section",
      title: "Resort Highlights",
      content: "Discover our premium amenities and features that will make your stay memorable.",
      position: "top",
      icon: "🌟",
    },
    {
      target: ".activities-section",
      title: "Experiences & Activities",
      content: "Explore the various activities and experiences we offer to our guests.",
      position: "top",
      icon: "🚵",
    },
    {
      target: ".location-section",
      title: "Find Us",
      content: "Get directions and contact information to plan your visit.",
      position: "top",
      icon: "📍",
    },
    {
      target: ".cta-section",
      title: "Book Your Stay",
      content: "Ready to experience luxury? Book your stay now!",
      position: "top",
      icon: "📅",
    },
  ]

  useEffect(() => {
    if (isOpen && steps[currentStep]) {
      const element = document.querySelector(steps[currentStep].target)
      if (element) {
        setTargetElement(element)
        element.scrollIntoView({ behavior: "smooth", block: "center" })

        // Add highlight effect to the target element
        element.classList.add("guide-highlight")

        return () => {
          element.classList.remove("guide-highlight")
        }
      }
    }
  }, [currentStep, isOpen, steps])

  const handleNext = () => {
    if (isAnimating) return

    setIsAnimating(true)

    if (currentStep < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
        setIsAnimating(false)
      }, 300)
    } else {
      handleClose()
    }
  }

  const handlePrev = () => {
    if (isAnimating || currentStep === 0) return

    setIsAnimating(true)

    setTimeout(() => {
      setCurrentStep(currentStep - 1)
      setIsAnimating(false)
    }, 300)
  }

  const handleClose = () => {
    setIsAnimating(true)

    setTimeout(() => {
      onClose()
      setCurrentStep(0)
      setIsAnimating(false)
    }, 300)
  }

  if (!isOpen || !targetElement) return null

  const targetRect = targetElement.getBoundingClientRect()
  const isLastStep = currentStep === steps.length - 1

  // Calculate position based on the target element and preferred position
  const getTooltipPosition = () => {
    const position = steps[currentStep].position
    const spacing = 20 // Space between target and tooltip

    switch (position) {
      case "top":
        return {
          top: `${targetRect.top - 120}px`,
          left: `${targetRect.left + targetRect.width / 2 - 175}px`,
        }
      case "bottom":
        return {
          top: `${targetRect.bottom + spacing}px`,
          left: `${targetRect.left + targetRect.width / 2 - 175}px`,
        }
      case "left":
        return {
          top: `${targetRect.top + targetRect.height / 2 - 60}px`,
          left: `${targetRect.left - 350 - spacing}px`,
        }
      case "right":
        return {
          top: `${targetRect.top + targetRect.height / 2 - 60}px`,
          left: `${targetRect.right + spacing}px`,
        }
      default:
        return {
          top: `${targetRect.bottom + spacing}px`,
          left: `${targetRect.left + targetRect.width / 2 - 175}px`,
        }
    }
  }

  const tooltipPosition = getTooltipPosition()

  return (
    <div className="guide-tour-overlay">
      {/* Spotlight overlay */}
      <div className="guide-spotlight-overlay"></div>

      <div
        className={`guide-tooltip ${isAnimating ? "guide-tooltip-animating" : ""}`}
        style={{
          ...tooltipPosition,
        }}
      >
        <div className="guide-tooltip-icon">{steps[currentStep].icon}</div>

        <div className="guide-tooltip-header">
          <h3>{steps[currentStep].title}</h3>
          <button onClick={handleClose} className="guide-close-btn" aria-label="Close guide">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="guide-tooltip-content">
          <p>{steps[currentStep].content}</p>
        </div>

        <div className="guide-progress-bar">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`guide-progress-dot ${index === currentStep ? "active" : ""} ${index < currentStep ? "completed" : ""}`}
              onClick={() => {
                if (!isAnimating && index !== currentStep) {
                  setIsAnimating(true)
                  setTimeout(() => {
                    setCurrentStep(index)
                    setIsAnimating(false)
                  }, 300)
                }
              }}
            ></div>
          ))}
        </div>

        <div className="guide-tooltip-footer">
          <div className="guide-step-counter">
            {currentStep + 1} of {steps.length}
          </div>

          <div className="guide-tooltip-buttons">
            {currentStep > 0 && (
              <button onClick={handlePrev} className="guide-btn guide-btn-secondary">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="guide-btn-icon"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Previous
              </button>
            )}

            <button onClick={handleNext} className="guide-btn guide-btn-primary">
              {isLastStep ? "Finish" : "Next"}
              {!isLastStep && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="guide-btn-icon"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
