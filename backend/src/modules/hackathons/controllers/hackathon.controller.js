const { default: mongoose } = require("mongoose");
const Hackathon = require("../models/hackathon.model");
const User = require("../../user/models/user.model");

// Create Hackathon
const createHackathon = async (req, res) => {
  const {
    contestName,
    startDate,
    endDate,
    organizationType,
    organizationName,
    tagLine,
    description,
    registrationDeadline,
  } = req.body;

  try {
    const newHackathon = new Hackathon({
      contestName,
      startDate,
      endDate,
      organizationType,
      organizationName,
      tagLine,
      description,
      registrationDeadline,
      createdBy: req.user.id,
    });
    await newHackathon.save();
    res.status(201).json({
      message: "Hackathon created successfully",
      hackathon: newHackathon,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Hackathons
const getHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    const currentDate = new Date();

    const hackathonsWithStatus = hackathons.map((hackathon) => {
      let status;
      let registrationStatus = "false";

      const isUserRegistered = hackathon.registeredUsers?.includes(userId);

      if (isUserRegistered) {
        registrationStatus = "true";
      }

      if (currentDate < hackathon.startDate) status = "Upcoming";
      else if (
        currentDate >= hackathon.startDate &&
        currentDate <= hackathon.endDate
      )
        status = "Ongoing";
      else if (currentDate > hackathon.endDate) status = "Completed";

      return { ...hackathon._doc, status, registrationStatus };
    });

    res.status(200).json(hackathonsWithStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Hackathon by ID
const getHackathonById = async (req, res) => {
  try {
    const { id } = req.params;
    const hackathon = await Hackathon.findById(id);

    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    const currentDate = new Date();
    let status;
    let registrationStatus = "false";

    const isUserRegistered = hackathon.participants?.includes(req.user?.id);

    if (isUserRegistered) {
      registrationStatus = "true";
    }

    if (currentDate < hackathon.startDate) status = "Upcoming";
    else if (
      currentDate >= hackathon.startDate &&
      currentDate <= hackathon.endDate
    )
      status = "Ongoing";
    else if (currentDate > hackathon.endDate) status = "Completed";

    res.status(200).json({ ...hackathon._doc, status, registrationStatus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get hackathon by userId
const getHackathonsByUserId = async (req, res) => {
  try {
    const { id } = req.user;

    const hackathons = await Hackathon.find({
      createdBy: id,
    });

    if (!hackathons || hackathons.length === 0) {
      return res
        .status(404)
        .json({ message: "No hackathons found for this user" });
    }

    const currentDate = new Date();

    const hackathonDetails = hackathons.map((hackathon) => {
      let status;

      if (currentDate < hackathon.startDate) status = "Upcoming";
      else if (
        currentDate >= hackathon.startDate &&
        currentDate <= hackathon.endDate
      )
        status = "Ongoing";
      else if (currentDate > hackathon.endDate) status = "Completed";

      return {
        ...hackathon._doc,
        status,
      };
    });

    res.status(200).json(hackathonDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRegisteredHackathonsByUserId = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const hackathons = await Hackathon.find({
      participants: userId,
    });

    if (!hackathons || hackathons.length === 0) {
      return res
        .status(404)
        .json({ message: "No registered hackathons found for this user" });
    }

    const currentDate = new Date();

    const hackathonDetails = hackathons.map((hackathon) => {
      let status;

      if (currentDate < hackathon.startDate) status = "Upcoming";
      else if (
        currentDate >= hackathon.startDate &&
        currentDate <= hackathon.endDate
      )
        status = "Ongoing";
      else if (currentDate > hackathon.endDate) status = "Completed";

      return {
        ...hackathon._doc,
        status,
      };
    });

    res.status(200).json(hackathonDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Hackathon
const updateHackathon = async (req, res) => {
  const {
    contestName,
    startDate,
    endDate,
    organizationType,
    organizationName,
    tagLine,
    description,
    registrationDeadline,
  } = req.body;
  const hackathonId = req.params.id;

  try {
    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon)
      return res.status(404).json({ message: "Hackathon not found" });

    hackathon.contestName = contestName || hackathon.contestName;
    hackathon.startDate = startDate || hackathon.startDate;
    hackathon.endDate = endDate || hackathon.endDate;
    hackathon.organizationType = organizationType || hackathon.organizationType;
    hackathon.organizationName = organizationName || hackathon.organizationName;
    hackathon.tagLine = tagLine || hackathon.tagLine;
    hackathon.description = description || hackathon.description;
    hackathon.registrationDeadline =
      registrationDeadline || hackathon.registrationDeadline;
    await hackathon.save();

    res
      .status(200)
      .json({ message: "Hackathon updated successfully", hackathon });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Hackathon
const deleteHackathon = async (req, res) => {
  const hackathonId = req.params.id;

  try {
    const hackathon = await Hackathon.findByIdAndDelete(hackathonId);
    if (!hackathon)
      return res.status(404).json({ message: "Hackathon not found" });
    res.status(200).json({ message: "Hackathon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register for Hackathon
const registerForHackathon = async (req, res) => {
  try {
    const hackathonId = req.params.id;
    const userId = req.user.id;
    const hackathon = await Hackathon.findById(hackathonId);
    const user = await User.findById(userId);

    if (!hackathon || !user) {
      throw new Error("Hackathon or User not found");
    }

    if (hackathon.participants.includes(userId)) {
      throw new Error("User already registered for this hackathon");
    }

    hackathon.participants.push(userId);
    await hackathon.save();
    res.status(200).json({ message: "Successfully registered for hackathon" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createHackathon,
  getHackathons,
  updateHackathon,
  deleteHackathon,
  registerForHackathon,
  getHackathonById,
  getHackathonsByUserId,
  getRegisteredHackathonsByUserId,
};
