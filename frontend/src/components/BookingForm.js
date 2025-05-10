// // // import React, { useState } from 'react';
// // // import { useNavigate, useParams } from 'react-router-dom';
// // // import axios from 'axios';
// // // import './BookingForm.css';

// // // const BookingForm = () => {
// // //   const { roomId } = useParams();
// // //   const [startDate, setStartDate] = useState('');
// // //   const [endDate, setEndDate] = useState('');
// // //   const [adults, setAdults] = useState(1);
// // //   const [children, setChildren] = useState(0);
// // //   const [totalAmount, setTotalAmount] = useState(0);
// // //   const [isPayEnabled, setIsPayEnabled] = useState(false);
// // //   const navigate = useNavigate();

// // //   const calculateAmount = () => {
// // //     const start = new Date(startDate);
// // //     const end = new Date(endDate);
// // //     const nights = (end - start) / (1000 * 60 * 60 * 24);
// // //     const pricePerNight = 2594; // You can fetch this from backend or pass it via props
// // //     const amount = nights * pricePerNight;
// // //     setTotalAmount(amount);
// // //     setIsPayEnabled(true);
// // //   };

// // //   const handlePayNow = async () => {
// // //     const token = localStorage.getItem('token');
// // //     const bookingDetails = { roomId, startDate, endDate, adults, children, totalAmount };

// // //     try {
// // //       const response = await axios.post('http://localhost:5000/api/book', bookingDetails, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       console.log(response.data);
// // //       navigate('/confirmation');
// // //     } catch (error) {
// // //       console.error('Error saving booking:', error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="booking-container">
// // //       <div className="booking-card">
// // //         <h2>Book Room {roomId}</h2>
// // //         <div className="booking-inputs">
// // //           <label>Start Date:</label>
// // //           <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

// // //           <label>End Date:</label>
// // //           <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

// // //           <label>Adults:</label>
// // //           <input type="number" value={adults} min="1" onChange={(e) => setAdults(e.target.value)} />

// // //           <label>Children:</label>
// // //           <input type="number" value={children} min="0" onChange={(e) => setChildren(e.target.value)} />
// // //         </div>

// // //         <button className="calculate-btn" onClick={calculateAmount}>Calculate Amount</button>
// // //         <p className="total-amount">Total Amount: ₹{totalAmount}</p>
// // //         <button className={`pay-btn ${!isPayEnabled ? 'disabled' : ''}`} onClick={handlePayNow} disabled={!isPayEnabled}>Pay Now</button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default BookingForm;




// // import React, { useState } from 'react';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import axios from 'axios';
// // import './BookingForm.css';

// // const BookingForm = () => {
// //   const { roomId } = useParams();
// //   const [startDate, setStartDate] = useState('');
// //   const [endDate, setEndDate] = useState('');
// //   const [adults, setAdults] = useState(1);
// //   const [children, setChildren] = useState(0);
// //   const [totalAmount, setTotalAmount] = useState(0);
// //   const [isPayEnabled, setIsPayEnabled] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState(''); // To display error messages
// //   const navigate = useNavigate();

// //   const calculateAmount = () => {
// //     const start = new Date(startDate);
// //     const end = new Date(endDate);
// //     const nights = (end - start) / (1000 * 60 * 60 * 24);

// //     if (nights <= 0) {
// //       setErrorMessage('End date must be after start date.');
// //       return;
// //     }

// //     const pricePerNight = 2594; // You can fetch this from backend or pass it via props
// //     const amount = nights * pricePerNight;
// //     setTotalAmount(amount);
// //     setIsPayEnabled(true);
// //     setErrorMessage(''); // Clear any previous error messages
// //   };

// //   const handlePayNow = async () => {
// //     const token = localStorage.getItem('token');
// //     const bookingDetails = { roomId, startDate, endDate, adults, children, totalAmount };

// //     try {
// //       const response = await axios.post('http://localhost:5000/api/book', bookingDetails, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       console.log(response.data);
// //       navigate('/confirmation');
// //     } catch (error) {
// //       console.error('Error saving booking:', error);

// //       if (error.response) {
// //         // Handle specific error messages from the backend
// //         setErrorMessage(error.response.data || 'An error occurred while booking the room.');
// //       } else {
// //         setErrorMessage('An unexpected error occurred.');
// //       }
// //     }
// //   };

// //   return (
// //     <div className="booking-container">
// //       <div className="booking-card">
// //         <h2>Book Room {roomId}</h2>

// //         {/* Error Message */}
// //         {errorMessage && <p className="error-message">{errorMessage}</p>}

// //         <div className="booking-inputs">
// //           <label>Start Date:</label>
// //           <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />

// //           <label>End Date:</label>
// //           <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />

// //           <label>Adults:</label>
// //           <input type="number" value={adults} min="1" onChange={(e) => setAdults(e.target.value)} required />

// //           <label>Children:</label>
// //           <input type="number" value={children} min="0" onChange={(e) => setChildren(e.target.value)} required />
// //         </div>

// //         <button className="calculate-btn" onClick={calculateAmount}>
// //           Calculate Amount
// //         </button>

// //         <p className="total-amount">Total Amount: ₹{totalAmount}</p>

// //         <button
// //           className={`pay-btn ${!isPayEnabled ? 'disabled' : ''}`}
// //           onClick={handlePayNow}
// //           disabled={!isPayEnabled}
// //         >
// //           Pay Now
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BookingForm;




// // import React, { useState } from 'react';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import axios from 'axios';
// // import { QRCodeCanvas } from 'qrcode.react'; // Import for QR code generation
// // import './BookingForm.css';

// // const BookingForm = () => {
// //   const { roomId } = useParams();
// //   const [startDate, setStartDate] = useState('');
// //   const [endDate, setEndDate] = useState('');
// //   const [adults, setAdults] = useState(1);
// //   const [children, setChildren] = useState(0);
// //   const [totalAmount, setTotalAmount] = useState(0);
// //   const [isPayEnabled, setIsPayEnabled] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState(''); // To display error messages
// //   const [showQR, setShowQR] = useState(false); // To control QR code visibility
// //   const navigate = useNavigate();

// //   const calculateAmount = () => {
// //     const start = new Date(startDate);
// //     const end = new Date(endDate);
// //     const nights = (end - start) / (1000 * 60 * 60 * 24);

// //     if (nights <= 0) {
// //       setErrorMessage('End date must be after start date.');
// //       return;
// //     }

// //     const pricePerNight = 2594; // You can fetch this from backend or pass it via props
// //     const amount = nights * pricePerNight;
// //     setTotalAmount(amount);
// //     setIsPayEnabled(true);
// //     setErrorMessage(''); // Clear any previous error messages
// //   };

// //   const handlePayNow = async () => {
// //     const token = localStorage.getItem('token');
// //     const bookingDetails = { roomId, startDate, endDate, adults, children, totalAmount };

// //     try {
// //       const response = await axios.post('http://localhost:5000/api/book', bookingDetails, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       console.log(response.data);
// //       setShowQR(true); // Show QR code after successful booking
// //     } catch (error) {
// //       console.error('Error saving booking:', error);

// //       if (error.response) {
// //         // Handle specific error messages from the backend
// //         setErrorMessage(error.response.data || 'An error occurred while booking the room.');
// //       } else {
// //         setErrorMessage('An unexpected error occurred.');
// //       }
// //     }
// //   };

// //   return (
// //     <div className="booking-container">
// //       <div className="booking-card">
// //         <h2>Book Room {roomId}</h2>

// //         {/* Error Message */}
// //         {errorMessage && <p className="error-message">{errorMessage}</p>}

// //         <div className="booking-inputs">
// //           <label>Start Date:</label>
// //           <input
// //             type="date"
// //             value={startDate}
// //             onChange={(e) => setStartDate(e.target.value)}
// //             required
// //           />

// //           <label>End Date:</label>
// //           <input
// //             type="date"
// //             value={endDate}
// //             onChange={(e) => setEndDate(e.target.value)}
// //             required
// //           />

// //           <label>Adults:</label>
// //           <input
// //             type="number"
// //             value={adults}
// //             min="1"
// //             onChange={(e) => setAdults(e.target.value)}
// //             required
// //           />

// //           <label>Children:</label>
// //           <input
// //             type="number"
// //             value={children}
// //             min="0"
// //             onChange={(e) => setChildren(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <button className="calculate-btn" onClick={calculateAmount}>
// //           Calculate Amount
// //         </button>

// //         <p className="total-amount">Total Amount: ₹{totalAmount}</p>

// //         <button
// //           className={`pay-btn ${!isPayEnabled ? 'disabled' : ''}`}
// //           onClick={handlePayNow}
// //           disabled={!isPayEnabled}
// //         >
// //           Pay Now
// //         </button>

// //         {/* QR Code Section */}
// //         {showQR && (
// //           <div className="qr-container">
// //             <h3>Scan to Pay</h3>
// //             <QRCodeCanvas
// //               value={`upi://pay?pa=varunesht26@okicici&pn=Velavan%20Super%20Stores&am=${totalAmount}&cu=INR`}
// //               size={200}
// //             />
// //             <p>UPI ID: varunesht26@okicici</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default BookingForm;



// // import React, { useState, useEffect } from 'react';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import axios from 'axios';
// // import DatePicker from 'react-datepicker';
// // import "react-datepicker/dist/react-datepicker.css";
// // import './BookingForm.css';

// // const BookingForm = () => {
// //   const { roomId } = useParams();
// //   const [startDate, setStartDate] = useState(null);
// //   const [endDate, setEndDate] = useState(null);
// //   const [bookedIntervals, setBookedIntervals] = useState([]);
// //   const [totalAmount, setTotalAmount] = useState(0);
// //   const [isPayEnabled, setIsPayEnabled] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState('');
// //   const navigate = useNavigate();

// //   const [adults, setAdults] = useState(1);
// // const [children, setChildren] = useState(0);


// //   // Fetch ACTIVE bookings for the room
// //   useEffect(() => {
// //     const fetchBookedDates = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:5000/api/bookings/${roomId}`);
// //         const intervals = response.data.map(booking => ({
// //           start: new Date(booking.startDate),
// //           end: new Date(booking.endDate),
// //         }));
// //         setBookedIntervals(intervals);
// //       } catch (error) {
// //         console.error('Error fetching booked dates:', error);
// //       }
// //     };
// //     fetchBookedDates();
// //   }, [roomId]); // Re-run when roomId changes

// //   // Calculate total amount
// //   const calculateAmount = () => {
// //     if (!startDate || !endDate) {
// //       setErrorMessage('Please select valid dates.');
// //       return;
// //     }

// //     const nights = (endDate - startDate) / (1000 * 60 * 60 * 24);
// //     if (nights <= 0) {
// //       setErrorMessage('End date must be after start date.');
// //       return;
// //     }

// //     const pricePerNight = 2594;
// //     setTotalAmount(nights * pricePerNight);
// //     setIsPayEnabled(true);
// //     setErrorMessage('');
// //   };

// //   // Submit booking
// //   const handlePayNow = async () => {
// //     const token = localStorage.getItem('token');
// //     if (!token) {
// //       navigate('/login');
// //       return;
// //     }

// //     try {
// //       await axios.post('http://localhost:5000/api/book', {
// //         roomId,
// //         startDate: startDate.toISOString().split('T')[0],
// //         endDate: endDate.toISOString().split('T')[0],
// //         adults,
// //         children,
// //         totalAmount,
// //       }, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       navigate('/confirmation');
// //     } catch (error) {
// //       setErrorMessage(error.response?.data || 'An error occurred');
// //     }
// //   };

// //   return (
// //     <div className="booking-container">
// //       <div className="booking-card">
// //         <h2>Book Room {roomId}</h2>
// //         {errorMessage && <p className="error-message">{errorMessage}</p>}
        
// //         {/* Date Pickers */}
// //         <div className="booking-inputs">
// //           <label>Start Date:</label>
// //           <DatePicker
// //             selected={startDate}
// //             onChange={(date) => setStartDate(date)}
// //             selectsStart
// //             startDate={startDate}
// //             endDate={endDate}
// //             excludeDateIntervals={bookedIntervals}
// //             className="date-picker"
// //             placeholderText="Select start date"
// //             required
// //           />
          
// //           <label>End Date:</label>
// //           <DatePicker
// //             selected={endDate}
// //             onChange={(date) => setEndDate(date)}
// //             selectsEnd
// //             startDate={startDate}
// //             endDate={endDate}
// //             minDate={startDate}
// //             excludeDateIntervals={bookedIntervals}
// //             className="date-picker"
// //             placeholderText="Select end date"
// //             required
// //           />
          
// //           {/* Other input fields */}
// //           <label>Adults:</label>
// //           <input
// //             type="number"
// //             value={adults}
// //             min="1"
// //             onChange={(e) => setAdults(e.target.value)}
// //             required
// //           />
// //           <label>Children:</label>
// //           <input
// //             type="number"
// //             value={children}
// //             min="0"
// //             onChange={(e) => setChildren(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <button className="calculate-btn" onClick={calculateAmount}>
// //           Calculate Amount
// //         </button>
// //         <p className="total-amount">Total Amount: ₹{totalAmount}</p>
// //         <button
// //           className={`pay-btn ${!isPayEnabled ? 'disabled' : ''}`}
// //           onClick={handlePayNow}
// //           disabled={!isPayEnabled}
// //         >
// //           Pay Now
// //         </button>

        


// //       </div>
// //     </div>
// //   );
// // };

// // export default BookingForm;



// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import './BookingForm.css';

// const BookingForm = () => {
//   const { roomId } = useParams();
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [bookedIntervals, setBookedIntervals] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [isPayEnabled, setIsPayEnabled] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isCalculating, setIsCalculating] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const [adults, setAdults] = useState(1);
//   const [children, setChildren] = useState(0);

//   // Fetch ACTIVE bookings for the room
//   useEffect(() => {
//     const fetchBookedDates = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/bookings/${roomId}`);
//         const intervals = response.data.map(booking => ({
//           start: new Date(booking.startDate),
//           end: new Date(booking.endDate),
//         }));
//         setBookedIntervals(intervals);
//       } catch (error) {
//         console.error('Error fetching booked dates:', error);
//         setErrorMessage('Could not fetch availability data. Please try again.');
//       }
//     };
//     fetchBookedDates();
//   }, [roomId]);

//   // Calculate total amount
//   const calculateAmount = () => {
//     if (!startDate || !endDate) {
//       setErrorMessage('Please select valid dates.');
//       return;
//     }

//     setIsCalculating(true);
    
//     // Add a small delay to show the loading animation
//     setTimeout(() => {
//       const nights = (endDate - startDate) / (1000 * 60 * 60 * 24);
//       if (nights <= 0) {
//         setErrorMessage('End date must be after start date.');
//         setIsCalculating(false);
//         return;
//       }

//       const pricePerNight = 2594;
//       setTotalAmount(nights * pricePerNight);
//       setIsPayEnabled(true);
//       setErrorMessage('');
//       setIsCalculating(false);
//     }, 800);
//   };

//   // Submit booking
//   const handlePayNow = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       await axios.post('http://localhost:5000/api/book', {
//         roomId,
//         startDate: startDate.toISOString().split('T')[0],
//         endDate: endDate.toISOString().split('T')[0],
//         adults,
//         children,
//         totalAmount,
//       }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       navigate('/confirmation');
//     } catch (error) {
//       setErrorMessage(error.response?.data || 'An error occurred');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Handle increment/decrement for adults
//   const incrementAdults = () => {
//     setAdults(prev => prev + 1);
//   };

//   const decrementAdults = () => {
//     if (adults > 1) {
//       setAdults(prev => prev - 1);
//     }
//   };

//   // Handle increment/decrement for children
//   const incrementChildren = () => {
//     setChildren(prev => prev + 1);
//   };

//   const decrementChildren = () => {
//     if (children > 0) {
//       setChildren(prev => prev - 1);
//     }
//   };

//   return (
//     <div className="booking-container">
//       <div className="booking-card">
//         <div className="booking-header">
//           <h2>Book Room {roomId}</h2>
//           <p className="booking-subtitle">Select your dates and details to book your stay</p>
//         </div>
        
//         {errorMessage && <div className="error-message">{errorMessage}</div>}
        
//         <div className="booking-content">
//           {/* Date Pickers */}
//           <div className="date-picker-container">
//             <div className="date-picker-group">
//               <label>Check-in Date:</label>
//               <DatePicker
//                 selected={startDate}
//                 onChange={(date) => setStartDate(date)}
//                 selectsStart
//                 startDate={startDate}
//                 endDate={endDate}
//                 excludeDateIntervals={bookedIntervals}
//                 minDate={new Date()}
//                 placeholderText="Select check-in date"
//                 className="date-input"
//                 required
//               />
//             </div>
            
//             <div className="date-picker-group">
//               <label>Check-out Date:</label>
//               <DatePicker
//                 selected={endDate}
//                 onChange={(date) => setEndDate(date)}
//                 selectsEnd
//                 startDate={startDate}
//                 endDate={endDate}
//                 minDate={startDate}
//                 excludeDateIntervals={bookedIntervals}
//                 placeholderText="Select check-out date"
//                 className="date-input"
//                 required
//                 disabled={!startDate}
//               />
//             </div>
//           </div>
          
//           {/* Guest Inputs */}
//           <div className="guest-inputs-container">
//             <div className="guest-input-group">
//               <label>Adults:</label>
//               <div className="number-input-container">
//                 <button 
//                   type="button" 
//                   className="number-btn" 
//                   onClick={decrementAdults}
//                   disabled={adults <= 1}
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   value={adults}
//                   min="1"
//                   onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
//                   className="number-input"
//                   required
//                 />
//                 <button 
//                   type="button" 
//                   className="number-btn" 
//                   onClick={incrementAdults}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
            
//             <div className="guest-input-group">
//               <label>Children:</label>
//               <div className="number-input-container">
//                 <button 
//                   type="button" 
//                   className="number-btn" 
//                   onClick={decrementChildren}
//                   disabled={children <= 0}
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   value={children}
//                   min="0"
//                   onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
//                   className="number-input"
//                   required
//                 />
//                 <button 
//                   type="button" 
//                   className="number-btn" 
//                   onClick={incrementChildren}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           </div>
          
//           {/* Total Amount */}
//           <div className="total-amount-container">
//             <div className="total-amount-label">Total Amount:</div>
//             <div className="total-amount-value">₹{totalAmount.toLocaleString()}</div>
//           </div>
//         </div>
        
//         <div className="booking-footer">
//           <button 
//             className={`calculate-btn ${isCalculating ? 'loading' : ''}`} 
//             onClick={calculateAmount}
//             disabled={!startDate || !endDate || isCalculating}
//           >
//             {isCalculating ? 'Calculating...' : 'Calculate Amount'}
//             {isCalculating && <span className="spinner"></span>}
//           </button>
          
//           <button
//             className={`pay-btn ${!isPayEnabled ? 'disabled' : ''} ${isSubmitting ? 'loading' : ''}`}
//             onClick={handlePayNow}
//             disabled={!isPayEnabled || isSubmitting}
//           >
//             {isSubmitting ? 'Processing...' : 'Pay Now'}
//             {isSubmitting && <span className="spinner"></span>}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingForm;


// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import './BookingForm.css';

// const BookingForm = () => {
//   const { roomId } = useParams();
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [bookedIntervals, setBookedIntervals] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [isPayEnabled, setIsPayEnabled] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isCalculating, setIsCalculating] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const [adults, setAdults] = useState(1);
//   const [children, setChildren] = useState(0);

//   // Fetch ACTIVE bookings for the room
//   useEffect(() => {
//     const fetchBookedDates = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/bookings/${roomId}`);
//         const intervals = response.data.map(booking => ({
//           start: new Date(booking.startDate),
//           end: new Date(booking.endDate),
//         }));
//         setBookedIntervals(intervals);
//       } catch (error) {
//         console.error('Error fetching booked dates:', error);
//         setErrorMessage('Could not fetch availability data. Please try again.');
//       }
//     };
//     fetchBookedDates();
//   }, [roomId]);

//   // Calculate total amount
//   const calculateAmount = () => {
//     if (!startDate || !endDate) {
//       setErrorMessage('Please select valid dates.');
//       return;
//     }

//     setIsCalculating(true);
    
//     // Add a small delay to show the loading animation
//     setTimeout(() => {
//       const nights = (endDate - startDate) / (1000 * 60 * 60 * 24);
//       if (nights <= 0) {
//         setErrorMessage('End date must be after start date.');
//         setIsCalculating(false);
//         return;
//       }

//       const pricePerNight = 2594;
//       setTotalAmount(nights * pricePerNight);
//       setIsPayEnabled(true);
//       setErrorMessage('');
//       setIsCalculating(false);
//     }, 800);
//   };

//   // Handle Razorpay payment
//   const handlePayment = () => {
//     const options = {
//       key: "rzp_test_mUZPelBGqqVPrG", // Replace with your Razorpay key
//       amount: totalAmount * 100, // Amount in paise
//       currency: "INR",
//       name: "Hotel Booking",
//       description: "Complete Your Booking",
//       image: "/logo.png", // Replace with your logo
//       handler: function (response) {
//         alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
//         handlePayNow();
//       },
//       prefill: {
//         name: "Customer Name",
//         email: "customer@example.com",
//         contact: "9999999999",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const rzp1 = new window.Razorpay(options);
//     rzp1.open();
//   };

//   // Submit booking
//   const handlePayNow = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       await axios.post('http://localhost:5000/api/book', {
//         roomId,
//         startDate: startDate.toISOString().split('T')[0],
//         endDate: endDate.toISOString().split('T')[0],
//         adults,
//         children,
//         totalAmount,
//       }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       navigate('/confirmation');
//     } catch (error) {
//       setErrorMessage(error.response?.data || 'An error occurred');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Handle increment/decrement for adults
//   const incrementAdults = () => {
//     setAdults(prev => prev + 1);
//   };

//   const decrementAdults = () => {
//     if (adults > 1) {
//       setAdults(prev => prev - 1);
//     }
//   };

//   // Handle increment/decrement for children
//   const incrementChildren = () => {
//     setChildren(prev => prev + 1);
//   };

//   const decrementChildren = () => {
//     if (children > 0) {
//       setChildren(prev => prev - 1);
//     }
//   };

//   return (
//     <div className="booking-container">
//       <div className="booking-card">
//         <div className="booking-header">
//           <h2>Book Room {roomId}</h2>
//           <p className="booking-subtitle">Select your dates and details to book your stay</p>
//         </div>
        
//         {errorMessage && <div className="error-message">{errorMessage}</div>}
        
//         <div className="booking-content">
//           {/* Date Pickers */}
//           <div className="date-picker-container">
//             <div className="date-picker-group">
//               <label>Check-in Date:</label>
//               <DatePicker
//                 selected={startDate}
//                 onChange={(date) => setStartDate(date)}
//                 selectsStart
//                 startDate={startDate}
//                 endDate={endDate}
//                 excludeDateIntervals={bookedIntervals}
//                 minDate={new Date()}
//                 placeholderText="Select check-in date"
//                 className="date-input"
//                 required
//               />
//             </div>
            
//             <div className="date-picker-group">
//               <label>Check-out Date:</label>
//               <DatePicker
//                 selected={endDate}
//                 onChange={(date) => setEndDate(date)}
//                 selectsEnd
//                 startDate={startDate}
//                 endDate={endDate}
//                 minDate={startDate}
//                 excludeDateIntervals={bookedIntervals}
//                 placeholderText="Select check-out date"
//                 className="date-input"
//                 required
//                 disabled={!startDate}
//               />
//             </div>
//           </div>
          
//           {/* Guest Inputs */}
//           <div className="guest-inputs-container">
//             <div className="guest-input-group">
//               <label>Adults:</label>
//               <div className="number-input-container">
//                 <button 
//                   type="button" 
//                   className="number-btn" 
//                   onClick={decrementAdults}
//                   disabled={adults <= 1}
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   value={adults}
//                   min="1"
//                   onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
//                   className="number-input"
//                   required
//                 />
//                 <button 
//                   type="button" 
//                   className="number-btn" 
//                   onClick={incrementAdults}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
            
//             <div className="guest-input-group">
//               <label>Children:</label>
//               <div className="number-input-container">
//                 <button 
//                   type="button" 
//                   className="number-btn" 
//                   onClick={decrementChildren}
//                   disabled={children <= 0}
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   value={children}
//                   min="0"
//                   onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
//                   className="number-input"
//                   required
//                 />
//                 <button 
//                   type="button" 
//                   className="number-btn" 
//                   onClick={incrementChildren}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           </div>
          
//           {/* Total Amount */}
//           <div className="total-amount-container">
//             <div className="total-amount-label">Total Amount:</div>
//             <div className="total-amount-value">₹{totalAmount.toLocaleString()}</div>
//           </div>
//         </div>
        
//         <div className="booking-footer">
//           <button 
//             className={`calculate-btn ${isCalculating ? 'loading' : ''}`} 
//             onClick={calculateAmount}
//             disabled={!startDate || !endDate || isCalculating}
//           >
//             {isCalculating ? 'Calculating...' : 'Calculate Amount'}
//             {isCalculating && <span className="spinner"></span>}
//           </button>
          
//           <button
//             className={`pay-btn ${!isPayEnabled ? 'disabled' : ''} ${isSubmitting ? 'loading' : ''}`}
//             onClick={handlePayment}
//             disabled={!isPayEnabled || isSubmitting}
//           >
//             {isSubmitting ? 'Processing...' : 'Pay Now'}
//             {isSubmitting && <span className="spinner"></span>}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingForm;


// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import './BookingForm.css';

// const BookingForm = () => {
//   const { roomId } = useParams();
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [bookedIntervals, setBookedIntervals] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [isPayEnabled, setIsPayEnabled] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isCalculating, setIsCalculating] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const [adults, setAdults] = useState(1);
//   const [children, setChildren] = useState(0);

//   // Fetch ACTIVE bookings for the room
//   useEffect(() => {
//     const fetchBookedDates = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/bookings/${roomId}`);
//         const intervals = response.data.map(booking => ({
//           start: new Date(booking.startDate),
//           end: new Date(booking.endDate),
//         }));
//         setBookedIntervals(intervals);
//       } catch (error) {
//         console.error('Error fetching booked dates:', error);
//         setErrorMessage('Could not fetch availability data. Please try again.');
//       }
//     };
//     fetchBookedDates();
//   }, [roomId]);

//   // Calculate total amount
//   const calculateAmount = () => {
//     if (!startDate || !endDate) {
//       setErrorMessage('Please select valid dates.');
//       return;
//     }

//     setIsCalculating(true);
    
//     // Add a small delay to show the loading animation
//     setTimeout(() => {
//       const nights = (endDate - startDate) / (1000 * 60 * 60 * 24);
//       if (nights <= 0) {
//         setErrorMessage('End date must be after start date.');
//         setIsCalculating(false);
//         return;
//       }

//       const pricePerNight = 2594;
//       setTotalAmount(nights * pricePerNight);
//       setIsPayEnabled(true);
//       setErrorMessage('');
//       setIsCalculating(false);
//     }, 800);
//   };

//   // Handle Razorpay payment
//   const handlePayment = () => {
//     const options = {
//       key: "rzp_test_d7Htck0TGu6Rde", // Updated Razorpay key from the spreadsheet
//       amount: totalAmount * 100, // Amount in paise
//       currency: "INR",
//       name: "Hotel Booking",
//       description: "Complete Your Booking",
//       image: "/logo.png", // Replace with your logo
//       handler: function (response) {
//         alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
//         handlePayNow();
//       },
//       prefill: {
//         name: "Customer Name",
//         email: "customer@example.com",
//         contact: "9360793223",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const rzp1 = new window.Razorpay(options);
//     rzp1.open();
//   };

//   // Submit booking
//   const handlePayNow = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       await axios.post('http://localhost:5000/api/book', {
//         roomId,
//         startDate: startDate.toISOString().split('T')[0],
//         endDate: endDate.toISOString().split('T')[0],
//         adults,
//         children,
//         totalAmount,
//       }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       navigate('/confirmation');
//     } catch (error) {
//       setErrorMessage(error.response?.data || 'An error occurred');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Handle increment/decrement for adults
//   const incrementAdults = () => {
//     setAdults(prev => prev + 1);
//   };

//   const decrementAdults = () => {
//     if (adults > 1) {
//       setAdults(prev => prev - 1);
//     }
//   };

//   // Handle increment/decrement for children
//   const incrementChildren = () => {
//     setChildren(prev => prev + 1);
//   };

//   const decrementChildren = () => {
//     if (children > 0) {
//       setChildren(prev => prev - 1);
//     }
//   };

//   return (
//     <div className="booking-container">
//       <div className="booking-card">
//         <div className="booking-header">
//           <h2>Book Room {roomId}</h2>
//           <p className="booking-subtitle">Select your dates and details to book your stay</p>
//         </div>
        
//         {errorMessage && <div className="error-message">{errorMessage}</div>}
        
//         <div className="booking-content">
//           {/* Date Pickers */}
//           <div className="date-picker-container">
//             <div className="date-picker-group">
//               <label>Check-in Date:</label>
//               <DatePicker
//                 selected={startDate}
//                 onChange={(date) => setStartDate(date)}
//                 selectsStart
//                 startDate={startDate}
//                 endDate={endDate}
//                 excludeDateIntervals={bookedIntervals}
//                 minDate={new Date()}
//                 placeholderText="Select check-in date"
//                 className="date-input"
//                 required
//               />
//             </div>
            
//             <div className="date-picker-group">
//               <label>Check-out Date:</label>
//               <DatePicker
//                 selected={endDate}
//                 onChange={(date) => setEndDate(date)}
//                 selectsEnd
//                 startDate={startDate}
//                 endDate={endDate}
//                 minDate={startDate}
//                 excludeDateIntervals={bookedIntervals}
//                 placeholderText="Select check-out date"
//                 className="date-input"
//                 required
//                 disabled={!startDate}
//               />
//             </div>
//           </div>
          
//           {/* Guest Inputs */}
//           <div className="guest-inputs-container">
//             <div className="guest-input-group">
//               <label>Adults:</label>
//               <div className="number-input-container">
//                 <button 
//                   type="button" 
//                   className="number-btn" 
//                   onClick={decrementAdults}
//                   disabled={adults <= 1}
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   value={adults}
//                   min="1"
//                   onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
//                   className="number-input"
//                   required
//                 />
//                 <button 
//                   type="button" 
//                   className="number-btn" 
//                   onClick={incrementAdults}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
            
//             <div className="guest-input-group">
//               <label>Children:</label>
//               <div className="number-input-container">
//                 <button 
//                   type="button" 
//                   className="number-btn" 
//                   onClick={decrementChildren}
//                   disabled={children <= 0}
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   value={children}
//                   min="0"
//                   onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
//                   className="number-input"
//                   required
//                 />
//                 <button 
//                   type="button" 
//                   className="number-btn" 
//                   onClick={incrementChildren}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           </div>
          
//           {/* Total Amount */}
//           <div className="total-amount-container">
//             <div className="total-amount-label">Total Amount:</div>
//             <div className="total-amount-value">₹{totalAmount.toLocaleString()}</div>
//           </div>
//         </div>
        
//         <div className="booking-footer">
//           <button 
//             className={`calculate-btn ${isCalculating ? 'loading' : ''}`} 
//             onClick={calculateAmount}
//             disabled={!startDate || !endDate || isCalculating}
//           >
//             {isCalculating ? 'Calculating...' : 'Calculate Amount'}
//             {isCalculating && <span className="spinner"></span>}
//           </button>
          
//           <button
//             className={`pay-btn ${!isPayEnabled ? 'disabled' : ''} ${isSubmitting ? 'loading' : ''}`}
//             onClick={handlePayment}
//             disabled={!isPayEnabled || isSubmitting}
//           >
//             {isSubmitting ? 'Processing...' : 'Pay Now'}
//             {isSubmitting && <span className="spinner"></span>}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingForm;






















// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import axios from "axios"
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"
// import "./BookingForm.css"

// const BookingForm = () => {
//   const { roomId } = useParams()
//   const [startDate, setStartDate] = useState(null)
//   const [endDate, setEndDate] = useState(null)
//   const [bookedIntervals, setBookedIntervals] = useState([])
//   const [totalAmount, setTotalAmount] = useState(0)
//   const [isPayEnabled, setIsPayEnabled] = useState(false)
//   const [errorMessage, setErrorMessage] = useState("")
//   const [isCalculating, setIsCalculating] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const navigate = useNavigate()

//   const [adults, setAdults] = useState(1)
//   const [children, setChildren] = useState(0)

//   // Fetch ACTIVE bookings for the room
//   useEffect(() => {
//     const fetchBookedDates = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/bookings/${roomId}`)
//         const intervals = response.data.map((booking) => ({
//           start: new Date(booking.startDate),
//           end: new Date(booking.endDate),
//         }))
//         setBookedIntervals(intervals)
//       } catch (error) {
//         console.error("Error fetching booked dates:", error)
//         setErrorMessage("Could not fetch availability data. Please try again.")
//       }
//     }
//     fetchBookedDates()
//   }, [roomId])

//   // Calculate total amount
//   const calculateAmount = () => {
//     if (!startDate || !endDate) {
//       setErrorMessage("Please select valid dates.")
//       return
//     }

//     setIsCalculating(true)

//     // Add a small delay to show the loading animation
//     setTimeout(() => {
//       const nights = (endDate - startDate) / (1000 * 60 * 60 * 24)
//       if (nights <= 0) {
//         setErrorMessage("End date must be after start date.")
//         setIsCalculating(false)
//         return
//       }

//       // Get price based on roomId
//       let pricePerNight = 2594 // Default price

//       // Map room prices based on roomId
//       const roomPrices = {
//         1: 2594, // Couple Room AC
//         2: 3890, // 4 Member Room AC
//         3: 6508, // 6 Members Room AC
//         4: 17862, // Hut NON AC
//         5: 24184, // Private Villa
//         6: 26893, // Indoor Theatre Hall AC
//       }

//       if (roomPrices[roomId]) {
//         pricePerNight = roomPrices[roomId]
//       }

//       setTotalAmount(nights * pricePerNight)
//       setIsPayEnabled(true)
//       setErrorMessage("")
//       setIsCalculating(false)
//     }, 800)
//   }

//   // Handle Razorpay payment
//   const handlePayment = () => {
//     if (!window.Razorpay) {
//       setErrorMessage("Payment gateway not loaded. Please try again later.")
//       return
//     }

//     const options = {
//       key: "rzp_test_d7Htck0TGu6Rde", // Razorpay key
//       amount: totalAmount * 100, // Amount in paise
//       currency: "INR",
//       name: "Hotel Booking",
//       description: "Complete Your Booking",
//       image: "/logo.png", // Replace with your logo
//       handler: (response) => {
//         if (response.razorpay_payment_id) {
//           handlePayNow(response.razorpay_payment_id)
//         }
//       },
//       prefill: {
//         name: "Customer Name",
//         email: "customer@example.com",
//         contact: "9360793223",
//       },
//       theme: {
//         color: "#4a6fa5", // Match your primary color
//       },
//       modal: {
//         ondismiss: () => {
//           console.log("Payment modal closed")
//         },
//       },
//     }

//     try {
//       const rzp1 = new window.Razorpay(options)
//       rzp1.open()
//     } catch (error) {
//       console.error("Razorpay error:", error)
//       setErrorMessage("Payment gateway error. Please try again later.")
//     }
//   }

//   // Submit booking
//   const handlePayNow = async (paymentId = null) => {
//     const token = localStorage.getItem("token")
//     if (!token) {
//       navigate("/login", { state: { from: `/book/${roomId}` } })
//       return
//     }

//     setIsSubmitting(true)

//     try {
//       await axios.post(
//         "http://localhost:5000/api/book",
//         {
//           roomId,
//           startDate: startDate.toISOString().split("T")[0],
//           endDate: endDate.toISOString().split("T")[0],
//           adults,
//           children,
//           totalAmount,
//           paymentId,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       )
//       navigate("/confirmation", { state: { roomId, totalAmount } })
//     } catch (error) {
//       console.error("Booking error:", error)
//       setErrorMessage(error.response?.data?.message || "An error occurred during booking. Please try again.")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   // Handle increment/decrement for adults
//   const incrementAdults = () => {
//     setAdults((prev) => prev + 1)
//   }

//   const decrementAdults = () => {
//     if (adults > 1) {
//       setAdults((prev) => prev - 1)
//     }
//   }

//   // Handle increment/decrement for children
//   const incrementChildren = () => {
//     setChildren((prev) => prev + 1)
//   }

//   const decrementChildren = () => {
//     if (children > 0) {
//       setChildren((prev) => prev - 1)
//     }
//   }

//   return (
//     <div className="booking-container">
//       <div className="booking-card">
//         <div className="booking-header">
//           <h2>Book Room {roomId}</h2>
//           <p className="booking-subtitle">Select your dates and details to book your stay</p>
//         </div>

//         {errorMessage && <div className="error-message">{errorMessage}</div>}

//         <div className="booking-content">
//           {/* Date Pickers */}
//           <div className="date-picker-container">
//             <div className="date-picker-group">
//               <label>Check-in Date:</label>
//               <DatePicker
//                 selected={startDate}
//                 onChange={(date) => setStartDate(date)}
//                 selectsStart
//                 startDate={startDate}
//                 endDate={endDate}
//                 excludeDateIntervals={bookedIntervals}
//                 minDate={new Date()}
//                 placeholderText="Select check-in date"
//                 className="date-input"
//                 required
//               />
//             </div>

//             <div className="date-picker-group">
//               <label>Check-out Date:</label>
//               <DatePicker
//                 selected={endDate}
//                 onChange={(date) => setEndDate(date)}
//                 selectsEnd
//                 startDate={startDate}
//                 endDate={endDate}
//                 minDate={startDate}
//                 excludeDateIntervals={bookedIntervals}
//                 placeholderText="Select check-out date"
//                 className="date-input"
//                 required
//                 disabled={!startDate}
//               />
//             </div>
//           </div>

//           {/* Guest Inputs */}
//           <div className="guest-inputs-container">
//             <div className="guest-input-group">
//               <label>Adults:</label>
//               <div className="number-input-container">
//                 <button
//                   type="button"
//                   className="number-btn"
//                   onClick={decrementAdults}
//                   disabled={adults <= 1}
//                   aria-label="Decrease adults"
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   value={adults}
//                   min="1"
//                   onChange={(e) => setAdults(Math.max(1, Number.parseInt(e.target.value) || 1))}
//                   className="number-input"
//                   required
//                   aria-label="Number of adults"
//                 />
//                 <button type="button" className="number-btn" onClick={incrementAdults} aria-label="Increase adults">
//                   +
//                 </button>
//               </div>
//             </div>

//             <div className="guest-input-group">
//               <label>Children:</label>
//               <div className="number-input-container">
//                 <button
//                   type="button"
//                   className="number-btn"
//                   onClick={decrementChildren}
//                   disabled={children <= 0}
//                   aria-label="Decrease children"
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   value={children}
//                   min="0"
//                   onChange={(e) => setChildren(Math.max(0, Number.parseInt(e.target.value) || 0))}
//                   className="number-input"
//                   required
//                   aria-label="Number of children"
//                 />
//                 <button type="button" className="number-btn" onClick={incrementChildren} aria-label="Increase children">
//                   +
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Total Amount */}
//           <div className="total-amount-container">
//             <div className="total-amount-label">Total Amount:</div>
//             <div className="total-amount-value">₹{totalAmount.toLocaleString()}</div>
//           </div>
//         </div>

//         <div className="booking-footer">
//           <button
//             className={`calculate-btn ${isCalculating ? "loading" : ""}`}
//             onClick={calculateAmount}
//             disabled={!startDate || !endDate || isCalculating}
//           >
//             {isCalculating ? "Calculating..." : "Calculate Amount"}
//             {isCalculating && <span className="spinner"></span>}
//           </button>

//           <button
//             className={`pay-btn ${!isPayEnabled ? "disabled" : ""} ${isSubmitting ? "loading" : ""}`}
//             onClick={handlePayment}
//             disabled={!isPayEnabled || isSubmitting}
//           >
//             {isSubmitting ? "Processing..." : "Pay Now"}
//             {isSubmitting && <span className="spinner"></span>}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BookingForm


"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./BookingForm.css"

const BookingForm = () => {
  const { roomId } = useParams()
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [bookedIntervals, setBookedIntervals] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [isPayEnabled, setIsPayEnabled] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isCalculating, setIsCalculating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)

  // Fetch ACTIVE bookings for the room
  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bookings/${roomId}`)
        const intervals = response.data.map((booking) => ({
          start: new Date(booking.startDate),
          end: new Date(booking.endDate),
        }))
        setBookedIntervals(intervals)
      } catch (error) {
        console.error("Error fetching booked dates:", error)
        setErrorMessage("Could not fetch availability data. Please try again.")
      }
    }
    fetchBookedDates()
  }, [roomId])

  // Calculate total amount with accurate room prices
  const calculateAmount = () => {
    if (!startDate || !endDate) {
      setErrorMessage("Please select valid dates.")
      return
    }

    setIsCalculating(true)

    setTimeout(() => {
      const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
      if (nights <= 0) {
        setErrorMessage("End date must be after start date.")
        setIsCalculating(false)
        return
      }

      // Room prices exactly matching the Room component
      const roomPrices = {
        1: 2594,  // Couple Room AC
        2: 3890,  // 4 Member Room AC
        3: 6508,  // 6 Members Room AC
        4: 17862, // Hut NON AC
        5: 24184, // Private Villa
        6: 26893  // Indoor Theatre Hall AC
      }

      const pricePerNight = roomPrices[roomId] || 2594 // Default fallback

      setTotalAmount(nights * pricePerNight)
      setIsPayEnabled(true)
      setErrorMessage("")
      setIsCalculating(false)
    }, 800)
  }

  // Handle Razorpay payment
  const handlePayment = () => {
    if (!window.Razorpay) {
      setErrorMessage("Payment gateway not loaded. Please try again later.")
      return
    }

    const options = {
      key: "rzp_test_d7Htck0TGu6Rde",
      amount: totalAmount * 100, // Amount in paise
      currency: "INR",
      name: "Hotel Booking",
      description: "Complete Your Booking",
      image: "/logo.png",
      handler: (response) => {
        if (response.razorpay_payment_id) {
          handlePayNow(response.razorpay_payment_id)
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9360793223",
      },
      theme: {
        color: "#4a6fa5",
      },
      modal: {
        ondismiss: () => {
          console.log("Payment modal closed")
        },
      },
    }

    try {
      const rzp1 = new window.Razorpay(options)
      rzp1.open()
    } catch (error) {
      console.error("Razorpay error:", error)
      setErrorMessage("Payment gateway error. Please try again later.")
    }
  }

  // Submit booking
  const handlePayNow = async (paymentId = null) => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login", { state: { from: `/book/${roomId}` } })
      return
    }

    setIsSubmitting(true)

    try {
      await axios.post(
        "http://localhost:5000/api/book",
        {
          roomId,
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
          adults,
          children,
          totalAmount,
          paymentId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      navigate("/confirmation", { state: { roomId, totalAmount } })
    } catch (error) {
      console.error("Booking error:", error)
      setErrorMessage(error.response?.data?.message || "An error occurred during booking. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle increment/decrement for guests
  const incrementAdults = () => setAdults(prev => prev + 1)
  const decrementAdults = () => adults > 1 && setAdults(prev => prev - 1)
  const incrementChildren = () => setChildren(prev => prev + 1)
  const decrementChildren = () => children > 0 && setChildren(prev => prev - 1)

  return (
    <div className="booking-container">
      <div className="booking-card">
        <div className="booking-header">
          <h2>Book Room {roomId}</h2>
          <p className="booking-subtitle">Select your dates and details to book your stay</p>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="booking-content">
          {/* Date Pickers */}
          <div className="date-picker-container">
            <div className="date-picker-group">
              <label>Check-in Date:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                excludeDateIntervals={bookedIntervals}
                minDate={new Date()}
                placeholderText="Select check-in date"
                className="date-input"
                required
              />
            </div>

            <div className="date-picker-group">
              <label>Check-out Date:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                excludeDateIntervals={bookedIntervals}
                placeholderText="Select check-out date"
                className="date-input"
                required
                disabled={!startDate}
              />
            </div>
          </div>

          {/* Guest Inputs */}
          <div className="guest-inputs-container">
            <div className="guest-input-group">
              <label>Adults:</label>
              <div className="number-input-container">
                <button
                  type="button"
                  className="number-btn"
                  onClick={decrementAdults}
                  disabled={adults <= 1}
                  aria-label="Decrease adults"
                >
                  -
                </button>
                <input
                  type="number"
                  value={adults}
                  min="1"
                  onChange={(e) => setAdults(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="number-input"
                  required
                  aria-label="Number of adults"
                />
                <button type="button" className="number-btn" onClick={incrementAdults} aria-label="Increase adults">
                  +
                </button>
              </div>
            </div>

            <div className="guest-input-group">
              <label>Children:</label>
              <div className="number-input-container">
                <button
                  type="button"
                  className="number-btn"
                  onClick={decrementChildren}
                  disabled={children <= 0}
                  aria-label="Decrease children"
                >
                  -
                </button>
                <input
                  type="number"
                  value={children}
                  min="0"
                  onChange={(e) => setChildren(Math.max(0, Number.parseInt(e.target.value) || 0))}
                  className="number-input"
                  required
                  aria-label="Number of children"
                />
                <button type="button" className="number-btn" onClick={incrementChildren} aria-label="Increase children">
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="total-amount-container">
            <div className="total-amount-label">Total Amount:</div>
            <div className="total-amount-value">₹{totalAmount.toLocaleString()}</div>
          </div>
        </div>

        <div className="booking-footer">
          <button
            className={`calculate-btn ${isCalculating ? "loading" : ""}`}
            onClick={calculateAmount}
            disabled={!startDate || !endDate || isCalculating}
          >
            {isCalculating ? "Calculating..." : "Calculate Amount"}
            {isCalculating && <span className="spinner"></span>}
          </button>

          <button
            className={`pay-btn ${!isPayEnabled ? "disabled" : ""} ${isSubmitting ? "loading" : ""}`}
            onClick={handlePayment}
            disabled={!isPayEnabled || isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Pay Now"}
            {isSubmitting && <span className="spinner"></span>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingForm