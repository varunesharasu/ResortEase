// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isLoggedIn = !!localStorage.getItem('token');
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navbarRef = useRef(null);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close mobile menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (navbarRef.current && !navbarRef.current.contains(event.target)) {
//         setMobileMenuOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setMobileMenuOpen(false);
//   }, [location.pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   return (
//     <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`} ref={navbarRef}>
//       <div className="navbar-content">
//         <div className="navbar-brand">
//           <Link to="/" className="brand-link">
//           <img src={require("../logo.png")} alt="Logo" className='brand-icon'/>

//             <span className="brand-name">Royal Castle</span>
//           </Link>
//         </div>

//         <button 
//           className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
//           onClick={toggleMobileMenu}
//           aria-label="Toggle menu"
//         >
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//         </button>

//         <nav className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
//           <ul className="nav-list">
//             <li className="nav-item">
//               <Link 
//                 to="/" 
//                 className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
//               >
//                 <span className="nav-icon">🏠</span>
//                 <span className="nav-text">Home</span>
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link 
//                 to="/rooms" 
//                 className={`nav-link ${location.pathname === '/rooms' ? 'active' : ''}`}
//               >
//                 <span className="nav-icon">🛏️</span>
//                 <span className="nav-text">Rooms</span>
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link 
//                 to="/about" 
//                 className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
//               >
//                 <span className="nav-icon">ℹ️</span>
//                 <span className="nav-text">About</span>
//               </Link>
//             </li>
//             {isLoggedIn && (
//               <li className="nav-item">
//                 <Link 
//                   to="/dashboard" 
//                   className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
//                 >
//                   <span className="nav-icon">📊</span>
//                   <span className="nav-text">Dashboard</span>
//                 </Link>
//               </li>
//             )}
//           </ul>

//           <div className="auth-section">
//             {!isLoggedIn ? (
//               <>
//                 <Link to="/login" className="auth-button login-button">
//                   <span className="auth-icon">🔑</span>
//                   <span>Login</span>
//                 </Link>
//                 <Link to="/register" className="auth-button register-button">
//                   <span className="auth-icon">📝</span>
//                   <span>Register</span>
//                 </Link>
//               </>
//             ) : (
//               <button className="auth-button logout-button" onClick={handleLogout}>
//                 <span className="auth-icon">🚪</span>
//                 <span>Logout</span>
//               </button>
//             )}
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;





// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isLoggedIn = !!localStorage.getItem('token');
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);
//   const navbarRef = useRef(null);
//   const userDropdownRef = useRef(null);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close mobile menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (navbarRef.current && !navbarRef.current.contains(event.target)) {
//         setMobileMenuOpen(false);
//       }
      
//       if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
//         setUserDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Close mobile menu and user dropdown on route change
//   useEffect(() => {
//     setMobileMenuOpen(false);
//     setUserDropdownOpen(false);
//   }, [location.pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   const toggleUserDropdown = () => {
//     setUserDropdownOpen(!userDropdownOpen);
//   };

//   return (
//     <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`} ref={navbarRef}>
//       <div className="navbar-content">
//         <div className="navbar-brand">
//           <Link to="/" className="brand-link">
//             <img src={require("../logo.png") || "/placeholder.svg"} alt="Logo" className='brand-icon'/>
//             <span className="brand-name">Royal Castle</span>
//           </Link>
//         </div>

//         <button 
//           className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
//           onClick={toggleMobileMenu}
//           aria-label="Toggle menu"
//         >
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//         </button>

//         <nav className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
//           <ul className="nav-list">
//             <li className="nav-item">
//               <Link 
//                 to="/" 
//                 className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
//               >
//                 <span className="nav-icon">🏠</span>
//                 <span className="nav-text">Home</span>
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link 
//                 to="/rooms" 
//                 className={`nav-link ${location.pathname === '/rooms' ? 'active' : ''}`}
//               >
//                 <span className="nav-icon">🛏️</span>
//                 <span className="nav-text">Rooms</span>
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link 
//                 to="/about" 
//                 className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
//               >
//                 <span className="nav-icon">ℹ️</span>
//                 <span className="nav-text">About</span>
//               </Link>
//             </li>
//           </ul>

//           <div className="auth-section">
//             {!isLoggedIn ? (
//               <>
//                 <Link to="/login" className="auth-button login-button">
//                   <span className="auth-icon">🔑</span>
//                   <span>Login</span>
//                 </Link>
//                 <Link to="/register" className="auth-button register-button">
//                   <span className="auth-icon">📝</span>
//                   <span>Register</span>
//                 </Link>
//               </>
//             ) : (
//               <div className="user-dropdown-container" ref={userDropdownRef}>
//                 <button 
//                   className="user-dropdown-toggle" 
//                   onClick={toggleUserDropdown}
//                   aria-label="User menu"
//                 >
//                   <span className="power-icon">⚡</span>
//                 </button>
//                 {userDropdownOpen && (
//                   <div className="user-dropdown-menu">
//                     <Link to="/dashboard" className="dropdown-item">
//                       <span className="dropdown-icon">📊</span>
//                       <span>Dashboard</span>
//                     </Link>
//                     <button className="dropdown-item logout-item" onClick={handleLogout}>
//                       <span className="dropdown-icon">🚪</span>
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;



// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isLoggedIn = !!localStorage.getItem('token');
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);
//   const navbarRef = useRef(null);
//   const userDropdownRef = useRef(null);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close mobile menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (navbarRef.current && !navbarRef.current.contains(event.target)) {
//         setMobileMenuOpen(false);
//       }
      
//       if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
//         setUserDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Close mobile menu and user dropdown on route change
//   useEffect(() => {
//     setMobileMenuOpen(false);
//     setUserDropdownOpen(false);
//   }, [location.pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   const toggleUserDropdown = () => {
//     setUserDropdownOpen(!userDropdownOpen);
//   };

//   // Get user initials or use a default value
//   const getUserInitials = () => {
//     const username = localStorage.getItem('username') || 'User';
//     return username.charAt(0).toUpperCase();
//   };

//   return (
//     <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`} ref={navbarRef}>
//       <div className="navbar-content">
//         <div className="navbar-brand">
//           <Link to="/" className="brand-link">
//             <img src={require("../logo.png") || "/placeholder.svg"} alt="Logo" className='brand-icon'/>
//             <span className="brand-name">Royal Castle</span>
//           </Link>
//         </div>

//         <button 
//           className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
//           onClick={toggleMobileMenu}
//           aria-label="Toggle menu"
//         >
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//         </button>

//         <nav className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
//           <ul className="nav-list">
//             <li className="nav-item">
//               <Link 
//                 to="/" 
//                 className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
//               >
//                 <span className="nav-icon">🏠</span>
//                 <span className="nav-text">Home</span>
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link 
//                 to="/rooms" 
//                 className={`nav-link ${location.pathname === '/rooms' ? 'active' : ''}`}
//               >
//                 <span className="nav-icon">🛏️</span>
//                 <span className="nav-text">Rooms</span>
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link 
//                 to="/about" 
//                 className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
//               >
//                 <span className="nav-icon">ℹ️</span>
//                 <span className="nav-text">About</span>
//               </Link>
//             </li>
//           </ul>

//           <div className="auth-section">
//             {!isLoggedIn ? (
//               <>
//                 <Link to="/login" className="auth-button login-button">
//                   <span className="auth-icon">🔑</span>
//                   <span>Login</span>
//                 </Link>
//                 <Link to="/register" className="auth-button register-button">
//                   <span className="auth-icon">📝</span>
//                   <span>Register</span>
//                 </Link>
//               </>
//             ) : (
//               <div className="user-dropdown-container" ref={userDropdownRef}>
//                 <button 
//                   className="user-dropdown-toggle" 
//                   onClick={toggleUserDropdown}
//                   aria-label="User menu"
//                 >
//                   <div className="user-avatar">
//                     {getUserInitials()}
//                   </div>
//                 </button>
//                 {userDropdownOpen && (
//                   <div className="user-dropdown-menu">
//                     <Link to="/dashboard" className="dropdown-item">
//                       <span className="dropdown-icon">📊</span>
//                       <span>Dashboard</span>
//                     </Link>
//                     <button className="dropdown-item logout-item" onClick={handleLogout}>
//                       <span className="dropdown-icon">🚪</span>
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;



import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navbarRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch user profile data when logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);

  // Fetch user profile data from server
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.user);
        // Store username in localStorage for fallback
        localStorage.setItem('username', data.user.username);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
      
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu and user dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUserProfile(null);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  // Get user initials or use a default value
  const getUserInitials = () => {
    const username = localStorage.getItem('username') || 'User';
    return username.charAt(0).toUpperCase();
  };

  return (
    <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`} ref={navbarRef}>
      <div className="navbar-content">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <img src={require("../logo.png") || "/placeholder.svg"} alt="Logo" className='brand-icon'/>
            <span className="brand-name">Royal Castle</span>
          </Link>
        </div>

        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <nav className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/rooms" 
                className={`nav-link ${location.pathname === '/rooms' ? 'active' : ''}`}
              >
                <span className="nav-icon">🛏️</span>
                <span className="nav-text">Rooms</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/about" 
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              >
                <span className="nav-icon">ℹ️</span>
                <span className="nav-text">About</span>
              </Link>
            </li>
          </ul>

          <div className="auth-section">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="auth-button login-button">
                  <span className="auth-icon">🔑</span>
                  <span>Login</span>
                </Link>
                <Link to="/register" className="auth-button register-button">
                  <span className="auth-icon">📝</span>
                  <span>Register</span>
                </Link>
              </>
            ) : (
              <div className="user-dropdown-container" ref={userDropdownRef}>
                <button 
                  className="user-dropdown-toggle" 
                  onClick={toggleUserDropdown}
                  aria-label="User menu"
                >
                  {userProfile && userProfile.profileImage ? (
                    <div className="user-avatar-image">
                      <img 
                        src={`http://localhost:5000${userProfile.profileImage}`} 
                        alt={userProfile.username} 
                        className="profile-image"
                      />
                    </div>
                  ) : (
                    <div className="user-avatar">
                      {getUserInitials()}
                    </div>
                  )}
                </button>
                {userDropdownOpen && (
                  <div className="user-dropdown-menu">
                    <div className="dropdown-user-info">
                      {userProfile && userProfile.profileImage ? (
                        <img 
                          src={`http://localhost:5000${userProfile.profileImage}`} 
                          alt={userProfile.username} 
                          className="dropdown-profile-image"
                        />
                      ) : (
                        <div className="dropdown-user-avatar">
                          {getUserInitials()}
                        </div>
                      )}
                      <div className="dropdown-user-details">
                        <span className="dropdown-username">{userProfile?.username || localStorage.getItem('username')}</span>
                        <span className="dropdown-email">{userProfile?.email || ''}</span>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link to="/dashboard" className="dropdown-item">
                      <span className="dropdown-icon">📊</span>
                      <span>Dashboard</span>
                    </Link>
                    {/* <Link to="/profile" className="dropdown-item">
                      <span className="dropdown-icon">👤</span>
                      <span>Profile</span>
                    </Link> */}
                    <button className="dropdown-item logout-item" onClick={handleLogout}>
                      <span className="dropdown-icon">🚪</span>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
