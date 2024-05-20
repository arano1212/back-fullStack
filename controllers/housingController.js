import Housing from '../models/housing.js'
import Address from '../models/address.js'

const createHousing = async (req, res) => {
  try {
    const housingData = req.body
    if (!housingData) {
      return res.status(400).json({ msg: 'Housing data is missing' })
    }

    if (!housingData.address) {
      return res.status(400).json({ msg: 'Address data is missing' })
    }

    const existingAddress = await Address.findOne({
      street: housingData.address.street,
      city: housingData.address.city,
      state: housingData.address.state,
      postalCode: housingData.address.postalCode,
      country: housingData.address.country
    })

    if (!existingAddress) {
      const newAddress = new Address(housingData.address)
      await newAddress.save()
      housingData.address = newAddress._id
    } else {
      housingData.address = existingAddress._id
    }

    const newHousing = new Housing(housingData)
    await newHousing.save()

    res.status(201).json(newHousing)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getAllHousing = async (req, res) => {
  try {
    const housings = await Housing.find({ isActive: true }).populate('address')
    if (!housings) {
      return res.status(404).json({ msg: 'housings no found' })
    }
    res.status(200).json(housings)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}



export {
  createHousing,
  getAllHousing
}
