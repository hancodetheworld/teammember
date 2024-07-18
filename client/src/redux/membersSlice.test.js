import membersReducer, { setMembers, initialState } from './membersSlice';

describe('members slice', () => {
  it('should handle initial state', () => {
    expect(membersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setMembers', () => {
    const newMembers = [
      {
        name: 'John Doe',
        description: 'A new member',
        age: 30,
        imageUrl: 'http://example.com/image.jpg',
      },
    ];
    const actual = membersReducer(initialState, setMembers(newMembers));
    expect(actual.members).toEqual(newMembers);
  });
});