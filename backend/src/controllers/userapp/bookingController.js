const Booking = require("../../models/Booking");
const { sendBookingNotification } = require("../../services/emailService");

const createBooking = async (req, res) => {
  try {
    const { name, email, phone, service, date, time, notes } = req.body;

    const booking = await Booking.create({
      user: req.user?.id || undefined,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      services: [{ name: service }],
      date: new Date(date),
      timeSlot: time,
      notes: notes || "",
      status: "pending",
    });

    console.log(
      `New booking: ${booking.customerName} — ${service} on ${booking.date.toISOString()} at ${booking.timeSlot}`
    );

    await sendBookingNotification({
      name,
      email,
      phone,
      service,
      date,
      time,
      notes: notes || "",
    });

    res.status(201).json({
      success: true,
      message: "Booking confirmed! We'll send a reminder before your appointment.",
      data: booking,
    });
  } catch (err) {
    console.error("Create booking error:", err);
    res.status(500).json({ success: false, error: "Failed to create booking" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const filter = {};
    if (req.user?.id) {
      filter.user = req.user.id;
    }
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (err) {
    console.error("Get bookings error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch bookings" });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, error: "Booking not found" });
    }
    res.json({ success: true, data: booking });
  } catch (err) {
    console.error("Get booking error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch booking" });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ success: false, error: "Booking not found" });
    }
    res.json({ success: true, data: booking });
  } catch (err) {
    console.error("Update booking status error:", err);
    res.status(500).json({ success: false, error: "Failed to update booking" });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
};
