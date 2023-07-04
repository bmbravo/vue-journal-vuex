import { createStore } from 'vuex';
import journal from '@/modules/daybook/store/journal';
import { journalState } from '../../../../../unit/mock-data/test-journal-state';

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

describe('Vuex - Pruebas en el journal module', () => {
  //Basicas
  test('este es el estado inicial, debe de tener este state', () => {
    const store = createVuexStore(journalState);

    const { isLoading, entries } = store.state.journal;

    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

  //Mutations

  test('mutation: setEntries', () => {
    const store = createVuexStore({ isLoading: true, entries: [] });

    store.commit('journal/setEntries', journalState.entries);

    expect(store.state.journal.entries.length).toBe(2);
    expect(store.state.journal.isLoading).toBeFalsy();
  });

  test('mutation: updateEntry', () => {
    const store = createVuexStore(journalState);

    const updatedEntry = {
      id: 'ABC123',
      text: 'test update entry',
      date: 'Una fecha XD',
      picture: null,
    };

    store.commit('journal/updateEntry', updatedEntry);

    expect(store.state.journal.entries.length).toBe(2);

    expect(
      store.state.journal.entries.find((e) => e.id === updatedEntry.id)
    ).toEqual(updatedEntry);
  });

  test('mutation: addEntry, deleteEntry', () => {
    const store = createVuexStore(journalState);

    const newEntry = {
      id: '123456',
      text: 'test update entry',
      date: 'Una fecha XD',
      picture: null,
    };

    store.commit('journal/addEntry', newEntry);

    let storeEntries = store.state.journal.entries;

    expect(storeEntries.length).toBe(3);
    expect(storeEntries.find((e) => e.id === newEntry.id)).toBeTruthy();

    store.commit('journal/deleteEntry', newEntry.id);

    storeEntries = store.state.journal.entries;

    expect(storeEntries.length).toBe(2);
    expect(storeEntries.find((e) => e.id === newEntry.id)).toBeFalsy();
  });

  //Getters
  test('getters: getEntriesByTerm, getEntryById', () => {
    const store = createVuexStore(journalState);

    const [entry1, entry2] = journalState.entries;

    expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2);

    expect(store.getters['journal/getEntriesByTerm']('Nueva').length).toBe(1);

    expect(store.getters['journal/getEntriesByTerm']('Nueva')).toEqual([
      entry1,
    ]);

    expect(store.getters['journal/getEntryById'](entry2.id)).toBeTruthy();
  });

  //Actions
  test('actions: loadEntries', async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });

    await store.dispatch('journal/loadEntries');

    const storeEntries = store.state.journal.entries;

    expect(storeEntries.length).toBe(3);
  });

  test('actions: updateEntry', async () => {
    const store = createVuexStore(journalState);

    const updatedEntry = {
      id: 'ABC123',
      date: 'Sat Jul 10 2023',
      picture: 'null',
      text: 'update de tests',
    };

    await store.dispatch('journal/updateEntry', updatedEntry);

    const storeEntries = store.state.journal.entries;

    expect(storeEntries.length).toBe(2);

    expect(storeEntries.find((e) => e.id === updatedEntry.id)).toEqual(
      updatedEntry
    );
  });

  test('actions: createEntry, deleteEntry', async () => {
    const store = createVuexStore(journalState);

    const newEntry = {
      text: 'test new entry',
      date: 'Una fecha XD',
      picture: null,
    };

    const id = await store.dispatch('journal/createEntry', newEntry);

    let journalEntries = store.state.journal.entries;

    expect(journalEntries.length).toBe(3);
    expect(typeof id).toBe('string');
    expect(journalEntries.find((e) => e.id === id)).toBeTruthy();

    await store.dispatch('journal/deleteEntry', id);

    journalEntries = store.state.journal.entries;

    expect(journalEntries.length).toBe(2);
    expect(journalEntries.find((e) => e.id === id)).toBeFalsy();
  });
});
