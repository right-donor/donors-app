// eslint-disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    firstname
    lastname
    birthday
    username
    email
    gender
    phonenumber
    photo {
      bucket
      region
      key
    }
    blood {
      type
      rh
    }
    type
    city
    canDonateFrom
    donations {
      items {
        id
        dateNeeded
        dateFulfilled
        bloodBagId
        bagAmount
      }
      nextToken
    }
    patients {
      items {
        id
        firstname
        lastname
        birthday
        gender
      }
      nextToken
    }
    interviews {
      date
      weight
      recentSickness
      recentAntibiotics
      recentPregnancy
      recentAlcohol
      recentVaccines
      recentTattoos
      recentMenstrualCycle
      diabetic
      hypertension
      bloodresults {
        vih
        hepatitisB
        hepatitisC
        syphilis
        chagas
      }
    }
    hospital {
      id
      name
      country
      address_line1
      address_state
      address_zip
      doctors {
        nextToken
      }
      patients {
        nextToken
      }
      donations {
        nextToken
      }
    }
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    firstname
    lastname
    birthday
    username
    email
    gender
    phonenumber
    photo {
      bucket
      region
      key
    }
    blood {
      type
      rh
    }
    type
    city
    canDonateFrom
    donations {
      items {
        id
        dateNeeded
        dateFulfilled
        bloodBagId
        bagAmount
      }
      nextToken
    }
    patients {
      items {
        id
        firstname
        lastname
        birthday
        gender
      }
      nextToken
    }
    interviews {
      date
      weight
      recentSickness
      recentAntibiotics
      recentPregnancy
      recentAlcohol
      recentVaccines
      recentTattoos
      recentMenstrualCycle
      diabetic
      hypertension
      bloodresults {
        vih
        hepatitisB
        hepatitisC
        syphilis
        chagas
      }
    }
    hospital {
      id
      name
      country
      address_line1
      address_state
      address_zip
      doctors {
        nextToken
      }
      patients {
        nextToken
      }
      donations {
        nextToken
      }
    }
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    firstname
    lastname
    birthday
    username
    email
    gender
    phonenumber
    photo {
      bucket
      region
      key
    }
    blood {
      type
      rh
    }
    type
    city
    canDonateFrom
    donations {
      items {
        id
        dateNeeded
        dateFulfilled
        bloodBagId
        bagAmount
      }
      nextToken
    }
    patients {
      items {
        id
        firstname
        lastname
        birthday
        gender
      }
      nextToken
    }
    interviews {
      date
      weight
      recentSickness
      recentAntibiotics
      recentPregnancy
      recentAlcohol
      recentVaccines
      recentTattoos
      recentMenstrualCycle
      diabetic
      hypertension
      bloodresults {
        vih
        hepatitisB
        hepatitisC
        syphilis
        chagas
      }
    }
    hospital {
      id
      name
      country
      address_line1
      address_state
      address_zip
      doctors {
        nextToken
      }
      patients {
        nextToken
      }
      donations {
        nextToken
      }
    }
  }
}
`;
export const createDonation = `mutation CreateDonation($input: CreateDonationInput!) {
  createDonation(input: $input) {
    id
    dateNeeded
    dateFulfilled
    donatedBy {
      id
      firstname
      lastname
      birthday
      username
      email
      gender
      phonenumber
      photo {
        bucket
        region
        key
      }
      blood {
        type
        rh
      }
      type
      city
      canDonateFrom
      donations {
        nextToken
      }
      patients {
        nextToken
      }
      interviews {
        date
        weight
        recentSickness
        recentAntibiotics
        recentPregnancy
        recentAlcohol
        recentVaccines
        recentTattoos
        recentMenstrualCycle
        diabetic
        hypertension
      }
      hospital {
        id
        name
        country
        address_line1
        address_state
        address_zip
      }
    }
    assignedTo {
      id
      firstname
      lastname
      birthday
      gender
      blood {
        type
        rh
      }
      donations {
        nextToken
      }
      doctor {
        id
        firstname
        lastname
        birthday
        username
        email
        gender
        phonenumber
        type
        city
        canDonateFrom
      }
      hospital {
        id
        name
        country
        address_line1
        address_state
        address_zip
      }
    }
    bloodBagId
    bloodType {
      type
      rh
    }
    bagAmount
    hospital {
      id
      name
      country
      address_line1
      address_state
      address_zip
      doctors {
        nextToken
      }
      patients {
        nextToken
      }
      donations {
        nextToken
      }
    }
  }
}
`;
export const updateDonation = `mutation UpdateDonation($input: UpdateDonationInput!) {
  updateDonation(input: $input) {
    id
    dateNeeded
    dateFulfilled
    donatedBy {
      id
      firstname
      lastname
      birthday
      username
      email
      gender
      phonenumber
      photo {
        bucket
        region
        key
      }
      blood {
        type
        rh
      }
      type
      city
      canDonateFrom
      donations {
        nextToken
      }
      patients {
        nextToken
      }
      interviews {
        date
        weight
        recentSickness
        recentAntibiotics
        recentPregnancy
        recentAlcohol
        recentVaccines
        recentTattoos
        recentMenstrualCycle
        diabetic
        hypertension
      }
      hospital {
        id
        name
        country
        address_line1
        address_state
        address_zip
      }
    }
    assignedTo {
      id
      firstname
      lastname
      birthday
      gender
      blood {
        type
        rh
      }
      donations {
        nextToken
      }
      doctor {
        id
        firstname
        lastname
        birthday
        username
        email
        gender
        phonenumber
        type
        city
        canDonateFrom
      }
      hospital {
        id
        name
        country
        address_line1
        address_state
        address_zip
      }
    }
    bloodBagId
    bloodType {
      type
      rh
    }
    bagAmount
    hospital {
      id
      name
      country
      address_line1
      address_state
      address_zip
      doctors {
        nextToken
      }
      patients {
        nextToken
      }
      donations {
        nextToken
      }
    }
  }
}
`;
export const deleteDonation = `mutation DeleteDonation($input: DeleteDonationInput!) {
  deleteDonation(input: $input) {
    id
    dateNeeded
    dateFulfilled
    donatedBy {
      id
      firstname
      lastname
      birthday
      username
      email
      gender
      phonenumber
      photo {
        bucket
        region
        key
      }
      blood {
        type
        rh
      }
      type
      city
      canDonateFrom
      donations {
        nextToken
      }
      patients {
        nextToken
      }
      interviews {
        date
        weight
        recentSickness
        recentAntibiotics
        recentPregnancy
        recentAlcohol
        recentVaccines
        recentTattoos
        recentMenstrualCycle
        diabetic
        hypertension
      }
      hospital {
        id
        name
        country
        address_line1
        address_state
        address_zip
      }
    }
    assignedTo {
      id
      firstname
      lastname
      birthday
      gender
      blood {
        type
        rh
      }
      donations {
        nextToken
      }
      doctor {
        id
        firstname
        lastname
        birthday
        username
        email
        gender
        phonenumber
        type
        city
        canDonateFrom
      }
      hospital {
        id
        name
        country
        address_line1
        address_state
        address_zip
      }
    }
    bloodBagId
    bloodType {
      type
      rh
    }
    bagAmount
    hospital {
      id
      name
      country
      address_line1
      address_state
      address_zip
      doctors {
        nextToken
      }
      patients {
        nextToken
      }
      donations {
        nextToken
      }
    }
  }
}
`;
export const createPatient = `mutation CreatePatient($input: CreatePatientInput!) {
  createPatient(input: $input) {
    id
    firstname
    lastname
    birthday
    gender
    blood {
      type
      rh
    }
    donations {
      items {
        id
        dateNeeded
        dateFulfilled
        bloodBagId
        bagAmount
      }
      nextToken
    }
    doctor {
      id
      firstname
      lastname
      birthday
      username
      email
      gender
      phonenumber
      photo {
        bucket
        region
        key
      }
      blood {
        type
        rh
      }
      type
      city
      canDonateFrom
      donations {
        nextToken
      }
      patients {
        nextToken
      }
      interviews {
        date
        weight
        recentSickness
        recentAntibiotics
        recentPregnancy
        recentAlcohol
        recentVaccines
        recentTattoos
        recentMenstrualCycle
        diabetic
        hypertension
      }
      hospital {
        id
        name
        country
        address_line1
        address_state
        address_zip
      }
    }
    hospital {
      id
      name
      country
      address_line1
      address_state
      address_zip
      doctors {
        nextToken
      }
      patients {
        nextToken
      }
      donations {
        nextToken
      }
    }
  }
}
`;
export const updatePatient = `mutation UpdatePatient($input: UpdatePatientInput!) {
  updatePatient(input: $input) {
    id
    firstname
    lastname
    birthday
    gender
    blood {
      type
      rh
    }
    donations {
      items {
        id
        dateNeeded
        dateFulfilled
        bloodBagId
        bagAmount
      }
      nextToken
    }
    doctor {
      id
      firstname
      lastname
      birthday
      username
      email
      gender
      phonenumber
      photo {
        bucket
        region
        key
      }
      blood {
        type
        rh
      }
      type
      city
      canDonateFrom
      donations {
        nextToken
      }
      patients {
        nextToken
      }
      interviews {
        date
        weight
        recentSickness
        recentAntibiotics
        recentPregnancy
        recentAlcohol
        recentVaccines
        recentTattoos
        recentMenstrualCycle
        diabetic
        hypertension
      }
      hospital {
        id
        name
        country
        address_line1
        address_state
        address_zip
      }
    }
    hospital {
      id
      name
      country
      address_line1
      address_state
      address_zip
      doctors {
        nextToken
      }
      patients {
        nextToken
      }
      donations {
        nextToken
      }
    }
  }
}
`;
export const deletePatient = `mutation DeletePatient($input: DeletePatientInput!) {
  deletePatient(input: $input) {
    id
    firstname
    lastname
    birthday
    gender
    blood {
      type
      rh
    }
    donations {
      items {
        id
        dateNeeded
        dateFulfilled
        bloodBagId
        bagAmount
      }
      nextToken
    }
    doctor {
      id
      firstname
      lastname
      birthday
      username
      email
      gender
      phonenumber
      photo {
        bucket
        region
        key
      }
      blood {
        type
        rh
      }
      type
      city
      canDonateFrom
      donations {
        nextToken
      }
      patients {
        nextToken
      }
      interviews {
        date
        weight
        recentSickness
        recentAntibiotics
        recentPregnancy
        recentAlcohol
        recentVaccines
        recentTattoos
        recentMenstrualCycle
        diabetic
        hypertension
      }
      hospital {
        id
        name
        country
        address_line1
        address_state
        address_zip
      }
    }
    hospital {
      id
      name
      country
      address_line1
      address_state
      address_zip
      doctors {
        nextToken
      }
      patients {
        nextToken
      }
      donations {
        nextToken
      }
    }
  }
}
`;
export const createHospital = `mutation CreateHospital($input: CreateHospitalInput!) {
  createHospital(input: $input) {
    id
    name
    country
    address_line1
    address_state
    address_zip
    doctors {
      items {
        id
        firstname
        lastname
        birthday
        username
        email
        gender
        phonenumber
        type
        city
        canDonateFrom
      }
      nextToken
    }
    patients {
      items {
        id
        firstname
        lastname
        birthday
        gender
      }
      nextToken
    }
    donations {
      items {
        id
        dateNeeded
        dateFulfilled
        bloodBagId
        bagAmount
      }
      nextToken
    }
  }
}
`;
export const updateHospital = `mutation UpdateHospital($input: UpdateHospitalInput!) {
  updateHospital(input: $input) {
    id
    name
    country
    address_line1
    address_state
    address_zip
    doctors {
      items {
        id
        firstname
        lastname
        birthday
        username
        email
        gender
        phonenumber
        type
        city
        canDonateFrom
      }
      nextToken
    }
    patients {
      items {
        id
        firstname
        lastname
        birthday
        gender
      }
      nextToken
    }
    donations {
      items {
        id
        dateNeeded
        dateFulfilled
        bloodBagId
        bagAmount
      }
      nextToken
    }
  }
}
`;
export const deleteHospital = `mutation DeleteHospital($input: DeleteHospitalInput!) {
  deleteHospital(input: $input) {
    id
    name
    country
    address_line1
    address_state
    address_zip
    doctors {
      items {
        id
        firstname
        lastname
        birthday
        username
        email
        gender
        phonenumber
        type
        city
        canDonateFrom
      }
      nextToken
    }
    patients {
      items {
        id
        firstname
        lastname
        birthday
        gender
      }
      nextToken
    }
    donations {
      items {
        id
        dateNeeded
        dateFulfilled
        bloodBagId
        bagAmount
      }
      nextToken
    }
  }
}
`;
