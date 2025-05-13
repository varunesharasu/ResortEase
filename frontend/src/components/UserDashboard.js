"use client"

import { useEffect, useState, useRef } from "react"
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
  Home,
  CalendarDays,
  Menu,
  Bell,
  LogOut,
} from "lucide-react"
import "./user-dashboard.css"

const UserDashboard = () => {
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
          const mockUser = {
            _id: "user123",
            username: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            dob: "1990-01-15",
            createdAt: "2023-01-01",
            isVerified: true,
            profileImage: null,
            lastLogin: "2023-06-15",
          }

          const mockBookings = [
            {
              _id: "booking1234567",
              roomId: "Deluxe Suite",
              startDate: "2023-07-20",
              endDate: "2023-07-25",
              adults: 2,
              children: 1,
              totalAmount: 25000,
              status: "active",
            },
            {
              _id: "booking7654321",
              roomId: "Premium Villa",
              startDate: "2023-08-15",
              endDate: "2023-08-20",
              adults: 4,
              children: 2,
              totalAmount: 45000,
              status: "active",
            },
            {
              _id: "booking9876543",
              roomId: "Garden View",
              startDate: "2023-05-10",
              endDate: "2023-05-12",
              adults: 2,
              children: 0,
              totalAmount: 12000,
              status: "completed",
            },
          ]

          setUserData(mockUser)
          setBookings(mockBookings)
          setIsLoading(false)
        }, 1500)
      } catch (error) {
        console.error("Error fetching user data:", error)
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

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

      // Simulate API call
      setTimeout(() => {
        const updatedBookings = bookings.filter((b) => b._id !== bookingId)
        setBookings(updatedBookings)
        showNotification("Booking canceled successfully", "success")
      }, 1000)
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
      // Simulate API call
      setTimeout(() => {
        setUserData({
          ...userData,
          username: updatedUserData.username,
          phone: updatedUserData.phone,
          dob: updatedUserData.dob,
        })
        setIsEditing(false)
        showNotification("User details updated successfully", "success")
      }, 1000)
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

      // Simulate API call
      setTimeout(() => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setUserData({
            ...userData,
            profileImage: reader.result,
          })
          setIsUploadingImage(false)
          showNotification("Profile image updated successfully", "success")
        }
        reader.readAsDataURL(file)
      }, 1500)
    } catch (error) {
      console.error("Error uploading profile image:", error)
      setIsUploadingImage(false)
      showNotification("Failed to upload profile image", "error")
    }
  }

  const showNotification = (message, type) => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
    }

    setNotifications((prev) => [...prev, newNotification])

    // Remove notification after 3 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id))
    }, 3000)
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
    setIsGeneratingPdf(true)
    setGeneratingBookingId(booking._id)

    setTimeout(() => {
      const doc = new jsPDF()

      // Document properties
      doc.setProperties({
        title: `Royal Castle Farm Stay - Booking Confirmation`,
        subject: "Booking Details",
        creator: "Royal Castle Farm Stay",
      })

      // Colors
      const primaryColor = "#4a6fa5" // Royal blue
      const secondaryColor = "#555555" // Dark gray
      const accentColor = "#d4af37" // Gold accent
      const lightGray = "#f5f5f5"

      // Add watermark background
      doc.setFillColor(245, 245, 245)
      doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F")

      // Add decorative border
      doc.setDrawColor(212, 175, 55) // Gold
      doc.setLineWidth(0.5)
      doc.rect(10, 10, 190, 277) // Outer border

      // Header section with logo
      doc.setFillColor(255, 255, 255)
      doc.rect(15, 15, 180, 30, "F") // White header background

      // Resort name and address
      doc.setFont("helvetica", "bold")
      doc.setFontSize(16)
      doc.setTextColor(primaryColor)
      doc.text("ROYAL CASTLE FARM STAY", 60, 25)

      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      doc.setTextColor(secondaryColor)
      doc.text("SF.No.328/4, Andipalayam Road, EnneiKadai Karar, Odathurai, Erode, 638455", 60, 30)
      doc.text("Phone: +91 98765 43210 | Email: info@royalcastlefarmstay.com", 60, 35)

      // Booking confirmation title
      doc.setFontSize(20)
      doc.setTextColor(primaryColor)
      doc.text("BOOKING CONFIRMATION", 105, 55, { align: "center" })

      // Confirmation number
      doc.setFontSize(12)
      doc.setTextColor(accentColor)
      doc.text(`Confirmation #: ${booking._id.substring(0, 8).toUpperCase()}`, 105, 65, { align: "center" })

      // Date issued
      doc.setTextColor(secondaryColor)
      doc.text(`Date Issued: ${new Date().toLocaleDateString()}`, 105, 70, { align: "center" })

      // Horizontal divider
      doc.setDrawColor(212, 175, 55) // Gold
      doc.setLineWidth(0.3)
      doc.line(20, 80, 190, 80)

      doc.setFontSize(11)
      doc.setTextColor(secondaryColor)

      const guestInfo = [
        { label: "Guest Name:", value: userData?.username || "Registered User" },
        { label: "Email:", value: userData?.email || "Contact hotel for details" },
        { label: "Phone:", value: userData?.phone || "Not provided" },
      ]

      // Guest info table
      let guestY = 90
      guestInfo.forEach((info) => {
        doc.setFont("helvetica", "bold")
        doc.text(info.label, 15, guestY)
        doc.setFont("helvetica", "normal")
        doc.text(info.value, 45, guestY)
        guestY += 7
      })

      // Booking Details Section
      doc.setFontSize(14)
      doc.setTextColor(primaryColor)
      doc.text("BOOKING DETAILS", 15, guestY + 10)

      doc.setFontSize(11)
      doc.setTextColor(secondaryColor)

      const nights = calculateNights(booking.startDate, booking.endDate)
      const bookingDetails = [
        { label: "Room Type:", value: `${booking.roomId}` },
        { label: "Check-in:", value: `${formatDate(booking.startDate)} at 2:00 PM` },
        { label: "Check-out:", value: `${formatDate(booking.endDate)} at 12:00 PM` },
        { label: "Duration:", value: `${nights} night${nights > 1 ? "s" : ""}` },
        {
          label: "Guests:",
          value: `${booking.adults} Adult${booking.adults > 1 ? "s" : ""}, ${booking.children} Child${booking.children !== 1 ? "ren" : ""}`,
        },
      ]

      // Booking details table
      let bookingY = guestY + 20
      bookingDetails.forEach((detail) => {
        doc.setFont("helvetica", "bold")
        doc.text(detail.label, 15, bookingY)
        doc.setFont("helvetica", "normal")
        doc.text(detail.value, 45, bookingY)
        bookingY += 7
      })

      // Payment Information Section
      doc.setFontSize(14)
      doc.setTextColor(primaryColor)
      doc.text("PAYMENT INFORMATION", 15, bookingY + 10)

      doc.setFontSize(11)

      // Payment table header
      doc.setFillColor(74, 111, 165) // Primary color
      doc.rect(15, bookingY + 15, 175, 8, "F")
      doc.setTextColor(255, 255, 255)
      doc.text("Description", 20, bookingY + 20)
      doc.text("Amount", 170, bookingY + 20, { align: "right" })

      // Payment rows
      doc.setFillColor(255, 255, 255)
      doc.setTextColor(secondaryColor)

      // Room charge
      doc.rect(15, bookingY + 23, 175, 8, "F")
      doc.text(`Room Charge (${nights} night${nights > 1 ? "s" : ""})`, 20, bookingY + 28)
      doc.text(`₹${booking.totalAmount}`, 170, bookingY + 28, { align: "right" })

      // Total row
      doc.setFillColor(245, 245, 245)
      doc.rect(15, bookingY + 31, 175, 10, "F")
      doc.setFont("helvetica", "bold")
      doc.text("Total Amount", 20, bookingY + 37)
      doc.text(`₹${booking.totalAmount}`, 170, bookingY + 37, { align: "right" })

      // Hotel Policies Section
      doc.setFontSize(14)
      doc.setTextColor(primaryColor)
      doc.text("HOTEL POLICIES", 15, bookingY + 50)

      doc.setFontSize(10)
      doc.setTextColor(secondaryColor)

      const policies = [
        "• Check-in time: 2:00 PM | Check-out time: 12:00 PM",
        "• Early check-in/late check-out subject to availability",
        "• Cancellation: Free cancellation up to 24 hours before check-in",
        "• No-show policy: Full stay will be charged",
        "• Pets: Not allowed",
        "• Smoking: Non-smoking property",
        "• ID proof required at check-in",
      ]

      let policyY = bookingY + 60
      policies.forEach((policy) => {
        doc.text(policy, 20, policyY)
        policyY += 6
      })

      // Footer
      doc.setFontSize(10)
      doc.setTextColor(secondaryColor)
      doc.text("Thank you for choosing Royal Castle Farm Stay. We look forward to welcoming you!", 105, 270, {
        align: "center",
      })

      // Confidential notice
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text("This document is confidential and intended solely for the addressee", 105, 275, { align: "center" })
      doc.text("© " + new Date().getFullYear() + " Royal Castle Farm Stay. All rights reserved.", 105, 280, {
        align: "center",
      })

      // Save the PDF
      doc.save(`RoyalCastle_Booking_${booking._id.substring(0, 8)}.pdf`)

      setIsGeneratingPdf(false)
      setGeneratingBookingId(null)
    }, 2000)
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
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

  // Get profile image URL
  const getProfileImageUrl = () => {
    if (imagePreview) {
      return imagePreview
    } else if (userData?.profileImage) {
      return userData.profileImage
    }
    return null
  }

  // Skeleton loader component
  const Skeleton = ({ className }) => {
    return <div className={`skeleton ${className}`}></div>
  }

  // Settings section component
  const SettingsSection = () => {
    return (
      <div className="settings-section">
        <div className="section-header">
          <h2>Account Settings</h2>
          <p>Manage your account preferences and settings</p>
        </div>

        <div className="settings-card">
          <div className="settings-group">
            <h4>Notification Preferences</h4>
            <div className="settings-options">
              <div className="settings-option">
                <div className="option-label">
                  <span>Email Notifications</span>
                  <p className="option-description">Receive booking confirmations and updates via email</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="settings-option">
                <div className="option-label">
                  <span>SMS Notifications</span>
                  <p className="option-description">Receive booking alerts and reminders via SMS</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="settings-option">
                <div className="option-label">
                  <span>Marketing Communications</span>
                  <p className="option-description">Receive special offers and promotions</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="settings-group">
            <h4>Security Settings</h4>
            <div className="settings-options">
              <div className="settings-option">
                <div className="option-label">
                  <span>Change Password</span>
                  <p className="option-description">Update your account password</p>
                </div>
                <button className="settings-action-button">Change</button>
              </div>

              <div className="settings-option">
                <div className="option-label">
                  <span>Two-Factor Authentication</span>
                  <p className="option-description">Add an extra layer of security to your account</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="settings-group">
            <h4>Account Management</h4>
            <div className="settings-options">
              <div className="settings-option">
                <div className="option-label">
                  <span>Delete Account</span>
                  <p className="option-description">Permanently delete your account and all data</p>
                </div>
                <button className="settings-action-button danger">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Payments section component
  const PaymentsSection = () => {
    return (
      <div className="payments-section">
        <div className="section-header">
          <h2>Payment History</h2>
          <p>View your payment history and manage payment methods</p>
        </div>

        <div className="payments-card">
          <div className="payments-header">
            <h3>Payment Methods</h3>
            <button className="add-payment-button">
              <span>Add Payment Method</span>
            </button>
          </div>

          <div className="payment-methods">
            <div className="payment-method">
              <div className="payment-method-icon visa"></div>
              <div className="payment-method-details">
                <h4>Visa ending in 4242</h4>
                <p>Expires 12/2025</p>
              </div>
              <div className="payment-method-actions">
                <span className="payment-method-default">Default</span>
                <button className="payment-method-edit">Edit</button>
              </div>
            </div>

            <div className="payment-method">
              <div className="payment-method-icon mastercard"></div>
              <div className="payment-method-details">
                <h4>Mastercard ending in 8888</h4>
                <p>Expires 08/2024</p>
              </div>
              <div className="payment-method-actions">
                <button className="payment-method-make-default">Make Default</button>
                <button className="payment-method-edit">Edit</button>
              </div>
            </div>
          </div>

          <div className="payments-history">
            <h3>Recent Transactions</h3>

            <div className="transactions-list">
              {bookings.map((booking) => (
                <div className="transaction-item" key={booking._id}>
                  <div className="transaction-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="transaction-details">
                    <h4>Payment for {booking.roomId}</h4>
                    <p>Booking #{booking._id.substring(0, 8)}</p>
                    <span className="transaction-date">{formatDate(booking.startDate)}</span>
                  </div>
                  <div className="transaction-amount">
                    <span>₹{booking.totalAmount}</span>
                    <span className="transaction-status success">Successful</span>
                  </div>
                </div>
              ))}

              {bookings.length === 0 && (
                <div className="empty-transactions">
                  <p>No transaction history available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      {/* Mobile Header */}
      <div className="mobile-header">
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
        <div className="mobile-logo">Royal Castle</div>
        <div className="mobile-actions">
          <button className="mobile-action-button" aria-label="Notifications">
            <Bell size={20} />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`dashboard-sidebar ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-text">Royal Castle</span>
          </div>
          <button className="sidebar-close-button" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {getProfileImageUrl() ? (
              <img src={getProfileImageUrl() || "/placeholder.svg"} alt="Profile" className="avatar-image" />
            ) : (
              <div className="avatar-placeholder">{userData?.username?.charAt(0) || "U"}</div>
            )}
          </div>
          <div className="sidebar-user-info">
            <h3>{userData?.username || "User"}</h3>
            <p>{userData?.email || ""}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("profile")
              setIsMobileMenuOpen(false)
            }}
          >
            <User size={20} />
            <span>Profile</span>
          </button>

          <button
            className={`nav-item ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("bookings")
              setIsMobileMenuOpen(false)
            }}
          >
            <BookOpen size={20} />
            <span>Bookings</span>
          </button>

          <button
            className={`nav-item ${activeTab === "payments" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("payments")
              setIsMobileMenuOpen(false)
            }}
          >
            <CreditCard size={20} />
            <span>Payments</span>
          </button>

          <button
            className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("settings")
              setIsMobileMenuOpen(false)
            }}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <main className="dashboard-content">
          {/* Profile Section */}
          {activeTab === "profile" && (
            <div className="profile-section">
              <div className="section-header">
                <h2>My Profile</h2>
                <p>Manage your personal information and account details</p>
              </div>

              {isLoading ? (
                <div className="profile-card">
                  <div className="profile-header skeleton-header">
                    <Skeleton className="skeleton-avatar" />
                    <div className="skeleton-info">
                      <Skeleton className="skeleton-title" />
                      <Skeleton className="skeleton-subtitle" />
                    </div>
                  </div>
                  <div className="profile-details">
                    <Skeleton className="skeleton-section-title" />
                    <div className="skeleton-details-grid">
                      <Skeleton className="skeleton-detail-item" />
                      <Skeleton className="skeleton-detail-item" />
                      <Skeleton className="skeleton-detail-item" />
                      <Skeleton className="skeleton-detail-item" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="profile-card">
                  <div className="profile-header">
                    <div className="profile-avatar-container">
                      <div className="profile-avatar" onClick={handleProfileImageClick}>
                        {getProfileImageUrl() ? (
                          <img
                            src={getProfileImageUrl() || "/placeholder.svg"}
                            alt="Profile"
                            className="avatar-image"
                          />
                        ) : (
                          <div className="avatar-text">{userData?.username?.charAt(0) || "U"}</div>
                        )}
                        <div className="avatar-overlay">
                          <Camera size={20} />
                        </div>
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
                        <CalendarDays size={14} />
                        Member since {formatDate(userData?.createdAt || new Date())}
                      </span>
                    </div>
                    <button className="edit-profile-button" onClick={openEditModal}>
                      <Edit size={16} />
                      <span>Edit Profile</span>
                    </button>
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
                            <span className="stat-label">Total Bookings</span>
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

                        <div className="stat-card">
                          <div className="stat-icon">
                            <DollarSign size={20} />
                          </div>
                          <div className="stat-content">
                            <span className="stat-value">
                              ₹{bookings.reduce((total, booking) => total + booking.totalAmount, 0)}
                            </span>
                            <span className="stat-label">Total Spent</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bookings Section */}
          {activeTab === "bookings" && (
            <div className="bookings-section">
              <div className="section-header">
                <h2>My Bookings</h2>
                <p>View and manage your reservations</p>
              </div>

              {isLoading ? (
                <div className="bookings-card">
                  <div className="bookings-header skeleton-header">
                    <Skeleton className="skeleton-title" />
                    <div className="skeleton-filter">
                      <Skeleton className="skeleton-filter-item" />
                      <Skeleton className="skeleton-filter-item" />
                      <Skeleton className="skeleton-filter-item" />
                    </div>
                  </div>
                  <div className="bookings-list">
                    <Skeleton className="skeleton-booking" />
                    <Skeleton className="skeleton-booking" />
                    <Skeleton className="skeleton-booking" />
                  </div>
                </div>
              ) : (
                <div className="bookings-card">
                  <div className="bookings-header">
                    <h3>Your Reservations</h3>
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
                      <h4>No {bookingFilter !== "all" ? bookingFilter : ""} Bookings Found</h4>
                      <p>
                        You don't have any {bookingFilter !== "all" ? bookingFilter : "active"} reservations at the
                        moment.
                      </p>
                      <button
                        className="book-now-button"
                        onClick={() => {
                          /* Navigate to rooms */
                        }}
                      >
                        <Home size={18} />
                        <span>Book a Room</span>
                      </button>
                    </div>
                  ) : (
                    <div className="bookings-list">
                      {getFilteredBookings().map((booking) => (
                        <div key={booking._id} className="booking-item">
                          <div className="booking-main">
                            <div className="booking-info">
                              <div className="booking-title">
                                <h4>{booking.roomId}</h4>
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
                              <button
                                className="action-button download"
                                onClick={() => handleDownloadBookingDetails(booking)}
                              >
                                <Download size={16} />
                                <span>Download</span>
                              </button>

                              {canCancelBooking(booking) ? (
                                <button
                                  className="action-button cancel"
                                  onClick={() => handleCancelBooking(booking._id)}
                                >
                                  <X size={16} />
                                  <span>Cancel</span>
                                </button>
                              ) : (
                                <button
                                  className="action-button cancel disabled"
                                  disabled
                                  title="Cancellation is not available for this booking"
                                >
                                  <X size={16} />
                                  <span>Cancel</span>
                                </button>
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
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Payments Section */}
          {activeTab === "payments" && <PaymentsSection />}

          {/* Settings Section */}
          {activeTab === "settings" && <SettingsSection />}
        </main>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Profile</h3>
              <button className="modal-close" onClick={() => setIsEditing(false)}>
                <X size={20} />
              </button>
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
              <button className="button cancel-button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button className="button save-button" onClick={handleUpdateUserDetails}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Generation Loading Overlay */}
      {isGeneratingPdf && (
        <div className="pdf-overlay">
          <div className="pdf-container">
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
                <div className="step-indicator">1</div>
                <span>Collecting data</span>
              </div>
              <div className="pdf-step">
                <div className="step-indicator">2</div>
                <span>Formatting document</span>
              </div>
              <div className="pdf-step">
                <div className="step-indicator">3</div>
                <span>Finalizing PDF</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      <div className="notifications-container">
        {notifications.map((notification) => (
          <div key={notification.id} className={`notification ${notification.type}`}>
            <div className="notification-content">
              <span>{notification.message}</span>
              <button
                className="notification-close"
                onClick={() => setNotifications((prev) => prev.filter((n) => n.id !== notification.id))}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserDashboard
