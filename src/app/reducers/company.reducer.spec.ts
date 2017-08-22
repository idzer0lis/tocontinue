// import { companies } from './company.reducer';
//
// describe('`companies` store', () => {
//   let initialState = [
//     { id: 0, name: 'First Company', current_voice_licences: 10, digital_licences_per_day: 4 },
//     { id: 1, name: 'Second Company', current_voice_licences: 8, digital_licences_per_day: 3 }
//   ];
//
//   it('returns an empty array by default', () => {
//     let defaultState = companies(undefined, {type: 'random', payload: {}});
//
//     expect(defaultState).toEqual([]);
//   });
//
//   it('`ADD_COMPANIES`', () => {
//     let payload = initialState,
//       stateCompanies = companies([], {type: 'ADD_COMPANIES', payload: payload});
//
//     expect(stateCompanies).toEqual(payload);
//   });
//
//   it('`CREATE_COMPANY`', () => {
//     let payload = {id: 2, name: 'added item'},
//       result = [...initialState, payload],
//       stateCompanies = companies(initialState, {type: 'CREATE_COMPANY', payload: payload});
//
//     expect(stateCompanies).toEqual(result);
//   });
//
//   it('`UPDATE_COMPANY`', () => {
//     let payload = { id: 1, name: 'Updated Company', current_voice_licences: 4, digital_licences_per_day: 2 },
//       result = [initialState[1], { id: 1, name: 'Updated Company', current_voice_licences: 4, digital_licences_per_day: 2 } ],
//       stateCompanies =  companies(initialState, { type: 'UPDATE_COMPANY', payload: payload } );
//
//     expect(stateCompanies).toEqual(result);
//   });
//
//   it('`DELETE_COMPANY`', () => {
//     let payload = { id: 0 },
//       result = [ this.initialState[1] ],
//       stateCompanies = companies(this.initialState, {type: 'DELETE_COMPANY', payload: payload});
//
//     expect(stateCompanies).toEqual(result);
//   });
// });
