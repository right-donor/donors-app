/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getDonation = `query GetDonation($id: ID!) {
  getDonation(id: $id) {
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
export const listDonations = `query ListDonations(
  $filter: ModelDonationFilterInput
  $limit: Int
  $nextToken: String
) {
  listDonations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
        type
        city
        canDonateFrom
      }
      assignedTo {
        id
        firstname
        lastname
        birthday
        gender
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
      }
    }
    nextToken
  }
}
`;
export const getPatient = `query GetPatient($id: ID!) {
  getPatient(id: $id) {
    id
    firstname
    lastname
    birthday
    gender
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
export const listPatients = `query ListPatients(
  $filter: ModelPatientFilterInput
  $limit: Int
  $nextToken: String
) {
  listPatients(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      firstname
      lastname
      birthday
      gender
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
    nextToken
  }
}
`;
export const getHospital = `query GetHospital($id: ID!) {
  getHospital(id: $id) {
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
export const listHospitals = `query ListHospitals(
  $filter: ModelHospitalFilterInput
  $limit: Int
  $nextToken: String
) {
  listHospitals(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const searchUsers = `query SearchUsers(
  $filter: SearchableUserFilterInput
  $sort: SearchableUserSortInput
  $limit: Int
  $nextToken: String
) {
  searchUsers(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
export const searchDonations = `query SearchDonations(
  $filter: SearchableDonationFilterInput
  $sort: SearchableDonationSortInput
  $limit: Int
  $nextToken: String
) {
  searchDonations(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
        type
        city
        canDonateFrom
      }
      assignedTo {
        id
        firstname
        lastname
        birthday
        gender
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
      }
    }
    nextToken
  }
}
`;
export const searchPatients = `query SearchPatients(
  $filter: SearchablePatientFilterInput
  $sort: SearchablePatientSortInput
  $limit: Int
  $nextToken: String
) {
  searchPatients(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      firstname
      lastname
      birthday
      gender
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
    nextToken
  }
}
`;
