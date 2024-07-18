import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import store from '../redux/store';
import MemberForm from './MemberForm';

test('renders MemberForm and submits new member', () => {
  render(
    <Provider store={store}>
      <MemberForm />
    </Provider>
  );

  const nameInput = screen.getByPlaceholderText(/name/i);
  const descriptionInput = screen.getByPlaceholderText(/description/i);
  const ageInput = screen.getByPlaceholderText('Age');
  const imageUrlInput = screen.getByPlaceholderText(/image url/i);
  const extraDetailInput = screen.getByPlaceholderText(/extra detail/i);
  const submitButton = screen.getByText(/add member/i);

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(descriptionInput, { target: { value: 'A new member' } });
  fireEvent.change(ageInput, { target: { value: '30' } });
  fireEvent.change(imageUrlInput, { target: { value: 'http://example.com/image.jpg' } });
  fireEvent.change(extraDetailInput, { target: { value: 'Extra details' } });
  
  fireEvent.click(submitButton);

  expect(nameInput.value).toBe('');
  expect(descriptionInput.value).toBe('');
  expect(ageInput.value).toBe('');
  expect(imageUrlInput.value).toBe('');
  expect(extraDetailInput.value).toBe('');
});