import React from 'react';
import { StoryFloatingCard } from './StoryFloatingCard';
import { CINEMATIC_STORIES } from '@/data/cinematicStories';

describe('StoryFloatingCard', () => {
  it('is defined and is a valid React component', () => {
    expect(StoryFloatingCard).toBeDefined();
    expect(typeof StoryFloatingCard).toBe('function');
  });

  it('validates cinematic story product data structure', () => {
    expect(CINEMATIC_STORIES.length).toBeGreaterThan(0);
    const item = CINEMATIC_STORIES[0];
    expect(item.id).toBeTruthy();
    expect(item.name).toBeTruthy();
    expect(item.storyTitleLine1).toBeTruthy();
    expect(item.storyTitleLine2).toBeTruthy();
    expect(item.storySubtitle).toBeTruthy();
    expect(item.cardThumbnail).toBeTruthy();
  });
});
