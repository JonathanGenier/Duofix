// =======================================================================================
//  File        :   hub/postalCode.js
//  Author      :   Jonathan Génier
//  Modified by :   
//  Description :   Ce fichier gère les requêtes POST lorsqu'on tente d'enregistrer un hub
//                  à la base de donnée.  
// =======================================================================================

import axios from 'axios'

export default async (req, res) => {
    const { method } = req

    if (method !== 'POST') {
        return res.status(405).json({ result: 'Bad request - Only POST is supported for postalCode.' })
    }

    let fsaStr = req.body.data.substr(0, 3)
    let lduStr = req.body.data.substr(3, 7).trim()
    let location = { city: "Gatineau", province: "Quebec" }

    try {
        let rawData = await axios.get('https://www.google.ca/search?q='+fsaStr+"+"+lduStr+'+postal+code')
        location = getLocation(rawData.data)
    } catch (error) {
        console.log(error)

        location = { city: null, province: null }
        return res.status(200).json({ location })
    }

    return res.status(200).json({ location })
}

const getLocation = (data) => {
    let trimmedData = data.substr(data.search("Postal code in ") + "Postal code in ".length)

    if ((trimmedData.length + "Postal code in ".length - 1) == data.length) {
        return { city: null, province: null }
    }

    let location = trimmedData.substr(0, trimmedData.indexOf("<")).split(',')
    let city = location[0].trim()
    let province = location[1].trim()

    return { city, province }
}