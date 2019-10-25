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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreatePatient = `subscription OnCreatePatient {
  onCreatePatient {
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
export const onUpdatePatient = `subscription OnUpdatePatient {
  onUpdatePatient {
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
export const onDeletePatient = `subscription OnDeletePatient {
  onDeletePatient {
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
