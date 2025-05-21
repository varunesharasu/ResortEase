// Import the Twilio library
import twilio from 'twilio';

/**
 * Sends a booking confirmation SMS to the user
 * @param {Object} bookingDetails - The booking details
 * @param {string} bookingDetails.roomId - The room ID
 * @param {string} bookingDetails.startDate - Check-in date (YYYY-MM-DD)
 * @param {string} bookingDetails.endDate - Check-out date (YYYY-MM-DD)
 * @param {number} bookingDetails.totalAmount - Total amount paid
 * @param {string} phoneNumber - User's phone number with country code (e.g., +919360793223)
 */
function sendBookingConfirmation(bookingDetails, phoneNumber) {
  // Twilio credentials
  const accountSid = 'ACa5912d5aafa5b0bfb41dc5b247221c8e';
  const authToken = 'e068708dd225a776c75a3f8ca11ae5b1';
  
  // Initialize Twilio client
  const client = twilio(accountSid, authToken);
  
  // Format dates for better readability
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };
  
  // Create a concise message with all necessary information
  const message = `Thank you for your payment! Your room ${bookingDetails.roomId} is confirmed from ${formatDate(bookingDetails.startDate)} to ${formatDate(bookingDetails.endDate)}. Amount: ₹${bookingDetails.totalAmount}. Royal Castle Farm Stay welcomes you!`;
  
  // Send the SMS
  return client.messages
    .create({
      body: message,
      messagingServiceSid: 'MG145e4f2270b7d80794f9b1ae19b6f66b',
      to: phoneNumber
    })
    .then(message => {
      console.log(`Message sent successfully! SID: ${message.sid}`);
      return { success: true, sid: message.sid };
    })
    .catch(error => {
      console.error('Error sending message:', error);
      return { success: false, error: error.message };
    });
}

// Example usage
const bookingDetails = {
  roomId: '5', // Private Villa
  startDate: '2024-05-25',
  endDate: '2024-05-27',
  totalAmount: 24184
};

// Send a test message
sendBookingConfirmation(bookingDetails, '+919360793223');