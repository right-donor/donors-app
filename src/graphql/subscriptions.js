/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
    }
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
    }
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
    }
  }
}
`;
export const onCreateDonation = `subscription OnCreateDonation {
  onCreateDonation {
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
    }
  }
}
`;
export const onUpdateDonation = `subscription OnUpdateDonation {
  onUpdateDonation {
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
    }
  }
}
`;
export const onDeleteDonation = `subscription OnDeleteDonation {
  onDeleteDonation {
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
    }
  }
}
`;
export const onCreatePatient = `subscription OnCreatePatient {
  onCreatePatient {
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
    }
  }
}
`;
export const onUpdatePatient = `subscription OnUpdatePatient {
  onUpdatePatient {
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
    }
  }
}
`;
export const onDeletePatient = `subscription OnDeletePatient {
  onDeletePatient {
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
    }
  }
}
`;
export const onCreateHospital = `subscription OnCreateHospital {
  onCreateHospital {
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
  }
}
`;
export const onUpdateHospital = `subscription OnUpdateHospital {
  onUpdateHospital {
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
  }
}
`;
export const onDeleteHospital = `subscription OnDeleteHospital {
  onDeleteHospital {
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
  }
}
`;
