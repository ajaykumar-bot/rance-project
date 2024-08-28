const {
  User,
  Role,
  Address,
  PointTransaction,
  Nominee,
  BankAccount,
  Invoice,
} = require("../models");
const bcrypt = require("bcryptjs");

const moment = require("moment");

const profile = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    if (id) {
      const user = await User.findOne({
        where: { id: id },
        include: [
          { model: Role, as: "role" },
          { model: User, as: "parent" },
          // { model: User, as: "children" },
          { model: Address, as: "addresses" },
          { model: PointTransaction, as: "pointTransactions" },
          { model: Nominee, as: "nominee" },
          { model: BankAccount, as: "bankAccount" },
        ],
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User Not Found !",
          data: [],
        });
      }

      return res.status(200).json({
        success: true,
        message: "User Fetched Successfully !",
        data: user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Profile API",
      error,
    });
  }
};

const store = async (req, res) => {
  try {
    const { name, email, password, parentId, startingLevel, roleId } = req.body;
    if ((!name || !email || !parentId || !startingLevel, roleId)) {
      return res.status(500).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(
      password ? password : "user@123",
      salt
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      parentId,
      startingLevel,
      roleId,
      isActive: 1,
    });

    await user.reload({
      include: [
        { model: Role, as: "role" },
        { model: Address, as: "addresses" },
        { model: PointTransaction, as: "pointTransactions" },
        { model: User, as: "parent" }, // Assuming 'parent' is a relationship to another User model
      ],
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Store API",
      error,
    });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { status, id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (!(status === "active" || status === "deactive"))
      throw new Error("Status should be active or inactive");

    user.isActive = status === "active" ? 1 : 0;
    await user.save();

    await user.reload({
      include: [
        { model: Role, as: "role" },
        { model: Address, as: "addresses" },
        { model: PointTransaction, as: "pointTransactions" },
        { model: User, as: "parent" },
        { model: Nominee, as: "nominee" },
        { model: BankAccount, as: "bankAccount" },
      ],
    });

    return res.status(200).json({
      message: "User status changed",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Change Status API",
      error: error.message,
    });
  }
};

const invoiceHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
        error: error.message,
      });
    }

    await user.reload({
      include: { model: Invoice, as: "invoices" },
    });

    return res.status(200).json({
      success: true,
      message: "User Invoices Found Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Invoice History API",
      error: error.message,
    });
  }
};

const pointHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
        error: error.message,
      });
    }

    await user.reload({
      include: { model: Invoice, as: "pointTransactions" },
    });

    return res.status(200).json({
      success: true,
      message: "User Point Transactions Found Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Point Transaction History API",
      error: error.message,
    });
  }
};

const myTeam = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({
      where: { email: email },
      include: {
        model: User,
        as: "children",
        include: [
          {
            model: Address,
            as: "addresses",
          },
          { model: Role, as: "role" },
        ],
      },
    });

    return res.status(200).json({
      success: true,
      message: "User Team Fetched Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in My Team API",
      error: error.message,
    });
  }
};

const updatePersonalDetails = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ where: { email: email } });
    const {
      fatherName,
      dob,
      gender,
      phone,
      whatsapp,
      pan,
      aadhar,
      parentId,
      avatar,
    } = req.body;

    if (!fatherName && !user.fatherName)
      throw new Error("Father Name is Required");
    if (!dob && !user.dob) throw new Error("Date of Birth is  Required");
    if (!gender && !user.gender) throw new Error("Gender is Required");
    if (!phone && !user.phone) throw new Error("Phone Number is Required");
    if (!whatsapp && !user.whatsapp)
      throw new Error("WhatsApp Number is Required");
    if (!pan && !user.pan) throw new Error("PAN Number is Required");
    if (!aadhar && !user.aadhar) throw new Error("Aadhar Number is Required");

    user.parentId = parentId ? parentId : user.parent_id;
    user.phone = phone ? phone : user.phone;
    user.whatsapp = whatsapp ? whatsapp : user.whatsapp;
    user.fatherName = fatherName ? fatherName : user.father_name;
    user.aadhar = aadhar ? aadhar : user.aadhar;
    user.pan = pan ? pan : user.pan;
    user.avatar = avatar
      ? avatar
      : user.avatar ?? "assets/images/users/user-dummy-img.jpg";
    user.gender = gender ? gender : user.gender;
    user.dob = dob ? dob : user.dob;

    await user.save();

    await user.reload({
      include: { model: Address, as: "addresses" },
    });

    return res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Update Personal Details API",
      error: error.message,
    });
  }
};

const updateAddress = async (req, res) => {
  try {
    const {
      c_address,
      c_address2,
      c_city,
      c_district,
      c_pin,
      c_state,
      p_address,
      p_address2,
      p_city,
      p_district,
      p_pin,
      p_state,
      email,
    } = req.body;

    if (
      !c_address ||
      !c_city ||
      !c_district ||
      !c_pin ||
      !c_state ||
      !p_address ||
      !p_city ||
      !p_district ||
      !p_pin ||
      !p_state
    ) {
      return res.status(500).json({
        success: false,
        message: "All Fields are mandatory",
      });
    }

    const user = await User.findOne({
      where: { email: email },
      include: [{ model: Address, as: "addresses" }], // Eager load the addresses
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const formattedDate = moment().format("YYYY-MM-DD HH:mm:ss");

    if (user.addresses && user.addresses.length > 0) {
      // Handle 'current' address
      console.log(123);

      let address_c = user.addresses.find((addr) => addr.type === "current");
      if (!address_c) {
        throw new Error("Current Address Not found of Type");
      }

      console.log(address_c);

      address_c.address = c_address ?? address_c.address;
      address_c.address2 = c_address2 ?? address_c.address2;
      address_c.city = c_city ?? address_c.city;
      address_c.district = c_district ?? address_c.district;
      address_c.state = c_state ?? address_c.state;
      address_c.pin = c_pin ?? address_c.pin;
      await address_c.save();

      let address_p = user.addresses.find((addr) => addr.type === "permanent");
      if (!address_p) {
        throw new Error("Permanent Address Not found of Type");
      }
      address_p.address = p_address ?? address_p.address;
      address_p.address2 = p_address2 ?? address_p.address2;
      address_p.city = p_city ?? address_p.city;
      address_p.district = p_district ?? address_p.district;
      address_p.state = p_state ?? address_p.state;
      address_p.pin = p_pin ?? address_p.pin;
      await address_p.save();
    } else {
      await user.createAddress({
        type: "current",
        address: c_address,
        address2: c_address2,
        city: c_city,
        district: c_district,
        state: c_state,
        pin: c_pin,
        // createdAt: formattedDate,
        // updatedAt: formattedDate,
      });

      await user.createAddress({
        type: "permanent",
        address: p_address,
        address2: p_address2,
        city: p_city,
        district: p_district,
        state: p_state,
        pin: p_pin,
        // createdAt: formattedDate,
        // updatedAt: formattedDate,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Addresses updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Update Address API",
      error: error.message,
    });
  }
};

const updaetNominee = async (req, res) => {
  try {
    const { name, relation, dob, address, city, district, state, pin, email } =
      req.body;

    if (
      !name ||
      !relation ||
      !dob ||
      !address ||
      !city ||
      !state ||
      !pin ||
      !district
    ) {
      return res.status(500).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const user = await User.findOne({
      where: { email: email },
    });
    console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const [nominee, created] = await Nominee.upsert(
      {
        userId: user.id,
        name,
        relation,
        dob,
        address,
        city,
        district,
        state,
        pin,
      },
      {
        returning: true, // To get the updated or created instance
      }
    );
    await user.reload({
      include: [
        { model: Nominee, as: "nominee" },
        { model: Address, as: "addresses" },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Nominee Updated Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Update Nominee API",
      error: error.message,
    });
  }
};

const updateBankAc = async (req, res) => {
  try {
    const { acHolder, acNo, bank, branch, ifsc, email } = req.body;

    if (!acHolder || !acNo || !bank || !branch || !ifsc) {
      return res.status(500).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const [bankAc, created] = await BankAccount.upsert(
      {
        userId: user.id,
        acHolder,
        acNo,
        bank,
        branch,
        ifsc,
      },
      {
        returning: true,
      }
    );
    await user.reload({
      include: [
        { model: BankAccount, as: "bankAccount" },
        { model: Nominee, as: "nominee" },
        { model: Address, as: "addresses" },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Bank Updated Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Update Bank Ac API",
      error: error.message,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await user.update({
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Update Password API",
      error: error.message,
    });
  }
};

module.exports = {
  profile,
  store,
  changeStatus,
  invoiceHistory,
  pointHistory,
  myTeam,
  updatePersonalDetails,
  updateAddress,
  updaetNominee,
  updateBankAc,
  updatePassword,
};
