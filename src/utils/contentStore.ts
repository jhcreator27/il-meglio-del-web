import { ContentItem } from '../types';
import { MOCK_CONTENT } from '../data/mockData';

export const getStoredContent = (): ContentItem[] => {
  try {
    const saved = localStorage.getItem('mw_editable_content');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // ignore
  }
  return MOCK_CONTENT;
};

export const saveStoredContent = (items: ContentItem[]) => {
  localStorage.setItem('mw_editable_content', JSON.stringify(items));
  window.dispatchEvent(new Event('mw_content_updated'));
};
