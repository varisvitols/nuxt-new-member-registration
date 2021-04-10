// export interface FormData {
//   first_name?: string,
//   last_name?: string,
//   email?: string,
//   phone_home?: string,
//   phone_work?: string,
//   phone_mobile?: string,
//   phone_main?: string,
//   phone_other?: string,
//   membership?: number
// }

import { getAccessorType, mutationTree, actionTree } from 'typed-vuex'
// import { Context } from '@nuxt/types'

export const state = () => ({
  // formData: {} as FormData,
  first_name: '' as string,
  last_name: '' as string,
  email: '' as string,
  phone_home: '' as string,
  phone_work: '' as string,
  phone_mobile: '' as string,
  phone_main: '' as string,
  phone_other: '' as string,
  membership: 1 as number,
  phoneTypesRemaining: {
    phone_mobile: 'Mobile',
    phone_main: 'Main',
    phone_other: 'Other'
  } as object,
  phoneTypesSelected: {
    phone_work: 'Work',
    phone_home: 'Home'
  } as object
})

type RootState = ReturnType<typeof state>

export const getters = {
  // formData: (state: RootState) => state.formData,
  first_name: (state: RootState) => state.first_name,
  last_name: (state: RootState) => state.last_name,
  email: (state: RootState) => state.email,
  phone_home: (state: RootState) => state.phone_home,
  phone_work: (state: RootState) => state.phone_work,
  phone_mobile: (state: RootState) => state.phone_mobile,
  phone_main: (state: RootState) => state.phone_main,
  phone_other: (state: RootState) => state.phone_other,
  membership: (state: RootState) => state.membership,
  phoneTypesRemaining: (state: RootState) => state.phoneTypesRemaining,
  phoneTypesSelected: (state: RootState) => state.phoneTypesSelected
}

export const mutations = mutationTree(state, {
  // setFormData(state, newData: FormData) {
  //   console.log('updating form data...')
  //   state.formData = newData
  // },
  updateFirstName(state, newData: string) {
    state.first_name = newData
  },
  updateLastName(state, newData: string) {
    state.last_name = newData
  },
  updateEmail(state, newData: string) {
    state.email = newData
  },
  updatePhoneHome(state, newData: string) {
    state.phone_home = newData
  },
  updatePhoneWork(state, newData: string) {
    state.phone_work = newData
  },
  updatePhoneMobile(state, newData: string) {
    state.phone_mobile = newData
  },
  updatePhoneMain(state, newData: string) {
    state.phone_main = newData
  },
  updatePhoneOther(state, newData: string) {
    state.phone_other = newData
  },
  updatePhoneTypesRemaining(state, newData: object) {
    state.phoneTypesRemaining = newData
  },
  updatePhoneTypesSelected(state, newData: object) {
    state.phoneTypesSelected = newData
  },
  updateMembership(state, newData: number) {
    state.membership = newData
  }
})

export const accessorType = getAccessorType({
  getters,
  mutations,
  state
})
