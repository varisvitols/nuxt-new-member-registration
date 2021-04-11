import { getAccessorType, mutationTree } from 'typed-vuex';

export const state = () => ({
  personalInfo: '' as string,
  membership: '1' as string,
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
  personalInfo: (state: RootState) => state.personalInfo,
  membership: (state: RootState) => state.membership,
  phoneTypesRemaining: (state: RootState) => state.phoneTypesRemaining,
  phoneTypesSelected: (state: RootState) => state.phoneTypesSelected
}

export const mutations = mutationTree(state, {
  updatePersonalInfo(state, newData: string) {
    state.personalInfo = newData
  },
  updatePhoneTypesRemaining(state, newData: object) {
    state.phoneTypesRemaining = newData
  },
  updatePhoneTypesSelected(state, newData: object) {
    state.phoneTypesSelected = newData
  },
  updateMembership(state, newData: string) {
    state.membership = newData
  }
})

export const accessorType = getAccessorType({
  getters,
  mutations,
  state
})
