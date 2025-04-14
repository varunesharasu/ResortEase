"use client"

import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { jsPDF } from "jspdf"
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  Users,
  DollarSign,
  FileText,
  X,
  Edit,
  Download,
  AlertTriangle,
  CheckCircle,
  BookOpen,
  Settings,
  CreditCard,
  Camera,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import "./UserDashboard.css"
import SettingsSection from "./settings-section"

const UserDashboard = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [bookings, setBookings] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [updatedUserData, setUpdatedUserData] = useState({
    username: "",
    phone: "",
    dob: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [generatingBookingId, setGeneratingBookingId] = useState(null)
  const [activeTab, setActiveTab] = useState("profile")
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const [bookingFilter, setBookingFilter] = useState("all")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem("token")
        if (!token) {
          navigate("/login")
          return
        }

        // Fetch all bookings instead of just active ones
        const response = await axios.get("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        })

        // Get all bookings
        const allBookings = response.data.bookings

        // Sort bookings by startDate (latest first)
        allBookings.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))

        setUserData(response.data.user)
        setBookings(allBookings)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching user data:", error)
        navigate("/login")
      }
    }

    fetchUserData()
  }, [navigate])

  // Update the handleCancelBooking function to check if the booking has already started
  const handleCancelBooking = async (bookingId) => {
    try {
      // Find the booking to check cancellation eligibility
      const booking = bookings.find((b) => b._id === bookingId)

      if (!booking) {
        showNotification("Booking not found", "error")
        return
      }

      // Check if booking has already started or completed
      const startDate = new Date(booking.startDate)
      const currentDate = new Date()

      if (currentDate >= startDate) {
        showNotification("Cannot cancel a booking that has already started or completed", "error")
        return
      }

      // Check if cancellation is allowed (24 hours before start date)
      const timeDifference = startDate.getTime() - currentDate.getTime()
      const hoursDifference = timeDifference / (1000 * 60 * 60)

      if (hoursDifference < 24) {
        showNotification("Cancellation is only allowed 24 hours before the reservation start date", "error")
        return
      }

      const token = localStorage.getItem("token")
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      // Refetch data to update UI
      const response = await axios.get("http://localhost:5000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUserData(response.data.user)
      setBookings(response.data.bookings.filter((b) => b.status === "active"))

      // Show success notification
      showNotification("Booking canceled successfully", "success")
    } catch (error) {
      console.error("Error canceling booking:", error)
      showNotification("Failed to cancel booking", "error")
    }
  }

  // Create a function to check if a booking can be canceled
  const canCancelBooking = (booking) => {
    const startDate = new Date(booking.startDate)
    const currentDate = new Date()

    // Cannot cancel if booking has already started
    if (currentDate >= startDate) {
      return false
    }

    // Cannot cancel if less than 24 hours before check-in
    const timeDifference = startDate.getTime() - currentDate.getTime()
    const hoursDifference = timeDifference / (1000 * 60 * 60)

    return hoursDifference >= 24
  }

  const handleUpdateUserDetails = async () => {
    try {
      const token = localStorage.getItem("token")
      await axios.put(
        "http://localhost:5000/api/user/update",
        {
          username: updatedUserData.username,
          phone: updatedUserData.phone,
          dob: updatedUserData.dob,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      // Refetch updated user data
      const response = await axios.get("http://localhost:5000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUserData(response.data.user)
      setIsEditing(false)
      showNotification("User details updated successfully", "success")
    } catch (error) {
      console.error("Error updating user details:", error)
      showNotification("Failed to update user details", "error")
    }
  }

  const handleProfileImageClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      showNotification("Please select an image file", "error")
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification("Image size should be less than 5MB", "error")
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Upload image
    handleUploadImage(file)
  }

  const handleUploadImage = async (file) => {
    try {
      setIsUploadingImage(true)
      const token = localStorage.getItem("token")

      const formData = new FormData()
      formData.append("profileImage", file)

      await axios.post("http://localhost:5000/api/user/upload-profile-image", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      // Update user data with new profile image
      const updatedUserResponse = await axios.get("http://localhost:5000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })

      setUserData(updatedUserResponse.data.user)
      setIsUploadingImage(false)
      showNotification("Profile image updated successfully", "success")
    } catch (error) {
      console.error("Error uploading profile image:", error)
      setIsUploadingImage(false)
      showNotification("Failed to upload profile image", "error")
    }
  }

  const showNotification = (message, type) => {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <span>${message}</span>
        <button class="notification-close">×</button>
      </div>
    `
    document.body.appendChild(notification)

    // Add the 'show' class after a small delay to trigger the animation
    setTimeout(() => {
      notification.classList.add("show")
    }, 10)

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)

    // Close button functionality
    const closeButton = notification.querySelector(".notification-close")
    closeButton.addEventListener("click", () => {
      notification.classList.remove("show")
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    })
  }

  const openEditModal = () => {
    if (userData) {
      setUpdatedUserData({
        username: userData.username || "",
        phone: userData.phone || "",
        dob: userData.dob ? new Date(userData.dob).toISOString().split("T")[0] : "",
      })
      setIsEditing(true)
    }
  }

  const handleDownloadBookingDetails = (booking) => {
    // Set loading state to true
    setIsGeneratingPdf(true)
    setGeneratingBookingId(booking._id)

    // Use setTimeout to allow the loading animation to render before starting the PDF generation
    setTimeout(() => {
      const doc = new jsPDF()

      // Set document properties with the requested title
      doc.setProperties({
        title: `Royal Castle Farm Stay - Booking CONFIRMATION`,
        subject: "Hotel Booking Information",
        creator: "Royal Castle Farm Stay",
      })

      // Define colors and styles
      const primaryColor = [74, 111, 165] // RGB for primary color
      const secondaryColor = [107, 114, 128] // RGB for text
      const lightGray = [229, 231, 235] // RGB for light gray

      // Header section
      doc.setFillColor(249, 250, 251) // Light background
      doc.rect(0, 0, 210, 50, "F")

      // Resort Name and Address (Letterhead style)
      doc.setFont("helvetica", "bold")
      doc.setFontSize(18)
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.text("ROYAL CASTLE FARM STAY", 105, 15, { align: "center" })

      // Resort Address
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
      doc.text("123 Countryside Road, Royal Hills", 105, 22, { align: "center" })
      doc.text("Tamil Nadu, India - 600001", 105, 27, { align: "center" })
      doc.text("Phone: +91 98765 43210 | Email: info@royalcastlefarmstay.com", 105, 32, { align: "center" })

      // GST Number
      doc.setFont("helvetica", "bold")
      doc.text("GST No: 33DZPPP2781E1Z2", 105, 40, { align: "center" })

      // Removed the "BOOKING CONFIRMATION" title and booking reference
      // Instead, add the generation date
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
      doc.text(`Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 105, 55, {
        align: "center",
      })

      // Horizontal line
      doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2])
      doc.setLineWidth(0.5)
      doc.line(15, 65, 195, 65)

      // Guest Information Section - adjusted vertical positions
      doc.setFont("helvetica", "bold")
      doc.setFontSize(16)
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.text("Guest Information", 15, 75)

      doc.setFont("helvetica", "normal")
      doc.setFontSize(12)
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])

      // If userData is available, use it, otherwise use placeholder
      if (userData) {
        doc.text(`Guest Name: ${userData.username}`, 15, 85)
        doc.text(`Email: ${userData.email}`, 15, 93)
      } else {
        doc.text("Guest Name: Registered User", 15, 85)
        doc.text("Email: Contact hotel for details", 15, 93)
      }

      // Booking Details Section - adjusted vertical positions
      doc.setFont("helvetica", "bold")
      doc.setFontSize(16)
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.text("Booking Details", 15, 110)

      doc.setFont("helvetica", "normal")
      doc.setFontSize(12)
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])

      const startDate = new Date(booking.startDate).toLocaleDateString()
      const endDate = new Date(booking.endDate).toLocaleDateString()

      // Calculate number of nights
      const nights = Math.round((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24))

      doc.text(`Room: ${booking.roomId}`, 15, 120)
      doc.text(`Check-in Date: ${startDate}`, 15, 128)
      doc.text(`Check-out Date: ${endDate}`, 15, 136)
      doc.text(`Duration: ${nights} night(s)`, 15, 144)
      doc.text(`Number of Guests: ${booking.adults} Adult(s), ${booking.children} Child(ren)`, 15, 152)

      // Payment Information Section - adjusted vertical positions
      doc.setFont("helvetica", "bold")
      doc.setFontSize(16)
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.text("Payment Information", 15, 170)

      doc.setFont("helvetica", "normal")
      doc.setFontSize(12)
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])

      // Create a payment table
      doc.text("Description", 15, 180)
      doc.text("Amount", 160, 180, { align: "right" })

      // Line under table header
      doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2])
      doc.line(15, 182, 195, 182)

      // Table content - you can add more rows as needed
      doc.text(`Room Charge (${nights} night(s))`, 15, 190)
      doc.text(`₹${booking.totalAmount}`, 160, 190, { align: "right" })

      // Add taxes (example - modify as needed)
      const taxRate = 0.18 // 18% GST
      const taxAmount = (booking.totalAmount * taxRate).toFixed(2)
      doc.text("Taxes (18% GST)", 15, 198)
      doc.text(`₹${taxAmount}`, 160, 198, { align: "right" })

      // Total
      doc.line(15, 202, 195, 202)
      doc.setFont("helvetica", "bold")
      doc.text("Total Amount", 15, 210)
      doc.text(`₹${(Number.parseFloat(booking.totalAmount) + Number.parseFloat(taxAmount)).toFixed(2)}`, 160, 210, {
        align: "right",
      })

      // Hotel Policies Section - adjusted vertical positions
      doc.setFont("helvetica", "bold")
      doc.setFontSize(16)
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.text("Hotel Policies", 15, 228)

      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])

      const policies = [
        "• Check-in time: 2:00 PM, Check-out time: 12:00 PM",
        "• Cancellation: Free cancellation up to 24 hours before check-in",
        "• Pets: Not allowed",
        "• Smoking: Non-smoking rooms",
      ]

      let yPos = 238
      policies.forEach((policy) => {
        doc.text(policy, 15, yPos)
        yPos += 7
      })

      // Footer
      doc.setFillColor(249, 250, 251)
      doc.rect(0, 270, 210, 27, "F")

      doc.setFont("helvetica", "italic")
      doc.setFontSize(10)
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
      doc.text("Thank you for choosing Royal Castle Farm Stay. We look forward to welcoming you!", 105, 280, {
        align: "center",
      })
      doc.text("For any inquiries, please contact our customer service.", 105, 287, { align: "center" })

      // Save the PDF
      doc.save(`RoyalCastleFarmStay_Booking_${booking._id}.pdf`)

      // Set loading state back to false
      setIsGeneratingPdf(false)
      setGeneratingBookingId(null)
    }, 100) // Small delay to ensure the loading state is rendered
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  // Calculate nights between two dates
  const calculateNights = (startDate, endDate) => {
    return Math.round((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))
  }

  // Filter bookings based on selected filter
  const getFilteredBookings = () => {
    const currentDate = new Date()

    switch (bookingFilter) {
      case "upcoming":
        return bookings.filter((booking) => new Date(booking.startDate) > currentDate && booking.status !== "cancelled")
      case "past":
        return bookings.filter((booking) => new Date(booking.endDate) < currentDate || booking.status === "completed")
      default:
        return bookings
    }
  }

  // Skeleton loader component
  const Skeleton = ({ className }) => {
    return <div className={`skeleton ${className}`}></div>
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  }

  // Get profile image URL
  const getProfileImageUrl = () => {
    if (imagePreview) {
      return imagePreview
    } else if (userData?.profileImage) {
      // Use the full URL with the server address
      return `http://localhost:5000${userData.profileImage}`
    }
    return null
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-text">Royal Castle</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={18} />
            <span>Profile</span>
          </button>

          <button
            className={`nav-item ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            <BookOpen size={18} />
            <span>Bookings</span>
          </button>

          <button
            className={`nav-item ${activeTab === "payments" ? "active" : ""}`}
            onClick={() => setActiveTab("payments")}
          >
            <CreditCard size={18} />
            <span>Payments</span>
          </button>

          <button
            className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      <div className="dashboard-main">
        <main className="dashboard-content">
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                className="profile-section"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={containerVariants}
              >
                <motion.div className="section-header" variants={itemVariants}>
                  <h2>My Profile</h2>
                  <p>Manage your personal information</p>
                </motion.div>

                {isLoading ? (
                  <div className="profile-card">
                    <div className="card-header">
                      <Skeleton className="h-8 w-1/3 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <div className="card-content">
                      <div className="skeleton-group">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div className="profile-card" variants={itemVariants}>
                    <div className="profile-header">
                      <div className="profile-avatar-container" onClick={handleProfileImageClick}>
                        <div className="profile-avatar">
                          {getProfileImageUrl() ? (
                            <img
                              src={getProfileImageUrl() || "/placeholder.svg"}
                              alt="Profile"
                              className="avatar-image"
                            />
                          ) : (
                            userData?.username?.charAt(0) || "U"
                          )}
                        </div>
                        <div className="avatar-overlay">
                          {isUploadingImage ? <div className="avatar-loading"></div> : <Camera size={20} />}
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden-file-input"
                        />
                      </div>
                      <div className="profile-title">
                        <h3>
                          {userData?.username || "User"}
                          {userData?.isVerified && (
                            <span className="verification-badge" title="Verified Account">
                              <CheckCircle size={16} className="verification-icon" />
                            </span>
                          )}
                        </h3>
                        <span className="member-since">
                          Member since {formatDate(userData?.createdAt || new Date())}
                        </span>
                      </div>
                      <motion.button
                        className="edit-profile-button"
                        onClick={openEditModal}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Edit size={16} />
                        <span>Edit Profile</span>
                      </motion.button>
                    </div>

                    <div className="profile-details">
                      <div className="detail-group">
                        <h4>Personal Information</h4>
                        <div className="detail-items">
                          <div className="detail-item">
                            <User className="detail-icon" size={18} />
                            <div className="detail-content">
                              <span className="detail-label">Full Name</span>
                              <span className="detail-value">{userData?.username || "Not provided"}</span>
                            </div>
                          </div>

                          <div className="detail-item">
                            <Mail className="detail-icon" size={18} />
                            <div className="detail-content">
                              <span className="detail-label">Email Address</span>
                              <span className="detail-value">{userData?.email || "Not provided"}</span>
                            </div>
                          </div>

                          {userData?.phone && (
                            <div className="detail-item">
                              <Phone className="detail-icon" size={18} />
                              <div className="detail-content">
                                <span className="detail-label">Phone Number</span>
                                <span className="detail-value">{userData?.phone}</span>
                              </div>
                            </div>
                          )}

                          {userData?.dob && (
                            <div className="detail-item">
                              <Calendar className="detail-icon" size={18} />
                              <div className="detail-content">
                                <span className="detail-label">Date of Birth</span>
                                <span className="detail-value">{formatDate(userData?.dob)}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="detail-group">
                        <h4>Account Statistics</h4>
                        <div className="stats-cards">
                          <div className="stat-card">
                            <div className="stat-icon">
                              <BookOpen size={20} />
                            </div>
                            <div className="stat-content">
                              <span className="stat-value">{bookings.length}</span>
                              <span className="stat-label">Active Bookings</span>
                            </div>
                          </div>

                          <div className="stat-card">
                            <div className="stat-icon">
                              <Clock size={20} />
                            </div>
                            <div className="stat-content">
                              <span className="stat-value">
                                {userData?.lastLogin ? formatDate(userData.lastLogin) : "N/A"}
                              </span>
                              <span className="stat-label">Last Login</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === "bookings" && (
              <motion.div
                key="bookings"
                className="bookings-section"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={containerVariants}
              >
                <motion.div className="section-header" variants={itemVariants}>
                  <h2>My Bookings</h2>
                  <p>Manage your reservations</p>
                </motion.div>

                {isLoading ? (
                  <div className="bookings-card">
                    <div className="card-header">
                      <Skeleton className="h-8 w-1/3 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <div className="card-content">
                      <div className="skeleton-group">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div className="bookings-card" variants={itemVariants}>
                    <div className="bookings-header">
                      <h3>Active Reservations</h3>
                      <div className="bookings-filter">
                        <button
                          className={`filter-button ${bookingFilter === "all" ? "active" : ""}`}
                          onClick={() => setBookingFilter("all")}
                        >
                          All
                        </button>
                        <button
                          className={`filter-button ${bookingFilter === "upcoming" ? "active" : ""}`}
                          onClick={() => setBookingFilter("upcoming")}
                        >
                          Upcoming
                        </button>
                        <button
                          className={`filter-button ${bookingFilter === "past" ? "active" : ""}`}
                          onClick={() => setBookingFilter("past")}
                        >
                          Past
                        </button>
                      </div>
                    </div>

                    {getFilteredBookings().length === 0 ? (
                      <div className="empty-bookings">
                        <div className="empty-icon">
                          <Calendar size={48} />
                        </div>
                        <h4>No {bookingFilter !== "all" ? bookingFilter : "active"} Bookings</h4>
                        <p>
                          You don't have any {bookingFilter !== "all" ? bookingFilter : "active"} reservations at the
                          moment.
                        </p>
                        <motion.button
                          className="book-now-button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate("/rooms")}
                        >
                          Book a Room
                        </motion.button>
                      </div>
                    ) : (
                      <div className="bookings-list">
                        {getFilteredBookings().map((booking, index) => (
                          <motion.div key={booking._id} className="booking-item" variants={itemVariants} custom={index}>
                            <div className="booking-main">
                              <div className="booking-info">
                                <div className="booking-title">
                                  <h4>Room {booking.roomId}</h4>
                                  <span className="booking-id">#{booking._id.substring(0, 8)}</span>
                                </div>

                                <div className="booking-details">
                                  <div className="booking-dates">
                                    <div className="date-range">
                                      <span className="date-label">Check-in</span>
                                      <span className="date-value">{formatDate(booking.startDate)}</span>
                                    </div>
                                    <div className="date-arrow">→</div>
                                    <div className="date-range">
                                      <span className="date-label">Check-out</span>
                                      <span className="date-value">{formatDate(booking.endDate)}</span>
                                    </div>
                                  </div>

                                  <div className="booking-meta">
                                    <div className="meta-item">
                                      <Clock size={16} />
                                      <span>{calculateNights(booking.startDate, booking.endDate)} nights</span>
                                    </div>
                                    <div className="meta-item">
                                      <Users size={16} />
                                      <span>
                                        {booking.adults} Adults, {booking.children} Children
                                      </span>
                                    </div>
                                    <div className="meta-item">
                                      <DollarSign size={16} />
                                      <span>₹{booking.totalAmount}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="booking-actions">
                                <motion.button
                                  className="action-button download"
                                  onClick={() => handleDownloadBookingDetails(booking)}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Download size={16} />
                                  <span>Download</span>
                                </motion.button>

                                {canCancelBooking(booking) ? (
                                  <motion.button
                                    className="action-button cancel"
                                    onClick={() => handleCancelBooking(booking._id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <X size={16} />
                                    <span>Cancel</span>
                                  </motion.button>
                                ) : (
                                  <motion.button
                                    className="action-button cancel disabled"
                                    disabled
                                    title="Cancellation is not available for this booking"
                                  >
                                    <X size={16} />
                                    <span>Cancel</span>
                                  </motion.button>
                                )}
                              </div>
                            </div>

                            <div className="booking-status">
                              <div className="status-badge confirmed">
                                <CheckCircle size={14} />
                                <span>Confirmed</span>
                              </div>

                              {new Date(booking.startDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                                <div className="status-badge upcoming">
                                  <AlertTriangle size={14} />
                                  <span>Upcoming</span>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === "settings" && <SettingsSection userData={userData} navigate={navigate} />}
          </AnimatePresence>
        </main>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEditing(false)}
          >
            <motion.div
              className="modal-container"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Edit Profile</h3>
                <motion.button
                  className="modal-close"
                  onClick={() => setIsEditing(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="username">Full Name</label>
                  <input
                    id="username"
                    type="text"
                    value={updatedUserData.username}
                    onChange={(e) => setUpdatedUserData({ ...updatedUserData, username: e.target.value })}
                    placeholder="Enter your full name"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address (Read Only)</label>
                  <input
                    id="email"
                    type="email"
                    value={userData?.email}
                    readOnly
                    disabled
                    className="form-input disabled"
                  />
                  <small className="form-hint">Email address cannot be changed</small>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    value={updatedUserData.phone}
                    onChange={(e) => setUpdatedUserData({ ...updatedUserData, phone: e.target.value })}
                    placeholder="Enter your phone number"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    id="dob"
                    type="date"
                    value={updatedUserData.dob}
                    onChange={(e) => setUpdatedUserData({ ...updatedUserData, dob: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <motion.button
                  className="button cancel-button"
                  onClick={() => setIsEditing(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="button save-button"
                  onClick={handleUpdateUserDetails}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Generation Loading Overlay */}
      <AnimatePresence>
        {isGeneratingPdf && (
          <motion.div className="pdf-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="pdf-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="pdf-icon">
                <FileText size={48} />
              </div>

              <h3>Generating Your Booking PDF</h3>
              <p>Royal Castle Farm Stay - Booking #{generatingBookingId?.substring(0, 8)}</p>

              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>

              <div className="pdf-steps">
                <div className="pdf-step active">
                  <div className="step-indicator"></div>
                  <span>Collecting data</span>
                </div>
                <div className="pdf-step">
                  <div className="step-indicator"></div>
                  <span>Formatting document</span>
                </div>
                <div className="pdf-step">
                  <div className="step-indicator"></div>
                  <span>Finalizing PDF</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserDashboard

