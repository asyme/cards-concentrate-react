import { render, screen } from '@testing-library/react';
import App from './App';

test('20 cards present', () => {
  const res = render(<App />);
  const cards = res.container.querySelectorAll('.card');
  expect(cards.length).toBe(20);
});