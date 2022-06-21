import Gig from "../models/gig.js";
import User from "../models/users";

class gigyController {
  static async createGig(req, res) {
    const newGig = new Gig({
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      category: req.body.category.trim(),
      owner: req.user._id,
      price: req.body.price,
    });
    await newGig.save();
    res.status(200).send(newGig);
  }

  static async updateGig(req, res) {
    const { id } = req.params;
    const { name, description, category, price } = req.body;
    const updatedGig = await Gig.findByIdAndUpdate(
      id,
      {
        title: name,
        description: description,
        category: category,
        price: price,
      },
      { new: true }
    );
    res.status(200).send(updatedGig);
  }

  static async deleteGig(req, res) {
    const { id } = req.params;
    const deletedGig = await Gig.findByIdAndDelete(id);
    res.status(200).send(deletedGig);
  }

  static async getAllGigs(req, res) {
    const allGigs = await Gig.find({ status: "posted" });
    res.status(200).send(allGigs);
  }

  static async getGigsByUser(req, res) {
    const { id } = req.params;
    const userGigs = await Gig.find({ owner: id });
    res.status(200).send(userGigs);
  }

  static async getGigsByStatus(req, res) {
    const { status } = req.params;
    const userGigs = await Gig.find({ status: status });
    res.status(200).send(userGigs);
  }

  static async getGigsByCategory(req, res) {
    const { category } = req.params;
    const userGigs = await Gig.find({ category: category });
    res.status(200).send(userGigs);
  }

  static async applyBid(req, res) {
    const { id } = req.params;
    console.log(id);
    const { _id } = req.user;
    const query = { _id: id, status: "posted" };

    console.log(query);
    console.log(_id);
    console.log(id);

    const checkIfBidExists = await Gig.findOne({
      _id: id,
      bidders: _id,
    });
    if (checkIfBidExists)
      return res.status(400).send({ response: "Bid already sent" });

    const bid = await Gig.findByIdAndUpdate(
      query,
      {
        $push: { bidders: _id },
      },
      { new: true }
    )
      .then(() => {
        res.status(200).send(bid);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static async getBids(req, res) {
    const { id } = req.params;
    const bids = await Gig.findById(id).populate("bidders");
    res.status(200).send(bids);
  }

  static async getBidsByUser(req, res) {
    const { id } = req.params;
    const userBids = await Gig.findById(id).populate("bidders");
    res.status(200).send(userBids);
  }

  static async assignGig(req, res) {
    const { id, userid } = req.params;
    try {
      const assignedGig = await Gig.findByIdAndUpdate(
        { _id: id, owner: req.user._id, status: "posted" },
        {
          assignedTo: userid,
          status: "assigned",
        },
        { new: true }
      );
      res.status(200).send(assignedGig);
    } catch {
      res.send({ response: "something went wrong" });
    }
  }

  static async startGig(req, res) {
    const { id } = req.params;
    const { _id } = req.user;

    try {
      console.log(_id);
      const startedGig = await Gig.findOneAndUpdate(
        { _id: id, assignedTo: _id, status: "posted" },
        {
          status: "started",
        },
        { new: true }
      );
      res.status(200).send({ response: startedGig, message: "task started" });
    } catch {
      res.send({ response: "something went wrong" });
    }
  }

  static async completeGig(req, res) {
    const { id } = req.params;
    const { _id } = req.user;

    try {
      console.log(_id);
      const startedGig = await Gig.findOneAndUpdate(
        { _id: id, owner: _id, status: "posted" },
        {
          status: "completed",
        },
        { new: true }
      );
      res.status(200).send({ response: startedGig, message: "task completed" });
    } catch {
      res.send({ response: "something went wrong" });
    }
  }

  static async getGigsByStatus(req, res) {
    const { status } = req.params;
    const userGigs = await Gig.find({ status: status });
    res.status(200).send(userGigs);
  }

  static async findGig(req, res) {
    const gig = await Gig.findById(req.params.id);
    res.status(200).send(gig);
  }

  static async findGigByCategory(req, res) {
    const gig = await Gig.findOne({ category: req.params.category });
    res.status(200).send(gig);
  }
}

export default gigyController;
