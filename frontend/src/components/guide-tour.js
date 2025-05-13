"use client"

import { useState, useEffect } from "react"
import "./guide-tour.css"

export default function GuideTour({ onClose, isOpen }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [targetElement, setTargetElement] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false)

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

  // Check if it's the user's first visit to show the welcome dialog
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore")

    if (!hasVisitedBefore && !isOpen) {
      // Show the welcome dialog after a short delay
      const timer = setTimeout(() => {
        setShowWelcomeDialog(true)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && steps[currentStep]) {
      const element = document.querySelector(steps[currentStep].target)
      if (element) {
        setTargetElement(element)

        // Smooth scroll to the element
        const yOffset = -80 // Header offset
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: "smooth" })

        // Add highlight effect to the target element
        element.classList.add("guide-highlight")

        // Create spotlight effect
        updateSpotlight(element)

        return () => {
          element.classList.remove("guide-highlight")
        }
      }
    }

    // Clean up spotlight when component unmounts
    return () => {
      const spotlight = document.querySelector(".guide-spotlight")
      if (spotlight) {
        spotlight.remove()
      }
    }
  }, [currentStep, isOpen, steps])

  // Update spotlight position and size
  const updateSpotlight = (element) => {
    const rect = element.getBoundingClientRect()

    // Remove existing spotlight if any
    const existingSpotlight = document.querySelector(".guide-spotlight")
    if (existingSpotlight) {
      existingSpotlight.remove()
    }

    // Create new spotlight
    const spotlight = document.createElement("div")
    spotlight.className = "guide-spotlight"
    spotlight.style.top = `${rect.top + window.scrollY}px`
    spotlight.style.left = `${rect.left + window.scrollX}px`
    spotlight.style.width = `${rect.width}px`
    spotlight.style.height = `${rect.height}px`

    document.body.appendChild(spotlight)
  }

  const handleNext = () => {
    if (isAnimating) return

    setIsAnimating(true)

    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        handleClose()
      }
      setIsAnimating(false)
    }, 300)
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
      onClose(false)
      setCurrentStep(0)
      setIsAnimating(false)

      // Remove spotlight
      const spotlight = document.querySelector(".guide-spotlight")
      if (spotlight) {
        spotlight.remove()
      }
    }, 300)
  }

  const startTour = () => {
    // Mark that the user has visited before
    localStorage.setItem("hasVisitedBefore", "true")
    setShowWelcomeDialog(false)
    onClose(false) // Reset the tour state in parent
    setTimeout(() => {
      onClose(true) // Start the tour
    }, 100)
  }

  const skipTour = () => {
    // Mark that the user has visited before
    localStorage.setItem("hasVisitedBefore", "true")
    setShowWelcomeDialog(false)
  }

  // Render welcome dialog
  if (showWelcomeDialog) {
    return (
      <div className="guide-tour-overlay">
        <div className="guide-overlay"></div>
        <div className="guide-welcome-card">
          <div className="guide-welcome-header">
            <div className="guide-welcome-icon">🏰</div>
            <h2>Discover Royal Castle</h2>
            <button onClick={skipTour} className="guide-close-btn" aria-label="Close welcome dialog">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="guide-welcome-content">
            <p>Would you like to take a quick tour of our website to discover all we have to offer?</p>
            <div className="guide-welcome-buttons">
              <button onClick={startTour} className="guide-btn guide-btn-primary">
                Start Tour
              </button>
              <button onClick={skipTour} className="guide-btn guide-btn-secondary">
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!isOpen || !targetElement)
    return (
      <button onClick={() => onClose(true)} className="guide-help-button" aria-label="Start guided tour">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <span>Tour Guide</span>
      </button>
    )

  const isLastStep = currentStep === steps.length - 1

  return (
    <div className="guide-tour-overlay">
      {/* Overlay */}
      <div className="guide-overlay"></div>

      {/* Tour Card */}
      <div className={`guide-tour-card ${isAnimating ? "guide-card-animating" : ""}`}>
        {/* Progress indicator */}
        <div className="guide-progress-indicator">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`guide-progress-dot ${index === currentStep ? "active" : ""} ${index < currentStep ? "completed" : ""}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="guide-card-content">
          <div className="guide-card-header">
            <div className="guide-step-icon">{steps[currentStep].icon}</div>
            <div className="guide-step-info">
              <h3>{steps[currentStep].title}</h3>
              <div className="guide-step-counter">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
            <button onClick={handleClose} className="guide-close-btn" aria-label="Close guide">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="guide-card-body">
            <p>{steps[currentStep].content}</p>
          </div>

          <div className="guide-card-footer">
            {currentStep > 0 && (
              <button onClick={handlePrev} className="guide-btn guide-btn-secondary">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back
              </button>
            )}
            <button onClick={handleNext} className="guide-btn guide-btn-primary">
              {isLastStep ? "Finish" : "Next"}
              {!isLastStep && (
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
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
