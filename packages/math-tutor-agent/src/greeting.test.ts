import { describe, expect, it } from 'vitest';
import { INITIAL_GREETING_INSTRUCTIONS } from './greeting';

describe('INITIAL_GREETING_INSTRUCTIONS', () => {
  it('does not assume the board is empty', () => {
    expect(INITIAL_GREETING_INSTRUCTIONS).toContain('uploaded homework');
    expect(INITIAL_GREETING_INSTRUCTIONS).toContain('board');
    expect(INITIAL_GREETING_INSTRUCTIONS).toContain('Do not tell them to write a problem first');
  });
});
