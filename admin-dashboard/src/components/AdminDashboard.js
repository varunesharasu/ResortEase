"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import "./AdminDashboard.css"

// Icons as SVG components
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="search-icon"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
)

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
)

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const RoomIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
)

const ChartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
  >
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
)

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
)

const CancelIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
)

const DollarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
  >
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
)

const ClipboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="action-icon"
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
  </svg>
)

const RefreshIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="action-icon"
  >
    <path d="M23 4v6h-6"></path>
    <path d="M1 20v-6h6"></path>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
)

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const navigate = useNavigate()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)",
      transition: { duration: 0.2 }
    }
  }

  const tableVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.3, ease: "easeOut" },
    },
  }

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("adminToken")
        if (!token) {
          navigate("/admin/login")
          return
        }

        const response = await axios.get("http://localhost:5000/api/admin/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        })

        setBookings(response.data.bookings || [])
      } catch (err) {
        setError("Failed to fetch bookings. Please try again.")
        console.error("Error fetching bookings:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [navigate])

  // Filter bookings based on search query and status filter
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      String(booking.bookingId).toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(booking.roomId).toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(booking.status).toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Calculate stats for the dashboard
  const totalBookings = bookings.length
  const activeBookings = bookings.filter((b) => b.status.toLowerCase() === "active").length
  const canceledBookings = bookings.filter((b) => b.status.toLowerCase() === "canceled").length
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0)

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    const statusLower = status.toLowerCase()
    if (statusLower === "active") return "status-badge status-active"
    if (statusLower === "canceled") return "status-badge status-canceled"
    return "status-badge status-pending"
  }

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="loading-skeleton skeleton-header"></div>
          <div className="loading-stats">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="loading-skeleton skeleton-card"></div>
            ))}
          </div>
          <div className="loading-skeleton skeleton-controls"></div>
          <div className="loading-skeleton skeleton-table"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error-container">
          <CancelIcon />
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="admin-dashboard"
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
    >
      <motion.div className="dashboard-header" variants={itemVariants}>
        <h1>Booking Management</h1>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="dashboard-stats"
        variants={itemVariants}
      >
        <motion.div 
          className="stat-card stat-card-blue"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="stat-card-header">
            <ChartIcon />
            <h3>Total Bookings</h3>
          </div>
          <p className="stat-value">{totalBookings}</p>
        </motion.div>

        <motion.div 
          className="stat-card stat-card-green"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="stat-card-header">
            <UsersIcon />
            <h3>Active Bookings</h3>
          </div>
          <p className="stat-value">{activeBookings}</p>
        </motion.div>

        <motion.div 
          className="stat-card stat-card-red"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="stat-card-header">
            <CancelIcon />
            <h3>Canceled Bookings</h3>
          </div>
          <p className="stat-value">{canceledBookings}</p>
        </motion.div>

        <motion.div 
          className="stat-card stat-card-purple"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="stat-card-header">
            <DollarIcon />
            <h3>Total Revenue</h3>
          </div>
          <p className="stat-value">{formatCurrency(totalRevenue)}</p>
        </motion.div>
      </motion.div>

      {/* Controls */}
      <motion.div 
        className="controls"
        variants={itemVariants}
      >
        <div className="search-bar">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="status-filter">
          <button
            className={`filter-button ${statusFilter === "all" ? "active" : ""}`}
            onClick={() => setStatusFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-button ${statusFilter === "active" ? "active" : ""}`}
            onClick={() => setStatusFilter("active")}
          >
            Active
          </button>
          <button
            className={`filter-button ${statusFilter === "canceled" ? "active" : ""}`}
            onClick={() => setStatusFilter("canceled")}
          >
            Canceled
          </button>
        </div>
      </motion.div>

      {/* Bookings Table */}
      <AnimatePresence mode="wait">
        {filteredBookings.length > 0 ? (
          <motion.div
            key="table"
            className="table-container"
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.98 }}
          >
            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Room</th>
                  <th>Dates</th>
                  <th>Guests</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Customer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredBookings.map((booking, index) => (
                    <motion.tr
                      key={booking.bookingId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="table-row"
                    >
                      <td className="booking-id">#{booking.bookingId}</td>
                      <td>
                        <div className="cell-with-icon">
                          <RoomIcon />
                          <span>Room #{booking.roomId}</span>
                        </div>
                      </td>
                      <td>
                        <div className="cell-with-icon">
                          <CalendarIcon />
                          <div className="date-range">
                            <div>{new Date(booking.startDate).toLocaleDateString()}</div>
                            <div>{new Date(booking.endDate).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {booking.adults} Adults
                        {booking.children > 0 && `, ${booking.children} Children`}
                      </td>
                      <td className="amount">{formatCurrency(booking.totalAmount)}</td>
                      <td>
                        <span className={getStatusBadgeClass(booking.status)}>
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <div className="cell-with-icon">
                          <UserIcon />
                          <div className="user-info">
                            <div className="username">{booking.user.username}</div>
                            <div className="email">{booking.user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-button" title="Copy details">
                            <ClipboardIcon />
                          </button>
                          <button className="action-button" title="Refresh">
                            <RefreshIcon />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className="empty-state"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
          >
            <RoomIcon />
            <h3>No bookings found</h3>
            <p>No bookings match your current search criteria.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default AdminDashboard
