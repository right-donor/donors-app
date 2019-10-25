/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    firstname
    lastname
    birthday
    username
    email
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
    }
    assignedTo {
      id
      firstname
      lastname
      birthday
      photo {
        bucket
        region
        key
      }
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
        phonenumber
        type
        canDonateFrom
      }
      hospital {
        name
        city
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
      name
      city
      country
      address_line1
      address_state
      address_zip
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
    }
    assignedTo {
      id
      firstname
      lastname
      birthday
      photo {
        bucket
        region
        key
      }
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
        phonenumber
        type
        canDonateFrom
      }
      hospital {
        name
        city
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
      name
      city
      country
      address_line1
      address_state
      address_zip
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
    }
    assignedTo {
      id
      firstname
      lastname
      birthday
      photo {
        bucket
        region
        key
      }
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
        phonenumber
        type
        canDonateFrom
      }
      hospital {
        name
        city
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
      name
      city
      country
      address_line1
      address_state
      address_zip
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
    photo {
      bucket
      region
      key
    }
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
    }
    hospital {
      name
      city
      country
      address_line1
      address_state
      address_zip
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
    photo {
      bucket
      region
      key
    }
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
    }
    hospital {
      name
      city
      country
      address_line1
      address_state
      address_zip
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
    photo {
      bucket
      region
      key
    }
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
    }
    hospital {
      name
      city
      country
      address_line1
      address_state
      address_zip
    }
  }
}
`;
