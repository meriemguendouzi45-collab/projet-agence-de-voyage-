const ServiceRequest = require("../models/ServiceRequest");
const sendEmail = require("../utils/sendEmail");

// CREATE SERVICE
exports.createService = async (req, res) => {
  try {
    const data = req.body;

    if (!data) {
      return res.status(400).json({ message: "No data provided" });
    }

    // SAVE IN DB
    const request = await ServiceRequest.create({
      type: data.type || "unknown",
      name: data.name || "N/A",
      email: data.email || "N/A",
      data: data,
      status: "pending",
    });

    // EMAIL ADMIN
    await sendEmail(
      process.env.EMAIL_USER,
      `🚀 New ${data.type} Request`,
      `
Type: ${data.type}
Name: ${data.name}
Email: ${data.email}

Details:
${JSON.stringify(data, null, 2)}
      `
    );

    // EMAIL USER
    if (data.email) {
      await sendEmail(
        data.email,
        "✔ Request Received",
        `Hello ${data.name},

Your ${data.type} request has been received.
We will contact you soon ✈️`
      );
    }

    res.status(201).json({ success: true, request });

  } catch (err) {
    console.error("SERVICE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getAllServices = async (req, res) => {
  try {
    const data = await ServiceRequest.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE STATUS
exports.updateServiceStatus = async (req, res) => {
  try {
    const updated = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteService = async (req, res) => {
  try {
    await ServiceRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};