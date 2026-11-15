import { previewGet, testRows } from '../serverless/previewDb.js';

export default function handler(req, res) {
  previewGet(req, res, () => {
    const url = new URL(req.url || '/', 'http://localhost');
    const category = url.searchParams.get('category') || undefined;
    return testRows(category);
  });
}
