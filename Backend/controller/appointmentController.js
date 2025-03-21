
const Appointment = require('../model/appointmentModel'); 


const bookAppointment = async (req, res) => {
  const { date, time, reason, doctor } = req.body;

  if (!date || !time || !reason) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
  

    const newAppointment = new Appointment({
      user: req.user.id, 
      date,
      time,
      reason,
      doctor,
      status:'Confirmed',
    });

    const savedAppointment = await newAppointment.save();
  
    res.status(201).json({
      message: 'Appointment booked successfully.Confirmation email sent.',
      appointment: savedAppointment,
    });
  } catch (err) {
    console.error('Error booking appointment:', err); 
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id }).sort({ date: -1 });

    if (!appointments.length) {
      return res.status(404).json({ message: 'No appointments found.' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = { bookAppointment, getAppointments };
