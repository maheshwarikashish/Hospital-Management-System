import doctorModel from "../models/doctorModel.js";

// Get all available doctors (basic public fields only)
export const listDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}, {
            password: 0,
            slots_booked: 0
        }).sort({ date: -1 });

        return res.json({ success: true, data: doctors });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Get details for a single doctor by id
export const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await doctorModel.findById(id, { password: 0 });
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        return res.json({ success: true, data: doctor });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


